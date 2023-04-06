/**
 * Module that routes users requesting the welcomepage
 * @module routes/special
 */
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth')

/**Base URL for welcome page */
const router = Router({prefix: '/api/v1'});


router.get('/', publicWelcomeMessage); 
router.get('/private', auth, privateWelcomeMessage)

/**
 * Function to display welcome message
 * @param {object} ctx Koa response/request object
 */
function publicWelcomeMessage(ctx) { 
    ctx.body = { 
        message: "Welcome to the Social Media Web App, you have reached the public welcome page" 
    } 
}

/**
 * Function to display private message if authenticated
 * @param {object} ctx Koa response/request object
 */
function privateWelcomeMessage(ctx){
    const user = ctx.state.user;
    ctx.body = {message: `Hello ${user.username} welcome to my social media API`}
}

module.exports = router;