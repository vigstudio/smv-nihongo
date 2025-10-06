# 🚀 Hướng Dẫn Deploy Production

Hướng dẫn chi tiết deploy dự án SMV Nihongo lên production server.

---

## 📋 Mục Lục

- [Yêu Cầu](#yêu-cầu)
- [Chuẩn Bị](#chuẩn-bị)
- [Deploy Bước 1: Setup Database](#deploy-bước-1-setup-database)
- [Deploy Bước 2: Setup Code](#deploy-bước-2-setup-code)
- [Deploy Bước 3: Chạy Ứng Dụng](#deploy-bước-3-chạy-ứng-dụng)
- [Deploy Bước 4: Setup Nginx](#deploy-bước-4-setup-nginx)
- [Deploy Bước 5: Setup SSL](#deploy-bước-5-setup-ssl)
- [Troubleshooting](#troubleshooting)

---

## Yêu Cầu

- **Server**: VPS hoặc Hosting có quyền SSH
- **OS**: Linux (Ubuntu 20.04+, CentOS 7+, Debian 10+)
- **Node.js**: Version 14.x trở lên
- **MariaDB/MySQL**: Version 10.x+ / 8.x+
- **RAM**: Tối thiểu 1GB
- **Disk**: Tối thiểu 5GB

---

## Chuẩn Bị

### 1. Kiểm tra Node.js

```bash
node --version  # Cần >= 14.x
npm --version
```

Nếu chưa có Node.js:

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

### 2. Kiểm tra MariaDB/MySQL

```bash
mysql --version
```

Nếu chưa có:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mariadb-server

# CentOS/RHEL
sudo yum install mariadb-server
sudo systemctl start mariadb
sudo systemctl enable mariadb
```

---

## Deploy Bước 1: Setup Database

### 1. Đăng nhập MySQL/MariaDB

```bash
mysql -u root -p
```

### 2. Tạo Database và User

```sql
-- Tạo database
CREATE DATABASE nihongo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tạo user (thay đổi password)
CREATE USER 'nihongo_user'@'localhost' IDENTIFIED BY 'your_strong_password_here';

-- Cấp quyền
GRANT ALL PRIVILEGES ON nihongo.* TO 'nihongo_user'@'localhost';
FLUSH PRIVILEGES;

-- Kiểm tra
SHOW DATABASES;
SELECT User, Host FROM mysql.user WHERE User = 'nihongo_user';

EXIT;
```

### 3. Test kết nối

```bash
mysql -u nihongo_user -p nihongo
# Nhập password và kiểm tra có vào được database không
```

---

## Deploy Bước 2: Setup Code

### 1. Clone code từ Git

```bash
# Di chuyển đến thư mục web
cd /home/your_user/

# Clone repository
git clone https://github.com/vigstudio/smv-nihongo.git
cd smv-nihongo
```

Hoặc upload code qua FTP/SFTP nếu không dùng Git.

### 2. Cài đặt dependencies

```bash
# Production dependencies only
npm install --production

# Nếu gặp lỗi permission
sudo npm install --production --unsafe-perm=true --allow-root
```

### 3. Tạo file .env

```bash
# Tạo file .env
nano .env
```

Nội dung file `.env`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=nihongo_user
DB_PASSWORD=your_strong_password_here
DB_NAME=nihongo

# Application Configuration
PORT=9113
NODE_ENV=production

# Session Secret - PHẢI ĐỔI!
# Tạo random string: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SESSION_SECRET=your_random_secret_key_minimum_32_characters_long
```

### 4. Khởi tạo Database (tạo tables)

```bash
node database/init.js
```

Kết quả thành công:

```
Đã kết nối thành công với MariaDB
Đã khởi tạo database thành công
```

### 5. Test chạy ứng dụng

```bash
npm start
```

Nếu thành công sẽ thấy:

```
Đã kết nối thành công với MariaDB
Đã khởi tạo database thành công
Server đang chạy tại http://localhost:9113
```

Nhấn `Ctrl+C` để dừng.

---

## Deploy Bước 3: Chạy Ứng Dụng

### Option 1: PM2 (Khuyến nghị) ⭐

PM2 giúp quản lý process, auto-restart, logs, monitoring.

#### Cài đặt PM2

```bash
sudo npm install -g pm2
```

#### Start ứng dụng

```bash
# Start với PM2
pm2 start app.js --name nihongo

# Hoặc với config chi tiết hơn
pm2 start app.js --name nihongo \
  --watch \
  --ignore-watch="node_modules" \
  --max-memory-restart 500M \
  --log /var/log/pm2/nihongo.log
```

#### Các lệnh PM2 thường dùng

```bash
# Xem trạng thái
pm2 status

# Xem logs real-time
pm2 logs nihongo

# Xem logs lỗi
pm2 logs nihongo --err

# Restart app
pm2 restart nihongo

# Stop app
pm2 stop nihongo

# Delete app
pm2 delete nihongo

# Monitor resources
pm2 monit

# Xem info chi tiết
pm2 show nihongo
```

#### Setup auto-start khi reboot

```bash
# Tạo startup script
pm2 startup

# Chạy lệnh được hiển thị (thường là sudo env PATH=...)
# Ví dụ:
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u your_user --hp /home/your_user

# Lưu danh sách apps hiện tại
pm2 save

# Test reboot
sudo reboot
# Sau khi server khởi động lại, check:
pm2 status
```

### Option 2: Screen (Simple)

```bash
# Cài đặt screen
sudo apt install screen

# Tạo session mới
screen -S nihongo

# Chạy app
npm start

# Detach: Nhấn Ctrl+A rồi D

# Attach lại
screen -r nihongo

# List sessions
screen -ls

# Kill session
screen -X -S nihongo quit
```

### Option 3: systemd Service

Tạo file `/etc/systemd/system/nihongo.service`:

```ini
[Unit]
Description=SMV Nihongo App
After=network.target mariadb.service

[Service]
Type=simple
User=your_user
WorkingDirectory=/home/your_user/smv-nihongo
ExecStart=/usr/bin/node app.js
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=nihongo

[Install]
WantedBy=multi-user.target
```

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable và start service
sudo systemctl enable nihongo
sudo systemctl start nihongo

# Check status
sudo systemctl status nihongo

# Xem logs
sudo journalctl -u nihongo -f
```

---

## Deploy Bước 4: Setup Nginx

### 1. Cài đặt Nginx

```bash
# Ubuntu/Debian
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. Tạo config Nginx

Tạo file `/etc/nginx/sites-available/nihongo`:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name your-domain.com www.your-domain.com;

    # Logs
    access_log /var/log/nginx/nihongo_access.log;
    error_log /var/log/nginx/nihongo_error.log;

    # Proxy to Node.js app
    location / {
        proxy_pass http://localhost:9113;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files (optional - để Node serve hoặc Nginx serve)
    location /css/ {
        alias /home/your_user/smv-nihongo/public/css/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /js/ {
        alias /home/your_user/smv-nihongo/public/js/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /audio/ {
        alias /home/your_user/smv-nihongo/public/audio/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /assets/ {
        alias /home/your_user/smv-nihongo/public/assets/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 3. Enable site

```bash
# Ubuntu/Debian
sudo ln -s /etc/nginx/sites-available/nihongo /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 4. Test

```bash
curl -I http://your-domain.com
```

---

## Deploy Bước 5: Setup SSL

### Sử dụng Let's Encrypt (Free SSL)

```bash
# Cài đặt Certbot
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo yum install certbot python3-certbot-nginx

# Tạo SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

Certbot sẽ tự động:

- Tạo SSL certificate
- Cập nhật Nginx config
- Setup auto-renewal

---

## Troubleshooting

### Lỗi: Port đã được sử dụng

```bash
# Tìm process đang dùng port 9113
sudo lsof -i :9113
# Hoặc
sudo netstat -tulpn | grep 9113

# Kill process
sudo kill -9 <PID>

# Hoặc đổi PORT trong .env
PORT=9114
```

### Lỗi: Access denied database

```bash
# Kiểm tra user có quyền không
mysql -u nihongo_user -p

# Nếu không vào được, grant lại quyền
mysql -u root -p
GRANT ALL PRIVILEGES ON nihongo.* TO 'nihongo_user'@'localhost';
FLUSH PRIVILEGES;
```

### Lỗi: Cannot find module

```bash
# Cài lại dependencies
rm -rf node_modules package-lock.json
npm install --production
```

### Lỗi: Permission denied

```bash
# Fix permissions
sudo chown -R $USER:$USER /home/your_user/smv-nihongo
chmod -R 755 /home/your_user/smv-nihongo
```

### App crash liên tục

```bash
# Xem logs PM2
pm2 logs nihongo --lines 100

# Xem logs systemd
sudo journalctl -u nihongo -n 100 -f

# Check memory
free -m
pm2 monit
```

### Nginx 502 Bad Gateway

```bash
# Check app đang chạy
pm2 status
# Hoặc
curl http://localhost:9113

# Check Nginx logs
sudo tail -f /var/log/nginx/nihongo_error.log

# Check firewall
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## 🔒 Security Checklist

- [ ] Đổi `SESSION_SECRET` thành chuỗi ngẫu nhiên mạnh
- [ ] Database password mạnh (tối thiểu 16 ký tự)
- [ ] Không commit file `.env` vào Git
- [ ] Setup firewall (ufw, iptables)
- [ ] Chỉ mở ports cần thiết (80, 443, SSH)
- [ ] Disable root SSH login
- [ ] Setup fail2ban
- [ ] Regular security updates: `sudo apt update && sudo apt upgrade`
- [ ] Backup database định kỳ
- [ ] Monitor logs thường xuyên

---

## 📊 Monitoring

### Setup PM2 Web Dashboard

```bash
pm2 install pm2-server-monit
pm2 web
# Access at http://your-server-ip:9615
```

### Database Monitoring

```bash
# Check connections
mysql -u root -p -e "SHOW PROCESSLIST;"

# Check slow queries
mysql -u root -p -e "SHOW VARIABLES LIKE 'slow_query%';"
```

---

## 🔄 Update Code

```bash
# Stop app
pm2 stop nihongo

# Backup trước khi update
cp -r /home/your_user/smv-nihongo /home/your_user/smv-nihongo.backup

# Pull latest code
cd /home/your_user/smv-nihongo
git pull origin main

# Update dependencies
npm install --production

# Chạy migrations nếu có
node database/init.js

# Start lại app
pm2 restart nihongo

# Xem logs
pm2 logs nihongo
```

---

## 💾 Backup Strategy

### Daily Database Backup

Tạo script `/home/your_user/backup_db.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/home/your_user/backups"
DB_NAME="nihongo"
DB_USER="nihongo_user"
DB_PASS="your_password"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/nihongo_$DATE.sql.gz

# Xóa backup cũ hơn 7 ngày
find $BACKUP_DIR -name "nihongo_*.sql.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_DIR/nihongo_$DATE.sql.gz"
```

```bash
# Cấp quyền thực thi
chmod +x /home/your_user/backup_db.sh

# Setup cron job (chạy hàng ngày lúc 2h sáng)
crontab -e
# Thêm dòng:
0 2 * * * /home/your_user/backup_db.sh >> /home/your_user/backup_log.txt 2>&1
```

---

## 📞 Support

Nếu gặp vấn đề:

1. Kiểm tra logs: `pm2 logs nihongo`
2. Kiểm tra README.md
3. Tạo issue trên GitHub với thông tin chi tiết

---

**Chúc bạn deploy thành công! 🎉**
