//Social Media API
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa(); 
const router = new Router();

router.get('/api/v1', welcomeAPI); 
app.use(router.routes());

function welcomeAPI(ctx, next) { 
    ctx.body = { 
        message: "Welcome to the Social Media Web App" 
    } 
}

const posts = require('./routes/posts.js');
app.use(posts.routes());

app.listen(3000);