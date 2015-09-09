// TODO: probably not how we want to do this going forward
// https://babeljs.io/docs/usage/require/
// http://babeljs.io/docs/usage/runtime/
require('babel/register')({
  ignore: false
});
const app = require('./src/app');

module.exports = app;
