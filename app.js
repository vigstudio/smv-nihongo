const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const { initDatabase } = require('./database/db');
const { seoMiddleware } = require('./middleware/seo');
require('dotenv').config();

const app = express();

// Cấu hình middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình session
app.use(session({
    secret: 'smv-nihongo-secret',
    resave: false,
    saveUninitialized: true
}));

// Cấu hình view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// SEO Middleware
app.use(seoMiddleware);

// Middleware kiểm tra đăng nhập
const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    next();
};

// Import routes
const authRoutes = require('./routes/auth');
const alphabetRoutes = require('./routes/alphabets');
const gameRoutes = require('./routes/games');
const leaderboardRoutes = require('./routes/leaderboard');
const vocabularyRouter = require('./routes/vocabulary');
const gameVocabularyRouter = require('./routes/gameVocabulary');
const seoRoutes = require('./routes/seo');

// Sử dụng routes
app.use(seoRoutes); // SEO routes (sitemap.xml, robots.txt) - không cần auth
app.use('/auth', authRoutes);
app.use('/alphabets', requireAuth, alphabetRoutes);
app.use('/games', requireAuth, gameRoutes);
app.use('/leaderboard', requireAuth, leaderboardRoutes);
app.use('/vocabulary', requireAuth, vocabularyRouter);
app.use('/api/game/vocabulary', gameVocabularyRouter);

// Routes chính
app.get('/', requireAuth, (req, res) => {
    res.render('index', { 
        title: 'Trang chủ',
        user: req.session.user 
    });
});

// Middleware xử lý 404
app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Không tìm thấy trang',
        message: 'Trang bạn đang tìm kiếm không tồn tại.',
        user: req.session.user
    });
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: 'Lỗi server',
        message: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
        user: req.session.user
    });
});

// Khởi động server
const PORT = process.env.PORT || 9113;
app.listen(PORT, '0.0.0.0', async () => {
    try {
        await initDatabase();
        console.log(`Server đang chạy tại http://localhost:${PORT}`);
    } catch (error) {
        console.error('Lỗi khi khởi động server:', error);
    }
}); 