module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/user",
    "title": "User",
    "description": "A user of the service",
    "type": "object",
    "properties": {
        "username": {
            "description": "Username used for login",
            "type": "string"
        },
        "about": {
            "description": "Short bio about the user",
            "type": "string"
        },
        "password": {
            "description": "Password used for login",
            "type": "string"
        },
        "passwordSalt": {
            "description": "Salt for the users password",
            "type": "string"
        },
        "email": {
            "description": "Contact email for the user",
            "type": "string"
        },
    },
    "required": ["username", "password", "passwordSalt"]
}