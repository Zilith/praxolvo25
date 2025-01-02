const express = require('express');
const router = express.Router();
let products = [];

// GET /products - Get all products
router.get('/', (req, res) => {
    res.status(200).json(products);
});

// POST /products - Create product
router.post('/', (req, res) => {
    const { name, descr, price } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        descr,
        price,
        creationDate: new Date()
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// GET /products/:id - Get product by id
router.get('/:id', async (req, res) => {
    try {
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT /products/:id - Update product by id
router.put('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { name, descr, price } = req.body;

        // Validate if all required fields are provided
        if (!name || !descr || !price) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Validate if price is a number
        if (isNaN(price)) {
            return res.status(400).json({ message: 'Price must be a number.' });
        }

        // Find the product by its ID
        const product = products.find(p => p.id === productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Update the product
        product.name = name;
        product.descr = descr;
        product.price = price;

        res.status(200).json({ message: 'Product updated.', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /products/:id - Delete product by id
router.delete('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        // Validating if product exists
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Delete the product
        products.splice(productIndex, 1);
        res.status(200).json({ message: 'Product eliminated.' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;