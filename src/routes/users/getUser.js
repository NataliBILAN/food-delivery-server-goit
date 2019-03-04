const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, '../../../', 'db/users', 'all-users.json');
const users = JSON.parse(
	fs.readFileSync(filePath, (err, data) => {
		if (err) throw err;
		console.log(data);
	})
);
debugger
const getUser = (req, res) => {
	const id = req.params.userId

	const result = users.filter(user => user.id === Number(id));

	if (result.length > 0) {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.write(JSON.stringify({ status: "success", result }));
		res.end();
		return;
	}

	res.writeHead(200, { "Content-Type": "application/json" });
	res.write(JSON.stringify({ status: "not found" }));
	res.end();
};

module.exports = getUser;