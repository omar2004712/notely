const express = require('express');
const mongoose = require('mongoose');
const registerTemplate = require('../../views/auth/auth');
const {
    requireNameLI,
    requirePasswordLI,
    requireNameR,
    requirePasswordR,
    requireConfirmPasswordR,
} = require('./validators');
const { handleErrors } = require('../middlewares');
const { login, logout, register } = require('../../controllers/auth');

const router = express.Router();

router.get('/register', (_, res) => {
    res.send(registerTemplate());
});

router.post(
    '/api/login',
    [requireNameLI, requirePasswordLI],
    handleErrors(registerTemplate),
    login
);

router.post(
    '/api/register',
    [requireNameR, requirePasswordR, requireConfirmPasswordR],
    handleErrors(registerTemplate),
    register
);

router.get('api/logout', logout);

module.exports = router;
