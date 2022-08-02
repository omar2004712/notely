const express = require('express');
const mongoose = require('mongoose');
const editNoteTemplate = require('../../views/note/newNoteTemplate');
const { requireAuth, handleErrors } = require('../middlewares');
const { requireTitle, requireContent } = require('./validators');

const User = mongoose.model('user');
const router = express.Router();

router.get('/edit-note', requireAuth, async (req, res) => {
    const { notes } = await User.findById(req.session.userId, {
        notes: { $elemMatch: { _id: req.query.id } },
    });
    res.send(editNoteTemplate(notes[0]));
});

router.put(
    '/api/edit-note',
    requireAuth,
    [requireTitle, requireContent],
    handleErrors(editNoteTemplate),
    async (req, res) => {
        await User.updateOne(
            { _id: req.session.userId, 'notes._id': req.body._id },
            {
                $set: {
                    'notes.$.title': req.body.title,
                    'notes.$.content': req.body.content,
                },
            }
        );

        res.status(204).send();
    }
);

router.delete('/api/delete/:id', requireAuth, async (req, res) => {
    await User.updateOne(
        { _id: req.session.userId },
        {
            $pull: {
                notes: {
                    _id: req.params.id,
                },
            },
        }
    );
    res.status(202).send();
});

module.exports = router;
