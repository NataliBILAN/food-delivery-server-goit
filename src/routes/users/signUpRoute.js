const fs = require('fs');
const path = require('path');
const util = require('util');
const shortid = require('shortid');
// debugger

const writeFile = util.promisify(fs.writeFile);
const src = path.resolve(__dirname, '../../../', 'db/users');

const saveNewUser = (users) => {
	const dataStr = JSON.stringify(users);
	return writeFile(src + '/all-users.json', dataStr);
};

const signUpRoute = (request, response) => {
	const user = request.body;
	console.log(user);
	const userData = { ...user, id: shortid.generate() };
	const data = fs.readFileSync(src + '/all-users.json');
	const users = [ ...JSON.parse(data), userData ];

	const sendResponse = () => {
		response.json({
			status: 'success',
			user: userData
		});
	};

	const sendError = () => {
		response.status(400);
		response.json({
			error: 'user was not saved'
		});
	};

	saveNewUser(users).then(sendResponse).catch(sendError);
};

module.exports = signUpRoute;
