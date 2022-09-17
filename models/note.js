const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: String,
    content: String,
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    editors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
});

const Note = mongoose.model('note', NoteSchema);

module.exports = Note;
