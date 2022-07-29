const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: String,
    content: String,
});

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: (email) => email.length >= 5,
            message: 'Email must be longer than 5 letters',
        },
    },
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
