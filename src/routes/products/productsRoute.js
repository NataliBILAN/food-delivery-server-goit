const products = require('../../db/products/all-products.json');

const productsRoute = (request, response) => {
	response.writeHead(200, { "Content-Type": "application/json" });
	response.write(JSON.stringify(products));
	response.end();
};

module.exports = productsRoute;