process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const db = require('../db');

let book_isbn;

beforeEach(async () => {
    let result = await db.query(`
        INSERT INTO books (isbn, amazon_url,author,language,pages,publisher,title,year)   
        VALUES('123456789','https://amazon.com/book','John Doe','English',100,'Anonymous Publishing','Being Anonymous',2077) 
        RETURNING isbn
        `);
    book_isbn = result.rows[0].isbn
});

describe("POST /books", () => {
    test("create a new book", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '987654321',
                amazon_url: "https://amazon.com/test",
                author: "Testy McTester",
                language: "Tagalog",
                pages: 1000,
                publisher: "Some Guy",
                title: "You cannot read this book!",
                year: 2020
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.book).toHaveProperty("isbn");
    });

    test("cannot create book without title (required)", async function () {
        const response = await request(app)
            .post(`/books`)
            .send({ year: 2021 });
        expect(response.statusCode).toBe(400);
    });
});


describe("GET /books", () => {
    test("gets all books (will only be 1 in test)", async function () {
        const response = await request(app).get(`/books`);
        const books = response.body.books;
        expect(books).toHaveLength(1);
        expect(books[0]).toHaveProperty("isbn");
        expect(books[0]).toHaveProperty("amazon_url");
    });
});


describe("GET /books/:isbn", () => {
    test("get a book", async function () {
        const response = await request(app)
            .get(`/books/${book_isbn}`)
        expect(response.body.book).toHaveProperty("isbn");
        expect(response.body.book.isbn).toBe(book_isbn);
    });

    test("404 error if book does not exist on db", async function () {
        const response = await request(app)
            .get(`/books/999`)
        expect(response.statusCode).toBe(404);
    });
});


describe("PUT /books/:id", () => {
    test("update a book", async function () {
        const response = await request(app)
            .put(`/books/${book_isbn}`)
            .send({
                amazon_url: "https://amazon.com/update",
                author: "mctest",
                language: "english",
                pages: 2000,
                publisher: "another publisher",
                title: "updated title",
                year: 2230
            });
        expect(response.body.book).toHaveProperty("isbn");
        expect(response.body.book.title).toBe("updated title");
    });

    test("will not update with bad data", async function () {
        const response = await request(app)
            .put(`/books/${book_isbn}`)
            .send({
                isbn: "123456789",
                extraField: 'this will not work now!',
                amazon_url: "https://amazon.com/update",
                author: "mctest",
                language: "english",
                pages: 2000,
                publisher: "another publisher",
                title: "updated title",
                year: 2230
            });
        expect(response.statusCode).toBe(400);
    });

    test("404 if book not found on db", async function () {
        // delete book first
        await request(app)
            .delete(`/books/${book_isbn}`)
        const response = await request(app).delete(`/books/${book_isbn}`);
        expect(response.statusCode).toBe(404);
    });
});


describe("DELETE /books/:id", () => {
    test("delete a book", async function () {
        const response = await request(app)
            .delete(`/books/${book_isbn}`)
        expect(response.body).toEqual({ message: "Book deleted" });
    });
});


afterEach(async function () {
    await db.query("DELETE FROM BOOKS");
});


afterAll(async function () {
    await db.end()
});