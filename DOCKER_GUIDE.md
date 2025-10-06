# 🐳 Hướng Dẫn Docker Chi Tiết

Hướng dẫn sử dụng Docker cho dự án SMV Nihongo.

## 📋 Mục Lục

- [Giới Thiệu](#giới-thiệu)
- [Cài Đặt Docker](#cài-đặt-docker)
- [Docker Compose Files](#docker-compose-files)
- [Các Lệnh Thường Dùng](#các-lệnh-thường-dùng)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Production Deployment](#production-deployment)

## Giới Thiệu

Docker giúp đóng gói ứng dụng và dependencies vào container, đảm bảo ứng dụng chạy nhất quán trên mọi môi trường.

### Lợi Ích

✅ **Dễ dàng setup**: Không cần cài MariaDB trực tiếp  
✅ **Nhất quán**: Môi trường giống nhau trên mọi máy  
✅ **Cách ly**: Database chạy trong container riêng  
✅ **Dễ xóa**: Xóa container không ảnh hưởng hệ thống

## Cài Đặt Docker

### Windows

1. Tải **Docker Desktop** từ [docker.com](https://www.docker.com/products/docker-desktop)
2. Chạy installer
3. Khởi động lại máy nếu được yêu cầu
4. Mở Docker Desktop
5. Kiểm tra cài đặt:
   ```powershell
   docker --version
   docker-compose --version
   ```

**Lưu ý Windows**:

- Cần bật WSL 2 (Windows Subsystem for Linux)
- Cần bật Virtualization trong BIOS

### macOS

```bash
# Sử dụng Homebrew
brew install --cask docker

# Hoặc tải từ docker.com
# https://www.docker.com/products/docker-desktop

# Mở Docker Desktop từ Applications
# Kiểm tra
docker --version
docker-compose --version
```

### Linux (Ubuntu/Debian)

```bash
# Cài đặt Docker Engine
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Thêm user vào docker group
sudo usermod -aG docker $USER

# Cài Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout và login lại để áp dụng quyền
# Kiểm tra
docker --version
docker-compose --version
```

## Docker Compose Files

Dự án có 2 files Docker Compose:

### 1. docker-compose.yml (Production)

File chính, bao gồm:

- **MariaDB 11.2** với cấu hình production
- **Health checks** để đảm bảo database sẵn sàng
- **Persistent volumes** để lưu trữ dữ liệu

```bash
# Chạy
docker-compose up -d

# Dừng
docker-compose down
```

### 2. docker-compose.dev.yml (Development)

File mở rộng cho development, thêm:

- **phpMyAdmin** - Web UI quản lý database (port 8080)
- **Adminer** - Alternative lightweight DB manager (port 8081)
- **Redis** (commented) - Cache cho tương lai

```bash
# Chạy cả 2 files
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Hoặc dùng Makefile
make docker-up-dev
```

## Các Lệnh Thường Dùng

### Khởi Động và Dừng

```bash
# Khởi động (chế độ detached)
docker-compose up -d

# Khởi động và xem logs
docker-compose up

# Dừng containers
docker-compose stop

# Dừng và xóa containers (giữ volumes)
docker-compose down

# Dừng và xóa tất cả (bao gồm volumes - MẤT DỮ LIỆU!)
docker-compose down -v
```

### Xem Thông Tin

```bash
# Xem danh sách containers
docker-compose ps

# Xem logs
docker-compose logs

# Xem logs realtime
docker-compose logs -f

# Xem logs của service cụ thể
docker-compose logs -f mariadb

# Xem stats (CPU, Memory)
docker stats
```

### Quản Lý Containers

```bash
# Restart service
docker-compose restart mariadb

# Restart tất cả
docker-compose restart

# Xem resource usage
docker-compose top

# Inspect container
docker inspect smv-nihongo-mariadb
```

### Truy Cập Database

```bash
# Truy cập MariaDB shell
docker-compose exec mariadb mysql -u nihongo_user -p nihongo
# Password: nihongo123

# Truy cập với quyền root
docker-compose exec mariadb mysql -u root -p
# Password: rootpassword

# Chạy command trực tiếp
docker-compose exec mariadb mysql -u root -prootpassword -e "SHOW DATABASES;"
```

### Backup và Restore

```bash
# Backup database
docker-compose exec mariadb mysqldump -u root -prootpassword nihongo > backup.sql

# Backup với timestamp
docker-compose exec mariadb mysqldump -u root -prootpassword nihongo > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore database
docker-compose exec -T mariadb mysql -u root -prootpassword nihongo < backup.sql

# Backup volumes
docker run --rm \
  -v smv-nihongo_mariadb_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/mariadb_volume_backup.tar.gz -C /data .
```

### Cleaning Up

```bash
# Xóa containers dừng
docker container prune

# Xóa images không dùng
docker image prune

# Xóa volumes không dùng
docker volume prune

# Xóa tất cả (NGUY HIỂM!)
docker system prune -a --volumes
```

## Environment Variables

Docker Compose sử dụng file `.env` để load biến môi trường.

### File .env

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=nihongo_user
DB_PASSWORD=nihongo123
DB_NAME=nihongo
DB_ROOT_PASSWORD=rootpassword

# App
PORT=9113
NODE_ENV=development
```

### Override Variables

```bash
# Cách 1: Inline
DB_PORT=3307 docker-compose up -d

# Cách 2: Export
export DB_PORT=3307
docker-compose up -d

# Cách 3: File .env.local (không commit)
# Docker Compose tự động load .env.local nếu có
```

## Troubleshooting

### Port Already in Use

**Lỗi**: `Bind for 0.0.0.0:3306 failed: port is already allocated`

**Giải pháp**:

```bash
# Kiểm tra process đang dùng port
# Windows
netstat -ano | findstr :3306
# Linux/macOS
lsof -i :3306

# Stop service đang dùng port
# Windows (MySQL service)
net stop MySQL80

# Linux/macOS
sudo systemctl stop mysql

# Hoặc đổi port trong .env
DB_PORT=3307
```

### Cannot Connect to Database

**Triệu chứng**: App không kết nối được MariaDB

**Giải pháp**:

```bash
# 1. Kiểm tra container đang chạy
docker-compose ps

# 2. Xem logs
docker-compose logs mariadb

# 3. Kiểm tra health
docker inspect smv-nihongo-mariadb | grep -A 10 Health

# 4. Test kết nối
docker-compose exec mariadb mysql -u nihongo_user -p -e "SELECT 1"

# 5. Restart
docker-compose restart mariadb

# 6. Kiểm tra network
docker network inspect smv-nihongo_nihongo-network
```

### Volume Permission Issues

**Lỗi**: Permission denied khi access volumes

**Giải pháp**:

```bash
# Linux: Kiểm tra ownership
docker run --rm -v smv-nihongo_mariadb_data:/data alpine ls -la /data

# Fix permissions (nếu cần)
docker run --rm -v smv-nihongo_mariadb_data:/data alpine chown -R 999:999 /data
```

### Container Keeps Restarting

```bash
# Xem logs để tìm lỗi
docker-compose logs mariadb

# Xem exit code
docker inspect smv-nihongo-mariadb | grep -A 5 "State"

# Thử chạy với logs trực tiếp
docker-compose up mariadb
```

### Out of Disk Space

```bash
# Xem dung lượng Docker đang dùng
docker system df

# Dọn dẹp
docker system prune -a
docker volume prune

# Xem dung lượng volumes
docker system df -v | grep -A 20 "Local Volumes"
```

## Production Deployment

### Best Practices

1. **Đổi passwords mặc định**

   ```env
   DB_PASSWORD=<strong-password>
   DB_ROOT_PASSWORD=<strong-root-password>
   SESSION_SECRET=<random-secret>
   ```

2. **Sử dụng Docker secrets** (cho Docker Swarm)

   ```yaml
   services:
     mariadb:
       secrets:
         - db_password
   secrets:
     db_password:
       external: true
   ```

3. **Limit resources**

   ```yaml
   services:
     mariadb:
       deploy:
         resources:
           limits:
             cpus: "2.0"
             memory: 2G
           reservations:
             cpus: "1.0"
             memory: 1G
   ```

4. **Regular backups**

   ```bash
   # Cron job để backup hàng ngày
   0 2 * * * docker-compose exec mariadb mysqldump -u root -p$ROOT_PASSWORD nihongo | gzip > /backups/backup_$(date +\%Y\%m\%d).sql.gz
   ```

5. **Monitoring**
   ```yaml
   # Thêm Prometheus exporter
   services:
     mariadb-exporter:
       image: prom/mysqld-exporter
       environment:
         DATA_SOURCE_NAME: "user:password@(mariadb:3306)/nihongo"
   ```

### Docker Swarm Deployment

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml nihongo

# Scale service
docker service scale nihongo_mariadb=3

# Update service
docker service update nihongo_mariadb
```

### Docker in CI/CD

```yaml
# GitHub Actions example
- name: Start MariaDB
  run: |
    docker-compose up -d mariadb
    sleep 10

- name: Run tests
  run: npm test

- name: Stop services
  run: docker-compose down
```

## Useful Docker Commands

### Advanced

```bash
# Xem tất cả networks
docker network ls

# Inspect network
docker network inspect smv-nihongo_nihongo-network

# Connect container vào network
docker network connect network_name container_name

# Execute command trong container
docker-compose exec mariadb bash

# Copy files từ/vào container
docker cp backup.sql smv-nihongo-mariadb:/tmp/
docker cp smv-nihongo-mariadb:/tmp/backup.sql ./

# Export/Import container
docker export smv-nihongo-mariadb > mariadb.tar
docker import mariadb.tar my-mariadb:latest

# Save/Load image
docker save mariadb:11.2 > mariadb-11.2.tar
docker load < mariadb-11.2.tar
```

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MariaDB Docker Hub](https://hub.docker.com/_/mariadb)
- [Best Practices Guide](https://docs.docker.com/develop/dev-best-practices/)

## Câu Hỏi Thường Gặp

**Q: Docker Compose V1 vs V2?**  
A: V2 đã được tích hợp vào Docker CLI. Dùng `docker compose` thay vì `docker-compose`.

**Q: Có nên dùng Docker trong production?**  
A: Có, nhưng nên cân nhắc Kubernetes cho scale lớn.

**Q: Làm sao để update MariaDB version?**  
A: Đổi tag trong docker-compose.yml và chạy `docker-compose up -d --build`

**Q: Volume data bị mất khi nào?**  
A: Chỉ khi chạy `docker-compose down -v` hoặc `docker volume rm`

---

Có câu hỏi? Tạo issue trên GitHub! 🐳
