const url = require("url");

const getProductById = require("./getProductById");
const getProductByQuery = require("./getProductByQuery");

const getProducts = (req, res) => {
	const query = url.parse(req.url).query;

	const urlLine = url.parse(req.url).path;
	const lastIndex = urlLine.lastIndexOf("/");
	const oneId = Number(urlLine.slice(lastIndex + 1));

	// debugger
	if (query) {

		getProductByQuery(req, res);
		return;
	}
	if (oneId) {
		getProductById(req, res);
		return;
	}

};

module.exports = getProducts;