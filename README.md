# 📚 SMV Nihongo - Tài Liệu Hoàn Chỉnh 🎌

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-14.x+-brightgreen.svg)
![MariaDB](https://img.shields.io/badge/MariaDB-11.2-blue.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)

SMV Nihongo là một ứng dụng web hiện đại giúp người học tiếng Nhật tiếp cận ngôn ngữ này một cách thú vị và hiệu quả, dựa trên giáo trình **Minna no Nihongo** nổi tiếng.

---

## 📑 Mục Lục

- [🚀 Hướng Dẫn Nhanh (5 phút)](#-hướng-dẫn-nhanh-5-phút)
- [🌟 Tính Năng Nổi Bật](#-tính-năng-nổi-bật)
- [🛠 Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [💻 Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [🔧 Cài Đặt Chi Tiết](#-cài-đặt-chi-ti[object Object]ocker Guide](#-docker-guide)
- [⚙️ Cấu Hình Environment](#️-cấu-hình-environment)
- [📁 Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [🤝 Đóng Góp](#-đóng-góp[object Object]uction Deployment](#-production-deployment)
- [📊 SEO & Marketing](#-seo--marketing)
- [🐛 Troubleshooting](#-troubleshooting)
- [📝 Changelog](#-changelog)

---

## 🚀 Hướng Dẫn Nhanh (5 phút)

### Bước 1: Cài đặt Docker
- **Windows/Mac**: Tải [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux**: `curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh`

### Bước 2: Clone dự án
```bash
git clone https://github.com/vigstudio/smv-nihongo.git
cd smv-nihongo
```

### Bước 3: Tạo file .env
```bash
# Linux/macOS
cat > .env << 'EOF'
DB_HOST=localhost
DB_PORT=3306
DB_USER=nihongo_user
DB_PASSWORD=nihongo123
DB_NAME=nihongo
DB_ROOT_PASSWORD=rootpassword
PORT=9113
NODE_ENV=development
SESSION_SECRET=smv-nihongo-secret-key-change-this-in-production
EOF
```

### Bước 4-8: Khởi động
```bash
# Khởi động MariaDB
docker-compose up -d

# Cài đặt dependencies
npm install

# Khởi tạo database
node database/init.js

# Chạy ứng dụng
npm start
```

### Truy cập: http://localhost:9113

---

## 🌟 Tính Năng Nổi Bật

### 📚 Học Tập Tương Tác
- **Học Bảng Chữ Cái**: Hệ thống học Hiragana và Katakana đầy đủ với hình ảnh minh họa và video hướng dẫn viết
- **Game Học Chữ**: Trò chơi tương tác giúp ghi nhớ bảng chữ cái hiệu quả
- **Học Từ Vựng Theo Bài**: 50 bài học từ giáo trình Minna no Nihongo với phát âm chuẩn
- **Game Từ Vựng**: Mini-game thú vị với nhiều chế độ: flashcard, matching, quiz

### 🏆 Hệ Thống Động Lực
- **Bảng Xếp Hạng**: Theo dõi tiến độ cá nhân và so sánh với người học khác
- **Hệ Thống Điểm**: Tích lũy điểm qua các hoạt động học tập

### 👤 Quản Lý Tài Khoản
- Đăng ký và đăng nhập an toàn
- Theo dõi lịch sử học tập
- Tùy chỉnh trải nghiệm học tập

---

## 🛠 Công Nghệ Sử Dụng

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MariaDB** - Hệ quản trị cơ sở dữ liệu quan hệ
- **mysql2** - Driver kết nối MariaDB
- **bcryptjs** - Mã hóa mật khẩu

### Frontend
- **EJS** - Template engine
- **Bootstrap 5** - UI framework
- **Chart.js** - Thư viện biểu đồ
- **jQuery** - JavaScript library

### DevOps
- **Docker & Docker Compose** - Containerization
- **dotenv** - Quản lý biến môi trường

---

## 💻 Yêu Cầu Hệ Thống

### Phương Án Docker (Khuyến nghị)
- Docker Desktop hoặc Docker Engine (phiên bản mới nhất)
- Docker Compose V2
- Node.js 14.x trở lên
- 2GB RAM trở lên
- 2GB dung lượng ổ cứng trống

### Phương Án Thủ Công
- Node.js 14.x trở lên
- MariaDB 11.x hoặc MySQL 8.x
- npm hoặc yarn
- Trình duyệt web hiện đại (Chrome, Firefox, Edge, Safari)

---

## 🔧 Cài Đặt Chi Tiết

### Phương Án 1: Sử Dụng Docker (Khuyến nghị)

#### 1. Clone repository
```bash
git clone https://github.com/vigstudio/smv-nihongo.git
cd smv-nihongo
```

#### 2. Cấu hình biến môi trường
```bash
# Copy file cấu hình mẫu
cp .env.example .env
# Chỉnh sửa file .env nếu cần (tùy chọn)
```

#### 3. Khởi động MariaDB với Docker Compose
```bash
# Khởi động database
docker-compose up -d
# Kiểm tra trạng thái
docker-compose ps
```

#### 4. Cài đặt dependencies và khởi tạo
```bash
npm install
node database/init.js
npm start
```

#### 5. Truy cập ứng dụng
Mở trình duyệt và truy cập: **http://localhost:9113**

### Phương Án 2: Cài Đặt Thủ Công

#### 1. Cài đặt MariaDB
**Windows**: Tải MariaDB từ [mariadb.org](https://mariadb.org/download/)
**macOS**: `brew install mariadb && brew services start mariadb`
**Linux**: `sudo apt update && sudo apt install mariadb-server`

#### 2. Tạo database và user
```sql
CREATE DATABASE nihongo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nihongo_user'@'localhost' IDENTIFIED BY 'nihongo123';
GRANT ALL PRIVILEGES ON nihongo.* TO 'nihongo_user'@'localhost';
FLUSH PRIVILEGES;
```

#### 3. Clone và cấu hình dự án
```bash
git clone https://github.com/vigstudio/smv-nihongo.git
cd smv-nihongo
cp .env.example .env
# Chỉnh sửa file .env với thông tin database
npm install
node database/init.js
npm start
```

---

## 🐳 Docker Guide

### Lợi Ích Docker
✅ **Dễ dàng setup**: Không cần cài MariaDB trực tiếp  
✅ **Nhất quán**: Môi trường giống nhau trên mọi máy  
✅ **Cách ly**: Database chạy trong container riêng  
✅ **Dễ xóa**: Xóa container không ảnh hưởng hệ thống

### Docker Compose Files

#### `docker-compose.yml` (Production)
- MariaDB 11.2 với utf8mb4 encoding
- Health checks tự động
- Persistent volumes để lưu trữ dữ liệu

#### `docker-compose.dev.yml` (Development)
- phpMyAdmin (http://localhost:8080) - Web UI quản lý database
- Adminer (http://localhost:8081) - Alternative DB manager

### Các Lệnh Docker Thường Dùng
```bash
# Xem logs MariaDB
docker-compose logs -f mariadb

# Restart MariaDB
docker-compose restart mariadb

# Truy cập MariaDB shell
docker-compose exec mariadb mysql -u nihongo_user -p

# Backup database
docker-compose exec mariadb mysqldump -u root -p nihongo > backup.sql

# Dừng và xóa container
docker-compose down
```

---

## ⚙️ Cấu Hình Environment

### File .env Configuration

Website hỗ trợ 3 loại database: **MariaDB**, **MySQL**, hoặc **SQLite**.

#### Option 1: MariaDB (Khuyến nghị cho Production)
```env
# Database Configuration
DB_TYPE=mariadb
DB_HOST=localhost
DB_PORT=3306
DB_USER=nihongo_user
DB_PASSWORD=nihongo123
DB_NAME=nihongo
DB_ROOT_PASSWORD=rootpassword

# Application Configuration
PORT=9113
NODE_ENV=development

# SEO Configuration
SITE_URL=http://localhost:9113
FB_APP_ID=
TWITTER_HANDLE=@smv_nihongo

# Session Secret
SESSION_SECRET=smv-nihongo-secret-key-change-this-in-production
```

#### Option 2: SQLite (Khuyến nghị cho Development)
```env
DB_TYPE=sqlite
DB_PATH=./database/nihongo.sqlite
PORT=9113
NODE_ENV=development
SESSION_SECRET=smv-nihongo-secret-key-change-this-in-production
```

### Biến Môi Trường Chi Tiết

| Biến | Mô Tả | Giá Trị Mặc Định |
|------|-------|------------------|
| DB_TYPE | Loại database (mariadb/mysql/sqlite) | mariadb |
| DB_HOST | Host database | localhost |
| DB_PORT | Port database | 3306 |
| DB_USER | Username database | nihongo_user |
| DB_PASSWORD | Password database | nihongo123 |
| DB_NAME | Tên database | nihongo |
| PORT | Port ứng dụng | 9113 |
| NODE_ENV | Môi trường (development/production) | development |
| SESSION_SECRET | Secret key cho session | (cần thay đổi) |

---

## 📁 Cấu Trúc Dự Án

```
smv-nihongo/
├── app.js                    # Entry point của ứng dụng
├── package.json              # Dependencies và scripts
├── docker-compose.yml        # Cấu hình Docker Compose
├── .env.example              # File cấu hình mẫu
├── Makefile                  # Commands tiện ích
│
├── controllers/              # Business logic
│   ├── gameVocabularyController.js
│   └── vocabularyController.js
│
├── database/                 # Database và migrations
│   ├── db.js                # Connection pool và helpers
│   ├── init.js              # Script khởi tạo database
│   ├── schema.sql           # Cấu trúc database
│   ├── migrations/          # Database migrations
│   └── seed/                # Dữ liệu mẫu (50 bài học)
│
├── middleware/               # Express middleware
│   ├── auth.js              # Authentication middleware
│   └── seo.js               # SEO middleware
│
├── routes/                   # Route handlers
│   ├── alphabets.js         # Routes cho học chữ cái
│   ├── auth.js              # Routes xác thực
│   ├── games.js             # Routes cho games
│   ├── vocabulary.js        # Routes từ vựng
│   └── seo.js               # SEO routes
│
├── views/                    # EJS templates
│   ├── layout.ejs           # Layout chính
│   ├── index.ejs            # Trang chủ
│   ├── alphabets/           # Views học chữ cái
│   ├── auth/                # Views đăng nhập/đăng ký
│   └── games/               # Views các game
│
├── public/                   # Static files
│   ├── css/                 # Stylesheets
│   ├── js/                  # Client-side scripts
│   ├── audio/               # File âm thanh (50 bài Minna)
│   └── assets/              # Images và videos
│
└── scripts/                  # Utility scripts
    ├── convert_to_sql.js    # Chuyển đổi dữ liệu sang SQL
    ├── crawl_lessons.js     # Crawl dữ liệu bài học
    └── download_audio.js    # Download file audio
```

---

## 🤝 Đóng Góp

Chúng tôi rất hoan nghênh mọi đóng góp! Dự án này là mã nguồn mở và cộng đồng.

### Code of Conduct
- Tôn trọng mọi người tham gia
- Chấp nhận phê bình xây dựng
- Tập trung vào điều tốt nhất cho cộng đồng
- Thể hiện sự đồng cảm với các thành viên khác

### Quy Trình Đóng Góp

#### 1. Fork và Clone Repository
```bash
# Fork repository trên GitHub, sau đó clone về máy
git clone https://github.com/YOUR_USERNAME/smv-nihongo.git
cd smv-nihongo

# Thêm upstream remote
git remote add upstream https://github.com/vigstudio/smv-nihongo.git
```

#### 2. Setup Development Environment
```bash
# Sử dụng Makefile (khuyến nghị)
make dev-setup

# Hoặc thủ công
docker-compose up -d
npm install
node database/init.js
```

#### 3. Tạo Branch Mới
```bash
git checkout -b feature/TinhNangMoi
```

#### 4. Coding Standards
- **JavaScript**: Sử dụng ES6+ syntax
- **Indentation**: 2 spaces
- **Naming**: camelCase cho variables, PascalCase cho classes
- **Comments**: Tiếng Việt hoặc tiếng Anh
- **File structure**: Tuân theo cấu trúc hiện tại

#### 5. Commit Messages
```bash
# Format: [type]: description
git commit -m "feat: thêm tính năng game kanji"
git commit -m "fix: sửa lỗi kết nối database"
git commit -m "docs: cập nhật README"
```

**Types**: feat, fix, docs, style, refactor, test, chore

#### 6. Pull Request Process
1. Push branch lên fork của bạn
2. Tạo Pull Request từ GitHub
3. Điền template PR đầy đủ
4. Chờ review và feedback
5. Update theo yêu cầu reviewer

### Báo Cáo Bug
Tạo **Issue** với thông tin:
- Mô tả lỗi chi tiết
- Các bước để reproduce
- Screenshots (nếu có)
- Môi trường (OS, Node.js version, Browser)

### Đề Xuất Tính Năng
- Mô tả tính năng rõ ràng
- Lý do cần thiết
- Mockup/wireframe (nếu có)
- Technical approach (nếu biết)

---

## [object Object]ion Deployment

### Yêu Cầu Production
- **Server**: VPS hoặc Hosting có quyền SSH
- **OS**: Linux (Ubuntu 20.04+, CentOS 7+, Debian 10+)
- **Node.js**: Version 14.x trở lên
- **MariaDB/MySQL**: Version 10.x+ / 8.x+
- **RAM**: Tối thiểu 1GB
- **Disk**: Tối thiểu 5GB

### Deploy với PM2 (Khuyến nghị)
```bash
# Cài đặt PM2
npm install -g pm2

# Start ứng dụng
pm2 start app.js --name nihongo --watch

# Các lệnh quản lý
pm2 status              # Xem trạng thái
pm2 logs nihongo        # Xem logs
pm2 restart nihongo     # Restart app
pm2 stop nihongo        # Dừng app

# Auto start khi reboot
pm2 startup
pm2 save
```

### Cấu Hình Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:9113;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Static files
    location /css/ {
        alias /path/to/smv-nihongo/public/css/;
    }
    location /js/ {
        alias /path/to/smv-nihongo/public/js/;
    }
    location /audio/ {
        alias /path/to/smv-nihongo/public/audio/;
    }
}
```

### ⚠️ Lưu Ý Production
1. **Bảo mật**:
   - Đổi `SESSION_SECRET` thành chuỗi ngẫu nhiên mạnh
   - Sử dụng HTTPS (SSL certificate)
   - Không commit file `.env` vào Git

2. **Performance**:
   - Sử dụng `NODE_ENV=production`
   - Cài đặt chỉ production dependencies: `npm install --production`
   - Cân nhắc sử dụng CDN cho static files

3. **Monitoring**:
   - Sử dụng PM2 để auto-restart khi crash
   - Setup logs rotation
   - Monitor database connections

4. **Backup**:
   ```bash
   # Backup database định kỳ
   mysqldump -u username -p nihongo > backup_$(date +%Y%m%d).sql

   # Setup cron job
   0 2 * * * mysqldump -u username -p'password' nihongo | gzip > /backups/nihongo_$(date +\%Y\%m\%d).sql.gz
   ```

---

## 📊 SEO & Marketing

### Tính Năng SEO Đã Triển Khai
- ✅ **40+ Meta Tags** (Title, Description, Keywords, Open Graph, Twitter Card)
- ✅ **Structured Data** (5 loại Schema.org JSON-LD)
- ✅ **Sitemap.xml** động (61 URLs)
- ✅ **Robots.txt** tối ưu
- ✅ **Semantic HTML5** + ARIA Accessibility
- ✅ **Mobile Responsive** + Fast Loading

### SEO Configuration
```env
# SEO Configuration trong .env
SITE_URL=https://your-domain.com
SITE_NAME=SMV Nihongo
SITE_DESCRIPTION=Học tiếng Nhật online miễn phí với Minna no Nihongo
FB_APP_ID=your_facebook_app_id
TWITTER_HANDLE=@smv_nihongo
```

### Schema.org Structured Data
Website tự động tạo 5 loại structured data:
1. **WebSite** - Thông tin website chính
2. **Organization** - Thông tin tổ chức
3. **Course** - Thông tin khóa học
4. **EducationalOrganization** - Tổ chức giáo dục
5. **BreadcrumbList** - Navigation breadcrumbs

### SEO Checklist
- [ ] Cấu hình domain và HTTPS
- [ ] Setup Google Analytics
- [ ] Setup Google Search Console
- [ ] Submit sitemap.xml
- [ ] Verify structured data
- [ ] Test mobile responsiveness
- [ ] Check page speed
- [ ] Setup social media accounts

---

## 🐛 Troubleshooting

### Lỗi Kết Nối Database
```bash
# Kiểm tra MariaDB đang chạy
docker-compose ps

# Kiểm tra logs
docker-compose logs mariadb

# Restart MariaDB
docker-compose restart mariadb
```

### Port Đã Được Sử Dụng
```bash
# Kiểm tra port 3306
# Windows: netstat -ano | findstr :3306
# Linux/macOS: lsof -i :3306

# Đổi port trong .env
DB_PORT=3307
PORT=9114
```

### Lỗi Permission Denied
```bash
# Linux/macOS: Thêm quyền thực thi
chmod +x database/init.js
chmod +x database/reset.js
```

### Lỗi npm install
```bash
# Xóa node_modules và install lại
rm -rf node_modules package-lock.json
npm install

# Windows
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Lỗi Docker
```bash
# Restart Docker service
# Windows/Mac: Restart Docker Desktop
# Linux: sudo systemctl restart docker

# Clear Docker cache
docker system prune -a
```

---

## 📜 Scripts Hữu Ích

### NPM Scripts
```bash
# Reset database (xóa và tạo lại)
npm run reset

# Chạy migrations
npm run migrate

# Setup hoàn chỉnh (reset + migrate)
npm run setup

# Docker commands
npm run docker:up      # Khởi động Docker
npm run docker:down    # Dừng Docker
npm run db:backup      # Backup database
```

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

---

## 📝 Changelog

### [Unreleased]

#### Added
- Docker Compose support với MariaDB 11.2
- File `docker-compose.yml` cho production
- File `docker-compose.dev.yml` cho development environment
- phpMyAdmin và Adminer trong dev mode
- File `.dockerignore` để tối ưu Docker build
- NPM scripts mới: `docker:*` và `db:*`
- Hướng dẫn chi tiết về Docker trong README
- SEO optimization với 40+ meta tags
- Structured data với Schema.org JSON-LD
- Sitemap.xml động và robots.txt

#### Changed
- Chuyển từ SQLite sang MariaDB làm database chính
- Cập nhật hoàn toàn README.md với cấu trúc mới
- Cập nhật `.gitignore` để bao gồm các file Docker và backup
- Cải thiện package.json với nhiều scripts hơn

#### Fixed
- Character encoding issues với utf8mb4
- Connection pooling trong db.js

### [1.0.0] - 2024-XX-XX

#### Added
- Hệ thống học Hiragana và Katakana
- Game học chữ cái tương tác
- 50 bài học từ vựng từ Minna no Nihongo
- Game từ vựng với nhiều chế độ
- Hệ thống đăng ký/đăng nhập
- Bảng xếp hạng và thống kê
- Phát âm chuẩn cho từng từ vựng
- Video hướng dẫn viết chữ
- Responsive design với Bootstrap 5

---

## 📊 Roadmap

### Version 1.1 (Đang phát triển)
- [ ] Thêm bài tập ngữ pháp
- [ ] Hệ thống flashcard thông minh với spaced repetition
- [ ] App mobile (React Native)
- [ ] Chế độ offline

### Version 1.2 (Kế hoạch)
- [ ] Tích hợp AI chat bot luyện hội thoại
- [ ] Nhận diện chữ viết tay
- [ ] Bài tập kanji
- [ ] Community features (forum, study groups)

---

## [object Object]iên Hệ & Hỗ Trợ

- **GitHub**: [@vigstudio](https://github.com/vigstudio)
- **Website**: [smv-nihongo](https://github.com/vigstudio/smv-nihongo)
- **Issues**: [GitHub Issues](https://github.com/vigstudio/smv-nihongo/issues)

### Cần Giúp Đỡ?
1. **Tìm trong docs** - Ctrl+F trong file này
2. **Search GitHub Issues** - Có thể đã có người hỏi
3. **Tạo Issue mới** - Với label `question`
4. **Email maintainers** - Cho vấn đề riêng tư

---

## 🙏 Lời Cảm Ơn

Dự án này không thể hoàn thành nếu thiếu sự đóng góp và hỗ trợ từ:

- **Cộng đồng Minna no Nihongo** - Giáo trình xuất sắc
- **Contributors** - Những người đã đóng góp code và ý tưởng
- **Users** - Những người dùng đã góp ý và phản hồi
- **Open Source Community** - Các thư viện và công cụ tuyệt vời

### Công nghệ được sử dụng
Xin cảm ơn các dự án open source:
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MariaDB](https://mariadb.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Docker](https://www.docker.com/)

---

##[object Object]ự Án

Nếu bạn thấy dự án này hữu ích, hãy:

⭐️ **Star** repository này trên GitHub

🐛 **Báo lỗi** hoặc **đề xuất tính năng** qua Issues

🤝 **Đóng góp** code qua Pull Requests

📢 **Chia sẻ** với bạn bè đang học tiếng Nhật

💬 **Feedback** giúp chúng tôi cải thiện

---

## 📝 License

Dự án này được phát hành dưới giấy phép **MIT License**.

```
MIT License - Bạn có quyền:
✓ Sử dụng thương mại
✓ Chỉnh sửa
✓ Phân phối
✓ Sử dụng riêng tư
```

---

<div align="center">

**🎌 Chúc bạn học tiếng Nhật vui vẻ! がんばって！ 🎌**

Made with ❤️ by [VigStudio](https://github.com/vigstudio)

[⬆ Về đầu trang](#-smv-nihongo---tài-liệu-hoàn-chỉnh-)

</div>
