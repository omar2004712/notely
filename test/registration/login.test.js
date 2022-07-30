const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const User = mongoose.model('user');

describe('Logs a user in', () => {
    beforeEach((done) => {
        // creates a user
        request(app)
            .post('/api/register')
            .send({
                name: 'tester',
                password: 'password',
                confirmPassword: 'password',
            })
            .end((err, res) => {
                if (!res.body.redirect) {
                    throw new Error('user has not bee created');
                }
                done();
            });
    });

    it('POST /api/login', (done) => {
        request(app)
            .post('/api/login')
            .send({
                name: 'tester',
                password: 'password',
            })
            .end((_, res) => {
                assert.strictEqual(res.body.redirect, '/');
                done();
            });
    });

    it('POST /api/login non-existing user', (done) => {
        request(app)
            .post('/api/login')
            .send({
                name: 'test',
                password: 'password',
            })
            .end((_, res) => {
                assert.strictEqual(res.body.name.msg, 'Name is invalid');
                assert(!res.body.password); // password mustn't have any error messages
                done();
            });
    });

    it('POST /api/login incorrect password', (done) => {
        request(app)
            .post('/api/login')
            .send({
                name: 'tester',
                password: 'Incorrect',
            })
            .end((_, res) => {
                assert(!res.body.name);
                assert.strictEqual(res.body.password.msg, 'Incorrect Password');
                done();
            });
    });

    it('POST /api/login empty input', (done) => {
        request(app)
            .post('/api/login')
            .send({
                name: '',
                password: '',
            })
            .end((_, res) => {
                assert.strictEqual(res.body.name.msg, 'Name is invalid');
                assert(!res.body.password); // password mustn't have any error messages
                done();
            });
    });
});
