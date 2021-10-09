process.env.NODE_ENV = 'test'; // must be before calling db.js

const request = require('supertest');
const app = require('../app');
const { createData } = require('../_test-common');
const db = require('../db');

beforeEach(createData);

afterAll(async () => {
    await db.end();
});

describe('GET routes', () => {
    test('get a list of all invoices', async () => {
        const res = await request(app).get('/invoices');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            {
                "invoices": [
                    { id: 1, comp_code: "apple" },
                    { id: 2, comp_code: "apple" },
                    { id: 3, comp_code: "ibm" },
                ]
            }
        );
    });
    test('get info on an invoice by invoice id', async () => {
        const res = await request(app).get('/invoices/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            {
                "invoice": {
                    id: 1,
                    amt: 100,
                    add_date: expect.any(String),
                    paid: false,
                    paid_date: null,
                    company: {
                        code: 'apple',
                        name: 'Apple',
                        description: 'Maker of OSX.',
                    }
                }
            }
        );
    });
    test('get 404 error if invoice does not exist', async () => {
        const res = await request(app).get('/invoices/0');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            { "error": { "message": "Invoice not in DB: 0", "status": 404 }, "message": "Invoice not in DB: 0" }
        );
    });
});

describe('POST route', () => {
    test('post a new invoice', async () => {
        const res = await request(app).post('/invoices').send({ amt: 500, comp_code: "apple" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
            {
                "invoice": {
                    id: 4,
                    comp_code: "apple",
                    amt: 500,
                    add_date: expect.any(String),
                    paid: false,
                    paid_date: null,
                }
            }
        );
    });
    test('post missing info, get a 500 error', async () => {
        const res = await request(app).post('/invoices').send({});
        expect(res.statusCode).toBe(500);
    });
});

describe('PUT route', () => {
    test('put info to update an invoice', async () => {
        const res = await request(app).put('/invoices/1').send({ amt: 1000, paid: false });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            {
                "invoice": {
                    id: 1,
                    comp_code: 'apple',
                    paid: false,
                    amt: 1000,
                    add_date: expect.any(String),
                    paid_date: null,
                }
            }
        );
    });
    test('put gets a 404 error if invoice does not exist', async () => {
        const res = await request(app).put('/invoices/0').send({ amt: 1000, paid: false });
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            { "error": { "message": "Invoice not in DB: 0", "status": 404 }, "message": "Invoice not in DB: 0" }
        );
    });
    test('put gets a 500 error for insufficient data', async () => {
        const res = await request(app).put('/invoices/1').send({});
        expect(res.statusCode).toBe(500);
    });
});

describe('DELETE route', () => {
    test('delete an invoice', async () => {
        const res = await request(app).delete('/invoices/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            { "message": "1 has been deleted!" }
        );
    });
    test('delete gets a 404 error if invoice does not exist', async () => {
        const res = await request(app).delete('/invoices/0');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            { "error": { "message": "Invoice not in DB: 0", "status": 404 }, "message": "Invoice not in DB: 0" }
        );
    });
});