const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const User = mongoose.model('user');

describe('Registers a new user', () => {
    it('POST /api/register', (done) => {
        request(app)
            .post('/api/register')
            .send({
                name: 'tester',
                password: 'password',
                confirmPassword: 'password',
            })
            .end(async (_, res) => {
                assert.strictEqual(res.body.redirect, '/');
                const user = await User.findOne({ name: 'tester' });
                assert(user);
                done();
            });
    });

    it('POST /api/register empty form', (done) => {
        request(app)
            .post('/api/register')
            .send({
                name: '',
                password: '',
                confirmPassword: '',
            })
            .end((_, res) => {
                assert.strictEqual(
                    res.body.name.msg,
                    'Name must be between 30 and 0 characters'
                );
                assert.strictEqual(
                    res.body.password.msg,
                    'password must be longer than 8 characters'
                );
                assert.strictEqual(
                    res.body.confirmPassword.msg,
                    'password must be longer than 8 characters'
                );
                done();
            });
    });

    it('POST /api/register invalid name and passwords does not match', (done) => {
        request(app)
            .post('/api/register')
            .send({
                name: 'a@mg',
                password: 'passwordsdoesnotmatch',
                confirmPassword: 'PASSWORDSDOESNOTMATCH',
            })
            .end((_, res) => {
                assert.strictEqual(res.body.name.msg, '@ is invalid character');
                assert.strictEqual(
                    res.body.password.msg,
                    'passwords must match'
                );
                assert.strictEqual(
                    res.body.confirmPassword.msg,
                    'passwords must match'
                );
                done();
            });
    });
});
