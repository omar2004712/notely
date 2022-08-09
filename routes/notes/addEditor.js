const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('../middleware');

const User = mongoose.model('user');
const Note = mongoose.model('note');

const router = express.Router();

router.get('/api/users', requireAuth, async (req, res) => {
    const user = await User.findById(req.session.userId);
    const note = await Note.findById(req.query.note);
    let editors = [];

    if (note) {
        // incase the user does note pass a correct note id skip
        editors = note.editors;
    }

    const records = await User.aggregate([
        {
            $match: {
                name: { $regex: req.query.name },
                _id: {
                    $ne: user._id, // to execlude the user from the output
                    $nin: editors, // to execlude the editors from the output
                },
            },
        },
    ]);

    res.status(200).send(records);
});

router.put('/api/users', requireAuth, async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.body.noteId, {
            $addToSet: { editors: req.body.userId },
        });

        res.status(200).send(note);
    } catch (err) {
        res.status(304).send(); // 304 status for note modified
    }
});

module.exports = router;
