const express = require('express');
const app = express();
const productsRoutes = require('./routes/products.js');
const port = 3000;
const middleware = require('./utils/middleware.js');

app.use(express.json());

// Rutas para productos
app.use('/products', productsRoutes);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const server = app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = server;