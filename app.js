const express = require('express');
const app = express();
const productsRoutes = require('./routes/products');
const { handleError } = require('./utils/errorHandler');
const port = 3000;

app.use(express.json());

// Rutas
app.use('/products', productsRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    handleError(err, res);
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;