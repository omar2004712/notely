const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('../middlewares');
const newNoteTemplate = require('../../views/note/newNoteTemplate');

const User = mongoose.model('user');
const router = express.Router();

router.get('/new-note', requireAuth, (req, res) => {
    res.send(newNoteTemplate({}));
});

router.post('/api/save-note', (req, res) => {
    console.log(req.body);
    res.status(204).send({});
});

module.exports = router;
