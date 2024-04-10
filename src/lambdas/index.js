// index.js

const getCustomersHandler = require('./lambdas/getCustomers');

module.exports = {
  getCustomers: getCustomersHandler.handler,

};