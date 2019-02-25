const url = require('url');
// const products = require('../../db/products/all-products.json');
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const filePath = path.join(__dirname, '../../', 'db/products', 'all-products.json');
const products = JSON.parse(
	fs.readFileSync(filePath, (err, data) => {
		if (err) throw err;
		console.log(data);
	})
);
debugger
// const getId = url => {
// 	const lastIndex = url.lastIndexOf('/');
// 	if (lastIndex !== -1) {
// 		return url.slice(lastIndex + 1);
// 	}
// };

const getProducts = (req, res) => {
	debugger;
	if (req.method !== "GET") {
		console.log("Sorry, you can get info only by GET");
		return;
	};
	const queryData = querystring.parse(url.parse(req.url).query);
	let result = [];

	if (queryData.ids) {
		console.log(key);
		const arrayOfIds = queryData.ids
			.slice(1, queryData.ids.length - 1)
			.split(",");
		const result = arrayOfIds.reduce((acc, id) => {
			products.map(user => (user.id === Number(id) ? acc.push(user) : user));
			return acc;
		}, []);
		return result;
	}

	// if (key === "categories") {
	// 	allproducts = getProductByCategory(paramsArr);
	// }

	debugger;

	const response = JSON.stringify({
		status: "success",
		products: result,
	});

	res.writeHead(200, { "Content-Type": "application/json" });
	res.write(JSON.stringify(response));
	res.end();
};

debugger
module.exports = getProducts;