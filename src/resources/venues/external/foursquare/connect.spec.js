import chai from 'chai';
import FoursquareConnection from './connect';

const expect = chai.expect;

describe('Connection create', () => {
  it('should contain empty array', () => {
    const connect = new FoursquareConnection();
    expect(connect.requests).to.be.array;
    expect(connect.requests).to.have.length(0);
  });
});
