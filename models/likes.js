const db = require('../helpers/database');//import our database.js method to query database [query, values]

//get likes for post by postID
exports.getLikes = async function getLikes(id){
    let query = "SELECT COUNT(*) as 'count' FROM likes WHERE postID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
};


//Not needed as likes can be added in the posts route themselves
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