'use strict'

const BookModel = require('../../models/book')
const BookService = require('../../service/bookService')
const UserController = require('./userController')
const UserModel = require('../../models/user')
const bcrypt = require('bcryptjs')

const userController = new UserController(new BookService(BookModel), UserModel, bcrypt)

module.exports = userController