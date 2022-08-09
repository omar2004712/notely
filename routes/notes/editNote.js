const express = require('express');
const mongoose = require('mongoose');
const editNoteTemplate = require('../../views/note/newNoteTemplate');
const { requireAuth, handleErrors } = require('../middleware');
const { requireTitle, requireContent } = require('./validators');
const {
    sendEditNoteTemplate,
    update,
    deleteNote,
} = require('../../controllers/note');

const User = mongoose.model('user');
const router = express.Router();

router.get('/edit-note', requireAuth, sendEditNoteTemplate);

router.put(
    '/api/edit-note',
    requireAuth,
    [requireTitle, requireContent],
    handleErrors(editNoteTemplate),
    update
);

router.delete('/api/editor/:id', requireAuth, (req, res) => {
    res.status(204).send({});
});

router.delete('/api/delete/:id', requireAuth, deleteNote);

module.exports = router;
