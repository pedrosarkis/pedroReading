const express = require('express');
const User = require('../models/user');
const Book = require('../models/book');

const inactiveUser = async () => {
    const users = await User.find({});
    const books = await  Book.find({});
    const userWithNoBooks =  users.filter(user => !books.some(book =>(book.user === user.username)));
    return userWithNoBooks;
}

exports.inactiveUser = inactiveUser;