const mongoose = require('mongoose');
const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const User = require('./models/user'); // to create the model before starting the server
const authRouter = require('./routes/auth/auth');
const homeRouter = require('./routes/home/home');

const app = express();

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/notely');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    cookieSession({
        keys: ['e94fd303o2c3432im%$weq321@*fgfd+aofi`kjhrnvr44920_+45u'],
    })
);

app.get('/api', (req, res) => {
    res.send({ hi: 'there' });
});

app.use(authRouter);
app.use(homeRouter);

app.use(express.static('public'));

module.exports = app;
