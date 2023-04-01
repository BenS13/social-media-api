const {Validator, ValidationError} = require('jsonschema');
const schema = require('../schemas/post.schema.js');

const v = new Validator();

exports.validatePost = async (ctx, next) => {

    const validateOptions = {
        throwError: true,
        allowUnknownAttributes: false
    };

    const requestBody = ctx.request.body;

    try{
        v.validate(requestBody, schema, validateOptions);
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