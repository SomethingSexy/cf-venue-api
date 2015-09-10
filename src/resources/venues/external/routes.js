/**
 * This will be the routes for connecting to external sources
 */
import {index, venue} from './controller';
import Router from 'koa-router';

const router = new Router();

export default (app) => {
  router.get('/', index);
  router.get('/:id', venue);

  return router.routes();
};
