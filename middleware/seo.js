/**
 * Middleware SEO cho website học tiếng Nhật SMV
 * Quản lý meta tags, Open Graph, Twitter Card, và Structured Data
 */

// Cấu hình SEO mặc định
const defaultSEO = {
    siteName: 'Lớp học tiếng Nhật SMV',
    siteUrl: process.env.SITE_URL || 'https://nihongo.nghiane.com',
    defaultTitle: 'Lớp học tiếng Nhật SMV - Học tiếng Nhật Online',
    defaultDescription: 'Học tiếng Nhật online với giáo trình Minna no Nihongo. Học Hiragana, Katakana, từ vựng, ngữ pháp và luyện tập qua game tương tác. Phương pháp học hiện đại, hiệu quả.',
    defaultKeywords: 'học tiếng nhật, tiếng nhật online, minna no nihongo, hiragana, katakana, từ vựng tiếng nhật, ngữ pháp tiếng nhật, game học tiếng nhật',
    defaultImage: '/assets/logo-sharp.svg',
    twitterHandle: '@vingamagic',
    fbAppId: '',
    language: 'vi',
    locale: 'vi_VN'
};

// Cấu hình SEO cho từng route
const routeSEOConfig = {
    '/': {
        title: 'Trang chủ - Lớp học tiếng Nhật SMV',
        description: 'Học tiếng Nhật online miễn phí với giáo trình Minna no Nihongo. Học Hiragana, Katakana, từ vựng, ngữ pháp qua bài giảng chi tiết và game tương tác.',
        keywords: 'học tiếng nhật online, học tiếng nhật miễn phí, minna no nihongo online, khóa học tiếng nhật',
        type: 'website'
    },
    '/alphabets/hiragana': {
        title: 'Học Hiragana - Bảng chữ cái Hiragana cơ bản và nâng cao',
        description: 'Học bảng chữ cái Hiragana cơ bản, Hiragana với Tenten và Maru. Xem cách viết, phát âm chuẩn và luyện tập với video hướng dẫn chi tiết.',
        keywords: 'học hiragana, bảng chữ cái hiragana, hiragana cơ bản, cách viết hiragana, phát âm hiragana',
        type: 'article',
        section: 'Học bảng chữ cái'
    },
    '/alphabets/katakana': {
        title: 'Học Katakana - Bảng chữ cái Katakana cơ bản và nâng cao',
        description: 'Học bảng chữ cái Katakana cơ bản, Katakana với Tenten và Maru. Xem cách viết, phát âm chuẩn và luyện tập với video hướng dẫn chi tiết.',
        keywords: 'học katakana, bảng chữ cái katakana, katakana cơ bản, cách viết katakana, phát âm katakana',
        type: 'article',
        section: 'Học bảng chữ cái'
    },
    '/vocabulary': {
        title: 'Từ vựng tiếng Nhật theo bài - Minna no Nihongo',
        description: 'Học từ vựng tiếng Nhật theo 50 bài học của giáo trình Minna no Nihongo. Có romaji, hán tự, âm hán và file âm thanh phát âm chuẩn.',
        keywords: 'từ vựng tiếng nhật, từ vựng minna no nihongo, học từ vựng tiếng nhật, từ vựng n5, từ vựng n4',
        type: 'article',
        section: 'Từ vựng'
    },
    '/games': {
        title: 'Game học tiếng Nhật - Luyện tập Hiragana, Katakana, Từ vựng',
        description: 'Chơi game để luyện tập Hiragana, Katakana và từ vựng tiếng Nhật. Phương pháp học qua game tương tác giúp ghi nhớ hiệu quả hơn.',
        keywords: 'game học tiếng nhật, game hiragana, game katakana, game từ vựng tiếng nhật, luyện tập tiếng nhật',
        type: 'article',
        section: 'Game'
    },
    '/leaderboard': {
        title: 'Bảng xếp hạng - Top học viên xuất sắc',
        description: 'Xem bảng xếp hạng những học viên xuất sắc nhất trong việc học tiếng Nhật. Cạnh tranh và thử thách bản thân với các game học tập.',
        keywords: 'bảng xếp hạng học tiếng nhật, top học viên, thi đua học tiếng nhật',
        type: 'article',
        section: 'Bảng xếp hạng'
    }
};

/**
 * Middleware để inject thông tin SEO vào response locals
 */
function seoMiddleware(req, res, next) {
    // Lấy cấu hình SEO cho route hiện tại
    const routeConfig = routeSEOConfig[req.path] || {};
    
    // Tạo URL đầy đủ
    const fullUrl = `${defaultSEO.siteUrl}${req.originalUrl}`;
    
    // Chuẩn bị SEO data
    res.locals.seo = {
        title: routeConfig.title || defaultSEO.defaultTitle,
        description: routeConfig.description || defaultSEO.defaultDescription,
        keywords: routeConfig.keywords || defaultSEO.defaultKeywords,
        url: fullUrl,
        image: routeConfig.image || `${defaultSEO.siteUrl}${defaultSEO.defaultImage}`,
        type: routeConfig.type || 'website',
        siteName: defaultSEO.siteName,
        locale: defaultSEO.locale,
        language: defaultSEO.language,
        twitterHandle: defaultSEO.twitterHandle,
        fbAppId: defaultSEO.fbAppId,
        section: routeConfig.section || null,
        canonical: fullUrl
    };
    
    // Thêm structured data cho trang chủ
    if (req.path === '/') {
        res.locals.structuredData = getWebsiteStructuredData();
    } else if (req.path.startsWith('/alphabets/')) {
        res.locals.structuredData = getEducationalStructuredData(routeConfig);
    } else if (req.path === '/vocabulary') {
        res.locals.structuredData = getCourseStructuredData();
    } else if (req.path === '/games') {
        res.locals.structuredData = getGameStructuredData();
    }
    
    next();
}

/**
 * Tạo structured data cho website (Organization + WebSite)
 */
function getWebsiteStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${defaultSEO.siteUrl}/#organization`,
                'name': defaultSEO.siteName,
                'url': defaultSEO.siteUrl,
                'logo': {
                    '@type': 'ImageObject',
                    'url': `${defaultSEO.siteUrl}${defaultSEO.defaultImage}`
                },
                'description': defaultSEO.defaultDescription,
                'contactPoint': {
                    '@type': 'ContactPoint',
                    'contactType': 'Customer Service',
                    'availableLanguage': ['vi', 'ja']
                }
            },
            {
                '@type': 'WebSite',
                '@id': `${defaultSEO.siteUrl}/#website`,
                'url': defaultSEO.siteUrl,
                'name': defaultSEO.siteName,
                'description': defaultSEO.defaultDescription,
                'publisher': {
                    '@id': `${defaultSEO.siteUrl}/#organization`
                },
                'inLanguage': 'vi',
                'potentialAction': {
                    '@type': 'SearchAction',
                    'target': `${defaultSEO.siteUrl}/vocabulary?lesson={search_term_string}`,
                    'query-input': 'required name=search_term_string'
                }
            },
            {
                '@type': 'WebPage',
                '@id': `${defaultSEO.siteUrl}/#webpage`,
                'url': defaultSEO.siteUrl,
                'name': defaultSEO.defaultTitle,
                'description': defaultSEO.defaultDescription,
                'isPartOf': {
                    '@id': `${defaultSEO.siteUrl}/#website`
                },
                'inLanguage': 'vi'
            }
        ]
    };
}

/**
 * Tạo structured data cho trang educational (Hiragana, Katakana)
 */
function getEducationalStructuredData(config) {
    return {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        'name': config.title || 'Học bảng chữ cái tiếng Nhật',
        'description': config.description || '',
        'educationalLevel': 'Beginner',
        'learningResourceType': 'Interactive Learning Resource',
        'inLanguage': 'vi',
        'teaches': 'Japanese Language',
        'audience': {
            '@type': 'EducationalAudience',
            'educationalRole': 'student'
        },
        'provider': {
            '@type': 'Organization',
            'name': defaultSEO.siteName,
            'url': defaultSEO.siteUrl
        }
    };
}

/**
 * Tạo structured data cho trang từ vựng (Course)
 */
function getCourseStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        'name': 'Từ vựng tiếng Nhật - Minna no Nihongo',
        'description': 'Khóa học từ vựng tiếng Nhật theo 50 bài của giáo trình Minna no Nihongo',
        'provider': {
            '@type': 'Organization',
            'name': defaultSEO.siteName,
            'url': defaultSEO.siteUrl
        },
        'educationalLevel': 'Beginner to Intermediate',
        'inLanguage': 'vi',
        'teaches': 'Japanese Vocabulary',
        'hasCourseInstance': {
            '@type': 'CourseInstance',
            'courseMode': 'online',
            'courseWorkload': 'PT50H'
        }
    };
}

/**
 * Tạo structured data cho trang game
 */
function getGameStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Game',
        'name': 'Game học tiếng Nhật',
        'description': 'Các game tương tác để học và luyện tập Hiragana, Katakana và từ vựng tiếng Nhật',
        'gamePlatform': 'Web Browser',
        'inLanguage': 'vi',
        'genre': 'Educational Game',
        'publisher': {
            '@type': 'Organization',
            'name': defaultSEO.siteName,
            'url': defaultSEO.siteUrl
        }
    };
}

/**
 * Hàm helper để cập nhật SEO động từ controller
 */
function updateSEO(res, options = {}) {
    if (!res.locals.seo) {
        res.locals.seo = {};
    }
    
    Object.keys(options).forEach(key => {
        if (options[key] !== undefined) {
            res.locals.seo[key] = options[key];
        }
    });
}

module.exports = {
    seoMiddleware,
    updateSEO,
    defaultSEO,
    routeSEOConfig
};

