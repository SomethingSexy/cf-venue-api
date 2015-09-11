// this will only run locally to test the connection to foursquare
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import FoursquareConnection from './connect';
import config from 'config';
import nock from 'nock';

chai.should();

chai.use(chaiAsPromised);


const expect = chai.expect;

describe('Live Connection create', () => {
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

describe('Live Connection post', () => {
  it('should error as not implemented', () => {
    expect(new FoursquareConnection().post).to.throw('Not implemented yet!');
  });
});


describe('Live Connection get venue', () => {
  it('should return venue information', (done) => {
    const connect = new FoursquareConnection(config.get('venues.api.foursquare.url'), {clientId: config.get('venues.api.foursquare.clientId'), clientSecret: config.get('venues.api.foursquare.clientSecret')}, config.get('venues.api.foursquare.version'));

    connect.get('venues/4b474e04f964a520782e26e3');

    connect.start().then((data) => {
      expect(data).to.have.property('venue');
      expect(connect.requests).to.have.length(1);
      done();
    });
  });

  it('should fail with bad request', () => {
    const connect = new FoursquareConnection(config.get('venues.api.foursquare.url'), {clientId: config.get('venues.api.foursquare.clientId'), clientSecret: config.get('venues.api.foursquare.clientSecret')}, config.get('venues.api.foursquare.version'));

    connect.get('venues/balls');

    return connect.start().should.eventually.to.be.rejectedWith();
  });

  it('should reset after start', (done) => {
    const connect = new FoursquareConnection(config.get('venues.api.foursquare.url'), {clientId: config.get('venues.api.foursquare.clientId'), clientSecret: config.get('venues.api.foursquare.clientSecret')}, config.get('venues.api.foursquare.version'));

    connect.get('venues/4b474e04f964a520782e26e3');

    connect.start(true).then(() => {
      expect(connect.requests).to.have.length(0);
      done();
    });
  });
});

describe('Live Connection get venues', () => {
  it('should venues given lat lng', (done) => {
    const connect = new FoursquareConnection(config.get('venues.api.foursquare.url'), {clientId: config.get('venues.api.foursquare.clientId'), clientSecret: config.get('venues.api.foursquare.clientSecret')}, config.get('venues.api.foursquare.version'));

    connect.get('venues/search', {
      lat: 40.7,
      lng: -74,
      radius: 16000,
      intent: 'browse'
    });

    connect.start().then((data) => {
      expect(data).to.have.property('venues').with.length;
      done();
    }).catch((error) => {

    });
  });
});
