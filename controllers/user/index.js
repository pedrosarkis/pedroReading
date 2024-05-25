'use strict'

const book = require('../../models/book')
const BookService = require('../../service/bookService')
const UserController = require('./userController')
const UserModel = require('../../models/user')
const bcrypt = require('bcrypt')

const userController = new UserController(new BookService(book, UserModel, bcrypt))

module.exports = userController