const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/user');

const app = express();

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/notely');
}

app.get('/api', (req, res) => {
    res.send({ hi: 'there' });
});

module.exports = app;
