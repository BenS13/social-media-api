const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = Router({prefix: '/api/v1'});


router.get('/', welcomeMessage); 


function welcomeMessage(ctx, next) { 
    ctx.body = { 
        message: "Welcome to the Social Media Web App" 
    } 
}

module.exports = router;