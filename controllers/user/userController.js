'use strict'


class UserController {
    constructor(bookService, userRepository, hasher) {
        this.bookService = bookService
        this.userRepository = userRepository
        this.hasher = hasher
    }

    async getUserBooks(req, res) {
        const { username } = req.params
        try {
            const booksByUser = await this.bookService.getBooksByUsername(username)
            return res.status(200).json(booksByUser)
        } catch (error) {
            console.log(error)
            return res.status(500).json({error})
        }
    }

    async find(req, res) {
        const user = await this.userRepository.find({username: req.session.username.toLowerCase()})
        return res.json(user)
    }

    async login(req, res) {
        const {username, email} = req.body
        res.stastus(200).json({username, email})
    }

    async changePassword(req, res) {
        const passwordHashed = await this.hasher.hash(req.body.newPassword, 10)
        
        try {
            await  this.userRepository.find({username: req.session.username}, { oauth: passwordHashed })
            return res.status(200).json({message: 'Alterado com sucesso'})
        } catch (error) {
            return res.status(500).json({message: 'Erro ao alterar senha', error})
        }
    }

    async getProfileData(req, res) {
        try {
            const user = await this.userRepository.findOne({username: req.session.username.toLowerCase()})
            return res.status(200).json({message: 'Sucesso ao recuperar usuário', user})
        } catch (error) {
            return res.status(500).json({message: 'Erro ao recuperar dados do usuário', error})
        }
    }
}

module.exports = UserController