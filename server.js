const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./ap/routes/products'); 
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'ap', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ap', 'public', 'index.html')); 
});

app.use('/api/products', productsRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
