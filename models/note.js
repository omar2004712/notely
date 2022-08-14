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

NoteSchema.pre('remove', function (next) {
    const User = mongoose.model('user');

    User.updateMany(
        { _id: { $in: this.editors } },
        {
            notes: this._id.toString(),
        }
    );
});

const Note = mongoose.model('note', NoteSchema);

module.exports = Note;
