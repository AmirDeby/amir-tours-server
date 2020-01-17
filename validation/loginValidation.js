const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
})

function loginValidation(req, res, next) {

    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error);
    next();
}

module.exports = loginValidation
