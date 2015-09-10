import app from 'src/app';
import supertest from 'supertest';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import config from 'config';
import nock from 'nock';

chai.should();
chai.use(chaiAsPromised);

const request = supertest.agent(app.listen());
const expect = chai.expect;
const assert = chai.assert;

describe('GET /venues', () => {
  it('should respond with 200 type Array', (done) => {
    request
      .get('/venues/external')
      .expect(200, (err, res) => {
        expect(Array.isArray(res.body)).to.be.true;
        done();
      });
  });
});

describe('GET /venue', () => {
  it('should respond with 200 type Array', (done) => {
    nock(config.get('venues.api.foursquare.url'))
      .get('/venues/4b474e04f964a520782e26e3')
      .query(true)
      .reply(200, {
        meta: {
          code: 200,
          requestId: '55edf2fc498e5dbb1744cccd'
        },
        response: {
          venue: {}
        }
      });
    request
      .get('/venues/external/4b474e04f964a520782e26e3')
      .expect(200, (err, res) => {
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});
