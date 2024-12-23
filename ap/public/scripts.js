const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

async function getProducts() {
    const response = await fetch('/api/products'); 
    const products = await response.json();

    productList.innerHTML = '';
    products.forEach(product => {
        const tr = document.createElement('tr'); 
        tr.innerHTML = `
            <td>${product.name}</td>
            <td>${product.descr}</td>
            <td>$${product.price}</td>
            <td>
                <button onclick="deleteProduct(${product.id})">Eliminar</button>
                <button onclick="editProduct(${product.id})">Editar</button>
            </td>
        `;
        productList.appendChild(tr);
    });
}

productForm.addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const name = document.getElementById('productName').value;
    const descr = document.getElementById('productDescr').value;
    const price = document.getElementById('productPrice').value;

    if (name && descr && price) {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, descr, price }),
        });

        if (response.ok) {
            console.log('Producto agregado');
            getProducts(); 
        } else {
            alert('Hubo un error al agregar el producto');
        }
    } else {
        alert('Por favor, complete todos los campos');
    }
});

async function deleteProduct(productId) {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        console.log('Producto eliminado');
        getProducts();  
    } else {
        alert('Error al eliminar el producto');
    }
}

async function editProduct(productId) {
    const newName = prompt('Nuevo nombre:');
    const newDescr = prompt('Nueva descripción:');
    const newPrice = prompt('Nuevo precio:');

    if (newName && newDescr && newPrice) {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName, descr: newDescr, price: newPrice }),
        });

        if (response.ok) {
            console.log('Producto editado');
            getProducts(); 
        } else {
            alert('Error al editar el producto');
        }
    } else {
        alert('Por favor, complete todos los campos');
    }
}

getProducts();
