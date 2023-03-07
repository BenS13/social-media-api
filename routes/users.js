const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const users = require('../models/users')
const auth = require('../controllers/auth');

//base URL structure to route to users
const router = Router({prefix: '/api/v1/users'});

//define the 
//type of request 
//and/or parameters
//and url structuere
//needed to then run each of the functions below
router.get('/', getAllUsers);
router.post('/', bodyParser(), createUser)

router.get('/:id([0-9]{1,})', getUserById); 
router.put('/:id([0-9]{1,})', bodyParser(), updateUser); 
router.del('/:id([0-9]{1,})', deleteUser);

//async function to get all users
async function getAllUsers(ctx){
    let user = await users.getAllUsers();
    if (user.length) {
        ctx.status = 200;
        ctx.body = user;
    }
}


//async function to getusersByID
async function getUserById(ctx){
    let id = ctx.params.id;//gets ID from url
    let user = await users.getUserById(id);
    if (user.length) {//if query to DB successful
        ctx.body = user[0];
    }else {
        ctx.status = 404;
    }
}

//async fucntion to create a user
async function createUser(ctx){
    const body = ctx.request.body;
    let user = await users.createUser(body);
    if (user){
        ctx.status=201;
        ctx.body = {ID: user.insertId}
    }
}

//async function to update a user
async function updateUser(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    let user = await users.updateUser(body, id);
    if (user){
        ctx.status = 201;
        ctx.body = {ID: id};
    }

}

//async function to delete a user
async function deleteUser(ctx){
    let id = ctx.params.id;
    let user = await users.deleteUser(id);
    if (user){
        ctx.status = 200;
        ctx.body = { ID: id };
    }
}

module.exports = router;
