const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('../middlewares');
const newNoteTemplate = require('../../views/note/newNoteTemplate');
const { requireTitle, requireContent } = require('./validators');
const { handleErrors } = require('../middlewares');
const { newNote } = require('../../controllers/note');

const User = mongoose.model('user');
const router = express.Router();

router.get('/new-note', requireAuth, (req, res) => {
    res.send(newNoteTemplate({}));
});

router.post(
    '/api/save-note',
    requireAuth,
    [requireTitle, requireContent],
    handleErrors(newNoteTemplate),
    newNote
);

module.exports = router;
