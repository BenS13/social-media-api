module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/comment",
    "title": "Comment",
    "description": "Comment on a post",
    "type": "object",
    "properties": {
        "postID": {
            "description": "ID for the post",
            "type": "integer"
        },
        "allText": {
            "description": "Body text of the comment",
            "type": "string"
        },
        "authorID": {
            "description": "User ID of comment author",
            "type": "integer"
        },
    },
    "required": ["postID", "allText", "authorID"]
}