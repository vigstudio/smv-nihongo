# SMV Nihongo - Ứng Dụng Học Tiếng Nhật Thông Minh 🎌

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-14.x+-brightgreen.svg)
![MariaDB](https://img.shields.io/badge/MariaDB-11.2-blue.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)

SMV Nihongo là một ứng dụng web hiện đại giúp người học tiếng Nhật tiếp cận ngôn ngữ này một cách thú vị và hiệu quả, dựa trên giáo trình **Minna no Nihongo** nổi tiếng.

---

## 📑 Mục Lục

- [Tính Năng Nổi Bật](#-tính-năng-nổi-bật)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Cài Đặt và Chạy Dự Án](#-cài-đặt-và-chạy-dự-án)
  - [Phương Án 1: Sử Dụng Docker (Khuyến nghị)](#phương-án-1-sử-dụng-docker-khuyến-nghị)
  - [Phương Án 2: Cài Đặt Thủ Công](#phương-án-2-cài-đặt-thủ-công)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Cấu Hình](#-cấu-hình)
- [Scripts Hữu Ích](#-scripts-hữu-ích)
- [Đóng Góp](#-đóng-góp)
- [License](#-license)
- [Liên Hệ](#-liên-hệ)

---

## 🌟 Tính Năng Nổi Bật

### 📚 Học Tập Tương Tác

- **Học Bảng Chữ Cái**:
  - Hệ thống học Hiragana và Katakana đầy đủ
  - Hình ảnh minh họa và video hướng dẫn viết
  - Phát âm chuẩn cho từng ký tự
- **Game Học Chữ**:

  - Trò chơi tương tác giúp ghi nhớ bảng chữ cái hiệu quả
  - Nhiều chế độ chơi khác nhau
  - Theo dõi tiến độ học tập

- **Học Từ Vựng Theo Bài**:

  - 50 bài học từ giáo trình Minna no Nihongo
  - Phân loại theo chủ đề và độ khó
  - Phát âm chuẩn từ người bản xứ
  - Ví dụ minh họa cho mỗi từ

- **Game Từ Vựng**:
  - Mini-game thú vị giúp ôn tập từ vựng
  - Nhiều chế độ: flashcard, matching, quiz
  - Tùy chọn bài học và số lượng từ

### 🏆 Hệ Thống Động Lực

- **Bảng Xếp Hạng**:

  - Theo dõi tiến độ cá nhân
  - So sánh với người học khác
  - Thống kê chi tiết theo từng loại game

- **Hệ Thống Điểm**:
  - Tích lũy điểm qua các hoạt động học tập
  - Thưởng cho sự kiên trì và tiến bộ

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

## 🚀 Cài Đặt và Chạy Dự Án

### Phương Án 1: Sử Dụng Docker (Khuyến nghị)

Docker giúp việc cài đặt trở nên đơn giản và nhất quán trên mọi hệ điều hành.

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
# Các giá trị mặc định đã được cấu hình sẵn
```

#### 3. Khởi động MariaDB với Docker Compose

```bash
# Khởi động database
docker-compose up -d

# Kiểm tra trạng thái
docker-compose ps
```

#### 4. Cài đặt dependencies

```bash
npm install
```

#### 5. Khởi tạo database và dữ liệu

```bash
# Khởi tạo cấu trúc database
node database/init.js

# Hoặc reset toàn bộ (nếu cần)
npm run reset
```

#### 6. Chạy ứng dụng

```bash
# Chế độ development
npm start

# Hoặc với nodemon (tự động restart khi có thay đổi)
npx nodemon app.js
```

#### 7. Truy cập ứng dụng

Mở trình duyệt và truy cập: **http://localhost:9113**

#### 8. Dừng các dịch vụ

```bash
# Dừng ứng dụng: Ctrl + C

# Dừng MariaDB
docker-compose stop

# Dừng và xóa container (giữ lại dữ liệu)
docker-compose down

# Dừng và xóa tất cả (bao gồm dữ liệu)
docker-compose down -v
```

---

### Phương Án 2: Cài Đặt Thủ Công

Nếu bạn muốn cài đặt MariaDB trực tiếp trên máy thay vì dùng Docker.

#### 1. Cài đặt MariaDB

**Windows:**

- Tải MariaDB từ [mariadb.org](https://mariadb.org/download/)
- Chạy file cài đặt và làm theo hướng dẫn
- Ghi nhớ mật khẩu root

**macOS:**

```bash
brew install mariadb
brew services start mariadb
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install mariadb-server
sudo systemctl start mariadb
sudo mysql_secure_installation
```

#### 2. Tạo database và user

```bash
# Đăng nhập MariaDB
mysql -u root -p

# Trong MySQL shell, chạy các lệnh sau:
CREATE DATABASE nihongo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nihongo_user'@'localhost' IDENTIFIED BY 'nihongo123';
GRANT ALL PRIVILEGES ON nihongo.* TO 'nihongo_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Clone và cấu hình dự án

```bash
# Clone repository
git clone https://github.com/vigstudio/smv-nihongo.git
cd smv-nihongo

# Copy file cấu hình
cp .env.example .env

# Chỉnh sửa file .env với thông tin database của bạn
# DB_HOST=localhost
# DB_USER=nihongo_user
# DB_PASSWORD=nihongo123
# DB_NAME=nihongo
```

#### 4. Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Khởi tạo database
node database/init.js

# Chạy ứng dụng
npm start
```

---

### Phương Án 3: Production Server (VPS/Hosting)

Nếu bạn deploy trên VPS hoặc hosting đã có MariaDB/MySQL.

#### 1. Đảm bảo database đã được tạo

Liên hệ admin hoặc sử dụng control panel (cPanel, DirectAdmin, etc.) để:

- Tạo database với tên `nihongo` (hoặc tên khác)
- Tạo user database với quyền truy cập
- Ghi nhớ: hostname, username, password, database name

#### 2. Cấu hình file .env

Tạo file `.env` trong thư mục dự án:

```env
# Database từ hosting
DB_HOST=localhost                    # Hoặc IP/hostname từ hosting
DB_PORT=3306
DB_USER=your_database_user          # User từ hosting
DB_PASSWORD=your_database_password  # Password từ hosting
DB_NAME=nihongo                     # Database name từ hosting

# Application
PORT=9113                           # Hoặc port khác
NODE_ENV=production
SESSION_SECRET=your-random-secret-key-here-change-this
```

#### 3. Deploy ứng dụng

```bash
# Clone hoặc upload code lên server
git clone https://github.com/vigstudio/smv-nihongo.git
cd smv-nihongo

# Cài đặt dependencies (chỉ production)
npm install --production

# Khởi tạo database (tạo tables)
node database/init.js

# Chạy ứng dụng
npm start

# Hoặc dùng PM2 để chạy background
npm install -g pm2
pm2 start app.js --name nihongo
pm2 save
pm2 startup
```

#### 4. Chạy ứng dụng với PM2 (khuyến nghị)

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
pm2 delete nihongo      # Xóa app

# Auto start khi reboot
pm2 startup
pm2 save
```

#### 5. Cấu hình Nginx (nếu dùng)

Tạo file `/etc/nginx/sites-available/nihongo`:

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

```bash
# Enable site và restart Nginx
sudo ln -s /etc/nginx/sites-available/nihongo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### ⚠️ Lưu Ý Production

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

   # Hoặc setup cron job
   0 2 * * * mysqldump -u username -p'password' nihongo | gzip > /backups/nihongo_$(date +\%Y\%m\%d).sql.gz
   ```

---

## 📁 Cấu Trúc Dự Án

```
smv-nihongo/
├── app.js                    # Entry point của ứng dụng
├── package.json              # Dependencies và scripts
├── docker-compose.yml        # Cấu hình Docker Compose
├── .env.example              # File cấu hình mẫu
├── .dockerignore            # Ignore files cho Docker
│
├── controllers/              # Business logic
│   ├── gameVocabularyController.js
│   └── vocabularyController.js
│
├── database/                 # Database và migrations
│   ├── db.js                # Connection pool và helpers
│   ├── init.js              # Script khởi tạo database
│   ├── reset.js             # Script reset database
│   ├── schema.sql           # Cấu trúc database
│   ├── migrations/          # Database migrations
│   │   ├── 001_create_vocabulary_lesson.sql
│   │   ├── 002_add_user_profile_fields.sql
│   │   └── 003_create_migrations_log.sql
│   └── seed/                # Dữ liệu mẫu
│       └── lessons/         # Từ vựng 50 bài học
│           ├── lesson1.sql
│           ├── lesson2.sql
│           └── ...
│
├── middleware/               # Express middleware
│   └── auth.js              # Authentication middleware
│
├── routes/                   # Route handlers
│   ├── admin.js
│   ├── alphabets.js         # Routes cho học chữ cái
│   ├── auth.js              # Routes xác thực
│   ├── games.js             # Routes cho games
│   ├── gameVocabulary.js    # Routes game từ vựng
│   ├── leaderboard.js       # Routes bảng xếp hạng
│   └── vocabulary.js        # Routes từ vựng
│
├── views/                    # EJS templates
│   ├── layout.ejs           # Layout chính
│   ├── index.ejs            # Trang chủ
│   ├── alphabets/           # Views học chữ cái
│   ├── auth/                # Views đăng nhập/đăng ký
│   ├── games/               # Views các game
│   └── ...
│
├── public/                   # Static files
│   ├── css/                 # Stylesheets
│   │   └── style.css
│   ├── js/                  # Client-side scripts
│   │   └── main.js
│   ├── audio/               # File âm thanh
│   │   └── minna/           # Audio 50 bài Minna
│   │       ├── bai01/
│   │       ├── bai02/
│   │       └── ...
│   └── assets/              # Images và videos
│       ├── images/          # Hình ảnh chữ cái
│       │   ├── hiragana/
│       │   └── katakana/
│       └── videos/          # Video viết chữ
│           ├── hiragana/
│           └── katakana/
│
└── scripts/                  # Utility scripts
    ├── convert_to_sql.js    # Chuyển đổi dữ liệu sang SQL
    ├── crawl_lessons.js     # Crawl dữ liệu bài học
    └── download_audio.js    # Download file audio
```

---

## ⚙️ Cấu Hình

### File .env

Tạo file `.env` từ `.env.example` và tùy chỉnh theo nhu cầu:

```env
# Database Configuration
DB_HOST=localhost              # Host của database
DB_PORT=3306                  # Port của MariaDB (mặc định 3306)
DB_USER=nihongo_user          # Username database
DB_PASSWORD=nihongo123        # Password database
DB_NAME=nihongo               # Tên database
DB_ROOT_PASSWORD=rootpassword # Password root (chỉ dùng cho Docker)

# Application Configuration
PORT=9113                     # Port chạy ứng dụng
NODE_ENV=development          # Môi trường: development/production

# Session Secret (Đổi trong production!)
SESSION_SECRET=smv-nihongo-secret-key-change-this-in-production
```

### Docker Compose Services

File `docker-compose.yml` bao gồm:

- **mariadb**: Database server với MariaDB 11.2
  - Port: 3306
  - Volume: `mariadb_data` (persistent storage)
  - Character set: utf8mb4 (hỗ trợ đầy đủ Unicode, bao gồm Emoji và chữ Nhật)
- **phpmyadmin** (tùy chọn): Web interface quản lý database
  - Bỏ comment trong `docker-compose.yml` để sử dụng
  - Truy cập tại: http://localhost:8080

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

# Install (chạy post-install script)
npm run install
```

### Docker Commands

```bash
# Xem logs của MariaDB
docker-compose logs -f mariadb

# Restart MariaDB
docker-compose restart mariadb

# Truy cập MariaDB shell
docker-compose exec mariadb mysql -u nihongo_user -p nihongo

# Backup database
docker-compose exec mariadb mysqldump -u root -p nihongo > backup.sql

# Restore database
docker-compose exec -T mariadb mysql -u root -p nihongo < backup.sql

# Xem thông tin container
docker-compose ps
docker-compose top
```

### Database Scripts

```bash
# Khởi tạo database
node database/init.js

# Reset database
node database/reset.js

# Crawl dữ liệu từ nguồn
node scripts/crawl_lessons.js

# Chuyển đổi dữ liệu sang SQL
node scripts/convert_to_sql.js

# Download audio files
node scripts/download_audio.js
```

---

## 🐛 Troubleshooting

### Lỗi kết nối database

```bash
# Kiểm tra MariaDB đang chạy
docker-compose ps

# Kiểm tra logs
docker-compose logs mariadb

# Restart MariaDB
docker-compose restart mariadb
```

### Port đã được sử dụng

Nếu port 3306 hoặc 9113 đã được sử dụng, thay đổi trong file `.env`:

```env
DB_PORT=3307    # Đổi port MariaDB
PORT=9114       # Đổi port ứng dụng
```

### Lỗi permission denied

```bash
# Linux/macOS: Thêm quyền thực thi
chmod +x database/init.js
chmod +x database/reset.js
```

---

## 🤝 Đóng Góp

Chúng tôi rất hoan nghênh mọi đóng góp! Dự án này là mã nguồn mở và cộng đồng.

### Cách đóng góp

1. **Fork** dự án này
2. Tạo **branch** mới cho tính năng của bạn:
   ```bash
   git checkout -b feature/TinhNangMoi
   ```
3. **Commit** các thay đổi:
   ```bash
   git commit -m 'Thêm tính năng XYZ'
   ```
4. **Push** lên branch:
   ```bash
   git push origin feature/TinhNangMoi
   ```
5. Tạo **Pull Request**

### Quy tắc đóng góp

- Code phải tuân theo style hiện tại
- Commit message rõ ràng bằng tiếng Việt hoặc tiếng Anh
- Test kỹ trước khi tạo PR
- Cập nhật documentation nếu cần

### Báo lỗi

Nếu bạn phát hiện lỗi, vui lòng tạo **Issue** với thông tin:

- Mô tả lỗi chi tiết
- Các bước để reproduce
- Screenshots (nếu có)
- Môi trường (OS, Node.js version, Browser)

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

## 📝 License

Dự án này được phát hành dưới giấy phép **MIT License**.

Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

```
MIT License - Bạn có quyền:
✓ Sử dụng thương mại
✓ Chỉnh sửa
✓ Phân phối
✓ Sử dụng riêng tư
```

---

## 📞 Liên Hệ

- **GitHub**: [@vigstudio](https://github.com/vigstudio)
- **Website**: [smv-nihongo](https://github.com/vigstudio/smv-nihongo)
- **Issues**: [GitHub Issues](https://github.com/vigstudio/smv-nihongo/issues)

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

## 🌟 Ủng Hộ Dự Án

Nếu bạn thấy dự án này hữu ích, hãy:

⭐️ **Star** repository này trên GitHub

🐛 **Báo lỗi** hoặc **đề xuất tính năng** qua Issues

🤝 **Đóng góp** code qua Pull Requests

📢 **Chia sẻ** với bạn bè đang học tiếng Nhật

💬 **Feedback** giúp chúng tôi cải thiện

---

<div align="center">

**🎌 Chúc bạn học tiếng Nhật vui vẻ! がんばって！ 🎌**

Made with ❤️ by [VigStudio](https://github.com/vigstudio)

[⬆ Về đầu trang](#smv-nihongo---ứng-dụng-học-tiếng-nhật-thông-minh-)

</div>
