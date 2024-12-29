const Product = require('../models/product');

let products = [];


const getAllProducts = (req, res) => {
    res.status(200).json(products);
};


const getProductById = (req, res, next) => {
    const { id } = req.params;
    const product = products.find((p) => p.id === parseInt(id));
    if (!product) {
        return next({ status: 404, message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
};


const createProduct = (req, res, next) => {
    const { id, name, descr, price, creationDate } = req.body;


    if (!name || !descr || price == null || typeof price !== 'number') {
        return next({ status: 400, message: 'Datos inválidos: Name, descr y price son obligatorios' });
    }

    const productId = id ? id : products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

   
    const productCreationDate = creationDate ? new Date(creationDate) : new Date();


    const newProduct = new Product(productId, name, descr, price, productCreationDate);

    products.push(newProduct);
    res.status(201).json(newProduct);
};

const updateProduct = (req, res, next) => {
    const { id } = req.params;
    const { name, descr, price } = req.body;

    const productIndex = products.findIndex((p) => p.id === parseInt(id));
    if (productIndex === -1) {
        return next({ status: 404, message: 'Producto no encontrado' });
    }

    if (!name && !descr && price == null) {
        return next({ status: 400, message: 'Debe proporcionar al menos un dato para actualizar' });
    }

    const updatedProduct = {
        ...products[productIndex],
        ...(name && { name }),
        ...(descr && { descr }),
        ...(price !== undefined && { price }),
    };

    products[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
};


const deleteProduct = (req, res, next) => {
    const { id } = req.params;

    const productIndex = products.findIndex((p) => p.id === parseInt(id));
    if (productIndex === -1) {
        return next({ status: 404, message: 'Producto no encontrado' });
    }

    const deletedProduct = products.splice(productIndex, 1);
    res.status(200).json({ message: 'Producto eliminado', product: deletedProduct });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
