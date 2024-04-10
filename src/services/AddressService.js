const { v4: uuidv4 } = require('uuid');
const Address = require('../models/Address');

class AddressService {
    constructor(database) {
        this.database = database;
    }

    async createAddress(street, houseNumber, zipCode, city) {
        const id = uuidv4();
        const address = new Address(id, street, houseNumber, zipCode, city);
        await this.database.insert('Address', address);
        return address;
    }

    async getAddressById(id) {
        return await this.database.getById('Address', id);
    }

    async updateAddress(id, street, houseNumber, zipCode, city) {
        const address = new Address(id, street, houseNumber, zipCode, city);
        await this.database.update('Address', address);
        return address;
    }

    async deleteAddress(id) {
        return await this.database.delete('Address', id);
    }
}

module.exports = AddressService;
