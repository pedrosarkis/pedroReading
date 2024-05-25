'use strict'

class BookService {
    constructor(book) {
        this.book = book
    }

    async getBooksByUsername(username) {
        return await this.book.findOne({username: username.toLowerCase()})
    }
}

module.exports = BookService