module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    
    "user": {
        "id": "#user",
        "title": "User",
        "description": "Data to add new user to the service",
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
            }
        },
        "required": ["username", "password", "passwordSalt"],
    },

    "viewUsers" : {
        "id" : "#viewUsers",
        "title" : "ViewUsers",
        "description" : "Information that is visible to users and admins(exlude passwords)",
        "type": "object",
        "properties" : {
            "username": {
                "description": "Username for login",
                "type" : "string"
            },
            "about": {
                "description" : "Small bio about user",
                "type" : "string"
            },
            "email" : {
                "description": "Email for the user",
                "type": "string"
            }
        }
    },

    "updateUser": {
        "id": "#updateUser",
        "title" : "updateUser",
        "description": "Data a user can and needs to update a user",
        "type" : "object",
        "properties" : {
            "username": {
                "description": "Username for login",
                "type" : "string"
            },
            "about": {
                "description" : "Small bio about user",
                "type" : "string"
            },
            "password": {
                "description": "Password used for login",
                "type": "string"
            },
            "email": {
                "description": "Contact email for the user",
                "type": "string"
            }

        },
        "additionalProperties" : false   
    },
}