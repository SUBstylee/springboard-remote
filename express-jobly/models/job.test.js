"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
    const newJob = {
        title: "new",
        salary: 123456,
        equity: "0",
        company_handle: "c1",
    };

    test("works", async function () {
        let job = await Job.create(newJob);
        expect(job).toEqual({ ...newJob });
    });

    test("bad request with dupe", async function () {
        try {
            await Job.create(newJob);
            await Job.create(newJob);
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/************************************** findAll */

describe("findAll", function () {
    test("works: no filter", async function () {
        let jobs = await Job.findAll();
        expect(jobs).toEqual([
            {
                title: "j1",
                salary: 1,
                equity: "0.1",
                company_handle: "c1",
            },
            {
                title: "j2",
                salary: 2,
                equity: "0.2",
                company_handle: "c2",
            },
            {
                title: "j3",
                salary: 3,
                equity: "0.3",
                company_handle: "c3",
            },
            {
                title: "j4",
                salary: 3,
                equity: "0",
                company_handle: "c1",
            }
        ]);

    });
});

// /************************************** get */

describe("get", function () {
    test("works", async function () {
        const id = await db.query(`
        SELECT id FROM jobs 
        WHERE title='j1'`);
        const job = await Job.get(id.rows[0].id);
        expect(job).toEqual({
            title: "j1",
            salary: 1,
            equity: "0.1",
            company_handle: "c1",
        });
    });

    test("not found if no such job", async function () {
        try {
            await Job.get(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** update */

describe("update", function () {
    const updateData = {
        title: "changedJob1",
        salary: 100,
        equity: "0.5",
    };

    test("works", async function () {
        const id = await db.query(`
        SELECT id FROM jobs 
        WHERE title='j1'`);
        await Job.update(id.rows[0].id, updateData);
        const result = await db.query(
            `SELECT title, salary, equity, company_handle
           FROM jobs
           WHERE title = 'changedJob1'`);
        expect(result.rows).toEqual([{
            title: "changedJob1",
            salary: 100,
            equity: "0.5",
            company_handle: "c1",
        }]);
    });

    test("works: null fields", async function () {
        const id = await db.query(`
        SELECT id FROM jobs 
        WHERE title='j1'`);
        const updateDataSetNulls = {
            title: "New",
            salary: null,
            equity: null,
        };

        await Job.update(id.rows[0].id, updateDataSetNulls);
        const result = await db.query(
            `SELECT title, salary, equity, company_handle
           FROM jobs
           WHERE title = 'New'`);
        expect(result.rows).toEqual([{
            title: "New",
            salary: null,
            equity: null,
            company_handle: "c1",
        }]);
    });

    test("not found if no such job", async function () {
        try {
            await Job.update(0, updateData);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });

    test("bad request with no data", async function () {
        const id = await db.query(`
        SELECT id FROM jobs 
        WHERE title='j1'`);
        try {
            await Job.update(id.rows[0].id, {});
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

/************************************** remove */

describe("remove", function () {
    test("works", async function () {
        let getId = await db.query(`
        SELECT id FROM jobs 
        WHERE title='j1'`);
        let id = getId.rows[0].id;
        await Job.remove(id);
        const res = await db.query(
            `SELECT title FROM jobs WHERE title='j1'`);
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such job", async function () {
        try {
            await Job.remove(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});
