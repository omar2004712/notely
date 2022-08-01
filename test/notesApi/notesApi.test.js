const mongoose = require('mongoose');
const request = require('supertest');
const session = require('supertest-session');
const assert = require('assert');
const app = require('../../app');

const User = mongoose.model('user');

describe('Notes Api', () => {
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
            .end(() => {
                done();
            });
    });

    it('POST /api/notes, it request notes from 18 to 36', (done) => {
        testSession
            .post('/api/notes')
            .send({
                index: 18,
            })
            .end((_, res) => {
                assert.strictEqual(res.body.notes.length, 18);
                assert.strictEqual(
                    res.body.notes[9].content,
                    'This is the 28th note Welcome'
                );
                done();
            });
    });
});
