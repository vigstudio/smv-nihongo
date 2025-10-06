const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Lấy loại database từ .env (mặc định là mariadb)
const DB_TYPE = (process.env.DB_TYPE || 'mariadb').toLowerCase();

let db;
let pool;

// Khởi tạo database connection dựa trên DB_TYPE
if (DB_TYPE === 'sqlite') {
    // SQLite
    const sqlite3 = require('sqlite3').verbose();
    const dbPath = process.env.SQLITE_DB_PATH || './database/nihongo.sqlite';
    
    // Tạo thư mục nếu chưa tồn tại
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }
    
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Lỗi khi kết nối SQLite:', err.message);
        } else {
            console.log('Đã kết nối thành công với SQLite:', dbPath);
        }
    });
    
    // Enable foreign keys cho SQLite
    db.run('PRAGMA foreign_keys = ON');
} else {
    // MySQL/MariaDB
    const mysql = require('mysql2/promise');
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'nihongo',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        charset: 'utf8mb4'
    });
}

// Hàm convert SQL từ MySQL sang SQLite
function convertSQLForSQLite(sql) {
    if (DB_TYPE !== 'sqlite') return sql;
    
    // Skip hoàn toàn CREATE DATABASE và USE
    if (sql.trim().match(/^CREATE\s+DATABASE/i) || sql.trim().match(/^USE\s+/i)) {
        return null; // Return null để bỏ qua statement này
    }
    
    let converted = sql
        // AUTO_INCREMENT -> INTEGER PRIMARY KEY
        .replace(/INT\s+AUTO_INCREMENT/gi, 'INTEGER')
        .replace(/INTEGER\s+AUTOINCREMENT/gi, 'INTEGER')
        // INT -> INTEGER
        .replace(/\bINT\b/gi, 'INTEGER')
        // VARCHAR(...) -> TEXT (SQLite không giới hạn length)
        .replace(/VARCHAR\(\d+\)/gi, 'TEXT')
        // CHARACTER SET và COLLATE
        .replace(/CHARACTER\s+SET\s+\w+/gi, '')
        .replace(/COLLATE\s+\w+/gi, '')
        // ENGINE
        .replace(/ENGINE\s*=\s*\w+/gi, '')
        // UNIQUE KEY
        .replace(/UNIQUE\s+KEY\s+`\w+`/gi, 'UNIQUE')
        // Foreign keys
        .replace(/ON\s+DELETE\s+SET\s+NULL/gi, '')
        .replace(/ON\s+UPDATE\s+CASCADE/gi, '')
        // Indexes trong CREATE TABLE - bỏ qua
        .replace(/,\s*INDEX\s+\w+\s*\([^)]+\)/gi, '')
        // TIMESTAMP -> DATETIME
        .replace(/TIMESTAMP/gi, 'DATETIME')
        .replace(/CURRENT_TIMESTAMP/gi, "datetime('now')")
        .replace(/CURRENT_DATETIME/gi, "datetime('now')")
        // TEXT types
        .replace(/LONGTEXT/gi, 'TEXT')
        .replace(/MEDIUMTEXT/gi, 'TEXT');
    
    // Fix INSERT ON DUPLICATE KEY UPDATE
    if (converted.match(/INSERT\s+INTO.*ON\s+DUPLICATE\s+KEY\s+UPDATE/i)) {
        // INSERT INTO table (col) VALUES (?) ON DUPLICATE KEY UPDATE col = value
        // -> INSERT OR REPLACE INTO table (col) VALUES (?)
        converted = converted.replace(
            /INSERT\s+INTO\s+(\w+)\s+\(([^)]+)\)\s+VALUES\s+\(([^)]+)\)\s+ON\s+DUPLICATE\s+KEY\s+UPDATE\s+.+/gi,
            'INSERT OR REPLACE INTO $1 ($2) VALUES ($3)'
        );
    }
    
    return converted;
}

// Hàm thực thi query không trả về kết quả
async function runQuery(sql, params = []) {
    // Chuyển undefined thành null
    const safeParams = params.map(param => param === undefined ? null : param);
    
    if (DB_TYPE === 'sqlite') {
        // SQLite
        const convertedSQL = convertSQLForSQLite(sql);
        
        // Nếu conversion trả về null, skip statement này
        if (convertedSQL === null) {
            return Promise.resolve({ affectedRows: 0 });
        }
        
        return new Promise((resolve, reject) => {
            db.run(convertedSQL, safeParams, function(err) {
                if (err) {
                    console.error('Lỗi khi thực thi query (SQLite):', {
                        sql: convertedSQL.substring(0, 200),
                        params: safeParams,
                        error: err.message
                    });
                    reject(err);
                } else {
                    resolve({ 
                        affectedRows: this.changes,
                        insertId: this.lastID
                    });
                }
            });
        });
    } else {
        // MySQL/MariaDB
        let connection;
        try {
            connection = await pool.getConnection();
            const [result] = await connection.execute(sql, safeParams);
            return result;
        } catch (error) {
            console.error('Lỗi khi thực thi query (MySQL):', {
                sql: sql.substring(0, 200),
                params: safeParams,
                error: error.message,
                code: error.code
            });
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
}

// Hàm thực thi query trả về kết quả
async function getQuery(sql, params = []) {
    // Chuyển undefined thành null
    const safeParams = params.map(param => param === undefined ? null : param);
    
    if (DB_TYPE === 'sqlite') {
        // SQLite
        const convertedSQL = convertSQLForSQLite(sql);
        
        // Nếu conversion trả về null, trả về empty array
        if (convertedSQL === null) {
            return Promise.resolve([]);
        }
        
        return new Promise((resolve, reject) => {
            db.all(convertedSQL, safeParams, (err, rows) => {
                if (err) {
                    console.error('Lỗi khi lấy dữ liệu (SQLite):', {
                        sql: convertedSQL.substring(0, 200),
                        params: safeParams,
                        error: err.message
                    });
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    } else {
        // MySQL/MariaDB
        let connection;
        try {
            connection = await pool.getConnection();
            const [rows] = await connection.execute(sql, safeParams);
            return rows;
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu (MySQL):', {
                sql: sql.substring(0, 200),
                params: safeParams,
                error: error.message,
                code: error.code
            });
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
}

// Hàm khởi tạo database
async function initDatabase() {
    try {
        if (DB_TYPE === 'sqlite') {
            console.log(`Đã kết nối thành công với SQLite: ${process.env.SQLITE_DB_PATH || './database/nihongo.sqlite'}`);
        } else {
            // Kiểm tra kết nối MySQL/MariaDB
            const connection = await pool.getConnection();
            console.log(`Đã kết nối thành công với ${DB_TYPE.toUpperCase()}`);
            connection.release();
        }

        // Tạo bảng nếu chưa tồn tại
        // Sử dụng schema khác nhau cho SQLite và MySQL
        const schemaFile = DB_TYPE === 'sqlite' 
            ? './database/schema.sqlite.sql' 
            : './database/schema.sql';
        
        const schema = fs.readFileSync(schemaFile, 'utf8');
        
        // Parse SQL statements
        const statements = schema
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => {
                // Bỏ qua câu lệnh rỗng
                if (!stmt) return false;
                // Bỏ qua comment-only lines
                if (stmt.startsWith('--')) return false;
                // Bỏ qua CREATE DATABASE và USE (chỉ cho MySQL)
                if (stmt.match(/^CREATE\s+DATABASE/i)) return false;
                if (stmt.match(/^USE\s+/i)) return false;
                
                return true;
            });
        
        for (const stmt of statements) {
            try {
                await runQuery(stmt);
                console.log('✓ Đã tạo table/index thành công');
            } catch (err) {
                // Bỏ qua lỗi "table already exists"
                const isTableExists = 
                    err.code === 'ER_TABLE_EXISTS_ERROR' || 
                    err.message?.includes('already exists');
                
                if (!isTableExists) {
                    console.error('❌ Lỗi SQL:', stmt.substring(0, 80) + '...');
                    console.error('Chi tiết:', err.message);
                    console.warn('⚠️  Bỏ qua và tiếp tục...');
                }
            }
        }
        
        console.log('Đã khởi tạo database thành công');
    } catch (error) {
        console.error('Lỗi khi khởi tạo database:', error.message);
        throw error;
    }
}

// Đóng kết nối database
function closeDatabase() {
    if (DB_TYPE === 'sqlite' && db) {
        db.close((err) => {
            if (err) {
                console.error('Lỗi khi đóng SQLite:', err.message);
            }
        });
    } else if (pool) {
        pool.end();
    }
}

module.exports = {
    runQuery,
    getQuery,
    initDatabase,
    closeDatabase,
    DB_TYPE
}; 