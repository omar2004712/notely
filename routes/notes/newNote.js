const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('../middleware');
const newNoteTemplate = require('../../views/note/newNoteTemplate');
const { requireTitle, requireContent } = require('./validators');
const { handleErrors } = require('../middleware');
const { newNote } = require('../../controllers/note');

const User = mongoose.model('user');
const router = express.Router();

router.get('/new-note', requireAuth, (_, res) => {
    res.send(newNoteTemplate({}));
});

router.post(
    '/api/save-note',
    requireAuth,
    [requireTitle, requireContent],
    handleErrors(),
    newNote
);

module.exports = router;
