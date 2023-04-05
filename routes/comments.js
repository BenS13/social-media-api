const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const comments = require('../models/comments')
const {validateComment} = require('../controllers/validation');
const auth = require('../controllers/auth');

//base URL structure to route to comments
const router = Router({prefix: '/api/v1/comments'});

//comments routes
router.put('/:id([0-9]{1,})', bodyParser(), validateComment, auth, updateComment); 
router.del('/:id([0-9]{1,})', deleteComment, auth);

//*************FUNCTIONS FOR DEL and UPDATE COMMENTS**************** */
//delete comment using {comment id}
async function deleteComment(ctx){
    let commentId = ctx.params.id;
    let userId = ctx.state.user.ID;
    let comment = await comments.deleteComment(userId, commentId);
    if (comment){
        ctx.status = 200;//return code for delete succesful
        ctx.body = {message: "Comment deleted",
                ID: comment.insertId}
    }else {
        ctx.status = 500;
    }
}

//update comment using {comment id}
async function updateComment(ctx){
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