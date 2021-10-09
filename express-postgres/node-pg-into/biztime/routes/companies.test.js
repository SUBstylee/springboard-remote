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
    test('get a list of all companies', async () => {
        const res = await request(app).get('/companies');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            {
                "companies": [
                    { code: "apple", name: "Apple" },
                    { code: "ibm", name: "IBM" },
                ]
            }
        );
    });
    test('get info on a company by company code', async () => {
        const res = await request(app).get('/companies/apple');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            {
                "company": {
                    code: "apple",
                    name: "Apple",
                    description: "Maker of OSX.",
                    invoices: [1, 2],
                }
            }
        );
    });
    test('get 404 error if company does not exist', async () => {
        const res = await request(app).get('/companies/fakecompany');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            { "error": { "message": "Company not in DB: fakecompany", "status": 404 }, "message": "Company not in DB: fakecompany" }
        );
    });
});

describe('POST route', () => {
    test('post a new company', async () => {
        const res = await request(app).post('/companies').send({ name: "Big Tech", description: "fake company" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
            {
                "company": {
                    code: "big-tech",
                    name: "Big Tech",
                    description: "fake company",
                }
            }
        );
    });
    test('post an existing company, get a 500 error', async () => {
        const res = await request(app).post('/companies').send({ name: "Apple", description: "will not work!" });
        expect(res.statusCode).toBe(500);
    });
});

describe('PUT route', () => {
    test('put info to update a company', async () => {
        const res = await request(app).put('/companies/apple').send({ name: "test", description: "test description" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            {
                "company": {
                    code: "apple",
                    name: "test",
                    description: "test description",
                }
            }
        );
    });
    test('put gets a 404 error if company does not exist', async () => {
        const res = await request(app).put('/companies/fakecompany').send({ name: "test", description: "test description" });
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            { "error": { "message": "Company not in DB: fakecompany", "status": 404 }, "message": "Company not in DB: fakecompany" }
        );
    });
    test('put gets a 500 error for insufficient data', async () => {
        const res = await request(app).put('/companies/apple').send({});
        expect(res.statusCode).toBe(500);
    });
});

describe('DELETE route', () => {
    test('delete a company', async () => {
        const res = await request(app).delete('/companies/apple');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            { "message": "Apple has been deleted!" }
        );
    });
    test('delete gets a 404 error if company does not exist', async () => {
        const res = await request(app).delete('/companies/fakecompany');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            { "error": { "message": "Company not in DB: fakecompany", "status": 404 }, "message": "Company not in DB: fakecompany" }
        );
    });
});