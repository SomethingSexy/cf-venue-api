import FoursquareConnection from './foursquare/connect';
import config from 'config';

const connect = new FoursquareConnection(config.get('venues.api.foursquare.url'), {clientId: config.get('venues.api.foursquare.clientId'), clientSecret: config.get('venues.api.foursquare.clientSecret')}, config.get('venues.api.foursquare.version'));

// External search from foursquare (most likely)
const index = function *(next) {
  console.log('external index');
  this.status = 200;
  this.body = [];
  yield next;
};

const venue = function *(next) {
  const result = yield connect.get('venues/4b474e04f964a520782e26e3').start(true);
  if (result) {
    this.status = 200;
    this.body = result;
  } else {
    this.status = 500;
  }
  yield next;
};

export {index as index};

export {venue as venue};
