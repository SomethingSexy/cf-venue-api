import app from 'src/app';
import supertest from 'supertest';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';


chai.should();
chai.use(chaiAsPromised);

const request = supertest.agent(app.listen());
const expect = chai.expect;
const assert = chai.assert;

describe('POST /venues', () => {
  it('should respond with 422 because of lack of extenalSrc and externalId', (done) => {
    request
      .post('/venues')
      .send({ external: true})
      .expect(422, (err, res) => {
        if (err) return done(err);
        assert.typeOf(res.body, 'object');
        done();
      });
  });

  it('should respond with 422 because of lack of extenalSrc', (done) => {
    request
      .post('/venues')
      .send({ external: true, externalId: '1234'})
      .expect(422, (err, res) => {
        if (err) return done(err);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
  it('should respond with 422 because of lack of externalId', (done) => {
    request
      .post('/venues')
      .send({ external: true, externalSrc: 'foursquare'})
      .expect(422, (err, res) => {
        if (err) return done(err);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
  it('should respond with 200', (done) => {
    request
      .post('/venues')
      .send({ external: true, externalSrc: 'foursquare', externalId: '4b474e04f964a520782e26e3'})
      .expect(200, (err, res) => {
        if (err) return done(err);
        assert.typeOf(res.body, 'object');
        done();
      });
  });
});


