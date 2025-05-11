const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let products = [];

// GET /products - Get all products
router.get('/', (req, res) => {
    res.status(200).json(products);
});

// POST /products - Create product
router.post('/', (req, res) => {
    const { name, descr, price } = req.body;
    const newProduct = {
        id: uuid.v4(),
        name,
        descr,
        price,
        creationDate: new Date(),
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
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
