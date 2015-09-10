import {getVenue as getFoursquareVenue} from 'src/models/external/foursquare/venue';

// Get all venues
export function* index(next) {
  this.status = 200;
  this.body = [];
  yield next;
}

// Get a single job
export function* venue(next) {
  this.status = 200;
  this.body = [];
  yield next;
}

// This will create a new venue in our database
// either from foursquare data or manually
export function *create(next) {
  const postData = this.request.body;
  // if external data request
  if (postData.external) {
    if ((!postData.externalId || !postData.externalSrc)) {
      this.status = 422;
      this.body = {};
      return;
    }
    const externalData = yield getFoursquareVenue(postData.externalId);
    this.status = 200;
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

