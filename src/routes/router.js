const mainRoute = require('./main/main');
const signUpRoute = require('./users/signUpRoute');
const getProducts = require('./products');
debugger
const router = {
  '/signup': signUpRoute,
  '/products': getProducts,
  default: mainRoute,
};

module.exports = router;
