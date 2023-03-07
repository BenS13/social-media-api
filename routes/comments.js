const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const comments = require('../models/comments')

//base URL structure to route to comments
const router = Router({prefix: '/api/v1/comments'});

//comments routes
router.put('/:id([0-9]{1,})', bodyParser(), updateComment); 
router.del('/:id([0-9]{1,})', deleteComment);

//*************FUNCTIONS FOR COMMENTS**************** */
//delete comment using {comment id}
async function deleteComment(ctx){
    let commentId = ctx.params.id;
    let comment = await comments.deleteComment(commentId);
    if (comment){
        ctx.status = 200;//return code for delete succesful
        ctx.body = {ID: comment.insertId,//return commentID, body of comment
                    body: 'comment deleted'}
    }
}

//update comment using {comment id}
async function updateComment(ctx){
    //todo
}

module.exports = router;