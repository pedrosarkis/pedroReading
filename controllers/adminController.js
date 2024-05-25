const User = require('../models/user')
const Book = require('../models/book')

const getAllUsers = async (req, res) => {
    const users = await User.find({}).lean()
    res.send(users)
}

const getAllBooks = async (req, res) => {
    const books = await Book.find({}).lean()
    res.send(books)
}


const inactiveUser = async () => {
    const [users, books] = await Promise.all(User.find({}).lean(), Book.find({}).lean())
    return users.filter(user => !books.some(book =>(book.user === user.username)))
}

module.exports = {
    getAllUsers,
    getAllBooks,
    inactiveUser
   
}