const {Validator, ValidationError} = require('jsonschema');

const postSchema = require('../schemas/post.schema.js').createPost;
const postUpdateSchema = require('../schemas/post.schema.js').updatePost;

const userSchema = require('../schemas/user.schema.js').user;
const userUpdateSchema = require('../schemas/user.schema.js').updateUser;

const commentSchema = require('../schemas/comment.schema.js').comment;

const likeSchema = require('../schemas/like.schema')


//Takes schema and resource
//Returns hanlder functuin (ctx, next) //Adapted from https://github.coventry.ac.uk/6003CEM/back-end-demo-code/blob/master/controllers/validation.js
const makeKoaValidator = (schema, resource) => {
    const v = new Validator();
    const validateOptions = {
        throwError: true,
        propertyName: resource
    };

    const handler = async (ctx, next) => {
        const body = ctx.request.body;

        try{
            v.validate(body, schema, validateOptions);
            await next();
        } catch (error) {
            if (error instanceof ValidationError) {
                ctx.body = error;
                ctx.status = 400;
            }
        }
    }

    return handler;
}

exports.validatePost = makeKoaValidator(postSchema, 'createPost');
exports.validatePostUpdate = makeKoaValidator(postUpdateSchema, 'updatePost');

exports.validateUser = makeKoaValidator(userSchema, 'user');
exports.validateUserUpdate = makeKoaValidator(userUpdateSchema, 'updateUser');

exports.validateComment = makeKoaValidator(commentSchema, 'comment');

exports.validateLike = makeKoaValidator(likeSchema, 'like');