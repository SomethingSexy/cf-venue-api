import FoursquareConnection from './connect';
import config from 'config';

const connect = new FoursquareConnection(config.get('venues.api.foursquare.url'), {clientId: config.get('venues.api.foursquare.clientId'), clientSecret: config.get('venues.api.foursquare.clientSecret')}, config.get('venues.api.foursquare.version'));

export function getVenue(id) {
  return connect.get('venues/' + id).start(true);
}

