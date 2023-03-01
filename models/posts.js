const db = require('../helpers/database');//import our database.js method to query database [query, values]

//get a post by id
exports.getPostById = async function getPostById (id) {
    let query = "SELECT * FROM posts WHERE ID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data
};

//get all posts
exports.getAllPosts = async function getAllPosts() {
    let query = "SELECT * FROM posts;";
    let data = await db.run_query(query);
    return data;
};

//create new post
exports.createPost = async function createPost(post) {
    let query = "INSERT INTO posts SET ?";
    let data = await db.run_query(query, post);
    return data;
};

//update post
exports.updatePost = async function updatePost(post, id){
    let query = "UPDATE posts SET ? WHERE ID = ?";
    let values = [post, id];
    let data = await db.run_query(query, values);
    return data;
};

//delete post
exports.deletePost = async function deletePost(id) {
    let query = "DELETE FROM posts WHERE ID = ?";
    let data = await db.run_query(query, id);
    return data
};