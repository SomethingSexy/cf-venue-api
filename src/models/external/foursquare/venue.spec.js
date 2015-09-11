import app from 'src/app';
import supertest from 'supertest';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import {getVenues} from './venue';

chai.should();
chai.use(chaiAsPromised);

const request = supertest.agent(app.listen());
const expect = chai.expect;
const assert = chai.assert;

describe('getVenues', () => {
  it('should reject because no parameters', (done) => {
    getVenues().catch((error)=> {
      expect(error).to.equal('400: Must provide parameters (ll and radius) or (sw and ne) or (near and radius)');
      done();
    });
  });

  it('should reject because empty parameters', (done) => {
    getVenues({}).catch((error)=> {
      expect(error).to.equal('400: Must provide parameters (ll and radius) or (sw and ne) or (near and radius)');
      done();
    });
  });

  it('should reject because missing lat', (done) => {
    getVenues({
      lng: 123
    }).catch((error)=> {
      expect(error).to.equal('You must include both lat and lng');
      done();
    });
  });

  it('should reject because missing lng', (done) => {
    getVenues({
      lat: 123
    }).catch((error)=> {
      expect(error).to.equal('You must include both lat and lng');
      done();
    });
  });

  it('should reject because missing radius', (done) => {
    getVenues({
      near: 'Milwaukee'
    }).catch((error)=> {
      expect(error).to.equal('You must include radius and near');
      done();
    });
  });

  it('should reject because missing near', (done) => {
    getVenues({
      radius: 16000
    }).catch((error)=> {
      expect(error).to.equal('You must include radius and near');
      done();
    });
  });
});
