'use strict'


class UserController {
    constructor(bookService) {
        this.bookService = bookService
    }

    async getUserBooks(req, res) {
        const {username} = req.params
        try {
            const booksByUser = await this.bookService.getBooksByUsername(username)
            return res.status(200).json(booksByUser)
        } catch (error) {
            console.log(error)
            return res.status(500).json({error})
        }
    }
}

module.exports = UserController