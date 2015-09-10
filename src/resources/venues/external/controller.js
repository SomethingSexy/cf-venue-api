import {getVenue} from 'src/models/external/foursquare/venue';

// External search from foursquare (most likely)
export function* index(next) {
  this.status = 200;
  this.body = [];
  yield next;
}

export function* venue(next) {
  const result = yield getVenue('4b474e04f964a520782e26e3');
  if (result) {
    this.status = 200;
    this.body = result;
  } else {
    this.status = 500;
  }
  yield next;
}
