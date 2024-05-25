const router = require('express').Router()

const bookController = require('../controllers/book/index')



router.post('/', async (req, res) => {
    bookController.create(req, res)
})

router.get('/', async (req, res) => {
    bookController.read(req, res)
})

module.exports = router