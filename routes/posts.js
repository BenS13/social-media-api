const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const posts = require('../models/posts');
const comments = require('../models/comments');
const likes = require('../models/likes');
const {validatePost, validateComment, validateLike} = require('../controllers/validation');
const { validate } = require('jsonschema');
const auth = require('../controllers/auth');

//base URL structure to route to posts
const router = Router({prefix: '/api/v1/posts'});


//define the 
//type of request 
//and/or parameters
//and url structuere
//needed to then run each of the functions below

//post routes
router.get('/', getAllPosts);
router.post('/', bodyParser(), validatePost, auth, createPost)
router.get('/:id([0-9]{1,})', getPostById); 
router.put('/:id([0-9]{1,})', bodyParser(), validatePost, auth, updatePost); 
router.del('/:id([0-9]{1,})', auth, deletePost);

//likes routes
router.get('/:id([0-9]{1,})/likes', getLikes);
router.post('/:id([0-9]{1,})/likes', validateLike, auth, addLike);
router.del('/:id([0-9]{1,})/likes', validateLike, auth, removeLike);


//comments routes (Routes for accessing comments by ID is in comments.js)
router.post('/:id([0-9]{1,})/comments', bodyParser(), validateComment, createComment)
router.get('/:id([0-9]{1,})/comments', getComments); 



//***********FUNCTIONS FOR POSTS*************************8 */
//async function to get all posts
async function getAllPosts(ctx){
    let post = await posts.getAllPosts();
    if (post.length) {
        ctx.body = post;
    }else {
        ctx.status = 404;//Not found
    }
}

//async function to getPostsByID
async function getPostById(ctx){
    let id = ctx.params.id;//gets ID from url
    let post = await posts.getPostById(id);
    if (post.length) {//if query to DB successful
        ctx.body = post[0];
    }else {
        ctx.status = 404;//Not found
    }
}

//async fucntion to create a post
async function createPost(ctx){
    let userId = ctx.state.user.ID;
    const body = ctx.request.body;
    let post = await posts.createPost(userId, postBody);
    if (post){
        ctx.status=201;
        ctx.body = {message: "Post Created",
                ID: post.insertId}
    }else {
        ctx.status = 500;//Server error
    }
}

//async function to update a post
async function updatePost(ctx){
    let postId = ctx.params.id;
    const postBody = ctx.request.body;
    let post = await posts.updatePost(postId, postBody);
    if (post){
        ctx.status = 201;
        ctx.body = {message: "Post updated",
                    ID: postId};
    }else {
        ctx.status = 500;//Server error
    }

}

//async function to delete a post
async function deletePost(ctx){
    let id = ctx.params.id;
    let post = await posts.deletePost(id);
    if (post){
        ctx.status = 200;
        ctx.body = { message: "Post deleted",
                    ID: id };
    }else {
        ctx.status = 500;//Server error
    }
}


//******************FUNCTIONS FOR LIKES**************** */
async function getLikes(ctx){
    let postId = ctx.params.id;
    //console.log(ctx.state.user.ID);
    let like = await likes.getLikes(postId);
    if (like){
        ctx.status = 200;
        ctx.body = like ? like: 0;
    }else{
        ctx.status = 404;//Rescourse not found
    }
}

async function addLike(ctx){
    let postId = ctx.params.id;
    let userId = ctx.state.user.ID;
    let like = await likes.addLike(userId, postId);
    if (like){
        ctx.status = 201;
        ctx.body = {ID: insertId,
                    message: 'liked'};
    }else {
        ctx.status = 500;//Server error
    }
}

async function removeLike(ctx){
    let postId = ctx.params.id;
    let userId = ctx.state.user.ID;
    let like = await likes.removeLike(userId, postId);
    if (like){
        ctx.status = 200;
        ctx.body = {ID: insertId,
                    message: "disliked"};
    }else {
        ctx.status = 500;//Server error
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
        ctx.status = 404;//Not found
    }
}

//'api/v1/posts/{postid}/comments
//create comment for post with {post id}
async function createComment(ctx){
    let postId = ctx.params.id;//get post id from url
    let userId = ctx.state.user.ID;//Get user ID
    const commentBody = ctx.request.body;//get body of request
    let comment = await comments.createComment(userId, postId, commentBody);//add comment to database
    if (comment){
        ctx.status=201;//return code success
        ctx.body = {ID: comment.insertId,
                    postID : postId,//return commentID, postID, body of comment
                    body: body,
                message : "Comment created"}
    }else {
        ctx.status = 500;//server error
    }
}

module.exports = router;

//PULL TEST REMOVE LATER