import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import FoursquareConnection from './connect';
import config from 'config';

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
  it('should return venue information', () => {
    const connect = new FoursquareConnection(config.get('venues.api.foursquare.url'), {clientId: config.get('venues.api.foursquare.clientId'), clientSecret: config.get('venues.api.foursquare.clientSecret')}, config.get('venues.api.foursquare.version'));

    connect.get('venues/4b474e04f964a520782e26e3');

    return connect.start().should.eventually.have.property('venue');
  });
});
