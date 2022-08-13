const mongoose = require('mongoose');
const request = require('supertest');
const session = require('supertest-session');
const assert = require('assert');
const app = require('../../app');
const { hashPassword } = require('../../controllers/helpers');

const User = mongoose.model('user');
const Note = mongoose.model('note');

describe('Notes Api', () => {
    let testSession;

    beforeEach(async () => {
        const user = new User({
            name: 'tester',
            password: await hashPassword('password'),
            notes: [],
        });

        for (let i = 1; i < 40; i++) {
            const note = new Note({
                title: `Note ${i}`,
                content: `This is the ${i}th note Welcome`,
                creatorId: user._id,
            });

            user.notes.push(note);

            await note.save();
        }

        await user.save();
    });

    beforeEach((done) => {
        testSession = session(app);

        testSession
            .post('/api/login')
            .send({
                name: 'tester',
                password: 'password',
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

    it('POST /api/save-note', (done) => {
        testSession
            .post('/api/save-note')
            .send({
                title: 'Testing Note',
                content: 'This note is for testing',
            })
            .end(async (_, res) => {
                const user = await User.findOne({ name: 'tester' }).populate(
                    'notes'
                );
                assert.strictEqual(user.notes[0].title, 'Testing Note');
                done();
            });
    });

    it('POST /api/save-note passing empty title', (done) => {
        testSession
            .post('/api/save-note')
            .send({
                title: '',
                content: '',
            })
            .end((_, { body }) => {
                assert.strictEqual(body.title.msg, 'Title is required');
                assert.strictEqual(body.content.msg, 'Content is required');
                done();
            });
    });

    it('PUT /api/edit-note', (done) => {
        User.findOne({ name: 'tester' }).then((tester) => {
            testSession
                .put(`/api/edit-note`)
                .send({
                    _id: tester.notes[0]._id,
                    title: 'new title',
                    content: 'new content',
                })
                .end((_, res) => {
                    User.findById(tester._id)
                        .populate('notes')
                        .then((t) => {
                            assert.strictEqual(t.notes[0].title, 'new title');
                            assert.strictEqual(
                                t.notes[0].content,
                                'new content'
                            );
                            done();
                        });
                });
        });
    });

    it('PUT /api/edit-note empty title and content', (done) => {
        User.findOne({ name: 'tester' }).then((tester) => {
            testSession
                .put('/api/edit-note')
                .send({ title: '', content: '', _id: tester.notes[0]._id })
                .end((_, { body }) => {
                    assert.strictEqual(body.title.msg, 'Title is required');
                    assert.strictEqual(body.content.msg, 'Content is required');
                    done();
                });
        });
    });

    it('DELETE /api/delete/:id', (done) => {
        User.findOne({ name: 'tester' }).then((tester) => {
            testSession
                .delete(`/api/delete/${tester.notes[0]._id}`)
                .end((_, res) => {
                    User.findById(tester._id)
                        .populate('notes')
                        .then((t) => {
                            assert.strictEqual(res.status, 202);
                            assert.strictEqual(
                                t._id.toString(),
                                tester._id.toString()
                            );
                            assert.strictEqual(
                                t.notes[0]._id.toString(),
                                tester.notes[1]._id.toString()
                            );
                            done();
                        });
                });
        });
    });
});
