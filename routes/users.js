/**
 * A module to route users to correct user rescource
 * @module routes/users
 */
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const users = require('../models/users')
const auth = require('../controllers/auth');
const {validateUser} = require('../controllers/validation')
const {validateUserUpdate} = require('../controllers/validation')
const can = require('../permissions/users');

/**Base URL for users resource */
const router = Router({prefix: '/api/v1/users'});

/**Routes for user resources */
router.get('/', auth, getAllUsers);
router.post('/', bodyParser(), validateUser, createUser)
router.get('/:id([0-9]{1,})', auth, getUserById); 
router.put('/:id([0-9]{1,})', bodyParser(), auth, validateUserUpdate, updateUser); 
router.del('/:id([0-9]{1,})', auth, deleteUser);

/**
 * Routing function to retrive all users details
 * @param {object} ctx Koa response/request object
 */
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
            ctx.body = {status: ctx.status, message: "Users not found"}
        }
    }
}


/**
 * Routing function to retrive users details by id
 * @param {object} ctx Koa response/request object 
 */
async function getUserById(ctx){
    let id = ctx.params.id;//gets ID from url
    let user = await users.getUserById(id);
    if (user.length) {//if query to DB successful
        const data = user[0];
        const allowed = can.readUser(ctx.state.user, data);
        if (!allowed.granted) {
            ctx.status = 403;
        }else {
            ctx.status= 200
            ctx.body = user[0];
        }
    }else {
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "User not found"}
    }
}



/**
 * Routing function to create a new user
 * @param {object} ctx Koa response/request object
 */
async function createUser(ctx){
    const body = ctx.request.body;
    let user = await users.createUser(body);
    if (user){
        ctx.status=201;
        ctx.body = {ID: user.insertId, created : true}
    }else {
        ctx.status = 500;
        ctx.body = {status: ctx.status, message: "Error when creating user"}
    }
}


/**
 * Routing function to update a users record
 * @param {object} ctx Koa response/request object
 */
async function updateUser(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    let user = await users.getUserById(id);//Check if user exists
    if (user.length){
        let data = user[0];
        const allowed = can.updateUser(ctx.state.user, data);//check permissions
        if (!allowed.granted){
            ctx.status = 403;
            
        }else {
            let result = await users.updateUser(body, id)//Models perfoms opertation
            if (result.affectedRows) {
                ctx.status = 200;
                ctx.body = {updated: true, ID: id};
            }
        } 
    }else {
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "User not found"}
    }
}


/**
 * Routing function to delete a user
 * @param {object} ctx Koa response/request object
 */
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
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "User not found"}
    }
}

module.exports = router;
