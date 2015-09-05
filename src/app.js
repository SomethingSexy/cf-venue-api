// import {createJobRequest, createJobsSearch} from 'job-tracker';

// createJobRequest('careerbuilder').getJob('J8J1LY72YMKWMB60ZXN').then((result) => {
//   console.log(result); // eslint-disable-line no-console
// });


import config from'../config/environment';
import morgan from 'koa-morgan';
import bodyparser from 'koa-bodyparser';
import routes from './routes';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Bootstrap server
const app = require('koa')();

// Logger
app.use(morgan.middleware(config.logType));

// Bodyparser
app.use(bodyparser());

routes(app);

// Start server
app.listen(config.port, config.ip, () => {
  console.log('Koa server listening on %d, in %s mode', config.port, config.env);
});


// Expose app
export default app;
