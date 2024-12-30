const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { AppError, handleError } = require('../utils/errorHandler');

let products = [];

const validateProductId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return next(new AppError('Invalid ID format', 400));
    }
    const product = products.find(p => p.id === id);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }
    req.product = product;
    next();
};

router.get('/', (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            data: products,
            count: products.length
        });
    } catch (err) {
        handleError(err, res);
    }
});

router.get('/:id', validateProductId, (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            data: req.product
        });
    } catch (err) {
        handleError(err, res);
    }
});

router.post('/', (req, res) => {
    try {
        const { name, descr, price } = req.body;
        const newProduct = new Product(
            products.length + 1,
            name,
            descr,
            parseFloat(price)
        );

        const validation = newProduct.validate();
        if (!validation.isValid) {
            throw new AppError(validation.errors.join(', '), 400);
        }

        products.push(newProduct);
        res.status(201).json({
            status: 'success',
            data: newProduct
        });
    } catch (err) {
        handleError(err, res);
    }
});
router.put('/:id', validateProductId, (req, res) => {
    try {
        const { name, descr, price } = req.body;
        const index = products.findIndex(p => p.id === parseInt(req.params.id));
        
        const updatedProduct = new Product(
            parseInt(req.params.id),
            name || products[index].name,
            descr || products[index].descr,
            price ? parseFloat(price) : products[index].price,
            products[index].creationDate
        );

        products[index] = updatedProduct;
        res.status(200).json({
            status: 'success',
            data: updatedProduct
        });
    } catch (err) {
        handleError(err, res);
    }
});

router.delete('/:id', validateProductId, (req, res) => {
    try {
        products = products.filter(p => p.id !== parseInt(req.params.id));
        res.status(204).send();
    } catch (err) {
        handleError(err, res);
    }
});

module.exports = router;