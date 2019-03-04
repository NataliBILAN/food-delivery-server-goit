const express = require('express');
const mainRoute = require('./main/main');
const getProductById = require('./products/getProductById');
const getProductByQuery = require('./products/getProductByQuery');
// const getImageRoute = require('./image/get-image');
const getUser = require('./users/getUser');
// const getSaveImageHandlers = require('./image/save-image-multipart');
const signUpRoute = require('./users/signUpRoute');
const createOrder = require('./orders/createOrder');

const apiRoutes = express.Router();

const middlewareExample = (req, resp, next) => {
  if (req.body.userName) {
    next();
    return;
  }

  resp.status(400);
  resp.json({
    error: 'user has no "userName" field'
  })
};

apiRoutes
  .get('/', mainRoute)
  .get('/products/:id', getProductById)
  .get('/products', getProductByQuery)
  // .get('/image', getImageRoute)
  .get('/users/:userId', getUser)

  .post('/users', signUpRoute)
  .post('/orders', createOrder)
// .post('/image', getSaveImageHandlers());


module.exports = apiRoutes;
