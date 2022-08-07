const mongoose = require('mongoose');
const { hashPassword } = require('./helpers');

const User = mongoose.model('user');

module.exports = {
    async register(req, res) {
        req.body.password = await hashPassword(req.body.password);
        const user = new User(req.body);

        await user.save();

        // eslint-disable-next-line no-underscore-dangle
        req.session.userId = user._id;
        res.send({
            redirect: '/',
        });
    },
    async login(req, res) {
        const user = await User.findOne({ name: req.body.name });

        // eslint-disable-next-line no-underscore-dangle
        req.session.userId = user._id;
        // switched to send response in form of objects
        res.send({
            redirect: '/',
        });
    },
    async logout(req, res) {
        req.session = null;
        res.redirect('/register');
    },
};
