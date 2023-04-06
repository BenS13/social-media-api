/**
 * Module that connects to a news api and returns data to users
 * @module routes/news
 */

const newsAPI = require('../integrations/inshorts/inshorts-api');

const Router = require('koa-router');

/**Define prefix for news resources */
const prefix = '/api/v1/news';

/**Define base URL for accessing a news API */
const router = Router({prefix: prefix});

/**Define route to display API options to user */
router.get('/', newsMenu);

/**Define route for getting news by category */
router.get('/:category', getNews);


/**
 * Function that returns a menu style response to the user
 * @param {object} ctx Koa request/response object
 */
function newsMenu(ctx)
{
    ctx.body = {message:  "The 3rd Part API supports these options:",
                data: "Users will recive 1 news article related to their search", 
                all : `${prefix}/all will retrive any type of news`,
                business: `${prefix}/business`,
                sports : `${prefix}/sports`,
                world: `${prefix}/world`,
                politics: `${prefix}/politics`,
                technology: `${prefix}/technology`,
                startup: `${prefix}/startup`,
                entertainment: `${prefix}/entertainment`,
                science : `${prefix}/science`,
                automobile: `${prefix}/automobile`
            }
        }

/**
 * Async function that gets category name from url,
 * Then uses the newsAPI module to send a request to the xternal api
 * @param {object} ctx Koa reponse/request object
 */
async function getNews(ctx)
{
    category_name = ctx.params.category;
    console.log("Getting news for category:",category_name);
    news = await newsAPI.getNewsData(category_name)
    if (news != undefined)
    {
        news = news['data'][0];
        ctx.body = news;
        ctx.status = 200;
    }else{
        ctx.status = 404;
        ctx.body = {message: "Category not found"}
    }
    
}



module.exports = router;