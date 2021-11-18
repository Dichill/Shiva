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
        if (comic.length >= 1)
        {
            res.status(200).json({
                isSuccess: true,
                comic
            });
        } else {
            res.status(200).json({
                isSuccess: false,
                message: '❌ Comic cannot be found.'
            })
        }
    });
});

router.get('/latest_updates', (req, res) => {
    api.latestUpdates()
    .then(comic => {
        if (comic.length >= 1)
        {
            res.status(200).json({
                isSuccess: true,
                comic
            });
        } else {
            res.status(200).json({
                isSuccess: false,
                message: '❌ Latest Updates cannot be found, double check the domain in the .env file.'
            })
        }
    })
});

router.get('/top_week', (req, res) => {
    api.topWeekManga()
    .then(comic => {
        if (comic.length >= 1)
        {
            res.status(200).json({
                isSuccess: true,
                comic
            });
        } else {
            res.status(200).json({
                isSuccess: false,
                message: '❌ Top Week cannot be found, double check the domain in the .env file.'
            })
        }
    })
});

router.get('/comic/:query', (req, res) => {
    const query = req.params.query;

    api.contentMangaHandler(query)
    .then(comic => {
        if (comic.length >= 1)
        {
            res.status(200).json({
                isSuccess: true,
                comic
            });
        } else {
            res.status(200).json({
                isSuccess: false,
                message: '❌ Comic content cannot be found, invalid unique id.'
            })
        }
    })
});

router.get('/comic/read/:query', (req, res) => {
    const query = req.params.query;

    api.readMangaHandler(query)
    .then(comic => {
        if (comic.length >= 1)
        {
            res.status(200).json({
                isSuccess: true,
                comic
            });
        } else {
            res.status(200).json({
                isSuccess: false,
                message: '❌ Comic chapter cannot be found, invalid unique id.'
            })
        }
    })
});

router.get('/Genre/:genre/:page', (req, res) => {

});

router.get('/Hot/:page', (req, res) => {
    const page = req.params.page;

    api.hotManga(page)
    .then(comic => {
    if (comic.length >= 1)
        {
            res.status(200).json({
                isSuccess: true,
                comic
            });
        } else {
            res.status(200).json({
                isSuccess: false,
                message: '❌ Hot Mangas cannot be found, double check the domain in the .env file.'
            })
        }
    })
});

module.exports = router