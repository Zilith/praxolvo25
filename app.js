// app.js

const express = require('express');
const app = express();
const productsRoutes = require('./ap/routes/products.js');
const port = 3000;

app.use(express.json());  
app.use('/products', productsRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
