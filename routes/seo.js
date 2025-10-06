/**
 * Routes cho SEO: sitemap.xml, robots.txt
 */

const express = require('express');
const router = express.Router();
const { defaultSEO } = require('../middleware/seo');

/**
 * Sitemap.xml - Dynamic sitemap cho toàn bộ website
 */
router.get('/sitemap.xml', (req, res) => {
    const baseUrl = defaultSEO.siteUrl;
    const today = new Date().toISOString().split('T')[0];
    
    // Danh sách các URL tĩnh
    const staticUrls = [
        { url: '/', changefreq: 'weekly', priority: '1.0', lastmod: today },
        { url: '/alphabets/hiragana', changefreq: 'monthly', priority: '0.9', lastmod: today },
        { url: '/alphabets/katakana', changefreq: 'monthly', priority: '0.9', lastmod: today },
        { url: '/vocabulary', changefreq: 'weekly', priority: '0.8', lastmod: today },
        { url: '/games', changefreq: 'weekly', priority: '0.8', lastmod: today },
        { url: '/games/hiragana', changefreq: 'monthly', priority: '0.7', lastmod: today },
        { url: '/games/katakana', changefreq: 'monthly', priority: '0.7', lastmod: today },
        { url: '/games/vocabulary', changefreq: 'weekly', priority: '0.7', lastmod: today },
        { url: '/leaderboard', changefreq: 'daily', priority: '0.6', lastmod: today },
        { url: '/auth/login', changefreq: 'monthly', priority: '0.5', lastmod: today },
        { url: '/auth/register', changefreq: 'monthly', priority: '0.5', lastmod: today }
    ];
    
    // Thêm các URL động cho từ vựng (50 bài)
    for (let i = 1; i <= 50; i++) {
        staticUrls.push({
            url: `/vocabulary?lesson=${i}`,
            changefreq: 'monthly',
            priority: '0.7',
            lastmod: today
        });
    }
    
    // Tạo XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    staticUrls.forEach(item => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}${item.url}</loc>\n`;
        xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
        xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
        xml += `    <priority>${item.priority}</priority>\n`;
        xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    res.header('Content-Type', 'application/xml');
    res.send(xml);
});

/**
 * Robots.txt - Hướng dẫn cho search engine bots
 */
router.get('/robots.txt', (req, res) => {
    const baseUrl = defaultSEO.siteUrl;
    
    const robotsTxt = `# robots.txt for ${baseUrl}

User-agent: *
Allow: /
Allow: /alphabets/
Allow: /vocabulary
Allow: /games
Allow: /leaderboard

# Không cho phép crawl các trang admin và API private
Disallow: /admin/
Disallow: /api/game/
Disallow: /auth/logout
Disallow: /profile

# Không cho phép crawl các file động
Disallow: /*.json$
Disallow: /*.xml$

# Cho phép crawl CSS và JS
Allow: /css/
Allow: /js/
Allow: /assets/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay (giây) - Giúp giảm tải server
Crawl-delay: 1

# Specific rules for major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

# Block bad bots
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10
`;
    
    res.header('Content-Type', 'text/plain');
    res.send(robotsTxt);
});

module.exports = router;

