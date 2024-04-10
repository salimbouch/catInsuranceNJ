const { v4: uuidv4 } = require('uuid');
const BankDetails = require('../models/BankDetails');

class BankDetailsService {
    constructor(database) {
        this.database = database;
    }

    async createBankDetails(iban, bic, name) {
        const id = uuidv4();
        const bankDetails = new BankDetails(id, iban, bic, name);
        await this.database.insert('BankDetails', bankDetails);
        return bankDetails;
    }

    async getBankDetailsById(id) {
        return await this.database.getById('BankDetails', id);
    }

    async updateBankDetails(id, iban, bic, name) {
        const bankDetails = new BankDetails(id, iban, bic, name);
        await this.database.update('BankDetails', bankDetails);
        return bankDetails;
    }

    async deleteBankDetails(id) {
        return await this.database.delete('BankDetails', id);
    }
}

module.exports = BankDetailsService;