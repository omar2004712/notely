const assert = require('assert');
const session = require('supertest-session');
const app = require('../../app');

describe('Logs out from the website', () => {
    let testSession;

    beforeEach((done) => {
        testSession = session(app);
        const notes = [];

        // eslint-disable-next-line no-plusplus
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
