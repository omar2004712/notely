const mongoose = require('mongoose');
const editNoteTemplate = require('../views/note/newNoteTemplate');

const User = mongoose.model('user');
const Note = mongoose.model('note');

module.exports = {
    async feedNotes(req, res) {
        const { index } = req.body;
        const pageSize = 30;

        const notes = await User.findById(req.session.userId, {
            notes: { $slice: [index * pageSize, pageSize] },
        }).populate({
            path: 'notes',
            populate: {
                path: 'creatorId',
                model: 'user',
            },
        });

        res.send(notes);
    },

    async newNote(req, res) {
        const { title, content } = req.body;

        const note = new Note({
            title,
            content,
            creatorId: req.session.userId,
            editors: [],
        });

        await note.save();

        await User.findByIdAndUpdate(req.session.userId, {
            $push: {
                notes: {
                    $each: [note._id],
                    $position: 0,
                },
            },
        });

        res.status(201).send(note); // sending the note for testing

        res.end();
    },

    async sendEditNoteTemplate(req, res) {
        const note = await Note.findById(req.query.id).populate('editors');
        res.send(editNoteTemplate({ note, userId: req.session.userId }));
    },

    async update(req, res) {
        /* fix check if the user is in the array of editors or the creator */

        await Note.findByIdAndUpdate(req.body._id, {
            title: req.body.title,
            content: req.body.content,
        });

        res.status(204).send();
    },

    async deleteNote(req, res) {
        /* fix check if the user is in the array of editors or the creator */

        await Note.findByIdAndDelete(req.params.id);

        res.status(202).send();
    },
};
