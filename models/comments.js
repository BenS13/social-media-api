const db = require('../helpers/database');//import our database.js method to query database [query, values]

exports.getComments = async function getComments (id) {
    let query = "SELECT * FROM comments WHERE postID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
};

exports.createComment = async function createComment(comment, id) {
    let query = "INSERT INTO comments SET ?";
    comment["postID"] = id;
    let values = [comment];
    let data = await db.run_query(query, values);
    return data;
};

exports.deleteComment = async function deleteComment(id) {
    let query = "DELETE FROM comments WHERE ID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
};

//create update async function for comments