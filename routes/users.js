const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const users = require('../models/users')
const auth = require('../controllers/auth');
const {validateUser} = require('../controllers/validation')
const {validateUserUpdate} = require('../controllers/validation')
const can = require('../permissions/users');

//base URL structure to route to users
const router = Router({prefix: '/api/v1/users'});

//define the 
//type of request 
//and/or parameters
//and url structuere
//needed to then run each of the functions below
router.get('/', auth, getAllUsers);
router.post('/', bodyParser(), validateUser, createUser)

router.get('/:id([0-9]{1,})', auth, getUserById); 
router.put('/:id([0-9]{1,})', bodyParser(), auth, validateUserUpdate, updateUser); 
router.del('/:id([0-9]{1,})', auth, deleteUser);

//async function to get all users
async function getAllUsers(ctx){
    const allowed = can.readAllUsers(ctx.state.user);//Check if user is allowed to access resource
    if (!allowed.granted) {
        ctx.status = 403;//Forbidden
    } else {
        let user = await users.getAllUsers();
        if (user.length) {
            ctx.status = 200;
            ctx.body = user;
        } else {
            ctx.status = 404;
        }
    }
}


//async function to getusersByID
async function getUserById(ctx){
    let id = ctx.params.id;//gets ID from url
    let user = await users.getUserById(id);
    if (user.length) {//if query to DB successful
        const data = user[0];
        const allowed = can.readUser(ctx.state.user, data);
        if (!allowed.granted) {
            ctx.status = 403;
        }else {
            ctx.body = user[0];
        }
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
        ctx.body = {ID: user.insertId, created : true}
    }else {
        ctx.status = 500;
    }
}

//async function to update a user
async function updateUser(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    let user = await users.getUserById(id);//check if user exists
    if (user.length){
        let data = user[0];
        const allowed = can.updateUser(ctx.state.user, data);//check permissions
        if (!allowed.granted){
            ctx.status = 403;
            
        }else {
            let result = await users.updateUser(body, id)
            if (result.affectedRows) {
                ctx.status = 201;
                ctx.body = {updated: true, ID: id};
            }
        } 
    }else {
        ctx.status = 500;
    }
}

//async function to delete a user
async function deleteUser(ctx){
    let id = ctx.params.id;
    let user = await users.getUserById(id);//check user exists
    if (user.length){
        const data = user[0];
        console.log("Attempting to delete", data);
        const allowed = can.deleteUser(ctx.state.user, data);
        if (!allowed.granted) {
            ctx.status = 403;
        }else{
            result = await user.deleteUser(id);
            if (result.affectedRows) {
                ctx.body = {ID: id, deleted : true}
            }
        }
    }else {
        ctx.status = 500;
    }
}

module.exports = router;
