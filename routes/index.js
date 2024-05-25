const express = require('express')
const router = express.Router()
const middleware = require('../middleware/auth')

router.get('/', middleware,  (req, res) => {
    res.render('index.ejs', {query: req.session?.username})
})

router.get('/form', (req, res) => { 
    res.render('form.ejs')
})

router.get('/getallbooks', (req, res) => {
    res.render('allbooks.ejs')
})

router.get('/autenticate', (req, res) => {
    res.render('register.ejs')
})

router.get('/recovery', (req, res) => {
    res.render('recovery.ejs')
})

module.exports = router
