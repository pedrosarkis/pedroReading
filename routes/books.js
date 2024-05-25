const express = require('express');

const router = express.Router();
const Book = require('../models/book');

router.post('/', async (req, res) => {
  const { title, pages, synopsis, review, image } = req.body
  try {
    await Book.create({ title, pages, synopsis, review, image, user: req.session.username });
    return res.status(200).send('Ok')
  } catch (err) {
    return res.send(err)
  }
})

router.get('/', async (req, res) => {
  const books = await Book.find({});
  res.status(200).json(books);
}); 
module.exports = router;