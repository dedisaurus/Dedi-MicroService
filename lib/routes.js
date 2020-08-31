const koaBody = require('koa-body');
const Router = require('koa-better-router');

const controller = require('./controller');

module.exports = () => {
  let router = Router({prefix: '/api'}).loadMethods();
  router.get('/task', controller.getTasks);
  router.get('/task/:id', controller.getOneTask);
  router.post('/task', koaBody(), controller.createTask);
  router.get('/taskByAccNumber/:id', controller.getUserByAccountNumber);
  router.get('/taskByIdentityNumber/:id', controller.getUserByIdentityNumber);
  router.put('/task/:id', koaBody(), controller.updateTask);
  router.delete('/task/:id', controller.deleteTask);
  return router.middleware();
};