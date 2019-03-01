const fs = require("fs");
const path = require("path");


const filePath = path.join(__dirname, '../../', 'db/products', 'all-products.json');
const products = JSON.parse(
	fs.readFileSync(filePath, (err, data) => {
		if (err) throw err;
		console.log(data);
	})
);
const getProductByQuery = (req, res) => {

	const ids = req.query.ids;
	//localhost:3001/products/?ids=19112836,19112835,19112835
	if (ids) {
		const arrIds = ids.split(',');

		const result = arrIds.reduce((acc, id) => {
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
			res.write(JSON.stringify({ status: "no products", result }));
			res.end();
			return;
		}
	}
};
module.exports = getProductByQuery;