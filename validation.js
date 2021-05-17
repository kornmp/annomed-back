const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
            .min(6),
        phoneNumber: Joi.string()
            .required(),
        company: Joi.string()
            .required(),
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
            .min(6),
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;