const mongoose = require('mongoose');

// const User = mongoose.model('user');

before((done) => {
    mongoose.connect('mongodb://localhost/notely_test');
    mongoose.connection
        .once('open', () => {
            // eslint-disable-next-line no-console
            console.log('NEW TEST');
            done();
        })
        // eslint-disable-next-line no-console
        .on('error', console.log);
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});
