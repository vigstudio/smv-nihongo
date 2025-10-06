# 🚀 Hướng Dẫn Nhanh - SMV Nihongo

Hướng dẫn cài đặt nhanh nhất để chạy dự án trong 5 phút!

## ⚡ Cài Đặt Nhanh với Docker

### Bước 1: Cài đặt Docker

- **Windows/Mac**: Tải [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux**:
  ```bash
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  ```

### Bước 2: Clone dự án

```bash
git clone https://github.com/vigstudio/smv-nihongo.git
cd smv-nihongo
```

### Bước 3: Tạo file .env

```bash
# Windows PowerShell
Copy-Item ENV_SETUP.md .env.example
# Sau đó tạo file .env thủ công từ nội dung trong ENV_SETUP.md

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

### Bước 4: Khởi động MariaDB

```bash
docker-compose up -d
```

### Bước 5: Cài đặt dependencies

```bash
npm install
```

### Bước 6: Khởi tạo database

```bash
node database/init.js
```

### Bước 7: Chạy ứng dụng

```bash
npm start
```

### Bước 8: Truy cập

Mở trình duyệt: **http://localhost:9113**

## 🎯 Đăng ký tài khoản đầu tiên

1. Truy cập: http://localhost:9113/auth/register
2. Điền thông tin và đăng ký
3. Đăng nhập và bắt đầu học!

## 📋 Các Lệnh Thường Dùng

```bash
# Xem logs MariaDB
docker-compose logs -f mariadb

# Dừng MariaDB
docker-compose stop

# Khởi động lại MariaDB
docker-compose restart

# Xóa database và tạo lại
npm run reset

# Truy cập MariaDB shell
docker-compose exec mariadb mysql -u nihongo_user -p
# Password: nihongo123
```

## 🛠 Troubleshooting

### Port 3306 đã được sử dụng?

```bash
# Kiểm tra service nào đang dùng port
# Windows
netstat -ano | findstr :3306

# Linux/macOS
lsof -i :3306

# Đổi port trong .env
DB_PORT=3307
# Và trong docker-compose.yml
ports:
  - "3307:3306"
```

### Port 9113 đã được sử dụng?

```bash
# Đổi port trong .env
PORT=9114
```

### Không kết nối được database?

```bash
# Kiểm tra MariaDB đang chạy
docker-compose ps

# Xem logs
docker-compose logs mariadb

# Restart
docker-compose restart mariadb
```

### Lỗi npm install?

```bash
# Xóa node_modules và install lại
rm -rf node_modules package-lock.json
npm install

# Windows
rmdir /s /q node_modules
del package-lock.json
npm install
```

## 📚 Tài Liệu Đầy Đủ

Xem [README.md](README.md) để biết thêm chi tiết về:

- Cấu trúc dự án
- Tính năng
- Cách đóng góp
- API documentation

## 💡 Tips

1. **Dùng nodemon** để tự động restart khi code thay đổi:

   ```bash
   npm install -g nodemon
   nodemon app.js
   ```

2. **Bật phpMyAdmin** để quản lý database dễ dàng:

   - Bỏ comment phần `phpmyadmin` trong `docker-compose.yml`
   - Chạy `docker-compose up -d`
   - Truy cập: http://localhost:8080

3. **Backup database** định kỳ:
   ```bash
   docker-compose exec mariadb mysqldump -u root -p nihongo > backup_$(date +%Y%m%d).sql
   ```

## 🎉 Xong rồi!

Chúc bạn học tiếng Nhật vui vẻ! がんばって！🎌
