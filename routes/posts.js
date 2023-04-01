const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const posts = require('../models/posts');
const comments = require('../models/comments');
const likes = require('../models/likes');
const {validatePost} = require('../controllers/validation');

//base URL structure to route to posts
const router = Router({prefix: '/api/v1/posts'});


//define the 
//type of request 
//and/or parameters
//and url structuere
//needed to then run each of the functions below

//post routes
router.get('/', getAllPosts);
router.post('/', bodyParser(), validatePost, createPost)
router.get('/:id([0-9]{1,})', getPostById); 
router.put('/:id([0-9]{1,})', bodyParser(), validatePost, updatePost); 
router.del('/:id([0-9]{1,})', deletePost);

//likes routes
router.get('/:id([0-9]{1,})/likes', getLikes);
router.post('/:id([0-9]{1,})/likes', addLike);
router.del('/:id([0-9]{1,})/likes', removeLike);


//comments routes
router.post('/:id([0-9]{1,})/comments', bodyParser(), createComment)
router.get('/:id([0-9]{1,})/comments', getComments); 
//router.put('/:id([0-9]{1,})', bodyParser(), updatePost); 
//router.del('/:id([0-9]{1,})', deletePost);


//***********FUNCTIONS FOR POSTS*************************8 */
//async function to get all posts
async function getAllPosts(ctx){
    let post = await posts.getAllPosts();
    if (post.length) {
        ctx.body = post;
    }
}

//async function to getPostsByID
async function getPostById(ctx){
    let id = ctx.params.id;//gets ID from url
    let post = await posts.getPostById(id);
    if (post.length) {//if query to DB successful
        ctx.body = post[0];
    }else {
        ctx.status = 404;
    }
}

//async fucntion to create a post
async function createPost(ctx){
    const body = ctx.request.body;
    let post = await posts.createPost(body);
    if (post){
        ctx.status=201;
        ctx.body = {ID: post.insertId}
    }
}

//async function to update a post
async function updatePost(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    let post = await posts.updatePost(body, id);
    if (post){
        ctx.status = 201;
        ctx.body = {ID: id};
    }

}

//async function to delete a post
async function deletePost(ctx){
    let id = ctx.params.id;
    let post = await posts.deletePost(id);
    if (post){
        ctx.status = 200;
        ctx.body = { ID: id };
    }
}


//******************FUNCTIONS FOR LIKES**************** */
async function getLikes(ctx){
    let id = ctx.params.id;
    let like = await likes.getLikes(id);
    if (like){
        ctx.status = 200;
        ctx.body = like;
    }
}

async function addLike(ctx){
    let id = ctx.params.id;
    let like = await likes.addLike(id);
    if (like){
        ctx.status = 201;
        ctx.body = {ID: insertId};
    }
}

async function removeLike(ctx){
    let id = ctx.params.id;
    let like = await likes.addLike(id);
    if (like){
        ctx.status = 200;
        ctx.body = {ID: insertId};
    }
}

//**************FUNCTIONS FOR GETTING COMMENTS FOR POST and creating a comment on a post****************** */
//'api/v1/posts/{postid}/comments
//get comments by post id
async function getComments(ctx){
    let id = ctx.params.id;//gets post ID from url
    let comment = await comments.getComments(id);
    if (comment.length) {//if query to DB successful
        ctx.body = comment;
    }else {
        ctx.status = 404;
    }
}

//'api/v1/posts/{postid}/comments
//create comment for post with {post id}
async function createComment(ctx){
    let postId = ctx.params.id;//get post id from url
    const body = ctx.request.body;//get body of request
    let comment = await comments.createComment(body, postId);//add comment to database
    if (comment){
        ctx.status=201;//return code success
        ctx.body = {ID: comment.insertId,
                    postID : postId,//return commentID, postID, body of comment
                    body: body}
    }
}

module.exports = router;

//PULL TEST REMOVE LATER