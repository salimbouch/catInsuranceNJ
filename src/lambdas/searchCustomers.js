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

    // Call the searchCustomers() method from the CustomerService with query parameters
    const customers = await customerService.searchCustomers(queryParams);

    // Disconnect from the database
    await database.disconnect();

    // Return the customers as a JSON response
    return {
      statusCode: 200,
      body: JSON.stringify(customers),
    };
  } catch (error) {
    console.error('Error searching customers:', error);
    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
