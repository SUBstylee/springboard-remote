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
    test('get a list of all industries', async () => {
        const res = await request(app).get('/industries');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            {
                "industries": [
                    {
                        "code": "comm",
                        "industry": "Communication",
                    },
                    {
                        "code": "data",
                        "industry": "Data",
                    },
                    {
                        "code": "tech",
                        "industry": "Technology",
                    }
                ],
            }
        );
    });
    test('get info on an industry by industry code', async () => {
        const res = await request(app).get('/industries/tech');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            {
                "industry": {
                    "code": "tech",
                    "companies": [
                        "apple",
                        "ibm"
                    ],
                    "industry": "Technology",
                },
            }
        );
    });
    test('get 404 error if industry does not exist', async () => {
        const res = await request(app).get('/industries/fakecompany');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            { "error": { "message": "Industry not in DB: fakecompany", "status": 404 }, "message": "Industry not in DB: fakecompany" }
        );
    });
});

describe('POST route', () => {
    test('post a new industry', async () => {
        const res = await request(app).post('/industries').send({ code: "testing", industry: "TESTING" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
            {
                "industry": {
                    code: "testing",
                    industry: "TESTING",
                }
            }
        );
    });
    test('post a connection between an industry and company', async () => {
        const res = await request(app).post('/industries/data').send({ company_code: "apple", code: "data" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
            {
                "company industry": {
                    company_code: "apple",
                    industry_code: "data",
                }
            }
        );
    });
    test('post an existing industry, get a 500 error', async () => {
        const res = await request(app).post('/industries').send({ code: "tech", industry: "will not work!" });
        expect(res.statusCode).toBe(500);
    });
});

describe('PUT route', () => {
    test('put info to update an industry', async () => {
        const res = await request(app).put('/industries/tech').send({ industry: "testing" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            {
                "industry": {
                    code: "tech",
                    industry: "testing",
                }
            }
        );
    });
    test('put gets a 404 error if industry does not exist', async () => {
        const res = await request(app).put('/industries/fakecompany').send({ code: "test", industry: "testing" });
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            { "error": { "message": "Industry not in DB: fakecompany", "status": 404 }, "message": "Industry not in DB: fakecompany" }
        );
    });
    test('put gets a 500 error for insufficient data', async () => {
        const res = await request(app).put('/industries/tech').send({});
        expect(res.statusCode).toBe(500);
    });
});

describe('DELETE route', () => {
    test('delete an industry', async () => {
        const res = await request(app).delete('/industries/tech');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            { "message": "Technology has been deleted!" }
        );
    });
    test('delete gets a 404 error if industry does not exist', async () => {
        const res = await request(app).delete('/industry/fakecompany');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(
            { "error": { "message": "Not Found", "status": 404 }, "message": "Not Found" }
        );
    });
});