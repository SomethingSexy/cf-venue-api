import FoursquareConnection from './foursquare/connect';
import config from 'config';

// External search from foursquare (most likely)
export function* index(next) {
  this.status = 200;
  this.body = [];
}

export function* venue(next) {
  const connect = new FoursquareConnection(config.get('venues.api.foursquare.url'), {clientId: config.get('venues.api.foursquare.clientId'), clientSecret: config.get('venues.api.foursquare.clientSecret')}, config.get('venues.api.foursquare.version'));

  this.status = 200;
  this.body = [];
}
