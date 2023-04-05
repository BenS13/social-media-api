module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/post",
    "title": "Post",
    "description": "A post from a user",
    "type": "object",
    "properties": {
        "title": {
            "description": "Title of the post",
            "type": "string"
        },
        "allText": {
            "description": "Body text of the post",
            "type": "string"
        },
        "imageURL": {
            "description": "URL for image uploaded in post",
            "type": "uri"
        },
        "authorID": {
            "description": "User ID of post author",
            "type": "integer",
            "minimum": 0
        },
    },
    "required": ["title", "allText" ]
}