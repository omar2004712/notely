const mongoose = require('mongoose');
const express = require('express');
const { requireAuth } = require('../middlewares');

const User = mongoose.model('user');
const router = express.Router();

router.post('/api/notes', requireAuth, async (req, res) => {
    const { index } = req.body;

    const notes = await User.findById(req.session.userId, {
        notes: { $slice: [index, 18] }, // start from index 'index' and limit to 18 notes
    });
    res.send(notes);
});

module.exports = router;
