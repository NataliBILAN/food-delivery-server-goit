const fs = require('fs');
const path = require('path');
const util = require('util');

// debugger;

const writeFile = util.promisify(fs.writeFile);

const srcOrders = path.resolve(__dirname, '../../../', 'db/users/orders');
const filePath = path.join(__dirname, '../../../', 'db/products', 'all-products.json');
const products = JSON.parse(
	fs.readFileSync(filePath, (err, data) => {
		if (err) throw err;
		console.log(data);
	})
);

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
	console.log(orderData.products);
	const orderName = orderData.id;
	const fullSrc = path.resolve(srcOrders, orderName + '.json');

	const idsOfOrder = orderData.products;
	const idsOfAllProducts = products.map((item) => item.id);
	const findOrderedProducts = idsOfAllProducts.some((el) => idsOfOrder.indexOf(el) !== -1);

	if (findOrderedProducts) {
		writeFile(fullSrc, JSON.stringify(orderData));
		sendResponse(response, orderData);
		return;
	}

	sendError(response);
};

module.exports = createOrder;
