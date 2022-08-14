const assert = require('assert');
const mongoose = require('mongoose');
const session = require('supertest-session');
const app = require('../../app');
const { hashPassword } = require('../../controllers/helpers');

const User = mongoose.model('user');
const Note = mongoose.model('note');

describe('Adding Editors to a note', () => {
    let testSession;
    let note;
    let editor;

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
                        title: 'title of the note',
                        content: 'content of the note',
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
        editor = new User({
            name: 'john',
            password: await hashPassword('password'),
            notes: [],
        });

        await editor.save();
    });

    it('PUT /api/users', (done) => {
        testSession
            .put('/api/users')
            .send({
                noteId: note._id,
                userId: editor._id,
            })
            .end((err) => {
                if (err) {
                    return console.log(err);
                }

                User.findById(editor._id).then((e) => {
                    assert.strictEqual(
                        e.notes[0].toString(),
                        note._id.toString()
                    );
                    Note.findById(note._id).then((n) => {
                        assert.strictEqual(
                            n.editors[0].toString(),
                            editor._id.toString()
                        );
                        done();
                    });
                });
            });
    });
});
