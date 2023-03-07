const db = require('../helpers/database');//import our database.js method to query database [query, values]

exports.getLikes = async function getLikes(id){
    //TODO
};

exports.addLike = async function addLike(id){
    //id is postID
    //query DB to see if user already likes post
    //if not add like
    //if so do nothing
};

exports.removeLike = async function removeLike(id){
    //id is postID
    //query DB to see if a like from user exists
    //if so remove like for that post from that user
    //if not do nothing
};