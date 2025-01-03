// ap/routes/products.js

const express = require('express');
const router = express.Router();
const Product = require('../models/product');


let products = [];


router.get('/', (req, res) => {
    res.status(200).json(products);
});

router.post('/', (req, res) => {
    const { name, descr, price } = req.body;

    if (!name || !descr || !price) {
        return res.status(400).json({ message: 'Faltan datos obligatorios (name, descr, price)' });
    }

    const newProduct = new Product(products.length + 1, name, descr, price, new Date());

    products.push(newProduct);

    res.status(201).json(newProduct); 
});


router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);  
    const { name, descr, price } = req.body;

    const product = products.find(p => p.id === productId); 

    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    product.name = name || product.name;
    product.descr = descr || product.descr;
    product.price = price || product.price;

    res.status(200).json(product); 
});


router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id); 

    
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    
    products.splice(productIndex, 1); 

    res.status(200).json({ message: 'Producto eliminado' });
});


module.exports = router;
