const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('../middleware');

const User = mongoose.model('user');
const Note = mongoose.model('note');

const router = express.Router();

router.get('/api/users', requireAuth, async (req, res) => {
    const pageSize = 10;
    const user = await User.findById(req.session.userId);
    const note = await Note.findById(req.query.note);
    let editors = [];

    if (req.query.name === '') {
        return res.status(200).send([]);
    }

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
        {
            $skip: pageSize * req.query.page,
        },
        {
            $limit: pageSize,
        },
    ]);

    res.status(200).send(records);
});

router.put('/api/users', requireAuth, async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.body.noteId, {
            $addToSet: { editors: req.body.userId },
        });

        const user = await User.findByIdAndUpdate(req.body.userId, {
            $push: {
                notes: {
                    $each: [req.body.noteId],
                    $position: 0,
                },
            },
        });

        res.status(200).send({ note, user });
    } catch (err) {
        console.log(err);
        res.status(304).send(); // 304 status for note modified
    }
});

module.exports = router;
