const express = require('express');
const router = express.Router();
const Product = require('../models/product');

let products = [];

// GET /products - Get all products
router.get('/', (req, res) => {
    res.status(200).json(products);
});

// POST /products - Create product
router.post('/', (req, res) => {
    const { name, descr, price } = req.body;
    console.log(name);
    try {
        const newProduct = new Product({
            name,
            descr,
            price,
        });
        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

/**
 * Were missing some routes here...
 */
router.get('/:id', (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    console.log(product);
    if (product) {
        res.json(product);
    } else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    const product = products.find((p) => p.id === req.params.id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found ' });
    }
    try {
        product.update(req.body);
        res.json(product);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

router.delete('/:id', (req, res) => {
    const initialLength = products.length;
    products = products.filter((p) => p.id !== req.params.id);

    if (products.length === initialLength) {
        return res.status(404).send({ error: 'Product not found' });
    }
    res.status(204).end();
});

module.exports = router;
