const express = require('express');
const router = express.Router();
const axios = require('axios');
const manganelo = require('../core/manganelo');

// router.get('/search/:query', (req, res) => {
//     const query = req.params.query;
//     res.status(200).json({
        
//     });
// });

router.get('/search/:query', (req, res) => {
    const query = req.params.query;

    manganelo.search(query.replace(" ", "_"))
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
    manganelo.latestUpdates()
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
    manganelo.topWeekManga()
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

    manganelo.contentMangaHandler(query)
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

    manganelo.readMangaHandler(query)
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

    manganelo.hotManga(page)
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

router.get('/Decrypt/:query', (req, res) => {
    const query = req.params.query;

    const url = "https://" + query.replace(/-/g, '/');

    const referer_url = "https://readmanganato.com/";

    const config = {
        responseType: 'arraybuffer',
        headers: {
            "Referer": referer_url,
            "Referrer-Policy": "strict-origin-when-cross-origin"
        }
    };
    res.header['referer'] = referer_url;
    axios.get(url, config).then((response) => {
        var img_binary = Buffer.from(response.data, 'binary').toString('base64')

        res.status(200).json({
            isSuccess: true,
            img: img_binary
        });
    })
    .catch((error) => console.log(error));
})

module.exports = router