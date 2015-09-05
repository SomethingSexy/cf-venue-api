// External search from foursquare (most likely)
export function* index(next) {
  this.status = 200;
  this.body = [];
}

export function* venue(next) {
  this.status = 200;
  this.body = [];
}
