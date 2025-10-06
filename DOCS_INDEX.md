# 📚 Chỉ Mục Tài Liệu - SMV Nihongo

Danh sách đầy đủ tất cả tài liệu trong dự án.

---

## 🎯 Bắt Đầu Nhanh

### Cho Người Mới

1. **[QUICK_START.md](QUICK_START.md)** ⚡ - **BẮT ĐẦU TẠI ĐÂY**

   - Setup trong 5 phút
   - Các lệnh cơ bản
   - Troubleshooting nhanh

2. **[UPDATES_SUMMARY.md](UPDATES_SUMMARY.md)** 📦
   - Tóm tắt những thay đổi mới
   - So sánh SQLite vs MariaDB
   - Quick links và checklists

### Cho Developers

3. **[README.md](README.md)** 📖 - **TÀI LIỆU CHÍNH**
   - Giới thiệu dự án đầy đủ
   - Tính năng chi tiết
   - 2 phương án cài đặt
   - Cấu trúc dự án
   - Roadmap

---

## 🛠 Cài Đặt & Cấu Hình

### Docker

4. **[DOCKER_GUIDE.md](DOCKER_GUIDE.md)** 🐳
   - Cài đặt Docker trên mọi OS
   - Docker Compose chi tiết
   - Các lệnh thường dùng
   - Troubleshooting Docker
   - Production deployment
   - Backup & restore strategies

### Environment

5. **[ENV_SETUP.md](ENV_SETUP.md)** ⚙️
   - Tạo file .env
   - Giải thích từng biến môi trường
   - Scripts tạo file tự động
   - Best practices bảo mật

---

## 👥 Đóng Góp

### Hướng Dẫn

6. **[CONTRIBUTING.md](CONTRIBUTING.md)** 🤝
   - Quy trình đóng góp
   - Coding standards
   - Commit conventions
   - Pull request process
   - Bug report template
   - Feature request template

### Lịch Sử

7. **[CHANGELOG.md](CHANGELOG.md)** 📝
   - Lịch sử các thay đổi
   - Version history
   - Upcoming features

---

## 📋 Quick Reference

### Makefile Commands

```bash
make help           # Xem tất cả lệnh
make dev-setup      # Setup development (all-in-one)
make start          # Chạy ứng dụng
make dev            # Chạy với auto-reload
make docker-up-dev  # Khởi động Docker + tools
make logs           # Xem logs
make shell          # Truy cập database
make backup         # Backup database
```

### NPM Scripts

```bash
npm start               # Chạy app
npm run dev            # Development mode
npm run docker:up      # Khởi động Docker
npm run docker:down    # Dừng Docker
npm run db:init        # Khởi tạo database
npm run db:backup      # Backup database
```

### Docker Commands

```bash
docker-compose up -d                    # Khởi động
docker-compose down                     # Dừng
docker-compose logs -f mariadb         # Xem logs
docker-compose ps                       # Trạng thái
docker-compose exec mariadb mysql ...  # Truy cập DB
```

---

## 🗂 Tổ Chức File

### Root Level

```
├── README.md                 # Tài liệu chính ⭐
├── QUICK_START.md           # Hướng dẫn nhanh ⚡
├── DOCS_INDEX.md            # File này 📚
├── UPDATES_SUMMARY.md       # Tóm tắt updates 📦
├── DOCKER_GUIDE.md          # Docker chi tiết 🐳
├── ENV_SETUP.md             # Setup môi trường ⚙️
├── CONTRIBUTING.md          # Hướng dẫn đóng góp 🤝
├── CHANGELOG.md             # Lịch sử thay đổi 📝
├── Makefile                 # Commands tiện ích 🔧
├── docker-compose.yml       # Docker config chính
├── docker-compose.dev.yml   # Docker config dev
├── .dockerignore           # Docker ignore rules
├── .gitignore              # Git ignore rules
└── package.json            # Node.js config
```

### Source Code

```
├── app.js                   # Entry point
├── controllers/             # Business logic
├── database/               # DB và migrations
│   ├── db.js              # MariaDB connection pool
│   ├── init.js            # Initialize DB
│   ├── schema.sql         # Database schema
│   └── seed/              # Seed data (50 lessons)
├── middleware/             # Express middleware
├── routes/                 # Route handlers
├── views/                  # EJS templates
├── public/                 # Static files
│   ├── css/
│   ├── js/
│   ├── audio/             # 50 bài audio
│   └── assets/            # Images & videos
└── scripts/                # Utility scripts
```

---

## 🔍 Tìm Nhanh Theo Chủ Đề

### Tôi muốn...

#### ... Setup dự án lần đầu

➡️ [QUICK_START.md](QUICK_START.md) → [ENV_SETUP.md](ENV_SETUP.md)

#### ... Hiểu về Docker

➡️ [DOCKER_GUIDE.md](DOCKER_GUIDE.md)

#### ... Đóng góp code

➡️ [CONTRIBUTING.md](CONTRIBUTING.md) → [README.md](README.md) (Cấu trúc dự án)

#### ... Fix lỗi

➡️ [README.md](README.md) (Troubleshooting) → [DOCKER_GUIDE.md](DOCKER_GUIDE.md) (Docker issues)

#### ... Deploy production

➡️ [README.md](README.md) (Cấu hình) → [DOCKER_GUIDE.md](DOCKER_GUIDE.md) (Production)

#### ... Backup database

➡️ [DOCKER_GUIDE.md](DOCKER_GUIDE.md) (Backup section) hoặc `make backup`

#### ... Tìm hiểu features

➡️ [README.md](README.md) (Tính năng) → [UPDATES_SUMMARY.md](UPDATES_SUMMARY.md)

#### ... Xem thay đổi gần đây

➡️ [UPDATES_SUMMARY.md](UPDATES_SUMMARY.md) → [CHANGELOG.md](CHANGELOG.md)

---

## 📖 Reading Order

### Người Dùng Mới (User Journey)

```
1. README.md (Overview)
   ↓
2. QUICK_START.md (Setup ngay)
   ↓
3. ENV_SETUP.md (Config .env)
   ↓
4. Bắt đầu sử dụng!
   ↓
5. DOCKER_GUIDE.md (Khi cần hiểu sâu)
```

### Developer Journey

```
1. README.md (Full overview)
   ↓
2. UPDATES_SUMMARY.md (Biết những gì mới)
   ↓
3. DOCKER_GUIDE.md (Understand infrastructure)
   ↓
4. ENV_SETUP.md (Config)
   ↓
5. CONTRIBUTING.md (Trước khi code)
   ↓
6. Code & contribute!
   ↓
7. CHANGELOG.md (Document changes)
```

---

## 🎯 Use Cases

### Case 1: Tôi là học viên muốn dùng app

```
QUICK_START.md → Làm theo 8 bước → Xong!
```

### Case 2: Tôi là developer muốn contribute

```
README.md → CONTRIBUTING.md → Setup → Code → PR
```

### Case 3: Tôi muốn deploy production

```
README.md → DOCKER_GUIDE.md (Production) → ENV_SETUP.md (Security) → Deploy
```

### Case 4: Tôi gặp lỗi

```
README.md (Troubleshooting) → DOCKER_GUIDE.md → Search Issues → Tạo Issue
```

### Case 5: Tôi muốn customize

```
README.md (Cấu trúc) → Source code → ENV_SETUP.md → Customize
```

---

## 🌟 Tài Liệu Nổi Bật

| Tài Liệu            | Độ Ưu Tiên | Dành Cho       | Thời Gian Đọc |
| ------------------- | ---------- | -------------- | ------------- |
| **QUICK_START**     | 🔥🔥🔥     | Mọi người      | 5 phút        |
| **README**          | 🔥🔥🔥     | Mọi người      | 15 phút       |
| **DOCKER_GUIDE**    | 🔥🔥       | Developers     | 20 phút       |
| **CONTRIBUTING**    | 🔥🔥       | Contributors   | 15 phút       |
| **UPDATES_SUMMARY** | 🔥         | Existing users | 5 phút        |
| **ENV_SETUP**       | 🔥         | Setup only     | 5 phút        |
| **CHANGELOG**       | 📊         | Reference      | 2 phút        |

---

## 💡 Tips

### Cho Người Mới

- ✅ Bắt đầu với QUICK_START.md
- ✅ Không cần đọc hết tất cả
- ✅ Đọc theo use case của bạn
- ✅ Bookmark docs này để tra cứu

### Cho Developers

- ✅ Đọc CONTRIBUTING.md trước khi code
- ✅ Follow coding standards
- ✅ Update CHANGELOG.md khi có changes
- ✅ Reference docs trong code comments

### Cho Maintainers

- ✅ Giữ docs updated
- ✅ Review PR cả code lẫn docs
- ✅ Encourage documentation
- ✅ Link docs trong Issues/PRs

---

## 🔗 External Resources

### Docker

- [Official Docker Docs](https://docs.docker.com/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

### MariaDB

- [MariaDB Documentation](https://mariadb.org/documentation/)
- [MariaDB Knowledge Base](https://mariadb.com/kb/en/)
- [MySQL2 Package](https://www.npmjs.com/package/mysql2)

### Node.js

- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [EJS Documentation](https://ejs.co/)
- [npm Scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts)

### Learning Japanese

- [Minna no Nihongo](http://www.3anet.co.jp/np/en/books/3300/)
- [Hiragana Chart](https://www.nhk.or.jp/lesson/en/letters/hiragana.html)
- [Katakana Chart](https://www.nhk.or.jp/lesson/en/letters/katakana.html)

---

## 📞 Cần Giúp Đỡ?

1. **Tìm trong docs** - Ctrl+F trong file tương ứng
2. **Search GitHub Issues** - Có thể đã có người hỏi
3. **Tạo Issue mới** - Với label `question`
4. **Email maintainers** - Cho vấn đề riêng tư

---

## ✅ Documentation Checklist

Khi thêm tính năng mới:

- [ ] Cập nhật README.md
- [ ] Thêm vào CHANGELOG.md
- [ ] Update QUICK_START.md nếu ảnh hưởng setup
- [ ] Add examples trong CONTRIBUTING.md nếu cần
- [ ] Comment code rõ ràng
- [ ] Create/update relevant docs

---

<div align="center">

## 🎉 Happy Learning & Coding!

**がんばって！🎌**

[⬆ Back to Top](#-chỉ-mục-tài-liệu---smv-nihongo)

</div>
