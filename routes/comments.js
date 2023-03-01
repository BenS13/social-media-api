const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/comments')

//base URL structure to route to comments
const router = Router({prefix: '/api/v1/comments'});

//router.get('/', getAllUsers);
router.post('/', bodyParser(), createComment)
router.get('/:id([0-9]{1,})', getCommentsByPostId); 
router.put('/:id([0-9]{1,})', bodyParser(), updateComment); 
router.del('/:id([0-9]{1,})', deleteComment);


//get comments by post id
async function getCommentsByPostId(ctx){
    let id = ctx.params.id;//gets post ID from url
    let comments = await model.getCommentsByPostId(id);
    if (comments.length) {//if query to DB successful
        ctx.body = comments;
    }else {
        ctx.status = 404;
    }
}

//create comment for post with {post id}
async function createComment(ctx){
    let postId = ctx.params.id;
    const body = ctx.request.body;
    let comment = await model.createComment(body, postId);
    if (comment){
        ctx.status=201;//return code success
        ctx.body = {ID: comment.insertID,
                    postID : comment.insertpostID,//return commentID, postID, body of comment
                    body: comment.insertallText}
    }
}

//delete comment using {comment id}
async function deleteComment(ctx){
    let commentId = ctx.params.id;
    let comment = await model.deleteComment(commentId);
    if (comment){
        ctx.status = 200;//return code for delete succesful
        ctx.body = {ID: comment.insertID,
                    postID : comment.insertpostID,//return commentID, postID, body of comment
                    body: comment.insertallText}
    }
}


//update comment using {comment id}
async function updateComment(ctx){
    //todo
}

module.exports = router;