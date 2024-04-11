const Database = require('../utils/Database');
const CustomerService = require('../services/CustomerService');

exports.handler = async (event) => {
  try {
    // Parse query parameters from the event object
    const queryParams = event.queryStringParameters;
    // Create an instance of the Database class
    const database = new Database();
    // Connect to the database
    await database.connect();

    // Create an instance of the CustomerService class
    const customerService = new CustomerService(database);

    // Call the getCustomers() method from the CustomerService
    const customers = await customerService.getAllCustomers(queryParams);

    // Disconnect from the database
    await database.disconnect();

    // Return the customers as a JSON response
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
      body: JSON.stringify(customers),
    };
  } catch (error) {
    console.error('Error fetching customers:', error);
    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
