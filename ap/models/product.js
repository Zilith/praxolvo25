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

    }
}

module.exports = Product;
