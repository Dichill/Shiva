const express = require('express');
const routes = require('./routes/index');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        isSuccess: true,
        message: '🐉 Shiva API ~ Manganelo ~ Mangadex (W.I.P)',
        entries: [{
            "Search": "/api/v1/Search/:query",
            "LatestUpdates": "/api/v1/latest_updates",
            "TopWeek": "Down at the moment.",
            "ContentMangaHandler": "/api/v1/comic/:query",
            "ReadMangaHandler": "/api/v1/comic/read/:query",
            "Hot": "/api/v1/hot/:page"
        }]
    });
});
router.use('/', routes);

module.exports = router;