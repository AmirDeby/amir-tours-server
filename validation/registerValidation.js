const Joi = require('@hapi/joi');


const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().min(3).max(15).required(),
    userName: Joi.string().min(2).max(15).required(),
});

function registerValidation(req, res, next) {

    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(validation.error);
    next()
}

module.exports = registerValidation

