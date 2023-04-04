const {Validator, ValidationError} = require('jsonschema');
const postSchema = require('../schemas/post.schema.js');
const userSchema = require('../schemas/user.schema.js');
const commentSchema = require('../schemas/comment.schema.js');

const v = new Validator();

exports.validatePost = async (ctx, next) => {

    const validateOptions = {
        throwError: true,
        allowUnknownAttributes: false
    };

    const requestBody = ctx.request.body;

    try{
        v.validate(requestBody, postSchema, validateOptions);
        await next()
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.body = error;
            ctx.status = 400;
        } else {
            throw error;
        }
    }
}

exports.validateUser = async (ctx, next) => {

    const validateOptions = {
        throwError: true,
        allowUnknownAttributes: false
    };

    const requestBody = ctx.request.body;

    try{
        v.validate(requestBody, userSchema, validateOptions);
        await next()
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.body = error;
            ctx.status = 400;
        } else {
            throw error;
        }
    }
}

exports.validateComment = async (ctx, next) => {

    const validateOptions = {
        throwError: true,
        allowUnknownAttributes: false
    };

    const requestBody = ctx.request.body;

    try{
        v.validate(requestBody, commentSchema, validateOptions);
        await next()
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.body = error;
            ctx.status = 400;
        } else {
            throw error;
        }
    }
}

exports.validateLike = async (ctx, next) => {

    const validateOptions = {
        throwError: true,
        allowUnknownAttributes: false
    };

    const requestBody = ctx.request.body;

    try{
        v.validate(requestBody, likeSchema, validateOptions);
        await next()
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.body = error;
            ctx.status = 400;
        } else {
            throw error;
        }
    }
}


