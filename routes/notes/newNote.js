const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('../middlewares');
const newNoteTemplate = require('../../views/note/newNoteTemplate');

const User = mongoose.model('user');
const router = express.Router();

router.get('/new-note', requireAuth, (req, res) => {
    res.send(newNoteTemplate({}));
});

router.post('/api/save-note', requireAuth, async (req, res) => {
    await User.findByIdAndUpdate(req.session.userId, {
        $push: {
            notes: {
                $each: [req.body],
                $position: 0,
            },
        },
    });
    res.status(204).send();
});

module.exports = router;
