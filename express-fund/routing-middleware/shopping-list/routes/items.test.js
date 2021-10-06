process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');

describe('GET routes', () => {
    test('get list of all items', async () => {
        const res = await request(app).get('/items');
        const { items } = res.body;
        expect(res.statusCode).toBe(200);
        expect(items[0].name).toEqual('newthing'); // you must check ../fakeDB.json and change the expect here if test not passing!!!
        expect(items).toHaveLength(3); // you must check ../fakeDB.json and change the expect to correct length here if test not passing!!!
    });
    test('get a particular item', async () => {
        const res = await request(app).get('/items/newthing'); // // you must check ../fakeDB.json and change this to an item that exists if this is not passing!!!
        const items = res.body;
        expect(res.statusCode).toBe(200);
        expect(items.item.name).toEqual('newthing'); // match to item you are looking for
    });
    test('get an item that does not exist (404)', async () => {
        const res = await request(app).get('/items/doesnotexist'); // if ../fakeDB.json somehow contains this item, change it here to one that does not exist
        expect(res.statusCode).toBe(404);
    });
});

describe('POST route', () => {
    test('create a new item', async () => {
        const res = await request(app).post('/items').query({ name: 'testitem', price: 19.99 });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toHaveProperty("name");
        expect(res.body.item).toHaveProperty("price");
        expect(res.body.item.name).toEqual("testitem");
        expect(res.body.item.price).toEqual(19.99);
    });
    test('fails when no name given (400)', async () => {
        const res = await request(app).post('/items').query({ price: 19.99 });
        expect(res.statusCode).toBe(400);
    });
    test('fails when no price given (400)', async () => {
        const res = await request(app).post('/items').query({ name: 'testitem' });
        expect(res.statusCode).toBe(400);
    });
    test('fails when price is not a number (400)', async () => {
        const res = await request(app).post('/items').query({ name: 'testitem', price: 'money' });
        expect(res.statusCode).toBe(400);
    });
});

describe('PATCH route', () => {
    test('change name and price of an item', async () => {
        const res = await request(app).patch('/items/testitem').query({ name: 'renameditem', price: 9.99 });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toHaveProperty("name");
        expect(res.body.item).toHaveProperty("price");
        expect(res.body.item.name).toEqual("renameditem");
        expect(res.body.item.price).toEqual(9.99);
    });
    test('change name of an item', async () => {
        const res = await request(app).patch('/items/renameditem').query({ name: 'testitem' });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toHaveProperty("name");
        expect(res.body.item).toHaveProperty("price");
        expect(res.body.item.name).toEqual("testitem");
        expect(res.body.item.price).toEqual(9.99);
    });
    test('changeprice of an item', async () => {
        const res = await request(app).patch('/items/testitem').query({ price: 19.99 });
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toHaveProperty("name");
        expect(res.body.item).toHaveProperty("price");
        expect(res.body.item.name).toEqual("testitem");
        expect(res.body.item.price).toEqual(19.99);
    });
    test('fails when no name and price are given given (400)', async () => {
        const res = await request(app).patch('/items/testitem');
        expect(res.statusCode).toBe(400);
    });
    test('fails when price is not a number (400)', async () => {
        const res = await request(app).patch('/items/testitem').query({ price: 'money' });
        expect(res.statusCode).toBe(400);
    });
});

describe('DELETE route', () => {
    test('delete an item from list', async () => {
        const res = await request(app).delete('/items/testitem');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("Deleted testitem");
    });
    test('fails name not found (404)', async () => {
        const res = await request(app).post('/items/doesnotexist'); // if ../fakeDB.json somehow contains this item, change it here to one that does not exist
        expect(res.statusCode).toBe(404);
    });
});