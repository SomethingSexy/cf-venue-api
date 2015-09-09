import mount from 'koa-mount';
import Router from 'koa-router';
import venuesRoutes from './resources/venues/routes';

export default (app) => {
  app.use(mount('/venues', venuesRoutes(app)));
};
