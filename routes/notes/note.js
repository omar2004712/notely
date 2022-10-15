const mongoose = require('mongoose');
const express = require('express');
const { requireAuth } = require('../middleware');
const { feedNotes } = require('../../controllers/note');

const User = mongoose.model('user');
const Note = mongoose.model('note');
const router = express.Router();

router.post('/api/notes', requireAuth, feedNotes);

router.get('/api/is_creator', requireAuth, async (req, res) => {
    // the note id is require as a query named note_id
    // the returned value in case of success will be an object with a key of isCreator and value of true or false
    const note = await Note.findById(req.query.note_id);

    res.status(200).send({
        isCreator: note.creatorId.toString() === req.session.userId,
    });
});

module.exports = router;
