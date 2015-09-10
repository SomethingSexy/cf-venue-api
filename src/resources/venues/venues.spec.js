import app from 'src/app';
import supertest from 'supertest';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import config from 'config';


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
    // setup partial data for return test
    nock(config.get('venues.api.foursquare.url'))
    .get('/venues/4b474e04f964a520782e26e3')
    .query(true)
    .reply(200, {
      meta: {
        code: 200,
        requestId: '55edf2fc498e5dbb1744cccd'
      },
      response: {
        venue: {
          id: '4b474e04f964a520782e26e3',
          name: 'McDonald\'s',
          contact: {
            phone: '2627979977',
            formattedPhone: '(262) 797-9977'
          },
          location: {
            address: '18695 W Bluemound Rd',
            lat: 43.035759952479935,
            lng: -88.14517665006098,
            postalCode: '53045',
            cc: 'US',
            city: 'Brookfield',
            state: 'WI',
            country: 'United States',
            formattedAddress: [
              '18695 W Bluemound Rd',
              'Brookfield, WI 53045'
            ]
          }
        }
      }
    });
    request
      .post('/venues')
      .send({ external: true, externalSrc: 'foursquare', externalId: '4b474e04f964a520782e26e3'})
      .expect(200, (err, res) => {
        if (err) return done(err);
        assert.typeOf(res.body, 'object');
        expect(res.body).to.have.property('venue');
        expect(res.body.venue).to.have.property('location');
        done();
      });
  });
});


