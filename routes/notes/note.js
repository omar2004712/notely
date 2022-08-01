const mongoose = require('mongoose');
const express = require('express');
const { requireAuth } = require('../middlewares');

const User = mongoose.model('user');
const router = express.Router();

router.get('/api/notes', requireAuth, (req, res) => {
    res.send([
        {
            title: 'new Note',
            content: 'this is a new note',
        },
        {
            title: 'new Note',
            content: 'this is a new note',
        },
        {
            title: 'new Note',
            content: 'this is a new note',
        },
    ]);
});

module.exports = router;
