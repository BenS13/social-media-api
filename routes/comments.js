const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const comments = require('../models/comments')
const {validateComment} = require('../controllers/validation');
const auth = require('../controllers/auth');

//base URL structure to route to comments
const router = Router({prefix: '/api/v1/comments'});

//comments routes
router.put('/:id([0-9]{1,})', bodyParser(),auth, validateComment,  updateComment); 
router.del('/:id([0-9]{1,})',  auth, deleteComment);

//*************FUNCTIONS FOR DEL and UPDATE COMMENTS**************** */
//delete comment using {comment id}
async function deleteComment(ctx){
    //Check permissions
    let commentId = ctx.params.id;//Get comment ID from URL
    let result = await comments.getCommentById(commentId);//Check comment exists
    if (result.length) {
        console.log("Comment Exists deleting now")
        let comment = await comments.deleteComment(userId, commentId);
        if (comment){
            ctx.status = 200;//return code for delete succesful
        ctx.body = {message: "Comment deleted",
                ID: commentId}
        } else{
            ctx.status = 500;
        }
    }else {
        ctx.body = {message: "Comment doesnt exist"}
    }
}

//update comment using {comment id}
async function updateComment(ctx){
    //Check perm
    //If auth update
    //If not respond so
    let commentId = ctx.params.id;
    let userId = ctx.state.user.ID;
    let comment = await comments.updateComment(userId, commentId, commentBody);
    if (comment){
        ctx.status = 201;
        ctx.body = {message: "Comment updated",
                    ID:id};
    }else {
        ctx.status = 500;//Error
    }
}

module.exports = router;