const { check } = require('express-validator');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const { comparePasswords } = require('../../controllers/helpers');

// LI refers to log in validators
// R refers to register validators

module.exports = {
    requireNameLI: check('name')
        .trim()
        .custom(async (name) => {
            // to check the user is active
            const user = await User.findOne({ name });

            if (!user) {
                throw new Error('Name is not valid');
            }

            return true;
        }),

    requirePasswordLI: check('password')
        .trim()
        .custom(async (password, { req }) => {
            // to check if the inserted password matches the one in the database
            const user = await User.findOne({ name: req.body.name.trim() });
            if (!user) {
                return;
            }
            if (!(await comparePasswords(user.password, password))) {
                throw new Error('Incorrect Password');
            }

            return true;
        }),

    requireNameR: check('name')
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('Name must be between 30 and 0 characters')
        .custom((name) => {
            // checks for special characters
            const validChars = 'qwertyuiopasdfghjklzxcvbnm_.'.split('');
            for (let char of name) {
                if (!validChars.includes(char)) {
                    throw new Error(`${char} is invalid character`);
                }
            }

            return true;
        })
        .custom(async (name, { req }) => {
            // checks if the name is used
            const user = await User.findOne({ name: req.body.name });
            if (user) {
                throw new Error('Name is used');
            }

            return true;
        }),

    requirePasswordR: check('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('password must be longer than 8 characters')
        .custom((password, { req }) => {
            // checks if password and confirm passowrd match
            if (password !== req.body.confirmPassword.trim()) {
                throw new Error('passwords must match');
            }

            return true;
        }),

    requireConfirmPasswordR: check('confirmPassword')
        .trim()
        .custom((confirmPassword, { req }) => {
            // checks if password and confirm passowrd match
            if (req.body.password !== confirmPassword.trim()) {
                throw new Error('passwords must match');
            }

            return true;
        })
        .isLength({ min: 8 })
        .withMessage('password must be longer than 8 characters'), // fixed passwords -> password
};
