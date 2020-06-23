const express = require('express');
const router = express.Router();
const authToLogin = require('../middleware/authToLogin');
const User = require('../models/user');
const gerenatePassword = require('generate-password');
const bcrypt = require('bcrypt');
const mailerNewPassword = require('../helper/mailerNewPassword');


router.get('/requestUser', async (req, res) => {
  const user = await User.findOne({username : req.session.username.toLowerCase()});
  res.send(user);
});

router.post('/login', authToLogin, (req, res) => {
  const {username, email} = req.body;
  res.status(200).json({username, email})
});

router.post('/create', async (req, res) => {
  const {username, password, email} = req.body; 
  try {
    const user =  await User.create({username, oauth: password, email});
    req.session.username = username; 
    req.session.password = password;
    res.send('Ok');
  } catch (error) {
    res.send('Não foi possível criar o usuário');
  }
});

router.get('/profile', (req, res) => {
  res.render('profile.ejs', { query: req.session.username })
});

router.get('/userProfileData',async (req, res) => {
  const user = await User.findOne({username: req.session.username.toLowerCase()});
  res.send(user);
});

router.post('/recoveryPassword', async (req, res) => {
  const {email} = req.body;
  const newPassword = gerenatePassword.generate({
    length: 11,
    uppercase: false,
    numbers: true
  })
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    const updateUser = {oauth: hashedPassword};
    const user = await User.findOneAndUpdate({email}, updateUser, {
      new: true
    });
    if (user != null) {
      mailerNewPassword.sendEmail(email, newPassword);
      res.send('Ok');
    } else {
      throw new error ('Error message');
    }
  } catch (error) {
    res.send(error);
  }
});

router.post('/changePassword', async (req, res) => {
  const {newPassword} = req.body;
  const newPasswordHashed = await bcrypt.hash(newPassword, 10);
  const updateUser = {oauth: newPasswordHashed};
  try {
    const user = await User.findOneAndUpdate({username : req.session.username}, updateUser);
    res.send('Ok')
  } catch (error) {
    res.send('erro');
  }
})

module.exports = router;
