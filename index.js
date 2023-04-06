//Social Media API
const Koa = require('koa');

const app = new Koa(); 

const cors = require('@koa/cors');
const special = require('./routes/special.js');
const posts = require('./routes/posts.js');
const users = require('./routes/users.js');
const comments = require('./routes/comments.js');
const news = require('./routes/news.js');

app.use(cors());
app.use(special.routes()); 
app.use(posts.routes());
app.use(users.routes());
app.use(comments.routes());
app.use(news.routes());


let port = process.env.PORT || 3000;

app.listen(port);