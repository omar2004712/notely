const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    // deleted the email field
    name: String,
    googleID: String,
    password: {
        type: String,
        validate: {
            validator: (password) => password.length >= 8,
            message: 'Password must be longer than 8 characters',
        },
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'note',
        },
    ],
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
