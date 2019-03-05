const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../../', 'db/products', 'all-products.json');
const products = JSON.parse(
	fs.readFileSync(filePath, (err, data) => {
		if (err) throw err;
		console.log(data);
	})
);
const getProductByQuery = (req, res) => {
	if (req.query) {
		//localhost:3001/products/?ids="19112836,19112835,19112835"
		if (req.query.ids) {
			const ids = req.query.ids;
			const slicedIds = req.query.ids.slice(1, ids.length - 1);
			const arrIds = slicedIds.split(',');

			const result = arrIds.reduce((acc, id) => {
				products.map((item) => (item.id === Number(id) ? acc.push(item) : item));
				return acc;
			}, []);

			if (result.length > 0) {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify({ status: 'success', result }));
				res.end();
				return;
			} else {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify({ status: 'no products', result }));
				res.end();
				return;
			}
		}
		if (req.query.category) {
			const category = req.query.category;
			const categoryValue = category.slice(1, category.length - 1);
			const result = products.filter((el) => el.categories[0] === categoryValue);

			if (result.length > 0) {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify({ status: 'success', result }));
				res.end();
				return;
			} else {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify({ status: 'no products', result }));
				res.end();
				return;
			}
		}
	}
};
module.exports = getProductByQuery;
