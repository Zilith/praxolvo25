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


router.delete('/:id', (req, res) => {
    products = products.filter((p) => p.id !== req.params.id);

    res.status(204).end();
});

module.exports = router;
