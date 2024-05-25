'use strict'

const bookDTO = require('../../dtos/bookDTO')
const Book = require('../../entities/Book')
class BookController {
    constructor(bookRepository) {
        this.bookRepository = bookRepository
    }
    
    async create(req, res) {
        const { title, pages, synopsis, review, image } = req.body
        try {
            const book = new Book(title, pages, synopsis, review, image, req.session.username)

            const {error} = bookDTO.validate(book)
           
            if(error) return res.status(400).json({message: 'Houve um erro ao criar o livro', error})
            await this.bookRepository.create(book)
            return res.status(201).json({message: 'Book created'})
        } catch (error) {
            console.log({error})
            return res.status(500).json({message: 'error creating book', error})
        }
    }

    async read(req, res) {
        try {
            const books = await this.bookRepository.find({})
            return res.status(200).json(books)
        } catch (error) {
            return res.status(500).json({message: 'Erro ao buscar livros', error})
        }
        
    }
}

module.exports = BookController