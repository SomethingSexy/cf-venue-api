// Get all venues
export function* index(next) {
	console.log('venues index');
  this.status = 200;
  this.body = [];
}

// Get a single job
export function* venue(next) {
	console.log('venues venue');
  this.status = 200;
  this.body = [];
}

export function* create(next) {
	console.log('venues create');
  this.status = 200;
  this.body = [];
}

export function* update(next) {
	console.log('venues update');
  this.status = 200;
  this.body = [];
}

