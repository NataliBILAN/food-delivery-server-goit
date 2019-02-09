const mainRoute = require('./main/main');
const signUpRoute = require('./users/signUpRoute');
const productsRoute = require('./products/productsRoute');

const router = {
  '/signup': signUpRoute,
  '/products': productsRoute,
  default: mainRoute,
};

module.exports = router;
