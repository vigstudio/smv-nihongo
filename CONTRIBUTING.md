# Hướng Dẫn Đóng Góp

Cảm ơn bạn đã quan tâm đến việc đóng góp cho SMV Nihongo! 🎌

Chúng tôi rất hoan nghênh mọi đóng góp từ cộng đồng, dù là sửa lỗi nhỏ, thêm tính năng mới, cải thiện documentation, hay báo cáo bug.

## 📋 Mục Lục

- [Code of Conduct](#code-of-conduct)
- [Cách Bắt Đầu](#cách-bắt-đầu)
- [Quy Trình Đóng Góp](#quy-trình-đóng-góp)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Báo Cáo Bug](#báo-cáo-bug)
- [Đề Xuất Tính Năng](#đề-xuất-tính-năng)

## Code of Conduct

Dự án này tuân theo Contributor Covenant Code of Conduct. Khi tham gia, bạn được kỳ vọng sẽ tuân theo bộ quy tắc này.

### Nguyên Tắc Cơ Bản

- Tôn trọng mọi người tham gia
- Chấp nhận phê bình xây dựng
- Tập trung vào điều tốt nhất cho cộng đồng
- Thể hiện sự đồng cảm với các thành viên khác

## Cách Bắt Đầu

### 1. Fork và Clone Repository

```bash
# Fork repository trên GitHub
# Sau đó clone về máy

git clone https://github.com/YOUR_USERNAME/smv-nihongo.git
cd smv-nihongo

# Thêm upstream remote
git remote add upstream https://github.com/vigstudio/smv-nihongo.git
```

### 2. Setup Development Environment

```bash
# Sử dụng Makefile (khuyến nghị)
make dev-setup

# Hoặc thủ công
npm install
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
node database/init.js
```

### 3. Tạo Branch Mới

```bash
# Luôn tạo branch từ main mới nhất
git checkout main
git pull upstream main

# Tạo branch mới với tên mô tả
git checkout -b feature/ten-tinh-nang
# hoặc
git checkout -b fix/mo-ta-loi
```

## Quy Trình Đóng Góp

### Types of Contributions

#### 🐛 Bug Fixes

- Sửa lỗi trong code
- Sửa lỗi UI/UX
- Sửa lỗi typo trong documentation

#### ✨ Features

- Thêm tính năng mới
- Cải thiện tính năng hiện có
- Tối ưu hiệu suất

#### 📚 Documentation

- Cải thiện README
- Thêm code comments
- Viết hướng dẫn sử dụng

#### 🎨 Design

- Cải thiện UI/UX
- Responsive design
- Accessibility improvements

#### 🧪 Testing

- Viết unit tests
- Integration tests
- E2E tests

## Coding Standards

### JavaScript Style Guide

```javascript
// ✅ Good
function getUserName(userId) {
  const user = getUserById(userId);
  return user ? user.name : null;
}

// ❌ Bad
function getusername(id) {
  var u = getUserById(id);
  return u ? u.name : null;
}
```

### Quy Tắc Chung

1. **Indentation**: Sử dụng 4 spaces (không dùng tabs)
2. **Naming Convention**:

   - Variables: camelCase (`userName`, `isActive`)
   - Functions: camelCase (`getUserData`, `calculateTotal`)
   - Classes: PascalCase (`UserController`, `GameService`)
   - Constants: UPPER_SNAKE_CASE (`MAX_ATTEMPTS`, `API_URL`)
   - Files: camelCase hoặc kebab-case (`userController.js`, `game-vocabulary.js`)

3. **Comments**:

   ```javascript
   // ✅ Good - mô tả WHY
   // Sử dụng bcrypt để hash password vì lý do bảo mật
   const hashedPassword = await bcrypt.hash(password, 10);

   // ❌ Bad - chỉ mô tả WHAT (code đã tự mô tả)
   // Hash password
   const hashedPassword = await bcrypt.hash(password, 10);
   ```

4. **Functions**:

   - Mỗi function chỉ làm một việc
   - Tên function nên là động từ
   - Function không nên quá dài (< 50 lines)

5. **Error Handling**:
   ```javascript
   // ✅ Good
   try {
     const result = await someAsyncOperation();
     return result;
   } catch (error) {
     console.error("Error in someAsyncOperation:", error);
     throw error; // hoặc return error response
   }
   ```

### Database Queries

```javascript
// ✅ Good - sử dụng parameterized queries
const user = await getQuery("SELECT * FROM users WHERE id = ?", [userId]);

// ❌ Bad - dễ bị SQL injection
const user = await getQuery(`SELECT * FROM users WHERE id = ${userId}`);
```

### EJS Templates

```ejs
<!-- ✅ Good - structured và có comments -->
<div class="card">
    <div class="card-header">
        <h3><%= title %></h3>
    </div>
    <div class="card-body">
        <%- include('partials/content') %>
    </div>
</div>

<!-- ❌ Bad - không có structure -->
<div><h3><%= title %></h3><%- include('partials/content') %></div>
```

## Commit Messages

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Tính năng mới
- `fix`: Sửa lỗi
- `docs`: Thay đổi documentation
- `style`: Thay đổi không ảnh hưởng code (formatting, spaces, etc)
- `refactor`: Refactor code
- `perf`: Cải thiện performance
- `test`: Thêm hoặc sửa tests
- `chore`: Thay đổi build process, tools, dependencies

### Examples

```bash
# ✅ Good commits
feat(vocabulary): thêm chức năng lọc từ vựng theo bài học
fix(auth): sửa lỗi redirect sau khi đăng nhập
docs(readme): cập nhật hướng dẫn cài đặt Docker
refactor(db): cải thiện connection pooling

# ❌ Bad commits
update
fix bug
thay đổi
```

### Commit Message Guidelines

1. Sử dụng tiếng Việt hoặc tiếng Anh (nhất quán trong cả PR)
2. Subject line không quá 50 ký tự
3. Body giải thích CHI TIẾT về thay đổi (nếu cần)
4. Reference đến issue nếu có: `Fixes #123`

## Pull Request Process

### 1. Trước Khi Submit PR

```bash
# Đảm bảo code của bạn chạy được
npm start

# Kiểm tra không có lỗi lint (nếu có)
npm run lint

# Pull latest changes từ upstream
git checkout main
git pull upstream main
git checkout your-branch
git rebase main

# Push lên fork của bạn
git push origin your-branch
```

### 2. Creating Pull Request

1. Đi đến repository trên GitHub
2. Click "New Pull Request"
3. Chọn base: `main` và compare: `your-branch`
4. Điền thông tin PR:

```markdown
## Mô Tả

Mô tả ngắn gọn về thay đổi của bạn

## Loại Thay Đổi

- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change
- [ ] Documentation update

## Checklist

- [ ] Code của tôi tuân theo style guide
- [ ] Tôi đã test kỹ các thay đổi
- [ ] Tôi đã cập nhật documentation (nếu cần)
- [ ] Không có lỗi hay warnings mới
- [ ] Tôi đã thêm comments cho code phức tạp

## Screenshots (nếu có)

(Thêm screenshots nếu thay đổi UI)

## Related Issues

Closes #123
```

### 3. Code Review Process

- Maintainers sẽ review PR của bạn
- Trả lời comments và thực hiện các thay đổi được yêu cầu
- Khi được approve, PR sẽ được merge

### 4. Sau Khi Merge

```bash
# Xóa branch local
git checkout main
git pull upstream main
git branch -d your-branch

# Xóa branch remote (optional)
git push origin --delete your-branch
```

## Báo Cáo Bug

### Trước Khi Báo Cáo

1. Kiểm tra [Issues](https://github.com/vigstudio/smv-nihongo/issues) xem bug đã được báo cáo chưa
2. Đảm bảo bạn đang dùng phiên bản mới nhất
3. Thử reproduce bug với môi trường sạch

### Bug Report Template

```markdown
**Mô Tả Bug**
Mô tả rõ ràng và ngắn gọn về bug

**Các Bước Reproduce**

1. Đi đến '...'
2. Click vào '...'
3. Scroll down đến '...'
4. Thấy lỗi

**Expected Behavior**
Mô tả điều bạn mong đợi sẽ xảy ra

**Screenshots**
Nếu có thể, thêm screenshots

**Environment:**

- OS: [e.g. Windows 11, macOS 14]
- Browser: [e.g. Chrome 120, Firefox 121]
- Node Version: [e.g. 18.17.0]
- Database: [e.g. MariaDB 11.2]

**Additional Context**
Thông tin bổ sung về bug
```

## Đề Xuất Tính Năng

### Feature Request Template

```markdown
**Vấn Đề Cần Giải Quyết**
Mô tả vấn đề bạn gặp phải. VD: "Tôi luôn cảm thấy khó khăn khi..."

**Giải Pháp Đề Xuất**
Mô tả rõ về tính năng bạn muốn

**Các Lựa Chọn Thay Thế**
Các giải pháp khác bạn đã xem xét

**Additional Context**
Thêm screenshots, mockups nếu có
```

## Development Tips

### Useful Commands

```bash
# Development mode với auto-reload
make dev

# Xem logs database
make logs

# Backup database trước khi test
make backup

# Truy cập database shell
make shell

# Kiểm tra cấu hình
make check-env

# Xem tất cả commands
make help
```

### Database Changes

Nếu bạn thay đổi database schema:

1. Tạo migration file trong `migrations/`:

   ```sql
   -- migrations/004_add_new_field.sql
   ALTER TABLE users ADD COLUMN new_field VARCHAR(255);
   ```

2. Update `schema.sql` để phản ánh thay đổi
3. Test migration trên database sạch
4. Document trong CHANGELOG.md

### Testing Locally

```bash
# Reset database và test từ đầu
make db-reset
make db-init

# Test với data mới
# Tạo tài khoản mới và test các tính năng
```

## Questions?

Nếu bạn có bất kỳ câu hỏi nào:

1. Kiểm tra [README.md](README.md) và [QUICK_START.md](QUICK_START.md)
2. Search trong [Issues](https://github.com/vigstudio/smv-nihongo/issues)
3. Tạo issue mới với label `question`
4. Liên hệ maintainers

## Cảm Ơn! 🙏

Mọi đóng góp, dù lớn hay nhỏ, đều được chúng tôi đánh giá cao!

がんばって！🎌
