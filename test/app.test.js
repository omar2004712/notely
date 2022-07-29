const request = require('supertest');
const assert = require('assert');
const app = require('../app');

describe('app', () => {
    // starter test
    it('GET api', (done) => {
        request(app)
            .get('/api')
            .end((err, response) => {
                assert.deepStrictEqual(response.body, { hi: 'there' });
                done();
            });
    });
});
