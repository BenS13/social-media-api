const AccessControl = require('role-acl');
const ac = new AccessControl();


//Allow users to read their comments
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read').on('comment');
//Dont let users update commentID(ID in DB) or authorID
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update').on('comment',['*', '!ID', '!authorID']);
//Let users delte comments
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('delete').on('comment');


//Allow admin to delete/read/update any comment
ac.grant('admin').execute('delete').on('comment');
ac.grant('admin').execute('read').on('comments');
ac.grant('admin').execute('read').on('comment');
ac.grant('admin').execute('update').on('comment');

//Allow only owner of comment to update comment except admin
exports.updateComment = (requester, data) => 
    ac.can(requester.role).context({requester:requester.ID, owner:data.authorID}).execute('update').sync().on('comment');


//Allow only owner of comment to delete comment except admin
exports.deleteComment = (requester, data) => 
    ac.can(requester.role).context({requester:requester.ID, owner:data.authorID}).execute('delete').sync().on('comment');


