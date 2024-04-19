const express = require('express');

const router = express.Router();
const adminController = require('../controllers/adminController')


// const emailsSent = require('../models/emails');

router.get('/', (req, res) => {
  res.render('admin.ejs');
});

router.get('/users', (req, res) => {
  res.render('allusers.ejs');
});

router.get('/allusers', (req, res) => adminController.getAllUsers(req, res));

router.get('/allbooks', (req, res) => res.render('adminallboks.ejs'));

router.get('/getallbooks', async (req, res) => adminController.getAllBooks(req, res));

router.get('/inactiveusers', (req, res) => res.render('userwithoutbook.ejs'))

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

