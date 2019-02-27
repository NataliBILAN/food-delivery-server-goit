const url = require('url');
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, '../../', 'db/products', 'all-products.json');
const products = JSON.parse(
	fs.readFileSync(filePath, (err, data) => {
		if (err) throw err;
		console.log(data);
	})
);

const getId = url => {
	const lastIndex = url.lastIndexOf("/");

	if (lastIndex !== -1) {
		return url.slice(lastIndex + 1);
	}
};

const getProductById = (req, res) => {
	const parsedUrl = url.parse(req.url);
	const id = getId(parsedUrl.path);

	const result = products.filter(user => user.id === Number(id));

	if (result.length > 0) {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.write(JSON.stringify({ status: "success", result }));
		res.end();
		return;
	}

	res.writeHead(200, { "Content-Type": "application/json" });
	res.write(JSON.stringify({ status: "no products", result }));
	res.end();
};

module.exports = getProductById;
