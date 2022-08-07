const mongoose = require('mongoose');
const express = require('express');
const { requireAuth } = require('../middleware');
const { feedNotes } = require('../../controllers/note');

const User = mongoose.model('user');
const router = express.Router();

router.post('/api/notes', requireAuth, feedNotes);

module.exports = router;
