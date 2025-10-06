# 📦 Tóm Tắt Các Thay Đổi - Docker & MariaDB Migration

## 🎯 Tổng Quan

Dự án SMV Nihongo đã được cập nhật để:

- ✅ Chuyển từ **SQLite** sang **MariaDB**
- ✅ Tích hợp **Docker Compose** cho development và production
- ✅ Cải thiện documentation và workflow
- ✅ Thêm nhiều công cụ hỗ trợ development

---

## 📝 Các File Mới

### 1. Docker Configuration

#### `docker-compose.yml` ⭐

File cấu hình Docker Compose chính cho production:

- MariaDB 11.2 với utf8mb4 encoding
- Health checks tự động
- Persistent volumes để lưu trữ dữ liệu
- Network isolation

#### `docker-compose.dev.yml`

File cấu hình mở rộng cho development:

- phpMyAdmin (http://localhost:8080) - Web UI quản lý database
- Adminer (http://localhost:8081) - Alternative DB manager
- Redis (commented) - Sẵn sàng cho cache

#### `.dockerignore`

Ignore các file không cần thiết khi build Docker image:

- node_modules
- logs
- .env files
- git files

### 2. Documentation

#### `README.md` ⭐ (Viết lại hoàn toàn)

README mới với cấu trúc chuyên nghiệp:

- 📑 Mục lục chi tiết
- 🌟 Giới thiệu tính năng
- 🛠 Công nghệ sử dụng (MariaDB thay vì SQLite)
- 🚀 2 phương án cài đặt: Docker (khuyến nghị) và Thủ công
- 📁 Cấu trúc dự án chi tiết
- ⚙️ Hướng dẫn cấu hình
- 📜 Scripts và commands hữu ích
- 🐛 Troubleshooting
- 🤝 Hướng dẫn đóng góp
- 📊 Roadmap tương lai

#### `QUICK_START.md`

Hướng dẫn nhanh 5 phút để chạy dự án:

- ⚡ Setup nhanh với Docker
- 🎯 Các bước đăng ký và sử dụng
- 📋 Lệnh thường dùng
- 🛠 Troubleshooting cơ bản

#### `ENV_SETUP.md`

Hướng dẫn chi tiết về biến môi trường:

- 📝 Cấu trúc file .env
- 💡 Giải thích từng biến
- 🔒 Best practices bảo mật
- 💻 Scripts tạo file tự động

#### `DOCKER_GUIDE.md`

Hướng dẫn Docker chuyên sâu:

- 🐳 Cài đặt Docker trên mọi OS
- 📋 Các lệnh Docker thường dùng
- 🔧 Troubleshooting Docker
- 🚀 Production deployment
- 💾 Backup và restore
- 🔍 Advanced commands

#### `CONTRIBUTING.md`

Hướng dẫn đóng góp chi tiết:

- 📋 Code of Conduct
- 🔄 Quy trình đóng góp
- 📝 Coding standards
- ✍️ Commit message conventions
- 🔍 Code review process
- 🐛 Bug report template
- ✨ Feature request template

#### `CHANGELOG.md`

Theo dõi các thay đổi của dự án:

- [Unreleased] - Docker và MariaDB migration
- [1.0.0] - Phiên bản đầu tiên
- Format theo Keep a Changelog standard

### 3. Development Tools

#### `Makefile` ⭐

Tập hợp commands tiện lợi:

**Setup Commands:**

```bash
make install         # Cài đặt dependencies
make setup          # Setup hoàn chỉnh (Docker + DB)
make dev-setup      # Setup dev (Docker + phpMyAdmin + DB)
```

**Docker Commands:**

```bash
make docker-up      # Khởi động Docker services
make docker-up-dev  # Khởi động với dev tools
make docker-down    # Dừng Docker services
make restart        # Restart services
make logs          # Xem logs MariaDB
make status        # Kiểm tra trạng thái
```

**Database Commands:**

```bash
make shell         # Truy cập MariaDB shell
make shell-root    # Truy cập với quyền root
make db-init       # Khởi tạo database
make db-reset      # Reset database (xóa và tạo lại)
make backup        # Backup database
make restore       # Restore từ backup
```

**Utility Commands:**

```bash
make help          # Hiển thị tất cả commands
make info          # Thông tin hệ thống
make check-env     # Kiểm tra file .env
make clean         # Dọn dẹp node_modules
make clean-all     # Dọn dẹp toàn bộ
```

### 4. Updated Files

#### `package.json`

Thêm scripts mới:

```json
{
  "start": "node app.js",
  "dev": "nodemon app.js",
  "docker:up": "docker-compose up -d",
  "docker:down": "docker-compose down",
  "docker:logs": "docker-compose logs -f mariadb",
  "docker:restart": "docker-compose restart mariadb",
  "docker:shell": "docker-compose exec mariadb mysql...",
  "db:init": "node database/init.js",
  "db:backup": "docker-compose exec mariadb mysqldump..."
}
```

#### `.gitignore`

Cập nhật để bao gồm:

- Docker volumes
- Backup files (\*.sql.backup)
- Environment files (.env\*)
- Temporary files

---

## 🔧 Thay Đổi Kỹ Thuật

### Database Migration

#### Trước (SQLite)

```javascript
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.db");
```

#### Sau (MariaDB)

```javascript
const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4", // Hỗ trợ full Unicode
});
```

### Lợi Ích của MariaDB

✅ **Performance**: Nhanh hơn với dataset lớn  
✅ **Scalability**: Dễ scale horizontal  
✅ **Full Unicode**: utf8mb4 hỗ trợ emoji và ký tự đặc biệt  
✅ **ACID**: Transaction đầy đủ  
✅ **Concurrent**: Hỗ trợ nhiều connection đồng thời  
✅ **Tools**: Nhiều tools quản lý (phpMyAdmin, Adminer)  
✅ **Production Ready**: Phù hợp cho production

---

## 🚀 Cách Sử Dụng

### Option 1: Makefile (Khuyến nghị) ⭐

```bash
# Setup hoàn chỉnh trong 1 lệnh
make dev-setup

# Hoặc từng bước
make install
make docker-up-dev
make db-init

# Chạy app
make dev
```

### Option 2: NPM Scripts

```bash
# Cài đặt
npm install

# Khởi động Docker
npm run docker:up

# Khởi tạo database
npm run db:init

# Chạy app
npm start
# hoặc
npm run dev
```

### Option 3: Manual Commands

```bash
# Cài đặt
npm install

# Docker
docker-compose up -d

# Wait for MariaDB
sleep 10

# Database
node database/init.js

# Run
node app.js
```

---

## 📊 So Sánh Workflow

### Trước (SQLite)

```bash
git clone repo
cd repo
npm install
node database/init.js  # Tạo file .db
npm start
```

**Vấn đề:**

- ❌ SQLite giới hạn về performance
- ❌ Không phù hợp production
- ❌ Khó scale
- ❌ Ít tools hỗ trợ

### Sau (MariaDB + Docker)

```bash
git clone repo
cd repo
make dev-setup     # All in one!
make dev
```

**Lợi ích:**

- ✅ MariaDB production-ready
- ✅ Docker isolate environment
- ✅ Dễ setup và maintain
- ✅ Tools phong phú (phpMyAdmin, Adminer)
- ✅ Documentation chi tiết

---

## 🔗 Quick Links

| Resource         | URL                                | Mô Tả                  |
| ---------------- | ---------------------------------- | ---------------------- |
| **Application**  | http://localhost:9113              | Ứng dụng chính         |
| **phpMyAdmin**   | http://localhost:8080              | DB Manager (dev mode)  |
| **Adminer**      | http://localhost:8081              | Alternative DB Manager |
| **Main README**  | [README.md](README.md)             | Documentation đầy đủ   |
| **Quick Start**  | [QUICK_START.md](QUICK_START.md)   | Hướng dẫn nhanh        |
| **Docker Guide** | [DOCKER_GUIDE.md](DOCKER_GUIDE.md) | Docker chi tiết        |
| **Contributing** | [CONTRIBUTING.md](CONTRIBUTING.md) | Hướng dẫn đóng góp     |

---

## 🎓 Tài Nguyên Học Tập

### Docker

- [Docker Docs](https://docs.docker.com/)
- [Docker Compose Docs](https://docs.docker.com/compose/)

### MariaDB

- [MariaDB Docs](https://mariadb.org/documentation/)
- [MariaDB vs MySQL](https://mariadb.com/kb/en/mariadb-vs-mysql-features/)

### Node.js + MySQL

- [mysql2 Package](https://www.npmjs.com/package/mysql2)
- [Connection Pooling](https://github.com/sidorares/node-mysql2#using-connection-pools)

---

## 🐛 Troubleshooting Nhanh

### Port đã được sử dụng?

```bash
# Đổi port trong .env
DB_PORT=3307
PORT=9114
```

### Không kết nối được database?

```bash
make logs           # Xem logs
make docker-restart # Restart MariaDB
```

### Cần reset database?

```bash
make db-reset
make db-init
```

### Muốn xem database?

```bash
# Terminal
make shell

# Web UI (dev mode)
make docker-up-dev
# Mở http://localhost:8080
```

---

## ✅ Checklist Migration

Khi migrate từ SQLite sang MariaDB setup mới:

- [x] Cài đặt Docker Desktop
- [x] Clone repository
- [x] Tạo file .env (xem ENV_SETUP.md)
- [x] Chạy `make dev-setup`
- [x] Test ứng dụng tại http://localhost:9113
- [x] Test phpMyAdmin tại http://localhost:8080
- [x] Đọc README.md để hiểu đầy đủ tính năng

---

## 📞 Support

Gặp vấn đề?

1. **Đọc documentation**: README, QUICK_START, DOCKER_GUIDE
2. **Search Issues**: [GitHub Issues](https://github.com/vigstudio/smv-nihongo/issues)
3. **Tạo Issue mới**: Cung cấp thông tin chi tiết
4. **Email**: Contact maintainers

---

## 🎉 Kết Luận

Dự án đã được modernize với:

- 🐳 Docker containerization
- 🗄️ MariaDB database
- 📚 Documentation chuyên nghiệp
- 🛠️ Development tools mạnh mẽ
- 🚀 Production ready

**Chúc bạn phát triển vui vẻ! がんばって！🎌**

---

<div align="center">

Made with ❤️ by [VigStudio](https://github.com/vigstudio)

**⭐ Nếu thấy hữu ích, hãy star repo này!**

</div>
