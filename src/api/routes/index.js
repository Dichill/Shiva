const express = require('express');
const router = express.Router();
const api = require('../api');

// router.get('/search/:query', (req, res) => {
//     const query = req.params.query;
//     res.status(200).json({
        
//     });
// });

router.get('/search/:query', (req, res) => {
    const query = req.params.query.replace(" ", "_");
    api.search(query)
    .then(comic => {
        res.status(200).json({
            comic
        });
    });
});

router.get('/latest_updates', (req, res) => {
    api.latestUpdates()
        .then(comic => {
            res.status(200).json({
                comic
            });
        })
});

router.get('/top_week', (req, res) => {
    api.hotManga()
    .then(comic => {
        res.status(200).json({
            comic
        });
    })
});

router.get('/comic/:query', (req, res) => {
    const query = req.params.query;

    api.contentMangaHandler(query)
    .then(comic => {
        res.status(200).json({
            comic
        })
    })
});

router.get('/comic/read/:query', (req, res) => {
    const query = req.params.query;

    api.readMangaHandler(query)
    .then(comic => {
        res.status(200).json({
            comic
        })
    })
});

module.exports = router