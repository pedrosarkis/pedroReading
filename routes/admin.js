const express = require('express');

const router = express.Router();
const User = require('../models/user');
const Book = require('../models/book');
const email = require('../helper/mailer');
const getInactiveUser = require('../helper/getInactiveUser');
// const emailsSent = require('../models/emails');

router.get('/', (req, res) => {
  res.render('admin.ejs');
});

router.get('/users', (req, res) => {
  res.render('allusers.ejs');
});

router.get('/allusers', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);

  } catch (error) {
    res.send(error);
  }
});

router.get('/allbooks', (req, res) => {
  res.render('adminallboks.ejs')
});

router.get('/getallbooks', async (req, res) => {
  try {
    const book = await Book.find({});
    res.send(book);

  } catch (error) {
    res.send(error);
  }
});

router.get('/inactiveusers', (req, res) => {
  res.render('userwithoutbook.ejs')
});

router.get('/getinactiveusers', async (req, res) => {
  try {
    const userwithoutbook = await getInactiveUser.inactiveUser();
    res.send(userwithoutbook);

  } catch (error) {
    console.log(error);

  }
});

router.get('/sendEmailInactiveUser', async (req, res) => {
  try {
    const userwithoutbook = await getInactiveUser.inactiveUser();
    userwithoutbook.forEach(inactiveUser => {
      email.sendEmail(inactiveUser);
    })
    res.send('Emails enviados com sucesso');
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

