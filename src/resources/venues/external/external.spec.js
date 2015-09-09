import app from '../../../app';
import supertest from 'supertest';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

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
    request
      .get('/venues/external/4b474e04f964a520782e26e3')
      .expect(200, (err, res) => {
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});
