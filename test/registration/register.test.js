const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

describe('Registers a new user', () => {
    it('POST /api/register', (done) => {
        request(app)
            .post('/api/register')
            .send({
                name: 'tester',
                password: 'password',
                confirmPassword: 'password',
            })
            .end((err, res) => {
                console.log(res.body);
                done();
            });
    });
});
