const axios = require('axios');
const cheerio = require('cheerio');
const { parse } = require('dotenv');
const url = require('../urls');
// const fs = require('fs');

// For Debugging Purposes
// fs.writeFile('data.html', $.html(), function (err) {
//     if (err) return console.log(err);
//     console.log('[Shiva] File Created.');
// });

const latestUpdates = async() => {
    const res = await axios.get(`${url.MANGANELO_URL}genre-all`)
    const body = await res.data
    const $ = cheerio.load(body);
    const promises = [];

    $('div.body-site div.container.container-main div.panel-content-genres div.content-genres-item').each((index, element) => {
        const $element = $(element);
        const title = $element.find('a').attr('title');
        const link = $element.find('a').attr('href').split('/')[3];
        const img = $element.find('img').attr('src');

        promises.push({
            title: title,
            link: link,
            img: img
        })
    })

    return await Promise.all(promises)
}

const search = async(query) => {
    const res = await axios.get(`${url.MANGANELO_URL}search/story/${query}`)
    const body = await res.data
    const $ = cheerio.load(body);
    const promises = [];

    $('div.body-site div.container.container-main div.container-main-left div.panel-search-story div.search-story-item').each((index, element) => {
        const $element = $(element);
        const title = $element.find('a').attr('title');
        const link = $element.find('a').attr('href').split('/')[3];
        const img = $element.find('img').attr('src');

        promises.push({
            title: title,
            link: link,
            img: img
        })
    })

    return await Promise.all(promises)
}

const hotManga = async(page) => {
    const res = await axios.get(`${url.MANGANELO_URL}genre-all/${page}?type=topview`)
    const body = await res.data
    const $ = cheerio.load(body);
    const promises = [];

    $('div.body-site div.container.container-main').each((index, element) => {        
        const $element = $(element);

        $element.find('div.panel-content-genres div.content-genres-item').each((j, el) => {
            const $el = $(el);
            const title = $el.find('a').attr('title');
            const link = $el.find('a').attr('href').split('/')[3];
            const img = $el.find('img').attr('src');

            promises.push({
                title: title,
                link: link,
                img: img
            })
        });

        var total = $element.find('div.panel-page-number div.group-qty a').text().split(" ")[2].replace(",", "")
        console.log(total)
        total = parseInt(total)
        total = Math.round(total / 24)

        promises.push({
            total: total
        })
    })

    return await Promise.all(promises)
}

const contentMangaHandler = async(query) => {
    const res = await axios.get(`https://readmanganato.com/${query}`)
    const body = await res.data
    const $ = cheerio.load(body);

    const promises = [];
    const genres = [];
    const chapters = [];

    $('div.body-site div.container.container-main div.container-main-left').each((index, element) => {
        const $element = $(element);

        const title = $element.find('div.story-info-right h1').text()
        const author = $element.find('div.panel-story-info div.story-info-right table tbody tr:nth-child(2) td.table-value a').text()
        const status = $element.find('div.panel-story-info div.story-info-right table tbody tr:nth-child(3) td.table-value').text()
        const updated = $element.find('div.story-info-right-extent p:nth-child(1) span.stre-value').text()
        const views = $element.find('div.story-info-right-extent p:nth-child(2) span.stre-value').text()
        const ratings = $element.find('#rate_row_cmd em em:nth-child(2) em em:nth-child(1)').text()
        const description = $element.find('div.panel-story-info-description').text()

        $element.find('div.panel-story-info div.story-info-right table tbody tr:nth-child(4) td.table-value a').each((j, el) => {
            $el = $(el);
            genre = $el.text()
            genres.push(genre)
        })

        const liTotal = $element.find('div.panel-story-chapter-list ul li').length;
        $element.find('div.panel-story-chapter-list ul li').each((j, el) =>{
            $el = $(el);
            const chapter_id = $el.find('a').attr('href').split('/')[3] + "~" + $el.find('a').attr('href').split('/')[4];
            const chapter_num = $el.find('a').text();
            const chapter_views = $el.find('span.chapter-view.text-nowrap').text();
            const chapter_published = $el.find('span.chapter-time.text-nowrap').text();

            chapters.push({
                chapter: chapter_num,
                chapter_id: chapter_id,
                chapter_views: chapter_views,
                chapter_published: chapter_published
            })
        });
        
        promises.push({
            title: title,
            author: author,
            status: status,
            genres: genres,
            updated: updated,
            views: views,
            ratings: ratings,
            description: description,
            total_chapters: liTotal,
            chapters: chapters
        });
    })

    return await Promise.all(promises);
}

const readMangaHandler = async(query) => {
    const res = await axios.get(`https://readmanganato.com/${query.replace("~", "/")}`)
    const body = await res.data
    const $ = cheerio.load(body);

    const promises = [];
    const images = [];

    $('div.body-site div.container-chapter-reader').each((index, element) => {
        const $element = $(element)

        $element.find('img').each((j, el) => {
            $el = $(el);
            image = $el.attr('src');
            images.push(image)
        })

        promises.push({
            images: images,
        })
    });

    return await Promise.all(promises);
}

const topWeekManga = async() => {
    const res = await axios.get(`${url.MANGANELO_URL}`)
    const body = await res.data
    const $ = cheerio.load(body);
    const promises = [];

    $('div.body-site div.container.container-silder div.owl-carousel div.item').each((index, element) => {
        const $element = $(element)
        const img = $element.find('img').attr('src');
        const title = $element.find('div.slide-caption a').attr('title')
        const link = $element.find('div.slide-caption a').attr('href').split('/')[3]

        promises.push({
            title: title,
            img: img,
            link: link
        })
    });

    return await Promise.all(promises);
}

module.exports = {
    latestUpdates,
    contentMangaHandler,
    readMangaHandler,
    topWeekManga,
    hotManga,
    search
}