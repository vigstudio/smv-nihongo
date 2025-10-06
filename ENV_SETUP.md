# Hướng Dẫn Cấu Hình Biến Môi Trường

## Tạo file .env

Website hỗ trợ 3 loại database: **MariaDB**, **MySQL**, hoặc **SQLite**.

### Cách nhanh nhất:

```bash
# Copy từ template
cp .env.example .env
```

Sau đó chỉnh sửa file `.env` theo database bạn muốn dùng.

---

## 📦 Cấu hình theo Database

### Option 1: MariaDB (Khuyến nghị cho Production)

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

**Khi nào dùng MariaDB:**

- Production website với traffic cao
- Cần performance tốt và scalability
- Có nhiều user đồng thời
- Dùng Docker Compose

### Option 2: MySQL (Tương tự MariaDB)

```env
# Database Configuration
DB_TYPE=mysql
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

**Khi nào dùng MySQL:**

- Tương tự MariaDB
- Server đã có sẵn MySQL
- Quen thuộc với MySQL

### Option 3: SQLite (Khuyến nghị cho Development)

```env
# Database Configuration
DB_TYPE=sqlite
SQLITE_DB_PATH=./database/nihongo.sqlite

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

**Khi nào dùng SQLite:**

- Development và testing
- Website nhỏ, ít traffic
- Không muốn setup database server
- Deploy đơn giản, chỉ 1 file

**⚠️ Lưu ý với SQLite:**

- Không phù hợp cho production với nhiều user
- Performance thấp hơn MySQL/MariaDB
- Không scale được
- Nhưng rất tiện cho development!

---

## 📝 Giải Thích Chi Tiết Các Biến

### Database Configuration

#### DB_TYPE (BẮT BUỘC)

- **Giá trị:** `mysql`, `mariadb`, hoặc `sqlite`
- **Mặc định:** `mariadb`
- **Mô tả:** Chọn loại database bạn muốn sử dụng

#### Cho MySQL/MariaDB:

- **DB_HOST**: Địa chỉ host của database

  - `localhost` - chạy trên máy local hoặc Docker
  - IP address - server remote
  - `mariadb` - tên service trong Docker Compose

- **DB_PORT**: Port của database

  - Mặc định: `3306` cho MySQL/MariaDB

- **DB_USER**: Username kết nối database

  - Docker: `nihongo_user`
  - Manual: user bạn đã tạo

- **DB_PASSWORD**: Password của database user

  - ⚠️ Đổi trong production!

- **DB_NAME**: Tên database

  - Mặc định: `nihongo`

- **DB_ROOT_PASSWORD**: Password root (chỉ cho Docker)
  - Không cần nếu cài đặt thủ công

#### Cho SQLite:

- **SQLITE_DB_PATH**: Đường dẫn đến file database
  - Mặc định: `./database/nihongo.sqlite`
  - File sẽ tự động được tạo nếu chưa tồn tại

### Application Configuration

- **PORT**: Port để chạy ứng dụng web

  - Mặc định: `9113`
  - Có thể đổi thành bất kỳ port nào

- **NODE_ENV**: Môi trường chạy
  - `development` - Phát triển (có logs chi tiết)
  - `production` - Sản xuất (tối ưu performance)

### SEO Configuration

- **SITE_URL**: URL chính thức của website

  - Development: `http://localhost:9113`
  - Production: `https://your-domain.com`
  - ⚠️ **QUAN TRỌNG**: Dùng cho sitemap.xml, robots.txt, Open Graph
  - KHÔNG để dấu `/` ở cuối

- **FB_APP_ID**: Facebook App ID (tùy chọn)

  - Để trống nếu không dùng
  - Lấy tại: https://developers.facebook.com/

- **TWITTER_HANDLE**: Twitter username (tùy chọn)
  - Format: `@username`
  - Dùng cho Twitter Card

### Security

- **SESSION_SECRET**: Key bí mật cho session
  - ⚠️ **QUAN TRỌNG**: PHẢI thay đổi trong production
  - Dùng chuỗi ngẫu nhiên dài và phức tạp
  - Generate bằng: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## 🚀 Quick Start

### Cách 1: Copy từ template (Khuyến nghị)

```bash
cp .env.example .env
```

Sau đó mở file `.env` và chỉnh sửa theo nhu cầu.

### Cách 2: Tạo thủ công

#### Windows (PowerShell)

```powershell
# Tạo file .env với MariaDB
@"
DB_TYPE=mariadb
DB_HOST=localhost
DB_PORT=3306
DB_USER=nihongo_user
DB_PASSWORD=nihongo123
DB_NAME=nihongo
DB_ROOT_PASSWORD=rootpassword

PORT=9113
NODE_ENV=development

SITE_URL=http://localhost:9113
FB_APP_ID=
TWITTER_HANDLE=@smv_nihongo

SESSION_SECRET=smv-nihongo-secret-key-change-this-in-production
"@ | Out-File -FilePath .env -Encoding UTF8
```

#### Linux/macOS

```bash
# Tạo file .env với MariaDB
cat > .env << 'EOF'
DB_TYPE=mariadb
DB_HOST=localhost
DB_PORT=3306
DB_USER=nihongo_user
DB_PASSWORD=nihongo123
DB_NAME=nihongo
DB_ROOT_PASSWORD=rootpassword

PORT=9113
NODE_ENV=development

SITE_URL=http://localhost:9113
FB_APP_ID=
TWITTER_HANDLE=@smv_nihongo

SESSION_SECRET=smv-nihongo-secret-key-change-this-in-production
EOF
```

---

## 🔄 Chuyển đổi giữa các Database

### Từ MariaDB/MySQL sang SQLite

1. Backup data hiện tại (nếu cần)
2. Sửa file `.env`:
   ```env
   DB_TYPE=sqlite
   SQLITE_DB_PATH=./database/nihongo.sqlite
   ```
3. Restart server: `npm start`
4. Chạy lại migrations: `npm run migrate`

### Từ SQLite sang MariaDB/MySQL

1. Backup file SQLite (nếu cần)
2. Setup MariaDB/MySQL server
3. Sửa file `.env`:
   ```env
   DB_TYPE=mariadb
   DB_HOST=localhost
   DB_PORT=3306
   # ... các config khác
   ```
4. Restart server: `npm start`
5. Chạy lại migrations: `npm run migrate`

---

## 📊 So sánh các loại Database

| Tiêu chí             | MariaDB/MySQL  | SQLite          |
| -------------------- | -------------- | --------------- |
| **Performance**      | ⭐⭐⭐⭐⭐     | ⭐⭐⭐          |
| **Scalability**      | ⭐⭐⭐⭐⭐     | ⭐⭐            |
| **Concurrent Users** | Cao            | Thấp            |
| **Setup Complexity** | Trung bình     | Rất dễ          |
| **Disk Space**       | Nhiều hơn      | Ít hơn          |
| **Backup**           | Phức tạp hơn   | Copy 1 file     |
| **Production**       | ✅ Khuyến nghị | ⚠️ Chỉ site nhỏ |
| **Development**      | ✅ OK          | ✅ Khuyến nghị  |

### Khuyến nghị:

- **Development/Testing:** SQLite (đơn giản, nhanh)
- **Production nhỏ (< 100 users):** SQLite hoặc MySQL
- **Production lớn:** MariaDB/MySQL (performance cao)

---

## 🔒 Lưu Ý Bảo Mật

### ⚠️ QUAN TRỌNG - ĐỌC KỸ!

1. **KHÔNG BAO GIỜ commit file .env vào Git**

   - File `.gitignore` đã được cấu hình để bỏ qua
   - Kiểm tra: `git status` không thấy `.env`

2. **Thay đổi TẤT CẢ password mặc định trong production**

   - `DB_PASSWORD`: Dùng password phức tạp ≥ 16 ký tự
   - `DB_ROOT_PASSWORD`: Dùng password khác với DB_PASSWORD
   - `SESSION_SECRET`: Generate ngẫu nhiên (xem bên dưới)

3. **Generate SESSION_SECRET ngẫu nhiên**:

   ```bash
   # Node.js (khuyến nghị)
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

   # Output mẫu:
   # a1b2c3d4e5f6789...

   # Hoặc dùng OpenSSL
   openssl rand -hex 32

   # Hoặc online generator (ít an toàn hơn)
   # https://www.random.org/strings/
   ```

4. **SITE_URL phải dùng HTTPS trong production**

   ```env
   # ❌ SAI - HTTP không an toàn
   SITE_URL=http://your-domain.com

   # ✅ ĐÚNG - HTTPS an toàn
   SITE_URL=https://your-domain.com
   ```

5. **Backup cấu hình an toàn**

   - Không lưu trên repository công khai
   - Dùng password manager (1Password, LastPass, Bitwarden)
   - Hoặc dùng encrypted vault
   - Backup file SQLite định kỳ (nếu dùng SQLite)

6. **File permissions (Linux/macOS)**

   ```bash
   # Chỉ owner có quyền đọc/ghi
   chmod 600 .env
   ```

7. **Database security**
   - Không dùng `root` account cho app
   - Tạo user riêng với permissions giới hạn
   - Firewall chỉ cho phép kết nối từ app server

---

## ✅ Checklist Trước Khi Deploy Production

- [ ] File `.env` đã được tạo
- [ ] `DB_TYPE` đã chọn đúng
- [ ] Tất cả password đã được đổi (không dùng mặc định)
- [ ] `SESSION_SECRET` đã generate ngẫu nhiên
- [ ] `SITE_URL` dùng HTTPS
- [ ] `NODE_ENV=production`
- [ ] Database server đã setup và running
- [ ] Đã test kết nối database
- [ ] Đã chạy migrations: `npm run migrate`
- [ ] Đã backup file `.env` ở nơi an toàn
- [ ] File `.env` KHÔNG có trong Git

---

## 🆘 Troubleshooting

### ❌ Lỗi: Cannot connect to database

**Nguyên nhân:**

- Database server chưa chạy
- Thông tin kết nối sai
- Firewall block connection

**Giải pháp:**

```bash
# Kiểm tra MariaDB/MySQL đang chạy
# Docker:
docker ps | grep mariadb

# Linux:
sudo systemctl status mariadb

# Kiểm tra kết nối
mysql -h localhost -u nihongo_user -p
```

### ❌ Lỗi: SQLITE_CANTOPEN

**Nguyên nhân:**

- Thư mục database chưa tồn tại
- Không có quyền ghi file

**Giải pháp:**

```bash
# Tạo thư mục
mkdir -p database

# Fix permissions
chmod 755 database
```

### ❌ Lỗi: SITE_URL is undefined

**Nguyên nhân:**

- File `.env` chưa có biến `SITE_URL`

**Giải pháp:**

```bash
# Thêm vào .env
echo "SITE_URL=http://localhost:9113" >> .env
```

---

## 📚 Tham Khảo Thêm

- [dotenv documentation](https://github.com/motdotla/dotenv)
- [Environment Variables Best Practices](https://12factor.net/config)
- [MariaDB Official Docs](https://mariadb.org/documentation/)
- [MySQL Official Docs](https://dev.mysql.com/doc/)
- [SQLite Official Docs](https://www.sqlite.org/docs.html)

---

**Cập nhật:** 2025-10-06  
**Version:** 2.0 (Hỗ trợ MariaDB/MySQL/SQLite)
