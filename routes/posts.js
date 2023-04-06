/**
 * A module to route requests for posts to the correct endpoints
 * @module routes/posts
 * @author Ben Sabatier
 */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const posts = require('../models/posts');
const comments = require('../models/comments');
const likes = require('../models/likes');
const {validatePost, validatePostUpdate, validateComment, validateLike} = require('../controllers/validation');
const { validate } = require('jsonschema');
const auth = require('../controllers/auth');
const can = require('../permissions/posts');

/**Base URL structure for posts */
const prefix = '/api/v1/posts';
const router = Router({prefix: prefix});


//define the 
//type of request 
//and/or parameters
//and url structuere
//needed to then run each of the functions below

/**Routes for posts */
router.get('/', getAllPosts);
router.post('/', bodyParser(),auth, validatePost, createPost)
router.get('/:id([0-9]{1,})', getPostById); 
router.put('/:id([0-9]{1,})', bodyParser(), auth, validatePostUpdate ,updatePost); 
router.del('/:id([0-9]{1,})', auth, deletePost);

/**Routes for likes */
router.get('/:id([0-9]{1,})/likes', getLikes);
router.post('/:id([0-9]{1,})/likes', auth, validateLike,  addLike);
router.del('/:id([0-9]{1,})/likes', auth, validateLike,  removeLike);


/**Routes for comments
 * Update and Delete are defined in routes/comments
 */
router.post('/:id([0-9]{1,})/comments', bodyParser(), auth, validateComment, createComment)
router.get('/:id([0-9]{1,})/comments', getComments); 



/**
 * Routing function to retrive all posts
 * @param {object} ctx Koa requets/response context object
 * @returns {} returns the posts and status message
 */
async function getAllPosts(ctx){
    let post = await posts.getAllPosts();
    if (post.length) {
        const postBody = post.map(post =>{
            //extract fields we want to send back
            const {ID, title, allText, imageURL, authorID} = post;
            const links = {
                comments: `${ctx.protocol}://${ctx.host}${prefix}/${post.ID}/comments`,
                likes: `${ctx.protocol}://${ctx.host}${prefix}/${post.ID}/likes`,
                self: `${ctx.protocol}://${ctx.host}${prefix}/${post.ID}`
            }
            return {ID, title, allText, imageURL, authorID, links};
        });
        ctx.body = postBody;
        ctx.status = 200;
    }else {
        ctx.status = 404;//Not found
        ctx.body = {status: ctx.status, message: "Posts not found"}
    }
}

/**
 * Routing function to retrive a post by its id
 * @param {object} ctx Koa requets/response context object
 */
async function getPostById(ctx){
    let id = ctx.params.id;//gets ID from url
    let post = await posts.getPostById(id);
    if (post.length) {//if query to DB successful
        ctx.status = 200;
        ctx.body = post[0];
    }else {
        ctx.status = 404;//Not found
        ctx.body = {status: ctx.status, message: "Posts not found id out of range"}
    }
}

/**
 * Routing function to create a post
 * @param {object} ctx Koa requets/response context object
 */
async function createPost(ctx){
    let userId = ctx.state.user.ID;
    const postBody = ctx.request.body;
    let post = await posts.createPost(userId, postBody);
    if (post){
        ctx.status=201;
        ctx.body = {message: "Post Created",
                ID: post.insertId}
    }else {
        ctx.status = 500;//Server error
        ctx.body = {status: ctx.status, message: "Error when creating post"}
    }
}

/**
 * Routing function to update a posts contents
 * @param {object} ctx Koa requets/response context object
 */
async function updatePost(ctx){
    let postId = ctx.params.id;//Get post id from url
    const postBody = ctx.request.body;//Get post data from body of request
    let post = await posts.getPostById(postId);//Check post exists
    if (post.length){
        let data = post[0];
        const allowed = can.updatePost(ctx.state.user, data);//Check permissions
        if (!allowed.granted) {
            ctx.status = 403;
        } else{
            let result = await posts.updatePost(postId, postBody);//Update post
            if (result.affectedRows) {
                ctx.status = 200;
                ctx.body = {updated: true, ID: postId};
            }
        }
    }else{
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "Post not found"}
    }
}

/**
 * Routing function to delete a post
 * @param {object} ctx Koa requets/response context object
 */
async function deletePost(ctx){
    let postId = ctx.params.id;
    let post = await posts.getPostById(postId);//Check post exists
    if (post.length){
        let data = post[0];
        const allowed = can.deletePost(ctx.state.user, data);
        if (!allowed.granted){
            ctx.status = 403;
        }else{
            let result = await posts.deletePost(postId);//Delete post
            ctx.status = 200;
            ctx.body = {message: "Post Deleted", ID:postId};
        }
    }else{
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "Post not found"}
    }
}


/**
 * Routing function to get number of likes for a post
 * @param {object} ctx Koa requets/response context object
 */
async function getLikes(ctx){
    let postId = ctx.params.id;
    //console.log(ctx.state.user.ID);
    let like = await likes.getLikes(postId);
    if (like){
        ctx.status = 200;
        ctx.body = like ? like: 0;
    }else{
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "Post not found"}//Rescourse not found
    }
}

/**
 * Routing function to add a like to a post
 * @param {object} ctx Koa requets/response context object
 */
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
        ctx.body = {status: ctx.status, message: "Error when liking post"}
    }
}

/**
 * Routing function to remove a like from a post
 * @param {object} ctx Koa requets/response context object
 */
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
        ctx.body = {status: ctx.status, message: "Error when removing like"}
    }
}

/**
 * Routing function to retrive comments for a post
 * @param {object} ctx Koa requets/response context object
 */
async function getComments(ctx){
    let id = ctx.params.id;//gets post ID from url
    let comment = await comments.getComments(id);
    if (comment.length) {//if query to DB successful
        ctx.body = comment;
        ctx.status = 200;
    }else {
        ctx.status = 404;//Not found
        ctx.body = {status: ctx.status, message: "Comments not found"}
    }
}

/**
 * Routing function to create a comment on a post
 * @param {object} ctx Koa requets/response context object
 */
async function createComment(ctx){
    
    
    let postId = ctx.params.id;//get post id from url
    let userId = ctx.state.user.ID;//Get user ID
    const commentBody = ctx.request.body;//get body of request
    
    let comment = await comments.createComment(userId, postId, commentBody);
    
    if (comment){
        ctx.status=201;//return code success
        ctx.body = {ID: comment.insertId,
                    postID : postId,//return commentID, postID, body of comment
                    body: body,
                message : "Comment created"}
    }else {
        ctx.status = 500;//server error
        ctx.body = {status: ctx.status, message: "Error when creating comment"}
    }
}

module.exports = router;