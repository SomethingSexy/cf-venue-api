import path from 'path';

const base = {
  env: process.env.NODE_ENV,
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 9000,
  logType: 'dev',
  debug: true
};

export default base;
