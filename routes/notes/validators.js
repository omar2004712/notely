const { check } = require('express-validator');

module.exports = {
    requireTitle: check('title')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Title is required'),

    requireContent: check('content')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Content is required'), // spell mistake
};
