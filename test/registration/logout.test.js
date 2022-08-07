const assert = require('assert');
const session = require('supertest-session');
const app = require('../../app');

describe('Logs out from the website', () => {
    let testSession;

    beforeEach((done) => {
        testSession = session(app);

        testSession
            .post('/api/register')
            .send({
                name: 'tester',
                password: 'password',
                confirmPassword: 'password',
            })
            .end(() => {
                done();
            });
    });

    it('GET /api/logout', (done) => {
        testSession.get('/api/logout').end(() => {
            testSession.get('/').end((_, res) => {
                assert.strictEqual(res.text, 'Found. Redirecting to /register');
                done();
            });
        });
    });
});
