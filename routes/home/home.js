const express = require('express');
const homeTemplate = require('../../views/home/homeTemplate');
const { requireAuth } = require('../middleware');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
    res.send(homeTemplate());
});

module.exports = router;
