const fs = require('fs');
const path = require('path');
const util = require('util');

debugger

const writeFile = util.promisify(fs.writeFile);

const srcOrders = path.resolve(__dirname, "../../../", "db/users/orders");
const srcAllProducts = path.join(__dirname, "../../../", "db/products");
const products = fs.readFileSync(srcAllProducts + '/all-products.json');

const sendResponse = (response, orderData) => {
	response.json({
		status: 'success',
		order: orderData
	});
};
const sendError = (response) => {
	response.status(400);
	response.json({
		error: 'order was not saved',
		order: null
	});
};

const createOrder = (request, response) => {
	const order = request.body;

	const orderData = { ...order, id: Math.random() };
	console.log(orderData.products)
	const orderName = orderData.id;
	const fullSrc = path.resolve(srcOrders, orderName + '.json');

	const saveNewOrder = writeFile(fullSrc, JSON.stringify(orderData));
	const findOrderedProducts = orderData.products.map(id => {
		return products.filter(item => item.id === Number(id))
	})


	if (findOrderedProducts.length > 0) {
		saveNewOrder;
		sendResponse(response, orderData);
		return;
	}


	sendError(response);

};

module.exports = createOrder;