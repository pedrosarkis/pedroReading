'use strict'

const Joi = require('joi')

const userDTO = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
})

module.exports = userDTO