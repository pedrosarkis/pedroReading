'use strict'

const book = require('../../models/book')
const BookService = require('../../service/bookService')
const UserController = require('./userController')

const userController = new UserController(new BookService(book))

module.exports = userController