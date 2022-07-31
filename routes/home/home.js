const express = require('express');
const homeTemplate = require('../../views/home/homeTemplate');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(homeTemplate());
});

module.exports = router;
