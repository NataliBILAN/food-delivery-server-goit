const express = require('express');
const mainRoute = require('./main/main');
const getProductById = require('./products/getProductById');
const getProductByQuery = require('./products/getProductByQuery');
const getUser = require('./users/getUser');
const signUpRoute = require('./users/signUpRoute');
const createOrder = require('./orders/createOrder');

const apiRoutes = express.Router();

const checkUserName = (req, resp, next) => {
	if (req.body.userName) {
		next();
		return;
	}
	resp.status(400);
	resp.json({
		error: 'user has no "userName" field'
	});
};

apiRoutes
	.get('/', mainRoute)
	.get('/products/:id', getProductById)
	.get('/products', getProductByQuery)
	.get('/users/:userId', getUser)
	.post('/users', checkUserName, signUpRoute)
	.post('/orders', createOrder);

module.exports = apiRoutes;
