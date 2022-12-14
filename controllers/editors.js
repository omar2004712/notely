const mongoose = require('mongoose');

const User = mongoose.model('user');
const Note = mongoose.model('note');

module.exports = {
    searchEditors: async (req, res) => {
        const pageSize = 10;
        const user = await User.findById(req.session.userId);
        const note = await Note.findById(req.query.note);
        let editors = [];

        // if the user sends an empty search term return empty string
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
    },
    addEditor: async (req, res) => {
        // adds editors to the note

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
            res.status(304).send(); // 304 status for not modified
        }
    },
    deleteEditor: async (req, res) => {
        const queries = [];
        queries.push(
            User.findByIdAndUpdate(req.params.editorId, {
                $pull: { notes: { $eq: req.params.noteId } },
            }),
            Note.findByIdAndUpdate(req.params.noteId, {
                $pull: { editors: { $eq: req.params.editorId } },
            })
        );

        await Promise.all(queries);

        res.status(204).send();
    },
};
