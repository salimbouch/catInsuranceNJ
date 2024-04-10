class Contract {
    constructor(id, startDate, endDate, coverage, catName, breed, color, birthDate, neutered, personality, environment, weight, customerId) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.coverage = coverage;
        this.catName = catName;
        this.breed = breed;
        this.color = color;
        this.birthDate = birthDate;
        this.neutered = neutered;
        this.personality = personality;
        this.environment = environment;
        this.weight = weight;
        this.customerId = customerId;
    }
}

module.exports = Contract;