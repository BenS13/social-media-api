const AccessControl = require('role-acl');
const ac = new AccessControl();



//If the authenticated requester ID == ownerID(userID from DB)
//Allow users with role:'user'
//**To read all the recouces related to their ID
//**Except their password or passwordSalt
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read')
    .on('user', ['*', '!password', '!passwordSalt']);

//**To update all the [about, password, email] resources
//**Related to their ID
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update')
    .on('user', ['about', 'password', 'email']);