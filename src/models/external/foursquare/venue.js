import FoursquareConnection from './connect';
import config from 'config';

const connect = new FoursquareConnection(config.get('venues.api.foursquare.url'), {clientId: config.get('venues.api.foursquare.clientId'), clientSecret: config.get('venues.api.foursquare.clientSecret')}, config.get('venues.api.foursquare.version'));

export function getVenue(id) {
  return connect.get('venues/' + id).start(true);
}

// either lat/lng or near
export function getVenues(searchParams) {
  if (!searchParams || !Object.keys(searchParams).length) {
    return Promise.reject('400: Must provide parameters (ll and radius) or (sw and ne) or (near and radius)');
  }

  if ((searchParams.lat && !searchParams.lng) || (!searchParams.lat && searchParams.lng)) {
    return Promise.reject('You must include both lat and lng');
  }

  if ((searchParams.near && !searchParams.radius) || (!searchParams.near && searchParams.radius)) {
    return Promise.reject('You must include radius and near');
  }

  // for now we are using browse
  if (!searchParams.intent) {
    searchParams.intent = 'browse';
  }

  // since we are using browse we require a radius
  if (!searchParams.radius) {
    searchParams.radius = 16000;
  }

  return connect.get('venues/search', searchParams).start(true).then((data) => {
    return data.venues;
  });
}
