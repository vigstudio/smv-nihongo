const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { runQuery, DB_TYPE } = require('./database/db');

// Cài đặt dependencies
console.log('--- Cài đặt dependencies ---');
try {
    execSync('npm install bcrypt express express-session mysql2 dotenv', { stdio: 'inherit' });
    console.log('Đã cài đặt dependencies thành công!');
} catch (error) {
    console.error('Lỗi khi cài đặt dependencies:', error.message);
    process.exit(1);
}

async function runSqlFile(filePath) {
    const sql = fs.readFileSync(filePath, 'utf8');
    // Tách các câu lệnh SQL bằng dấu chấm phẩy
    const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);
    for (const stmt of statements) {
        try {
            await runQuery(stmt);
            console.log('Đã thực thi:', stmt.split('\n')[0]);
        } catch (err) {
            // Bỏ qua lỗi duplicate key
            if (err.code === 'ER_DUP_KEYNAME' || err.code === 'ER_DUP_ENTRY') {
                console.log('Đã bỏ qua:', stmt.split('\n')[0]);
                continue;
            }
            console.error('Lỗi khi thực thi:', stmt.split('\n')[0], err.message);
        }
    }
}

async function getExecutedMigrations() {
    try {
        const result = await runQuery('SELECT migration_name FROM migrations_log');
        // Kiểm tra và xử lý kết quả
        if (result && Array.isArray(result)) {
            return result.map(row => row.migration_name);
        }
        return [];
    } catch (err) {
        // Nếu bảng migrations_log chưa tồn tại, trả về mảng rỗng
        if (err.code === 'ER_NO_SUCH_TABLE') {
            return [];
        }
        throw err;
    }
}

async function logMigration(migrationName) {
    try {
        // Dùng syntax khác nhau cho SQLite và MySQL
        const sql = DB_TYPE === 'sqlite'
            ? 'INSERT OR REPLACE INTO migrations_log (migration_name, executed_at) VALUES (?, datetime(\'now\'))'
            : 'INSERT INTO migrations_log (migration_name) VALUES (?) ON DUPLICATE KEY UPDATE executed_at = CURRENT_TIMESTAMP';
        
        await runQuery(sql, [migrationName]);
    } catch (err) {
        console.error(`Lỗi khi ghi log migration ${migrationName}:`, err.message);
    }
}

async function main() {
    try {
        console.log('--- Tạo bảng database ---');
        // Dùng schema khác nhau cho SQLite và MySQL
        const schemaFile = DB_TYPE === 'sqlite' ? 'schema.sqlite.sql' : 'schema.sql';
        await runSqlFile(path.join(__dirname, 'database', schemaFile));
        
        // Chạy migrate SQL
        console.log('--- Chạy migrations ---');
        const migrationsDir = path.join(__dirname, 'migrations');
        
        // Lọc migration files theo DB type
        const migrationFiles = fs.readdirSync(migrationsDir)
            .filter(file => {
                if (DB_TYPE === 'sqlite') {
                    // Ưu tiên .sqlite.sql, fallback to .sql
                    return file.endsWith('.sqlite.sql') || file.endsWith('.sql');
                }
                // MySQL/MariaDB: chỉ dùng .sql không phải .sqlite.sql
                return file.endsWith('.sql') && !file.endsWith('.sqlite.sql');
            })
            .sort();

        // Chạy migration tạo bảng migrations_log trước (nếu chưa có trong schema)
        const migrationsLogFile = DB_TYPE === 'sqlite' 
            ? migrationFiles.find(f => f === '003_create_migrations_log.sqlite.sql')
            : migrationFiles.find(f => f === '003_create_migrations_log.sql');
        
        if (migrationsLogFile) {
            console.log(`Đang chạy migration: ${migrationsLogFile}`);
            await runSqlFile(path.join(migrationsDir, migrationsLogFile));
            await logMigration(migrationsLogFile);
        }

        // Lấy danh sách migration đã chạy
        const executedMigrations = await getExecutedMigrations();

        // Chạy các migration còn lại
        for (const file of migrationFiles) {
            if (file === '003_create_migrations_log.sql') continue; // Bỏ qua vì đã chạy
            // Kiểm tra nếu migration chưa được chạy
            if (!executedMigrations.includes(file)) {
                console.log(`Đang chạy migration: ${file}`);
                await runSqlFile(path.join(migrationsDir, file));
                await logMigration(file);
            } else {
                console.log(`Đã bỏ qua migration đã chạy: ${file}`);
            }
        }

        console.log('--- Seed dữ liệu từ vựng ---');
        // Xóa dữ liệu cũ
        await runQuery('DELETE FROM vocabulary');
        
        // Import từng file lesson
        const lessonsDir = path.join(__dirname, 'database', 'seed', 'lessons');
        const lessonFiles = fs.readdirSync(lessonsDir)
            .filter(file => file.startsWith('lesson') && file.endsWith('.sql'))
            .sort((a, b) => {
                const numA = parseInt(a.replace('lesson', '').replace('.sql', ''));
                const numB = parseInt(b.replace('lesson', '').replace('.sql', ''));
                return numA - numB;
            });

        for (const file of lessonFiles) {
            console.log(`Đang import ${file}...`);
            await runSqlFile(path.join(lessonsDir, file));
        }
        
        console.log('--- Hoàn thành cài đặt! ---');
        process.exit(0);
    } catch (error) {
        console.error('Lỗi trong quá trình cài đặt:', error);
        process.exit(1);
    }
}

main(); 