const assert = require('assert');
const request = require('supertest');

let hacksiTest;

describe('it should serve', () => {
  beforeEach( () => {
    hacksiTest = require('../../server.js');
  });
  it('responded with 200', (done) => {
    request(hacksiTest)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if(err) {
          console.log('err', err);
          return done(err);
        }
        return done();
      });
  });
  afterEach( ( done ) => {
    hacksiTest.close( () => {
      done();
    });
  });
});

