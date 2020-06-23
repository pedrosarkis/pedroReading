const express = require('express');

const router = express.Router();
const Book = require('../models/book');

router.post('/savebook', async (req, res) => {
  const { title, pages, synopsis, review, image } = req.body;
  try {
    await Book.create({ title, pages, synopsis, review, image, user: req.session.username });
    res.send('Ok');
  } catch (err) {
    return res.send(err)
  }
});

router.get('/getbooks', async (req, res) => {
  const books = await Book.find({ user: req.session.username.toLowerCase() });
  res.json(books);
});

router.get('/allbooks', async (req, res) => {
  const books = await Book.find({});
  res.json(books);
}); 
module.exports = router;