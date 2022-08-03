const assert = require('assert');
const request = require('supertest');
const session = require('supertest-session');
const app = require('../../app');

describe('Logs out from the website', () => {
    let testSession;

    beforeEach((done) => {
        testSession = session(app);
        const notes = [];

        for (let i = 1; i < 40; i++) {
            notes.push({
                title: `Note ${i}`,
                content: `This is the ${i}th note Welcome`,
            });
        }

        testSession
            .post('/api/register')
            .send({
                name: 'tester',
                password: 'password',
                confirmPassword: 'password',
                notes,
            })
            .end((_, res) => {
                done();
            });
    });

    it('GET /api/logout', (done) => {
        testSession.get('/api/logout').end((_, res) => {
            testSession.get('/').end((_, res) => {
                assert.strictEqual(res.text, 'Found. Redirecting to /register');
                done();
            });
        });
    });
});
