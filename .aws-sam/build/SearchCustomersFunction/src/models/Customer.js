class Customer {
    constructor(id, firstName, lastName, title, familyStatus, birthDate, socialSecurityNumber, taxId, email, address, bankDetails) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.familyStatus = familyStatus;
        this.birthDate = birthDate;
        this.socialSecurityNumber = socialSecurityNumber;
        this.taxId = taxId;
        this.email = email;
        this.address = address;
        this.bankDetails = bankDetails
    }
}

module.exports = Customer;