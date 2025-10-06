-- Tạo bảng migrations_log để theo dõi các migration đã chạy (SQLite version)
CREATE TABLE IF NOT EXISTS migrations_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    migration_name TEXT NOT NULL UNIQUE,
    executed_at DATETIME DEFAULT(datetime('now'))
);