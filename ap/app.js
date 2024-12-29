const express = require('express');
const productsRoutes = require('./routes/products');
const errorHandler = require('./middlewares/errorHandler');


const app = express();
const port = 3000;

app.use(express.json());

app.use('/products', productsRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
