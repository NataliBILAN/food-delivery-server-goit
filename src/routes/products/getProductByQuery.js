const url = require('url');
const fs = require("fs");
const path = require("path");
const qs = require("querystring");

const filePath = path.join(__dirname, '../../', 'db/products', 'all-products.json');
const products = JSON.parse(
	fs.readFileSync(filePath, (err, data) => {
		if (err) throw err;
		console.log(data);
	})
);
const getProductByQuery = (req, res) => {
	const queryData = qs.parse(url.parse(req.url).query);

	if (queryData.category) {
		const categoryFromQueryData = queryData.category
			.slice(1, queryData.category.length - 1);
		const result = products.filter(
			item => item.categories[0] == categoryFromQueryData
		);

		if (result.length > 0) {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.write(JSON.stringify({ status: "success", result }));
			res.end();
			return;
		} else {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.write(JSON.stringify({ status: "no products", result }));
			res.end();
			return;
		}
	}

	if (queryData.ids) {
		const idsFromQueryData = queryData.ids
			.slice(1, queryData.ids.length - 1)
			.split(",");

		const result = idsFromQueryData.reduce((acc, id) => {
			products.map(item => (item.id === Number(id) ? acc.push(item) : item));
			return acc;
		}, []);

		if (result.length > 0) {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.write(JSON.stringify({ status: "success", result }));
			res.end();
			return;
		} else {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.write(JSON.stringify({ status: "no products", products }));
			res.end();
			return;
		}
	}
};
module.exports = getProductByQuery;