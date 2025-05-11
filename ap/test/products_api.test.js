const { test, describe, after } = require('node:test');
const server = require('../app');
const supertest = require('supertest');
const assert = require('assert');

const api = supertest(server);

describe('HTTP GET', () => {
    test('products are returned as a json', async () => {
        await api
            .get('/products')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    test('all products are returned', async () => {
        const result = await api.get('/products');

        assert.strictEqual(
            result.body.length,
            3,
            'the inital state of the products is 3'
        );
    });
    test('a specific product is within the returned products', async () => {
        const result = await api.get('/products');

        const productsNames = result.body.map((product) => product.name);
        assert.strictEqual(
            productsNames.includes('Smartphone'),
            true,
            'the Smartphone is expected in the initial data'
        );
    });
    test('getting a single product return status code 200', async () => {
        const dataAtStart = await api.get('/products');
        const firstId = dataAtStart.body[0].id;
        const result = await api.get(`/products/${firstId}`).expect(200);
        const productsNames = dataAtStart.body.map((product) => product.name);

        assert.strictEqual(
            result.body.id,
            dataAtStart.body[0].id,
            'the ids of the result and the first product is the same'
        );
        assert.strictEqual(
            productsNames.includes(result.body.name),
            true,
            'the result name is in the database'
        );
    });
    test('getting a single non existing record is complete with status code 404', async () => {
        const dataAtStart = await api.get('/products');
        await api.get(`/products/${14234134312}`).expect(404);
        const dataAtEnd = await api.get('/products');

        assert.strictEqual(
            dataAtEnd.body.length,
            dataAtStart.body.length,
            'the data length at end must be the same that in the start'
        );
    });
});

describe('HTTP POST', () => {
    test('creates a new product with status code 201', async () => {
        const dataAtStart = await api.get('/products');
        const newProduct = {
            name: 'Mouse',
            descr: 'Wireless',
            price: 10.99,
        };
        await api.post('/products').send(newProduct).expect(201);

        const dataAtEnd = await api.get('/products');
        const productsNames = dataAtEnd.body.map((product) => product.name);

        assert.strictEqual(
            dataAtEnd.body.length,
            dataAtStart.body.length + 1,
            'The length is expected to be incresed'
        );
        assert.strictEqual(
            productsNames.includes('Mouse'),
            true,
            'The Mouse is expected to be in the names of the products'
        );
    });
    test('a parameter is missing creating a new product respond with status code 400', async () => {
        const dataAtStart = await api.get('/products');
        const newProduct = {
            descr: 'Wireless',
            price: 10.99,
        };
        const result = await api.post('/products').send(newProduct).expect(400);
        const dataAtEnd = await api.get('/products');
        assert.strictEqual(
            dataAtEnd.body.length,
            dataAtStart.body.length,
            'The length is expected to be the same at the post'
        );
        assert.strictEqual(result.body.message, 'Invalid or missing name');
    });
    test('a type is invalid creating a new product respond with status code 400', async () => {
        const dataAtStart = await api.get('/products');
        const newProduct = {
            name: 'Mouse',
            descr: 1234,
            price: 'cheap',
        };
        const result = await api.post('/products').send(newProduct).expect(400);
        const dataAtEnd = await api.get('/products');
        assert.strictEqual(
            dataAtEnd.body.length,
            dataAtStart.body.length,
            'The length is expected to be the same at the post'
        );
        assert.strictEqual(
            result.body.message,
            'Invalid or missing description'
        );
    });
    test('the price is negative creating a new product respond with status code 400', async () => {
        const dataAtStart = await api.get('/products');
        const newProduct = {
            name: 'Mouse',
            descr: 'Wireless',
            price: -1111,
        };
        const result = await api.post('/products').send(newProduct).expect(400);
        const dataAtEnd = await api.get('/products');
        assert.strictEqual(
            dataAtEnd.body.length,
            dataAtStart.body.length,
            'The length is expected to be the same at the post'
        );

        assert.strictEqual(result.body.message, 'Invalid or missing price');
    });
});

describe('HTTP PUT', () => {
    test('the product is changed and respond with a apropied status code 200', async () => {
        const dataAtStart = await api.get('/products');
        const firstId = dataAtStart.body[0].id;
        const result = await api
            .put(`/products/${firstId}`)
            .send({ name: 'changedName' })
            .expect(200);

        const dataAtEnd = await api.get('/products');
        const productsNames = dataAtEnd.body.map((product) => product.name);

        assert.strictEqual(
            dataAtEnd.body.length,
            dataAtStart.body.length,
            'ensure that the data is not added or deleted'
        );
        assert.strictEqual(
            productsNames.includes(result.body.name),
            true,
            'ensure that the new name is in the dataAtEnd'
        );
    });
    test('multiple values are changed and respond with status code 200', async () => {
        const dataAtStart = await api.get('/products');
        const firstId = dataAtStart.body[0].id;
        const result = await api
            .put(`/products/${firstId}`)
            .send({ name: 'changedName', descr: 'changedDescr', price: 1000 })
            .expect(200);

        const dataAtEnd = await api.get('/products');
        const productsNames = dataAtEnd.body.map((product) => product.name);
        const productsDescr = dataAtEnd.body.map((product) => product.descr);
        const productsPrice = dataAtEnd.body.map((product) => product.price);

        assert.strictEqual(
            dataAtEnd.body.length,
            dataAtStart.body.length,
            'ensure that the data is not added or deleted'
        );
        assert.strictEqual(
            productsNames.includes(result.body.name),
            true,
            'ensure that the new name is in the dataAtEnd'
        );
        assert.strictEqual(
            productsDescr.includes(result.body.descr),
            true,
            'ensure that the new name is in the dataAtEnd'
        );
        assert.strictEqual(
            productsPrice.includes(result.body.price),
            true,
            'ensure that the new name is in the dataAtEnd'
        );
    });
    test('edit without parameters return a status code 400', async () => {
        const dataAtStart = await api.get('/products');
        const firstId = dataAtStart.body[0].id;
        const result = await api
            .put(`/products/${firstId}`)
            .send({})
            .expect(400);
        assert.strictEqual(
            result.body.message,
            'At least one field (name, descr, or price) must be provided for update'
        );
    });
    test('edit with invalid types return a status code 400', async () => {
        const dataAtStart = await api.get('/products');
        const firstId = dataAtStart.body[0].id;
        const result = await api
            .put(`/products/${firstId}`)
            .send({ name: 123 })
            .expect(400);
        assert.strictEqual(result.body.message, 'Invalid name');
    });
    test('edit a non existing record is complete with status code 404', async () => {
        const dataAtStart = await api.get('/products');
        await api.put(`/products/${14234134312}`).expect(404);
        const dataAtEnd = await api.get('/products');

        assert.strictEqual(
            dataAtEnd.body.length,
            dataAtStart.body.length,
            'the data length at end must be the same that in the start'
        );
    });
});

describe('HTTP DELETE', () => {
    test('delete a record is complete with status code 204', async () => {
        const dataAtStart = await api.get('/products');
        const firstId = dataAtStart.body[0].id;
        await api.delete(`/products/${firstId}`).expect(204);

        const dataAtEnd = await api.get('/products');

        assert.strictEqual(
            dataAtEnd.body.length + 1,
            dataAtStart.body.length,
            'the data length at end must be lower that the start'
        );
    });
    test('delete a non existing record is complete with status code 404', async () => {
        const dataAtStart = await api.get('/products');
        await api.delete(`/products/${14234134312}`).expect(404);
        const dataAtEnd = await api.get('/products');

        assert.strictEqual(
            dataAtEnd.body.length,
            dataAtStart.body.length,
            'the data length at end must be the same that in the start'
        );
    });
});

after(() => {
    server.close();
});
