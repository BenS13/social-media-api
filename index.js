//Social Media API
const Koa = require('koa');

const app = new Koa(); 

const special = require('./routes/special.js')
const posts = require('./routes/posts.js')

app.use(special.routes()); 
app.use(posts.routes());


let port = process.env.PORT || 3000;

app.listen(port);