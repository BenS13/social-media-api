/**
 * Module that connects to a news api and returns data to users
 * @module routes/news
 */


const Router = require('koa-router');

const router = Router({prefix: '/api/v1/news'});

router.get('/', getRandomNews);

function getRandomNews(ctx)
{
    console.log("News")
    ctx.body = {message: "News Coming Soon"}
}

module.exports = router;