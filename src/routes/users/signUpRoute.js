const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

const saveNewUser = data => {
  debugger
  const src = path.resolve(__dirname, "../../", "db/users", "all-users.json");
  const dataStr = JSON.stringify(data);

  return writeFile(src, dataStr);
};
debugger
const signUpRoute = (request, response) => {
  const user = request.body;
  const userData = { ...user, id: Math.random() };
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

  saveNewUser(userData)
    .then(sendResponse)
    .catch(sendError);

};

module.exports = signUpRoute;