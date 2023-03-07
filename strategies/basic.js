
//inspired from week4 Lab Authentication and Permissions
const BasicStrategy = require('passport-http').BasicStrategy
const users = require('../models/users');

const verifyPassword = function (user,password){
    //compare password in storage to supplied password
    return user.password === password;
}

const compareUserAndPass = async (username, password, done) => {
    //look up user in DB
    //check if supplied password == stored password
    //call done() with either an error or the username
    let result;
    try {
        result = await users.getUserByUsername(username);
    } catch (error){
        console.error(`There has been an error during authentication for user ${username}`);
        return done(error);
    }

    if (result.length) {
        const user = result[0];
        if (verifyPassword(user, password)) {
            console.log(`Authentication Succesful for user ${username}`);
            return done(null, user);
        } else{
            console.log("Incorrect password");
        }
    } else {
        console.log("No user found");
    }
    return done(null, false);
}

const strategy = new BasicStrategy(compareUserAndPass);
module.exports = strategy;