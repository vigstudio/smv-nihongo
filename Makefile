# Makefile for SMV Nihongo Project
# Chạy: make <command>

.PHONY: help install dev start stop restart logs shell backup restore clean setup

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

help: ## Hiển thị trợ giúp
	@echo "$(BLUE)SMV Nihongo - Available Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-20s$(NC) %s\n", $$1, $$2}'

install: ## Cài đặt dependencies
	@echo "$(BLUE)Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

setup: install ## Setup hoàn chỉnh (Docker + DB + Dependencies)
	@echo "$(BLUE)Starting Docker services...$(NC)"
	docker-compose up -d
	@echo "$(BLUE)Waiting for MariaDB to be ready...$(NC)"
	@sleep 10
	@echo "$(BLUE)Initializing database...$(NC)"
	node database/init.js
	@echo "$(GREEN)✓ Setup completed!$(NC)"
	@echo "$(YELLOW)Run 'make start' to start the application$(NC)"

dev-setup: install ## Setup development environment (Docker + phpMyAdmin + DB)
	@echo "$(BLUE)Starting Docker services (dev mode)...$(NC)"
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
	@echo "$(BLUE)Waiting for MariaDB to be ready...$(NC)"
	@sleep 10
	@echo "$(BLUE)Initializing database...$(NC)"
	node database/init.js
	@echo "$(GREEN)✓ Dev setup completed!$(NC)"
	@echo "$(YELLOW)Application: http://localhost:9113$(NC)"
	@echo "$(YELLOW)phpMyAdmin: http://localhost:8080$(NC)"
	@echo "$(YELLOW)Adminer: http://localhost:8081$(NC)"

start: ## Chạy ứng dụng
	@echo "$(BLUE)Starting application...$(NC)"
	npm start

dev: ## Chạy ứng dụng với nodemon (auto-reload)
	@echo "$(BLUE)Starting application in dev mode...$(NC)"
	npx nodemon app.js

# Docker commands
docker-up: ## Khởi động Docker services
	@echo "$(BLUE)Starting Docker services...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✓ Docker services started$(NC)"

docker-up-dev: ## Khởi động Docker services (dev mode)
	@echo "$(BLUE)Starting Docker services (dev mode)...$(NC)"
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
	@echo "$(GREEN)✓ Docker services started$(NC)"
	@echo "$(YELLOW)phpMyAdmin: http://localhost:8080$(NC)"
	@echo "$(YELLOW)Adminer: http://localhost:8081$(NC)"

docker-down: ## Dừng Docker services
	@echo "$(BLUE)Stopping Docker services...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Docker services stopped$(NC)"

docker-down-dev: ## Dừng Docker services (dev mode)
	@echo "$(BLUE)Stopping Docker services (dev mode)...$(NC)"
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
	@echo "$(GREEN)✓ Docker services stopped$(NC)"

stop: docker-down ## Alias cho docker-down

restart: ## Restart Docker services
	@echo "$(BLUE)Restarting Docker services...$(NC)"
	docker-compose restart
	@echo "$(GREEN)✓ Docker services restarted$(NC)"

logs: ## Xem logs của MariaDB
	docker-compose logs -f mariadb

logs-all: ## Xem logs tất cả services
	docker-compose logs -f

status: ## Kiểm tra trạng thái Docker services
	@echo "$(BLUE)Docker services status:$(NC)"
	docker-compose ps

shell: ## Truy cập MariaDB shell
	@echo "$(BLUE)Connecting to MariaDB...$(NC)"
	@echo "$(YELLOW)Password: nihongo123$(NC)"
	docker-compose exec mariadb mysql -u nihongo_user -p nihongo

shell-root: ## Truy cập MariaDB shell với quyền root
	@echo "$(BLUE)Connecting to MariaDB as root...$(NC)"
	@echo "$(YELLOW)Password: rootpassword$(NC)"
	docker-compose exec mariadb mysql -u root -p

# Database commands
db-init: ## Khởi tạo database
	@echo "$(BLUE)Initializing database...$(NC)"
	node database/init.js
	@echo "$(GREEN)✓ Database initialized$(NC)"

db-reset: ## Reset database (xóa và tạo lại)
	@echo "$(RED)Warning: This will delete all data!$(NC)"
	@read -p "Are you sure? [y/N]: " confirm && [ "$$confirm" = "y" ] || exit 1
	@echo "$(BLUE)Resetting database...$(NC)"
	npm run reset
	@echo "$(GREEN)✓ Database reset completed$(NC)"

db-migrate: ## Chạy migrations
	@echo "$(BLUE)Running migrations...$(NC)"
	npm run migrate
	@echo "$(GREEN)✓ Migrations completed$(NC)"

backup: ## Backup database
	@echo "$(BLUE)Creating database backup...$(NC)"
	@mkdir -p backups
	docker-compose exec -T mariadb mysqldump -u root -prootpassword nihongo > backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)✓ Backup created in backups/$(NC)"

restore: ## Restore database từ backup (sử dụng: make restore FILE=backups/backup.sql)
	@if [ -z "$(FILE)" ]; then \
		echo "$(RED)Error: Please specify backup file$(NC)"; \
		echo "$(YELLOW)Usage: make restore FILE=backups/backup_20231201.sql$(NC)"; \
		exit 1; \
	fi
	@echo "$(BLUE)Restoring database from $(FILE)...$(NC)"
	docker-compose exec -T mariadb mysql -u root -prootpassword nihongo < $(FILE)
	@echo "$(GREEN)✓ Database restored$(NC)"

# Cleaning commands
clean: ## Dọn dẹp node_modules và cache
	@echo "$(BLUE)Cleaning up...$(NC)"
	rm -rf node_modules
	rm -f package-lock.json
	@echo "$(GREEN)✓ Cleanup completed$(NC)"

clean-all: clean docker-down ## Dọn dẹp toàn bộ (bao gồm Docker volumes)
	@echo "$(RED)Warning: This will delete all Docker volumes!$(NC)"
	@read -p "Are you sure? [y/N]: " confirm && [ "$$confirm" = "y" ] || exit 1
	docker-compose down -v
	@echo "$(GREEN)✓ Full cleanup completed$(NC)"

# Testing and linting (for future use)
test: ## Chạy tests (chưa implement)
	@echo "$(YELLOW)Tests not implemented yet$(NC)"

lint: ## Chạy linter (chưa implement)
	@echo "$(YELLOW)Linter not implemented yet$(NC)"

# Info commands
info: ## Hiển thị thông tin hệ thống
	@echo "$(BLUE)System Information:$(NC)"
	@echo "Node version: $$(node --version)"
	@echo "npm version: $$(npm --version)"
	@echo "Docker version: $$(docker --version)"
	@echo "Docker Compose version: $$(docker-compose --version)"
	@echo ""
	@echo "$(BLUE)Project URLs:$(NC)"
	@echo "Application: $(YELLOW)http://localhost:9113$(NC)"
	@echo "phpMyAdmin: $(YELLOW)http://localhost:8080$(NC) (only in dev mode)"
	@echo "Adminer: $(YELLOW)http://localhost:8081$(NC) (only in dev mode)"

check-env: ## Kiểm tra file .env
	@if [ -f .env ]; then \
		echo "$(GREEN)✓ .env file exists$(NC)"; \
		echo "$(BLUE)Current configuration:$(NC)"; \
		cat .env | grep -v "PASSWORD" | grep -v "SECRET"; \
	else \
		echo "$(RED)✗ .env file not found$(NC)"; \
		echo "$(YELLOW)Please create .env file from ENV_SETUP.md$(NC)"; \
	fi

# Default target
.DEFAULT_GOAL := help

