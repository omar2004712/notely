const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: String,
    content: String,
});

const UserSchema = new Schema({
    // deleted the email field
    name: String,
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: (password) => password.length >= 8,
            message: 'Password must be longer than 8 characters',
        },
    },
    notes: [NoteSchema],
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
