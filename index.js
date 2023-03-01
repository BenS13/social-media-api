//Social Media API
const Koa = require('koa');

const app = new Koa(); 

const special = require('./routes/special.js');
const posts = require('./routes/posts.js');
const users = require('./routes/users.js');

app.use(special.routes()); 
app.use(posts.routes());
app.use(users.routes());


let port = process.env.PORT || 3000;

app.listen(port);