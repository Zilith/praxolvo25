const express = require('express');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');
const app = express();

app.use(express.json()); 

let products = JSON.parse(localStorage.getItem('products')) || [];

function updateLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const { name, descr, price } = req.body;

    if (!name || !descr || !price) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const id = products.length + 1;  
    const creationDate = new Date().toISOString();
    const product = { id, name, descr, price, creationDate };
    
    products.push(product);
    updateLocalStorage();  

    res.status(201).json(product);  
});

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id == id);

    if (index === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    products.splice(index, 1);
    updateLocalStorage();  
    res.status(204).send(); 
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
