const mongoose = require('mongoose');
const editNoteTemplate = require('../views/note/newNoteTemplate');

const User = mongoose.model('user');

module.exports = {
    async feedNotes(req, res) {
        const { index } = req.body;

        const notes = await User.findById(req.session.userId, {
            notes: { $slice: [index, 18] }, // start from index 'index' and limit to 18 notes
        });
        res.send(notes);
    },

    async newNote(req, res) {
        await User.findByIdAndUpdate(req.session.userId, {
            $push: {
                notes: {
                    $each: [req.body],
                    $position: 0,
                },
            },
        });
        res.status(204).send();
    },

    async sendEditNoteTemplate(req, res) {
        const { notes } = await User.findById(req.session.userId, {
            notes: { $elemMatch: { _id: req.query.id } },
        });
        res.send(editNoteTemplate(notes[0]));
    },

    async update(req, res) {
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
    },

    async deleteNote(req, res) {
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
    },
};
