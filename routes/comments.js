const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const comments = require('../models/comments')
const {validateComment} = require('../controllers/validation');
const auth = require('../controllers/auth');
const can = require('../permissions/comments')

//base URL structure to route to comments
const router = Router({prefix: '/api/v1/comments'});

//comments routes
router.put('/:id([0-9]{1,})', bodyParser(),auth, validateComment,  updateComment); 
router.del('/:id([0-9]{1,})',  auth, deleteComment);


//*************FUNCTIONS FOR DEL and UPDATE COMMENTS**************** */
//delete comment using {comment id}
async function deleteComment(ctx){
    let commentId = ctx.params.id;//Get comment ID from URL
    let result = await comments.getCommentById(commentId);//Check comment exists
    if (result.length) {
        console.log("Comment Exists deleting now")
        let data = result[0];
        allowed = can.deleteComment(ctx.state.user, data);//Check permissions
        if (!allowed.granted){
            ctx.status=403;//Forbidden
        }else{
            let comment = await comments.deleteComment(commentId);
            if (comment) {
                ctx.status = 200;//return code for delete succesful
                ctx.body = {message: "Comment deleted",
                ID: commentId}
            }
        }
    }else{
        ctx.status= 404;
        ctx.body = {message: "Comment doesnt exist"}
    }
}

async function updateComment(ctx){
    let commentId = ctx.params.id;
    let commentBody = ctx.request.body;
    let comment = await comments.getCommentById(commentId);
    if (comment.length){
        console.log("Comment exists");
        let data = comment[0];
        allowed = can.updateComment(ctx.state.user, data);
        if (!allowed.granted){
            ctx.status=403;
        }else{
            let result = await comments.updateComment(commentId, commentBody);
            if (result){
                ctx.status = 200;
                ctx.body = {message : "Comment Updated", ID:commentId};
            }else{
                ctx.body = {message: "Comment not deleted"};
            }
        }
    }else{
        ctx.status = 404;//Not found
        ctx.body = {message: "Comment not found"};
    }
}

module.exports = router;