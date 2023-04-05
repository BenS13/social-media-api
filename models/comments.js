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
    let values = [commentBody];
    let data = await db.run_query(query, values);
    return data;
};

//delete comment
exports.deleteComment = async function deleteComment(commentId) {
    let query = "DELETE FROM comments WHERE ID = ?";
    let values = [commentId];
    let data = await db.run_query(query, values);
    return data;
};

//create update async function for comments

exports.updateComment = async function updateComment(commentId, commentBody) {
    let query = "UPDATE comments SET ? WHERE ID = ?";
    let values = [commentBody, commentId];
    let data = await db.run_query(query, values);
    return data;
}

//get comment by id;
exports.getCommentById = async function getCommentById(id) {
    let query = "SELECT * FROM comments WHERE ID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
}