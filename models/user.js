const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: String,
    content: String,
});

const UserSchema = new Schema({
    email: String,
    name: String,
    password: String,
    notes: [NoteSchema],
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
