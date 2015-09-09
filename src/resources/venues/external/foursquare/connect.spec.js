import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import FoursquareConnection from './connect';
import config from 'config';
import nock from 'nock';

chai.should();

chai.use(chaiAsPromised);


const expect = chai.expect;

describe('Connection create', () => {
  it('should contain empty array', () => {
    const connect = new FoursquareConnection();
    expect(connect.requests).to.be.array;
    expect(connect.requests).to.have.length(0);
  });

  it('should correctly add url', () => {
    const connect = new FoursquareConnection('https://test');
    expect(connect.apiUrl).to.equal('https://test');
  });

  it('should correctly add auth token', () => {
    const connect = new FoursquareConnection('https://test', '1234');
    expect(connect.accessToken).to.equal('1234');
  });

  it('should correctly add client keys', () => {
    const connect = new FoursquareConnection('https://test', {clientId: 1, clientSecret: 'xyz'});
    expect(connect.clientId).to.equal(1);
    expect(connect.clientSecret).to.equal('xyz');
  });
});

describe('Connection post', () => {
  it('should error as not implemented', () => {
    expect(new FoursquareConnection().post).to.throw('Not implemented yet!');
  });
});


describe('Connection get venue', () => {
  it('should return venue information', (done) => {
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
    const connect = new FoursquareConnection(config.get('venues.api.foursquare.url'), {clientId: config.get('venues.api.foursquare.clientId'), clientSecret: config.get('venues.api.foursquare.clientSecret')}, config.get('venues.api.foursquare.version'));

    connect.get('venues/4b474e04f964a520782e26e3');

    connect.start().then((data) => {
      expect(data).to.have.property('venue');
      expect(connect.requests).to.have.length(1);
      done();
    });
  });

  it('should fail with bad request', () => {
    nock(config.get('venues.api.foursquare.url'))
      .get('/venues/balls')
      .query(true)
      .reply(200, {
        meta: {
          code: 400,
          errorType: 'param_error',
          errorDetail: 'Value balls is invalid for venue id',
          requestId: '55f0c539498ef84230c00407'
        },
        response: {}
      });
    const connect = new FoursquareConnection(config.get('venues.api.foursquare.url'), {clientId: config.get('venues.api.foursquare.clientId'), clientSecret: config.get('venues.api.foursquare.clientSecret')}, config.get('venues.api.foursquare.version'));

    connect.get('venues/balls');

    return connect.start().should.eventually.to.be.rejectedWith();
  });

  it('should reset after start', (done) => {
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
    const connect = new FoursquareConnection(config.get('venues.api.foursquare.url'), {clientId: config.get('venues.api.foursquare.clientId'), clientSecret: config.get('venues.api.foursquare.clientSecret')}, config.get('venues.api.foursquare.version'));

    connect.get('venues/4b474e04f964a520782e26e3');

    connect.start(true).then(() => {
      expect(connect.requests).to.have.length(0);
      done();
    });
  });
});
