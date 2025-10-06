# Hướng Dẫn Setup Database

## 🎯 Tổng quan

Website hỗ trợ 3 loại database:

1. **MariaDB** - Khuyến nghị cho Production
2. **MySQL** - Tương thích với MariaDB
3. **SQLite** - Khuyến nghị cho Development

---

## 📦 Option 1: SQLite (Dễ nhất - Khuyến nghị cho Dev)

### Ưu điểm:

- ✅ Không cần cài đặt database server
- ✅ Chỉ cần 1 file
- ✅ Setup trong 30 giây
- ✅ Dễ backup (copy file)

### Nhược điểm:

- ⚠️ Performance thấp hơn MySQL/MariaDB
- ⚠️ Không scale được
- ⚠️ Không phù hợp production lớn

### Cách setup:

```bash
# 1. Cấu hình .env
echo "DB_TYPE=sqlite" >> .env
echo "SQLITE_DB_PATH=./database/nihongo.sqlite" >> .env

# 2. Tạo thư mục database
mkdir -p database

# 3. Chạy migrations
npm run migrate

# 4. Start server
npm start
```

**Xong!** Database sẽ tự động được tạo khi chạy migrations.

---

## 📦 Option 2: MariaDB với Docker (Khuyến nghị)

### Ưu điểm:

- ✅ Performance cao
- ✅ Scale tốt
- ✅ Phù hợp production
- ✅ Docker giúp setup dễ dàng

### Cách setup:

#### Bước 1: Chuẩn bị Docker Compose

File `docker-compose.yml` đã có sẵn trong project:

```yaml
version: "3.8"
services:
  mariadb:
    image: mariadb:10.11
    container_name: nihongo-mariadb
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    ports:
      - "${DB_PORT}:3306"
    volumes:
      - mariadb_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  mariadb_data:
```

#### Bước 2: Cấu hình .env

```bash
# Database Configuration
DB_TYPE=mariadb
DB_HOST=localhost
DB_PORT=3306
DB_USER=nihongo_user
DB_PASSWORD=nihongo123
DB_NAME=nihongo
DB_ROOT_PASSWORD=rootpassword

# Application
PORT=9113
NODE_ENV=development

# SEO
SITE_URL=http://localhost:9113
SESSION_SECRET=change-this-in-production
```

#### Bước 3: Khởi động MariaDB

```bash
# Start MariaDB container
docker-compose up -d

# Kiểm tra container đang chạy
docker ps

# Xem logs
docker-compose logs mariadb
```

#### Bước 4: Chạy migrations

```bash
# Đợi 10-15 giây để MariaDB khởi động xong
# Sau đó chạy migrations
npm run migrate

# Start application
npm start
```

#### Bước 5: Kiểm tra kết nối

```bash
# Kết nối vào MariaDB để kiểm tra
docker exec -it nihongo-mariadb mysql -u nihongo_user -pnihongo123

# Trong MySQL prompt:
SHOW DATABASES;
USE nihongo;
SHOW TABLES;
```

---

## 📦 Option 3: MySQL Manual Install

### Cho Ubuntu/Debian:

```bash
# 1. Cài đặt MySQL
sudo apt update
sudo apt install mysql-server

# 2. Bảo mật MySQL
sudo mysql_secure_installation

# 3. Đăng nhập MySQL
sudo mysql

# 4. Tạo database và user
CREATE DATABASE nihongo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nihongo_user'@'localhost' IDENTIFIED BY 'your_password_here';
GRANT ALL PRIVILEGES ON nihongo.* TO 'nihongo_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 5. Cấu hình .env
cat > .env << 'EOF'
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=nihongo_user
DB_PASSWORD=your_password_here
DB_NAME=nihongo

PORT=9113
NODE_ENV=development
SITE_URL=http://localhost:9113
SESSION_SECRET=change-this
EOF

# 6. Chạy migrations
npm run migrate

# 7. Start server
npm start
```

### Cho macOS (Homebrew):

```bash
# 1. Cài đặt MySQL
brew install mysql

# 2. Start MySQL
brew services start mysql

# 3. Bảo mật MySQL
mysql_secure_installation

# 4. Đăng nhập và tạo database
mysql -u root -p

# Trong MySQL prompt:
CREATE DATABASE nihongo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nihongo_user'@'localhost' IDENTIFIED BY 'your_password_here';
GRANT ALL PRIVILEGES ON nihongo.* TO 'nihongo_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 5-7: Giống như Ubuntu
```

### Cho Windows:

1. Download MySQL từ: https://dev.mysql.com/downloads/installer/
2. Chạy installer và chọn "Developer Default"
3. Thiết lập root password
4. Mở MySQL Workbench hoặc Command Line
5. Tạo database và user:

```sql
CREATE DATABASE nihongo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nihongo_user'@'localhost' IDENTIFIED BY 'your_password_here';
GRANT ALL PRIVILEGES ON nihongo.* TO 'nihongo_user'@'localhost';
FLUSH PRIVILEGES;
```

6. Cấu hình `.env` và chạy migrations như trên

---

## 🔄 Migrations và Seeding

### Chạy migrations (tạo tables):

```bash
npm run migrate
```

### Reset database (xóa và tạo lại):

```bash
npm run reset
```

### Seeding data (nếu có):

```bash
npm run db:seed
```

---

## 🔍 Kiểm tra Database

### Với SQLite:

```bash
# Cài đặt sqlite3 CLI
npm install -g sqlite3

# Mở database
sqlite3 ./database/nihongo.sqlite

# Trong sqlite prompt:
.tables
SELECT * FROM users LIMIT 5;
.quit
```

### Với MariaDB/MySQL (Docker):

```bash
# Kết nối vào container
docker exec -it nihongo-mariadb mysql -u nihongo_user -pnihongo123

# Trong MySQL prompt:
SHOW DATABASES;
USE nihongo;
SHOW TABLES;
SELECT * FROM users LIMIT 5;
```

### Với MariaDB/MySQL (Manual):

```bash
# Kết nối trực tiếp
mysql -h localhost -u nihongo_user -p nihongo

# Nhập password khi được hỏi
# Sau đó chạy các lệnh SQL như trên
```

---

## 📊 So sánh và Khuyến nghị

| Use Case                               | Database Khuyến nghị   | Lý do                                    |
| -------------------------------------- | ---------------------- | ---------------------------------------- |
| **Development Local**                  | SQLite                 | Setup nhanh, không cần server            |
| **Development Team**                   | MySQL/MariaDB (Docker) | Giống production, dễ sync                |
| **Production Small (< 100 users)**     | SQLite hoặc MySQL      | SQLite đủ dùng, MySQL nếu muốn chắc chắn |
| **Production Medium (100-1000 users)** | MySQL/MariaDB          | Performance tốt, scale được              |
| **Production Large (> 1000 users)**    | MariaDB + Replica      | High availability, load balancing        |

---

## 🆘 Troubleshooting

### ❌ Lỗi: Cannot connect to database

```bash
# Kiểm tra database đang chạy
# Docker:
docker ps | grep mariadb

# Local MySQL:
sudo systemctl status mysql

# macOS:
brew services list | grep mysql
```

### ❌ Lỗi: Access denied for user

```bash
# Kiểm tra user và password trong .env
# Thử kết nối thủ công:
mysql -h localhost -u nihongo_user -p
# Nhập password từ .env

# Nếu lỗi, tạo lại user:
mysql -u root -p
CREATE USER 'nihongo_user'@'localhost' IDENTIFIED BY 'new_password';
GRANT ALL PRIVILEGES ON nihongo.* TO 'nihongo_user'@'localhost';
```

### ❌ Lỗi: Database does not exist

```bash
# Tạo database:
mysql -u root -p
CREATE DATABASE nihongo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### ❌ Lỗi: SQLite - unable to open database file

```bash
# Tạo thư mục và fix permissions
mkdir -p database
chmod 755 database
```

---

## 🔒 Bảo mật Database

### 1. Thay đổi password mặc định

```bash
# Generate password mạnh
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### 2. Giới hạn quyền user

```sql
-- Chỉ cho phép kết nối từ localhost
CREATE USER 'nihongo_user'@'localhost' IDENTIFIED BY 'strong_password';

-- Chỉ cho phép CRUD, không cho DROP DATABASE
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX
ON nihongo.* TO 'nihongo_user'@'localhost';
```

### 3. Firewall (cho production)

```bash
# Ubuntu - Chỉ cho phép localhost kết nối MySQL
sudo ufw allow from 127.0.0.1 to any port 3306
```

### 4. Backup định kỳ

```bash
# SQLite - Copy file
cp ./database/nihongo.sqlite ./backups/nihongo-$(date +%Y%m%d).sqlite

# MySQL/MariaDB - Mysqldump
mysqldump -u nihongo_user -p nihongo > backup-$(date +%Y%m%d).sql

# Docker MySQL
docker exec nihongo-mariadb mysqldump -u nihongo_user -ppassword nihongo > backup.sql
```

---

## 📚 Tham khảo thêm

- [MariaDB Documentation](https://mariadb.org/documentation/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

---

**Version:** 1.0  
**Last Updated:** 2025-10-06
