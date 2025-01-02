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


module.exports = router;