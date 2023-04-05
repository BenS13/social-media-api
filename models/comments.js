const db = require('../helpers/database');//import our database.js method to query database [query, values]

//get comments for sepcific post
exports.getComments = async function getComments (id) {
    let query = "SELECT * FROM comments WHERE postID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
};

exports.createComment = async function createComment(userId, postId, commentBody) {
    let query = "INSERT INTO comments SET ?";
    commentBody["postID"] = postId;
    commentBody["authorID"] = userId;
    let values = [comment];
    let data = await db.run_query(query, values);
    return data;
};

exports.deleteComment = async function deleteComment(userId, commentId) {
    let query = "DELETE FROM comments WHERE ID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
};

//create update async function for comments

exports.updateComment = async function updateComment(userId, commentId) {
    let query = "UPDATE comments SET ? WHERE ID = ?";
    let values = [comment, id];
    let data = await db.run_query(query, values);
    return data;
}