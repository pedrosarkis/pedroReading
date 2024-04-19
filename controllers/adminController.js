const User = require('../models/user')
const Book = require('../models/book')
const email = require('../helper/mailer')
const getInactiveUser = require('../helper/getInactiveUser')

const getAllUsers = async (req, res) => {
    const users = await User.find({}).lean();
    res.send(users);
}

const getAllBooks = async (req, res) => {
    const books = await Book.find({}).lean();
    res.send(books);
}

module.exports = {
    getAllUsers,
    getAllBooks,
   
}