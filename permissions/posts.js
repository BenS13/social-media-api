const AccessControl = require('role-acl');
const ac = new AccessControl();


//Allow users to read their post
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read').on('post');
//Dont let users update postID(ID in DB) or authorID
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update').on('post',['*', '!ID', '!authorID']);
//Let users delte posts
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('delete').on('post');


//Allow admin to delete/read/update any post
ac.grant('admin').execute('delete').on('post');
ac.grant('admin').execute('read').on('posts');
ac.grant('admin').execute('read').on('post');
ac.grant('admin').execute('update').on('post');

//Allow only owner of post to update post except admin
exports.updatePost = (requester, data) => 
    ac.can(requester.role).context({requester:requester.ID, owner:data.authorID}).execute('update').sync().on('post');


//Allow only owner of post to delete post except admin
exports.deletePost = (requester, data) => 
    ac.can(requester.role).context({requester:requester.ID, owner:data.authorID}).execute('delete').sync().on('post');


