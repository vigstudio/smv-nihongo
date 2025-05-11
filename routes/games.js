const express = require('express');
const router = express.Router();
const { runQuery, getQuery } = require('../database/db');
const { requireAuth } = require('../middleware/auth');

// Trang game
router.get('/', requireAuth, (req, res) => {
    res.render('games/index', {
        title: 'Games',
        user: req.session.user
    });
});

// Trang game Hiragana
router.get('/hiragana', requireAuth, (req, res) => {
    res.render('games/hiragana', {
        title: 'Game Học Hiragana',
        user: req.session.user
    });
});

// Trang game Katakana
router.get('/katakana', requireAuth, (req, res) => {
    res.render('games/katakana', {
        title: 'Game Học Katakana',
        user: req.session.user
    });
});

// Trang game Vocabulary
router.get('/vocabulary', requireAuth, (req, res) => {
    res.render('games/vocabulary', {
        title: 'Game Học Từ Vựng',
        user: req.session.user
    });
});

// Lưu điểm game
router.post('/save-score', requireAuth, async (req, res) => {
    try {
        const { gameType, score, correctAnswers, wrongAnswers, maxCombo, level } = req.body;
        const userId = req.session.user.id;

        // Kiểm tra dữ liệu đầu vào
        if (!gameType || !score || !correctAnswers || !wrongAnswers || !maxCombo || !level) {
            return res.status(400).json({ 
                success: false,
                error: 'Thiếu thông tin cần thiết' 
            });
        }

        // Lưu điểm vào bảng game_scores
        await runQuery(
            'INSERT INTO game_scores (user_id, game_type, score, correct_answers, wrong_answers, max_combo, level) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, gameType, score, correctAnswers, wrongAnswers, maxCombo, level]
        );

        // Cập nhật thống kê user
        await runQuery(
            'UPDATE user_statistics SET total_games_played = total_games_played + 1, total_score = total_score + ? WHERE user_id = ?',
            [score, userId]
        );

        res.json({ 
            success: true,
            message: 'Lưu điểm thành công' 
        });
    } catch (error) {
        console.error('Error saving score:', error);
        res.status(500).json({ 
            success: false,
            error: 'Lỗi server',
            details: error.message 
        });
    }
});

// Lấy bảng xếp hạng
router.get('/leaderboard/:gameType', async (req, res) => {
    try {
        const { gameType } = req.params;
        const limit = parseInt(req.query.limit) || 10;

        const leaderboard = await getQuery(`
            SELECT 
                u.username,
                gs.score,
                gs.correct_answers,
                gs.wrong_answers,
                gs.max_combo,
                gs.level,
                gs.created_at
            FROM game_scores gs
            JOIN users u ON gs.user_id = u.id
            WHERE gs.game_type = ?
            ORDER BY gs.score DESC
            LIMIT ?
        `, [gameType, limit]);

        res.json(leaderboard);
    } catch (error) {
        console.error('Error getting leaderboard:', error);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Lấy thống kê của user
router.get('/user-stats', requireAuth, async (req, res) => {
    try {
        const userId = req.session.user.id;

        const stats = await getQuery(`
            SELECT 
                COUNT(*) as total_games,
                SUM(score) as total_score,
                SUM(correct_answers) as total_correct,
                SUM(wrong_answers) as total_wrong
            FROM game_scores
            WHERE user_id = ?
        `, [userId]);

        res.json(stats[0]);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi server' });
    }
});

module.exports = router; 