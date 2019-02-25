// const https = require('https');
const http = require('http');
const url = require('url');
const fs = require("fs");
const path = require("path");
const morgan = require('morgan');
const logger = morgan('combined');

const router = require('./routes/router');
const getRouteHandler = require('./helpers/getRouteHandler');

// const options = {
//   key: fs.readFileSync(path.join(__dirname, 'ssl', './server.key')),
//   cert: fs.readFileSync(path.join(__dirname, 'ssl', './server.crt'))
// };

const startServer = port => {
  const server = http.createServer((request, response) => {

    // Get route from the request
    const parsedUrl = url.parse(request.url);
    const { query } = url.parse(request.url, true);

    // Get router function
    const func = getRouteHandler(router, parsedUrl.pathname) || router.default;

    console.log(port, parsedUrl);
    logger(request, response, () => func(request, response));
  });

  server.listen(port);
};
debugger
module.exports = startServer;
