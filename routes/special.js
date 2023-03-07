const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth')
const router = Router({prefix: '/api/v1'});


router.get('/', publicWelcomeMessage); 
router.get('/private', auth, privateWelcomeMessage)


function publicWelcomeMessage(ctx) { 
    ctx.body = { 
        message: "Welcome to the Social Media Web App, you have reached the public welcome page" 
    } 
}

function privateWelcomeMessage(ctx){
    const user = ctx.state.user;
    ctx.body = {message: `Hello ${user.username} welcome to my social media API`}
}

module.exports = router;