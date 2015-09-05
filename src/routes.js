import mount from 'koa-mount';
import venuesRoutes from './resources/venues/routes';

export default (app) => {
  app.use(mount('/venues', venuesRoutes(app)));
  // app.use(mount('/', require('../resources/root')(app)));
};
