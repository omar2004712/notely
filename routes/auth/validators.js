const { check } = require('express-validator');
const mongoose = require('mongoose');

const User = mongoose.model('user');
const { comparePasswords } = require('../../controllers/helpers');

// LI refers to log in validators
// R refers to register validators

module.exports = {
    requireName: (registration = false) => {
        let validator = check('name').trim();
        if (!registration) {
            validator = validator.custom(async (name) => {
                // to check the user is active
                const user = await User.findOne({ name });

                if (!user) {
                    throw new Error('Name is invalid'); // fix: not valid -> invalid
                }

                return true;
            });
        } else {
            validator = validator
                .isLength({ min: 1, max: 30 })
                .withMessage('Name must be between 30 and 0 characters')
                .custom((name) => {
                    // checks for special characters
                    const validChars = 'qwertyuiopasdfghjklzxcvbnm_.'.split('');
                    // eslint-disable-next-line no-restricted-syntax
                    for (const char of name) {
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
                });
        }

        return validator;
    },

    requirePassword: (registration = false) => {
        let validator = check('password').trim();

        if (!registration) {
            validator = validator.custom(async (password, { req }) => {
                // to check if the inserted password matches the one in the database
                const user = await User.findOne({ name: req.body.name.trim() });
                if (!user) {
                    return;
                }
                if (!(await comparePasswords(user.password, password))) {
                    throw new Error('Incorrect Password');
                }

                // eslint-disable-next-line consistent-return
                return true;
            });
        } else {
            validator = validator
                .isLength({ min: 8 })
                .withMessage('password must be longer than 8 characters')
                .custom((password, { req }) => {
                    // checks if password and confirm passowrd match
                    if (password !== req.body.confirmPassword.trim()) {
                        throw new Error('passwords must match');
                    }

                    return true;
                });
        }

        return validator;
    },
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
