const express = require('express')
const router = express.Router()
const authToLogin = require('../middleware/authToLogin')
const createUserController = require('../useCases/CreateUser/index')
const userController = require('../controllers/user/index')


router.get('/requestUser', async (req, res) => {
    userController.find(req, res)
})

router.get('/:username/books', (req, res) => {
    return userController.getUserBooks(req, res)
})

router.post('/login', authToLogin, (req, res) => {
    userController.login(req, res)
})

router.post('/create', async (req, res) => {
    return createUserController.handle(req, res)
})

router.get('/profile', (req, res) => {
    res.render('profile.ejs', { query: req.session.username })
})

router.get('/userProfileData',async (req, res) => {
    userController.getProfileData(req, res)
})

router.post('/changePassword', (req, res) => {
    userController.changePassword(req, res)
})

module.exports = router
