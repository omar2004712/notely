const mongoose = require('mongoose');
const { hashPassword } = require('./helpers');

const User = mongoose.model('user');

module.exports = {
    async register(req, res) {
        req.body.password = await hashPassword(req.body.password);
        const user = new User(req.body);

        await user.save();

        req.session.userId = user._id;
        res.send('/');
    },
    async login(req, res) {
        const user = await User.findOne({ name: req.body.name });

        req.session.userId = user._id;
        res.send('/');
    },
    async logout(req, res) {
        req.session = null;
        res.redirect('/register');
    },
};
