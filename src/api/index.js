const express = require('express');
const routes = require('./routes/index');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        isSuccess: true,
        message: '🐉 Shiva API ~ Manganelo ~ Mangadex (W.I.P)',
        entries: [{
            manganelo: [{
                "Hot": "/api/v1/manganelo/hot/:page",
                "Search": "/api/v1/manganelo/Search/:query",
                "TopWeek": "/api/v1/manganelo/top_week",
                "LatestUpdates": "/api/v1/manganelo/latest_updates",
                "ContentMangaHandler": "/api/v1/manganelo/comic/:query",
                "ReadMangaHandler": "/api/v1/manganelo/comic/read/:query",
            }]
        }]
    });
});
router.use('/', routes);

module.exports = router;