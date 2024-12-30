class Product {
    constructor(id, name, descr, price, creationDate) {
        // Validación en la construcción del objeto
        if (!name || !descr || !price) {
            throw new Error('Name, description and price are required');
        }

        if (typeof price !== 'number' || price <= 0) {
            throw new Error('Price must be a positive number');
        }

        // Asignación de propiedades
        this.id = id;
        this.name = name;
        this.descr = descr;
        this.price = price;
        this.creationDate = creationDate || new Date();
    }

    validate() {
        return {
            isValid: this.name && this.descr && this.price > 0,
            errors: this.getValidationErrors()
        };
    }

    getValidationErrors() {
        const errors = [];
        if (!this.name) errors.push('Name is required');
        if (!this.descr) errors.push('Description is required');
        if (!this.price || this.price <= 0) errors.push('Price must be a positive number');
        return errors;
    }
}

module.exports = Product;