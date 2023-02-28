const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/posts')//import models which defines requests to DB


//base URL structure to route to posts
const router = Router({prefix: '/api/v1/posts'});


//define the 
//type of request 
//and/or parameters
//and url structuere
//needed to then run each of the functions below
router.get('/', getAllPosts);
router.post('/', bodyParser(), createPost)

router.get('/:id([0-9]{1,})', getPostById); 
router.put('/:id([0-9]{1,})', bodyParser(), updatePost); 
router.del('/:id([0-9]{1,})', deletePost);

//async function to get all posts
async function getAllPosts(ctx){
    let posts = await model.getAllPosts();
    if (posts.length) {
        ctx.body = posts;
    }
}


//async function to getPostsByID
async function getPostById(ctx){
    let id = ctx.params.id;//gets ID from url
    let post = await model.getPostById(id);
    if (post.length) {//if query to DB successful
        ctx.body = post[0];
    }else {
        ctx.status = 404;
    }
}

//async fucntion to create a post
async function createPost(ctx){
    const body = ctx.request.body;
    let post = await model.createPost(body);
    if (post){
        ctx.status=201;
        ctx.body = {ID: post.insertID}
    }
}

//async function to update a post
async function updatePost(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    let post = await model.updatePost(body, id);
    if (post){
        ctx.status = 201;
        ctx.body = {ID: id};
    }

}

//async function to delete a post
async function deletePost(ctx){
    let id = ctx.params.id;
    let post = await model.deletePost(id);
    if (post){
        ctx.status = 200;
        ctx.body = { ID: id };
    }
}

module.exports = router;

