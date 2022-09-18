const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
require('./models/user'); // to create the model before starting the server
require('./models/note'); // to create the model before starting the server
require('./services/passport');
const authRouter = require('./routes/auth/auth');
const homeRouter = require('./routes/home/home');
const noteRouter = require('./routes/notes/note');
const newNoteRouter = require('./routes/notes/newNote');
const editNoteRouter = require('./routes/notes/editNote');
const addEditorRouter = require('./routes/notes/addEditor');
const googleAuthRouter = require('./routes/auth/googleAuth');
const keys = require('./config/keys');

const app = express();

app.use(passport.initialize());

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/notely');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    cookieSession({
        keys: [keys.cookieKey],
    })
);

app.get('/api', (req, res) => {
    res.send({ hi: 'there' });
});

app.use(express.static('public'));

app.use(googleAuthRouter);
app.use(authRouter);
app.use(homeRouter);
app.use(noteRouter);
app.use(newNoteRouter);
app.use(editNoteRouter);
app.use(addEditorRouter);

module.exports = app;
