const assert = require('assert');
const mongoose = require('mongoose');
const session = require('supertest-session');
const app = require('../../app');
const { hashPassword } = require('../../controllers/helpers');

const User = mongoose.model('user');

describe('Search Api', () => {
    let testSession;
    let note;

    beforeEach((done) => {
        testSession = session(app);

        testSession
            .post('/api/register')
            .send({
                name: 'tester',
                password: 'password',
                confirmPassword: 'password',
            })
            .end((err) => {
                if (err) {
                    return console.log(err);
                }

                testSession
                    .post('/api/save-note')
                    .send({
                        title: 'title',
                        content: 'content',
                    })
                    .end((err, res) => {
                        if (err) {
                            return console.log(err);
                        }

                        note = res.body;

                        done();
                    });
            });
    });

    beforeEach(async () => {
        await User.insertMany([
            {
                name: 'john',
                password: await hashPassword('password'),
            },
            {
                name: 'samwell',
                password: await hashPassword('password'),
            },
            {
                name: 'henry',
                password: await hashPassword('password'),
            },
            {
                name: 'david',
                password: await hashPassword('password'),
            },
            {
                name: 'adam',
                password: await hashPassword('password'),
            },
            {
                name: 'annie',
                password: await hashPassword('password'),
            },
            {
                name: 'mary',
                password: await hashPassword('password'),
            },
            {
                name: 'paul',
                password: await hashPassword('password'),
            },
            {
                name: 'colt',
                password: await hashPassword('password'),
            },
            {
                name: 'steve',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
            {
                name: 'p',
                password: await hashPassword('password'),
            },
        ]);
    });

    it('GET /api/users', (done) => {
        const searchTerm = 'a';

        testSession
            .get(
                `/api/users?name=${searchTerm}&note=${note._id.toString()}&page=0`
            )
            .end((_, res) => {
                for (let user of res.body) {
                    assert(user.name.includes(searchTerm));
                }
                done();
            });
    });

    it('GET /api/users page size', (done) => {
        // This test is strictly tied with the number of inserted users with a name that includes "p" must be higher than 10 -Page size in the server-
        const searchTerm = 'p';

        testSession
            .get(`/api/users?name=${searchTerm}&note=${note._id}&page=0`)
            .end((_, res) => {
                assert.strictEqual(res.body.length, 10);

                done();
            });
    });
});
