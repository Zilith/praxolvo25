class Product {
    constructor(id, name, descr, price, creationDate) {
        this.id = id;
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

        this.name = name;
        this.descr = descr;
        this.price = price;
        this.creationDate = creationDate;
    }
}

module.exports = Product;