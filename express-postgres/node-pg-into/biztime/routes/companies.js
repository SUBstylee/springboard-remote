// routes for companies
const express = require('express');
const ExpressError = require('../expressError');
const db = require('../db');
const slugify = require('slugify');

let router = new express.Router();

// GET routes
router.get('/', async (req, res, next) => {
    try {
        const result = await db.query(
            `SELECT code, name
            FROM companies
            ORDER BY name`
        );
        return res.json({ "companies": result.rows });
    } catch (e) {
        return next(e);
    }
});

router.get('/:code', async (req, res, next) => {
    try {
        const code = req.params.code;
        const compResult = await db.query(
            `SELECT code, name, description
            FROM companies
            WHERE code=$1`,
            [code]
        );
        const invResult = await db.query(
            `SELECT id
            FROM invoices
            WHERE comp_code=$1`,
            [code]
        );
        if (compResult.rows.length === 0) throw new ExpressError(`Company not in DB: ${code}`, 404);
        const company = compResult.rows[0];
        const invoices = invResult.rows;
        company.invoices = invoices.map(i => i.id);
        return res.json({ "company": company });
    } catch (e) {
        return next(e);
    };
})
// POST routes
router.post('/', async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const code = slugify(name, { lower: true });
        const result = await db.query(
            `INSERT INTO companies (code,name,description)
            VALUES ($1,$2,$3)
            RETURNING code,name,description`,
            [code, name, description]
        );
        return res.status(201).json({ "company": result.rows[0] });

    } catch (e) {
        return next(e);
    }
});

// PUT routes
router.put('/:code', async (req, res, next) => {
    try {
        const code = req.params.code;
        const { name, description } = req.body;
        const results = await db.query(
            `UPDATE companies
            SET name=$1,description=$2
            WHERE code=$3
            RETURNING code,name,description`,
            [name, description, code]
        );
        if (results.rows.length === 0) throw new ExpressError(`Company not in DB: ${code}`, 404);
        return res.json({ "company": results.rows[0] })
    } catch (e) {
        return next(e);
    };
});

// DELETE routes
router.delete('/:code', async (req, res, next) => {
    try {
        const code = req.params.code;
        const check = await db.query(
            `SELECT * FROM companies WHERE code=$1`,
            [code]
        );
        if (check.rows.length === 0) throw new ExpressError(`Company not in DB: ${code}`, 404);
        const results = await db.query(
            `DELETE FROM companies WHERE code=$1`,
            [code]
        );
        return res.json({ message: `${check.rows[0].name} has been deleted!` })
    } catch (e) {
        return next(e)
    }
})

module.exports = router;