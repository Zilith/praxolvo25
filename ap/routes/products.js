// routes/products.js
const express = require('express');
const { LocalStorage } = require('node-localstorage');
const Product = require('../models/products');
const router = express.Router();

const localStorage = new LocalStorage('./scratch');

function getProductsFromLocalStorage() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

function updateLocalStorage(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

router.get('/', (req, res) => {
    const products = getProductsFromLocalStorage();
    res.json(products);
});

router.post('/', (req, res) => {
    const { name, descr, price } = req.body;

    if (!name || !descr || !price) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const id = Date.now(); 
    const creationDate = new Date().toISOString();
    const newProduct = new Product(id, name, descr, price, creationDate);

    const products = getProductsFromLocalStorage();
    products.push(newProduct);
    updateLocalStorage(products);

    res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, descr, price } = req.body;

    const products = getProductsFromLocalStorage();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    product.name = name || product.name;
    product.descr = descr || product.descr;
    product.price = price || product.price;
    updateLocalStorage(products);

    res.json(product);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    let products = getProductsFromLocalStorage();
    products = products.filter(p => p.id !== parseInt(id));

    updateLocalStorage(products);

    res.status(204).send();
});

module.exports = router;
