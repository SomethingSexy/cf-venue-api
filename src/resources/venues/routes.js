/**
 * This is going to return all internal venues that have been added
 */
import {index, venue, create, update} from './controller';
import routesExternal from './external/routes';
import Router from 'koa-router';
import mount from 'koa-mount';

const router = new Router();

export default (app) => {
  router.get('/', index);
  router.get('/:id', venue);

  // TODO: Might not expose this one now
  router.post('/', create);
  router.put('/id', update);

  router.use('/external', routesExternal(app));

  return router.routes();
};
