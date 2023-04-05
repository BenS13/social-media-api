const AccessControl = require('role-acl');
const ac = new AccessControl();



//If the authenticated requester ID == ownerID(userID from DB)
//Allow users with role:'user'
//**To read all the recouces related to their ID
//**Except their password or passwordSalt
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read').on('user', ['*', '!password', '!passwordSalt']);

//**To update all the [about, password, email] resources
//**Related to their ID
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update').on('user', ['about', 'password', 'email']);


//Grant admin permissions to read and update all user rescources,
//But not delete their own
ac.grant('admin').execute('read').on('users');
ac.grant('admin').execute('read').on('user');
ac.grant('admin').execute('update').on('user');
ac.grant('admin').condition({Fn:'NOT_EQUALS', args:
    {'requester':'$.owner'}}).execute('delete').on('user');


//Check if requester is owner of resource
exports.readAllUsers = (requester) =>
    ac.can(requester.role).execute('read').sync().on('users');

//Only allow users to see their user data
exports.readUser = (requester, data) =>
    ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('read').sync().on('user');

//Only allow users to update their user data
exports.updateUser = (requester, data) =>
    ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('update').sync().on('user');

//Only allow users to delete their user data
exports.deleteUser = (requester, data) =>
    ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('delete').sync().on('user');