const db = require('../helpers/database');//import our database.js method to query database [query, values]

//get likes for post by postID
exports.getLikes = async function getLikes(postId){
    let query = "SELECT COUNT(*) as 'count' FROM likes WHERE postID = ?";
    let values = [postId];
    let data = await db.run_query(query, values);
    return data;
};


//Not needed as likes can be added in the posts route themselves
exports.addLike = async function addLike(userId, postId){
    let query = "INSERT INTO  likes SET postID=?, authorID=? ON DUPLICATE KEY UPDATE postID=postID;";
    const data = await db.run_query(query, [postId, userId]);
    return data;
    //id is postID
    //query DB to see if user already likes post
    //if not add like
    //if so do nothing
};

exports.removeLike = async function removeLike(userId,postId){
    let query = "DELETE FROM likes WHERE postID=? AND authorID=?;";
    const data = await db.run_query(query, [postId, userId]);
    return data;
    //query DB to see if a like from user exists
    //if so remove like for that post from that user
    //if not do nothing
};