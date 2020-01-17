const Joi = require('@hapi/joi');

const vacationSchema = Joi.object({
    userId: Joi.number().required(),
    vacationId: Joi.number().required()
})

function vacationFollowValidation(req, res, next) {

    const { error } = vacationSchema.validate({ userId, vacationId });
    if (error) res.status(401).send(error);
    next()
        
}

module.exports = vacationFollowValidation
