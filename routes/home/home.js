const express = require('express');
const homeTemplate = require('../../views/home/homeTemplate');
const { requireAuth } = require('../middlewares');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
    res.send(homeTemplate());
});

module.exports = router;
