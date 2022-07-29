const mongoose = require('mongoose');

before((done) => {
    mongoose.connect('mongodb://localhost/notely_test');
    mongoose.connection.once('open', done).on('error', console.log);
});
