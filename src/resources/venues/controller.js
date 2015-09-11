import {getVenue as getFoursquareVenue} from 'src/models/external/foursquare/venue';

// Get all venues
export function* index(next) {
  this.status = 200;
  this.body = [];
  yield next;
}

// Get a single job
export function* venue(next) {
  // TODO read from database, if expires is older than 30 days, fetch, update, then return
  this.status = 200;
  this.body = [];
  yield next;
}

// This will "create" a new venue in our database
// cache the external data and then create stubs for our
// data to go a long with it
//
// The request body might have just the external id or it might
// get the whole external venue data
export function *create(next) {
  const postData = this.request.body;
  // if external data request
  if (postData.external) {
    // unless it contains venue information already
    if ((!postData.externalId || !postData.externalSrc)) {
      this.status = 422;
      this.body = {};
      return;
    }
    const externalData = yield getFoursquareVenue(postData.externalId);

    // TODO Save to database

    this.status = 200;
    // most likely won't return this full data here but 
    // doing for testing now
    this.body = externalData;
  } else {
    this.status = 200;
    this.body = {};
  }
}

export function* update(next) {
  this.status = 200;
  this.body = [];
  yield next;
}

