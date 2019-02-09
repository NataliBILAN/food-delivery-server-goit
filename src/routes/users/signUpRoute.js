const fs = require("fs");
const path = require("path");

const saveUser = user => {
  const userName = user.username;
  const filePath = path.join(__dirname, "../../", "db/users", `${userName}.json`);
  fs.writeFile(filePath, JSON.stringify(user), function (err) {
    if (err) throw err;
  });
};

const signUpRoute = (request, response) => {
  if (request.method === 'POST') {
    let body = '';

    request.on('data', function (data) {
      body += data;
      console.log('Incoming data!!!!');
    });

    request.on('end', function () {
      const user = JSON.parse(body);
      saveUser(user);

      const result = { status: "success", user: user };
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(result));
      response.end();
    })
  }
};

module.exports = signUpRoute;