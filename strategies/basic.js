/**
 * Module that handles authentication for users
 * @module strategies/basic
 * @owner Adapted from week4 Lab Authentication and Permissions
 */



const BasicStrategy = require('passport-http').BasicStrategy
const users = require('../models/users');
const sha256 = require('sha256');

/**
 * Function that checks password in DB against provided password
 * @param {object} user - User object containig users details
 * @param {string} password - Supplied password to check against
 * @returns {bool} - True if password correct
 */
const verifyPassword = function (user,password){
    //compare password in storage to supplied password
    hashed_password = sha256(password);
    console.log(hashed_password);
    console.log(user.password);
    return (user.password == hashed_password);
}

/**
 * Async function to authenticate a user
 * @param {string} username - Username of user
 * @param {string} password - Password of user
 * @param {function} done - Return done() function with errors if needed
 * @returns {function} - Returns done()
 */
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