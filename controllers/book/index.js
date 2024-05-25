'use strict'

const bookController = require('./bookController')
const bookModel = require('../../models/book')

const BookController = new bookController(bookModel)

module.exports = BookController