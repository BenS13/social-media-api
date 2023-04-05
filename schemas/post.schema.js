module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",

    "createPost": {
        "id": "#createPost",
        "title": "CreatePost",
        "description": "Data needed from user to create a post",
        "type" : "object",
        "properties": {
            "title": {
                "description": "Title for the post",
                "type": "string"
            },
            "allText": {
                "description": "Main body of the post",
                "type": "string"
            },
            "imageURL": {
                "description": "Image for the post",
                "type" : "string",
                "format" : "uri"
            },
            "authorID": {
                "description": "ID of post owner",
                "type": "integer"
            } 
        },
        "required" : ["title", "allText"],
        "aditionalProperties" : false
    },

    "updatePost": {
        "id" : "#updatePost",
        "title": "UpdatePost",
        "description": "Data required to update a post",
        "type": "object",
        "properties": {
            "title": {
                "description": "Title for the post",
                "type": "string"
            },
            "allText": {
                "description": "Main body of the post",
                "type": "string"
            },
            "imageURL": {
                "description": "Image for the post",
                "type" : "string",
                "format" : "uri"
            },
            "authorID": {
                "description": "ID of post owner",
                "type": "integer"
            }
        },
        "additionalPropeties" : false
    }
}