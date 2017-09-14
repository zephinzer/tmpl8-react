const fs = require('fs');
const path = require('path');
const request = require('supertest');

const server = require('../index.js');
const reactEntrypoint = require('../config/react-entrypoint.config');

describe('tmpl8-react', () => {
  it('responds to /* with the main webpage', function(done) {
    this.timeout(10000); //eslint-disable-line
    request(server)
      .get('/')
      .expect('Content-Type', /^text\/html;/)
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.contain(reactEntrypoint.entrypointId);
        done();
      });
  });

  it('respond to /assets/* with static assets', function(done) {
    this.timeout(10000); //eslint-disable-line
    const expectedResponse = fs.readFileSync(path.join(process.cwd(), '/assets/build/empty')).toString();
    request(server)
      .get('/assets/build/empty')
      .expect(200)
      .end((err, res) => {
        expect(res.body.toString()).to.eql(expectedResponse);
        done();
      });
  });
});
