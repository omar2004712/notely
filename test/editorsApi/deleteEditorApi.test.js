const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../../app');
const session = require('supertest-session');
const { hashPassword } = require('../../controllers/helpers');

const User = mongoose.model('user');
const Note = mongoose.model('note');

describe('Delete Editor', () => {
    let testSession;
    let user;
    let editor;
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
            .end((err, res) => {
                if (err) {
                    return console.log(err);
                }

                user = res.body.user;

                done();
            });
    });

    beforeEach(async () => {
        editor = new User({
            name: 'testEditor',
            password: await hashPassword('password'),
            notes: [],
        });

        note = new Note({
            title: 'Delete Editor Note Title',
            content: 'Delete Editor Note Content',
            creatorId: user._id,
            editors: [],
        });

        editor.notes.push(note._id);
        note.editors.push(editor._id);

        await Promise.all([editor.save(), note.save()]);
    });

    it('DELETE /api/editor', (done) => {
        testSession
            .delete(
                `/api/editor/${editor._id.toString()}/${note._id.toString()}`
            )
            .end((err) => {
                if (err) {
                    return console.log(err);
                }

                User.findById(editor._id).then((e) => {
                    Note.findById(note._id).then((n) => {
                        assert(!n.editors.includes(editor._id));
                        assert(!e.notes.includes(note._id));

                        done();
                    });
                });
            });
    });
});
