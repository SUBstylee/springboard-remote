process.env.NODE_ENV = 'test'; // must be before calling db.js

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testUser;

beforeEach(async () => {
  const result = await db.query(`INSERT INTO users (name,type) VALUES ('Billie','admin') RETURNING id,name,type`);
  testUser = result.rows[0];
});

afterEach(async () => {
  await db.query(`DELETE FROM users`);
});

afterAll(async () => {
  await db.end();
});

describe('GET /users', () => {
  test('get a list with one user', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ users: [testUser] });
  });
});

describe('GET /users/:id', () => {
  test('get a single user by id', async () => {
    const res = await request(app).get(`/users/${testUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ user: testUser });
  });
  test('responds with 404 for invalid id', async () => {
    const res = await request(app).get(`/users/0`);
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /users', () => {
  test('post a new user', async () => {
    const res = await request(app).post('/users').send({ name: 'BillyBob', type: 'staff' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      user: { id: expect.any(Number), name: 'BillyBob', type: 'staff' }
    });
  });
});

describe('UPDATE /users/:id', () => {
  test('update an existing user', async () => {
    const res = await request(app).patch(`/users/${testUser.id}`).send({ name: 'BillyBob', type: 'admin' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      user: { id: testUser.id, name: 'BillyBob', type: 'admin' }
    });
  });
  test('update an existing user that does not exist', async () => {
    const res = await request(app).patch(`/users/0`).send({ name: 'BillyBob', type: 'admin' });
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /users/:id', () => {
  test('delete a user', async () => {
    const res = await request(app).delete(`/users/${testUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'User has been deleted!' });
  });
  test('delete a user', async () => {
    const res = await request(app).delete(`/users/0`);
    expect(res.statusCode).toBe(404);
  });
});
