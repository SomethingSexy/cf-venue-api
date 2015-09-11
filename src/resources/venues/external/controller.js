import {getVenue, getVenues} from 'src/models/external/foursquare/venue';

// External search from foursquare (most likely)
export function* index(next) {
  const result = yield getVenues(this.request.query);
  if (result) {
    this.status = 200;
    this.body = result;
  } else {
    this.status = 500;
  }
  yield next;
}

export function* venue(next) {
  const result = yield getVenue(this.params.id);
  if (result) {
    this.status = 200;
    this.body = result;
  } else {
    this.status = 500;
  }
  yield next;
}
