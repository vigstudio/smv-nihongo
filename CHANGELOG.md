# Changelog

Tất cả các thay đổi quan trọng của dự án sẽ được ghi lại trong file này.

Format dựa trên [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
và dự án này tuân theo [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Docker Compose support với MariaDB 11.2
- File `docker-compose.yml` cho production
- File `docker-compose.dev.yml` cho development environment
- phpMyAdmin và Adminer trong dev mode
- File `.dockerignore` để tối ưu Docker build
- File `ENV_SETUP.md` hướng dẫn cấu hình biến môi trường
- File `QUICK_START.md` hướng dẫn nhanh
- File `Makefile` với các lệnh tiện ích
- NPM scripts mới: `docker:*` và `db:*`
- Hướng dẫn chi tiết về Docker trong README

### Changed

- Chuyển từ SQLite sang MariaDB làm database chính
- Cập nhật hoàn toàn README.md với cấu trúc mới
- Cập nhật `.gitignore` để bao gồm các file Docker và backup
- Cải thiện package.json với nhiều scripts hơn

### Fixed

- Character encoding issues với utf8mb4
- Connection pooling trong db.js

## [1.0.0] - 2024-XX-XX

### Added

- Hệ thống học Hiragana và Katakana
- Game học chữ cái tương tác
- 50 bài học từ vựng từ Minna no Nihongo
- Game từ vựng với nhiều chế độ
- Hệ thống đăng ký/đăng nhập
- Bảng xếp hạng và thống kê
- Phát âm chuẩn cho từng từ vựng
- Video hướng dẫn viết chữ
- Responsive design với Bootstrap 5

### Technical

- Backend: Node.js + Express.js
- Database: MariaDB với mysql2 driver
- Template engine: EJS
- Session management với express-session
- Password hashing với bcryptjs
- Database connection pooling

---

## Types of Changes

- `Added` - Tính năng mới
- `Changed` - Thay đổi trong tính năng hiện có
- `Deprecated` - Tính năng sắp bị loại bỏ
- `Removed` - Tính năng đã bị loại bỏ
- `Fixed` - Bug fixes
- `Security` - Các bản vá bảo mật
