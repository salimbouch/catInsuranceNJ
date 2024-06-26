const { v4: uuidv4 } = require('uuid');
const Customer = require('../models/Customer');
const Address = require('../models/Address'); 
const BankDetails = require('../models/BankDetails'); 

class CustomerService {
    constructor(database) {
        this.database = database;
    }

    async createCustomer(firstName, lastName, title, familyStatus, birthDate, socialSecurityNumber, taxId, jobStatus, addressId, bankDetailsId, email) {
        const id = uuidv4();
        const customer = new Customer(id, firstName, lastName, title, familyStatus, birthDate, socialSecurityNumber, taxId, jobStatus, addressId, bankDetailsId, email);
        await this.database.insert('Customer', customer);
        return customer;
    }

    async getCustomerById(id) {
        return await this.database.getById('Customer', id);
    }

    async updateCustomer(id, firstName, lastName, title, familyStatus, birthDate, socialSecurityNumber, taxId, jobStatus, addressId, bankDetailsId, email) {
        const customer = new Customer(id, firstName, lastName, title, familyStatus, birthDate, socialSecurityNumber, taxId, jobStatus, addressId, bankDetailsId, email);
        await this.database.update('Customer', customer);
        return customer;
    }

    async deleteCustomer(id) {
        return await this.database.delete('Customer', id);
    }

    async getAllCustomers(queryParams) {
      
      try {
          const page = parseInt(queryParams?.page ?? 1);
          const pageSize = parseInt(queryParams?.pageSize ?? 10);
          const offset = (page - 1) * pageSize;
          const sql = `
              SELECT * FROM Customer
              LIMIT ? OFFSET ?
          `;
  
          const values = [pageSize, offset];
          const customersData = await this.database.query(sql, values);
  
          const customers = customersData.map(customerData => {
              const address = new Address(
                  customerData.street || '',
                  customerData.houseNumber || '',
                  customerData.zipCode || 0,
                  customerData.city || ''
              );
  
              const bankDetails = new BankDetails(
                  customerData.iban || '',
                  customerData.bic || '',
                  customerData.name || ''
              );
  
              return new Customer(
                  customerData.id,
                  customerData.firstName,
                  customerData.lastName,
                  customerData.title,
                  customerData.familyStatus,
                  customerData.birthDate,
                  customerData.socialSecurityNumber,
                  customerData.taxId,
                  customerData.email,
                  address,
                  bankDetails
              );
          });
  
          return customers;
      } catch (error) {
          console.error('Error retrieving customers:', error);
          throw error;
      }
  }
  

    async searchCustomers(queryParams) {
        try {
            // Extract query parameters
            const searchText = queryParams.text;
            const page = parseInt(queryParams.page) || 1;
            const pageSize = parseInt(queryParams.pageSize) || 10;

            // Construct the SQL query
            const sql = `
                SELECT * FROM Customer
                WHERE 
                    Customer.firstName LIKE ? OR
                    Customer.lastName LIKE ? OR
                    Customer.street LIKE ?
                LIMIT ? OFFSET ?
            `;
            
            const offset = (page - 1) * pageSize;
            const values = [`%${searchText}%`, `%${searchText}%`, `%${searchText}%`, pageSize, offset];

            // Retrieve customers from the database
            const customersData = await this.database.query(sql, values);

            // Map the raw database results to Customer objects
            const customers = customersData.map(customerData => {
                const address = new Address(customerData.street, customerData.houseNumber, customerData.zipCode, customerData.city);
                const bankDetails = new BankDetails(customerData.iban, customerData.bic, customerData.name);
                return new Customer(customerData.id, customerData.firstName, customerData.lastName, customerData.title, customerData.familyStatus, customerData.birthDate, customerData.socialSecurityNumber, customerData.taxId, customerData.email, address, bankDetails);
            });

            return customers;
        } catch (error) {
            console.error('Error searching customers:', error);
            throw error;
        }
    }
}

module.exports = CustomerService;