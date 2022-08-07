const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('../middleware');

const router = express.Router();

router.get('/api/users', requireAuth, (req, res) => {
    res.status(200).send([
        {
            _id: '2e2oium09c3n',
            name: 'Jason',
        },
        {
            _id: '30c4m3qeeqwc',
            name: 'Sam',
        },
        {
            _id: '2sadasda9c3n',
            name: 'Mike',
        },
        {
            _id: 'dsfsdfsdf2e2',
            name: 'George',
        },
        {
            _id: '34nc29cn934c',
            name: 'Micheal',
        },
        {
            _id: '39c84n409409',
            name: 'Walter',
        },
    ]);
});

router.put('/api/users', requireAuth, (req, res) => {
    console.log(req.body.userId, req.body.noteId);
});

module.exports = router;
