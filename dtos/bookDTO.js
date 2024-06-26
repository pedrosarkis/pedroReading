'use strict'

const Joi = require('joi')

const bookDTO = Joi.object({
    title: Joi.string().required(),
    pages: Joi.number().required(),
    synopsis: Joi.string().required(),
    review: Joi.string().required(),
    image: Joi.string(),
    user: Joi.string().required(),
})

module.exports = bookDTO