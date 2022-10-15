const express = require('express');
const mongoose = require('mongoose');
const registerTemplate = require('../../views/auth/auth');
const {
  requireName,
  requirePassword,
  requireConfirmPasswordR,
} = require('./validators');
const { handleErrors, requireAuth } = require('../middleware');
const { login, logout, register } = require('../../controllers/auth');

const User = mongoose.model('user');

const router = express.Router();

router.get('/register', (_, res) => {
  res.send(registerTemplate());
});

router.post(
  '/api/login',
  [requireName(), requirePassword()],
  handleErrors(),
  login
);

router.post(
  '/api/register',
  [requireName(true), requirePassword(true), requireConfirmPasswordR],
  handleErrors(),
  register
);

router.get('/api/logout', logout);

router.get('/api/current_user', async (req, res) => {
  const user = await User.findById(req.session.userId);

  res.status(200).send(user);
});

module.exports = router;
