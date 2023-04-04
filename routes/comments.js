const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const comments = require('../models/comments')
const {validateComment} = require('../controllers/validation');

//base URL structure to route to comments
const router = Router({prefix: '/api/v1/comments'});

//comments routes
router.put('/:id([0-9]{1,})', bodyParser(), validateComment, updateComment); 
router.del('/:id([0-9]{1,})', deleteComment);

//*************FUNCTIONS FOR DEL and UPDATE COMMENTS**************** */
//delete comment using {comment id}
async function deleteComment(ctx){
    let commentId = ctx.params.id;
    let comment = await comments.deleteComment(commentId);
    if (comment){
        ctx.status = 200;//return code for delete succesful
        ctx.body = {ID: comment.insertId,//return commentID, body of comment
                    body: 'comment deleted'}
    }else {
        ctx.status = 500;
    }
}

//update comment using {comment id}
async function updateComment(ctx){
    let commentId = ctx.params.id;
    let comment = await comments.updateComment(body, commentId);
    if (comment){
        ctx.status = 201;
        ctx.body = {ID:id};
    }else {
        ctx.status = 500;//Error
    }
}

module.exports = router;