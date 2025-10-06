# Hướng Dẫn Cấu Hình Biến Môi Trường

## Tạo file .env

Tạo file `.env` trong thư mục gốc của dự án với nội dung sau:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=nihongo_user
DB_PASSWORD=nihongo123
DB_NAME=nihongo
DB_ROOT_PASSWORD=rootpassword

# Application Configuration
PORT=9113
NODE_ENV=development

# Session Secret (Thay đổi trong production)
SESSION_SECRET=smv-nihongo-secret-key-change-this-in-production
```

## Giải Thích Các Biến

### Database Configuration

- **DB_HOST**: Địa chỉ host của MariaDB

  - `localhost` khi chạy trên máy local hoặc Docker
  - Địa chỉ IP server khi chạy remote

- **DB_PORT**: Port của MariaDB (mặc định 3306)

- **DB_USER**: Username để kết nối database

  - Đối với Docker: `nihongo_user`
  - Đối với cài đặt thủ công: user bạn đã tạo

- **DB_PASSWORD**: Password của database user

- **DB_NAME**: Tên database (mặc định: `nihongo`)

- **DB_ROOT_PASSWORD**: Password root của MariaDB
  - Chỉ cần cho Docker Compose
  - Không cần khi cài đặt thủ công

### Application Configuration

- **PORT**: Port để chạy ứng dụng web (mặc định: 9113)

- **NODE_ENV**: Môi trường chạy
  - `development` - Phát triển
  - `production` - Sản xuất

### Security

- **SESSION_SECRET**: Key bí mật cho session
  - ⚠️ **QUAN TRỌNG**: Thay đổi giá trị này trong môi trường production
  - Sử dụng chuỗi ngẫu nhiên dài và phức tạp

## Lệnh Tạo File

### Windows (PowerShell)

```powershell
@"
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=nihongo_user
DB_PASSWORD=nihongo123
DB_NAME=nihongo
DB_ROOT_PASSWORD=rootpassword

# Application Configuration
PORT=9113
NODE_ENV=development

# Session Secret
SESSION_SECRET=smv-nihongo-secret-key-change-this-in-production
"@ | Out-File -FilePath .env -Encoding UTF8
```

### Linux/macOS

```bash
cat > .env << 'EOF'
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=nihongo_user
DB_PASSWORD=nihongo123
DB_NAME=nihongo
DB_ROOT_PASSWORD=rootpassword

# Application Configuration
PORT=9113
NODE_ENV=development

# Session Secret
SESSION_SECRET=smv-nihongo-secret-key-change-this-in-production
EOF
```

## Lưu Ý Bảo Mật

1. **Không commit file .env** vào Git

   - File `.gitignore` đã được cấu hình để bỏ qua file này

2. **Thay đổi password mặc định** trong production

   - Sử dụng password mạnh và phức tạp
   - Không dùng password mặc định như `nihongo123`

3. **Tạo SESSION_SECRET ngẫu nhiên**:

   ```bash
   # Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

   # Hoặc dùng online generator
   # https://www.random.org/strings/
   ```

4. **Backup cấu hình** nhưng lưu ở nơi an toàn
   - Không lưu trên repository công khai
   - Sử dụng password manager hoặc vault
