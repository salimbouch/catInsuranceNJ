const { v4: uuidv4 } = require('uuid');
const Contract = require('../models/Contract');

class ContractService {
    constructor(database) {
        this.database = database;
    }

    async createContract(startDate, endDate, coverage, catName, breed, color, birthDate, neutered, personality, environment, weight, customerId) {
        const id = uuidv4();
        const contract = new Contract(id, startDate, endDate, coverage, catName, breed, color, birthDate, neutered, personality, environment, weight, customerId);
        await this.database.insert('Contract', contract);
        return contract;
    }

    async getContractById(id) {
        return await this.database.getById('Contract', id);
    }

    async updateContract(id, startDate, endDate, coverage, catName, breed, color, birthDate, neutered, personality, environment, weight, customerId) {
        const contract = new Contract(id, startDate, endDate, coverage, catName, breed, color, birthDate, neutered, personality, environment, weight, customerId);
        await this.database.update('Contract', contract);
        return contract;
    }

    async deleteContract(id) {
        return await this.database.delete('Contract', id);
    }
}

module.exports = ContractService;