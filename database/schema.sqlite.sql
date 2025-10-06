-- SQLite Schema cho Nihongo Learning Website

-- Bảng users
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fullname TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT UNIQUE,
    created_at DATETIME DEFAULT(datetime('now'))
);

-- Bảng vocabulary
CREATE TABLE IF NOT EXISTS vocabulary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson INTEGER DEFAULT NULL,
    word TEXT NOT NULL,
    romaji TEXT,
    audio TEXT,
    type TEXT DEFAULT NULL,
    kanji TEXT,
    kanji_reading TEXT,
    meaning TEXT NOT NULL,
    created_at DATETIME DEFAULT(datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_vocabulary_lesson ON vocabulary (lesson);

-- Bảng grammar
CREATE TABLE IF NOT EXISTS grammar (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    example TEXT,
    created_at DATETIME DEFAULT(datetime('now'))
);

-- Bảng game_scores
CREATE TABLE IF NOT EXISTS game_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    game_type TEXT NOT NULL,
    score INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    wrong_answers INTEGER NOT NULL,
    max_combo INTEGER NOT NULL,
    level INTEGER NOT NULL,
    created_at DATETIME DEFAULT(datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE INDEX IF NOT EXISTS idx_game_scores_user ON game_scores (user_id);

CREATE INDEX IF NOT EXISTS idx_game_scores_type ON game_scores (game_type);

-- Bảng user_statistics
CREATE TABLE IF NOT EXISTS user_statistics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    last_login DATETIME,
    total_games_played INTEGER DEFAULT 0,
    total_vocabulary_learned INTEGER DEFAULT 0,
    total_time_spent INTEGER DEFAULT 0,
    average_score REAL DEFAULT 0,
    updated_at DATETIME DEFAULT(datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_statistics_user ON user_statistics (user_id);

-- Bảng access_logs
CREATE TABLE IF NOT EXISTS access_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    ip_address TEXT,
    accessed_at DATETIME DEFAULT(datetime('now')),
    page_accessed TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE INDEX IF NOT EXISTS idx_access_logs_user ON access_logs (user_id);

CREATE INDEX IF NOT EXISTS idx_access_logs_date ON access_logs (accessed_at);

-- Bảng migrations_log để theo dõi migrations
CREATE TABLE IF NOT EXISTS migrations_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    migration_name TEXT NOT NULL UNIQUE,
    executed_at DATETIME DEFAULT(datetime('now'))
);