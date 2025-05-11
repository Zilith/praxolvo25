const uuid = require('uuid');
class Product {
    constructor({ name, descr, price }) {
        // data validation for missing or typeof
        if (!name || typeof name !== 'string') {
            throw new Error('Invalid or missing name');
        }
        if (!descr || typeof descr !== 'string') {
            throw new Error('Invalid or missing description');
        }
        if (!price || typeof price !== 'number') {
            throw new Error('Invalid or missing price');
        }

        this.id = uuid.v4();
        this.name = name;
        this.descr = descr;
        this.price = price;
        this.creationDate = new Date();
    }

    // update function for PUT method
    update(fields) {
        if (fields.name !== undefined) {
            if (typeof fields.name !== 'string')
                throw new Error('Invalid name');
            this.name = fields.name;
        }

        if (fields.descr !== undefined) {
            if (typeof fields.descr !== 'string')
                throw new Error('Invalid description');
            this.descr = fields.descr;
        }

        if (fields.price !== undefined) {
            if (typeof fields.price !== 'number')
                throw new Error('Invalid price');
            this.price = fields.price;
        }
    }
}

module.exports = Product;
