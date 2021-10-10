// routes for industries
const express = require('express');
const ExpressError = require('../expressError');
const db = require('../db');

let router = new express.Router();

// GET routes
router.get('/', async (req, res, next) => {
    try {
        const result = await db.query(
            `SELECT code, industry
            FROM industries
            ORDER BY industry`
        );
        return res.json({ "industries": result.rows });
    } catch (e) {
        return next(e);
    }
});

router.get('/:code', async (req, res, next) => {
    try {
        const code = req.params.code;
        const indResult = await db.query(
            `SELECT code, industry
            FROM industries
            WHERE code=$1`,
            [code]
        );
        const comResult = await db.query(
            `SELECT company_code
            FROM companies_industries
            WHERE industry_code=$1`,
            [code]
        );
        if (indResult.rows.length === 0) throw new ExpressError(`Industry not in DB: ${code}`, 404);
        const industry = indResult.rows[0];
        const companies = comResult.rows;
        industry.companies = companies.map(c => c.company_code);
        return res.json({ "industry": industry });
    } catch (e) {
        return next(e);
    };
});

// POST routes
router.post('/', async (req, res, next) => {
    try {
        const { code, industry } = req.body;
        const result = await db.query(
            `INSERT INTO industries (code,industry)
            VALUES ($1,$2)
            RETURNING code,industry`,
            [code, industry]
        );
        return res.status(201).json({ "industry": result.rows[0] });

    } catch (e) {
        return next(e);
    }
});

router.post('/:code', async (req, res, next) => {
    try {
        const code = req.params.code;
        const { company_code } = req.body;
        const checkInd = await db.query(
            `SELECT * FROM industries WHERE code=$1`,
            [code]
        );
        if (checkInd.rows.length === 0) throw new ExpressError(`Industry not in DB: ${code}`, 404);
        const checkCom = await db.query(
            `SELECT * FROM companies WHERE code=$1`,
            [company_code]
        );
        if (checkCom.rows.length === 0) throw new ExpressError(`Company not in DB: ${code}`, 404);
        const result = await db.query(
            `INSERT INTO companies_industries (company_code,industry_code)
            VALUES ($1,$2)
            RETURNING company_code,industry_code`,
            [company_code, code]
        );
        return res.status(201).json({ "company industry": result.rows[0] });

    } catch (e) {
        return next(e);
    }
});

// PUT routes
router.put('/:code', async (req, res, next) => {
    try {
        const code = req.params.code;
        const { industry } = req.body;
        if (industry.length === 0) throw new ExpressError();
        const results = await db.query(
            `UPDATE industries
            SET industry=$1
            WHERE code=$2
            RETURNING code,industry`,
            [industry, code]
        );
        if (results.rows.length === 0) throw new ExpressError(`Industry not in DB: ${code}`, 404);
        return res.json({ "industry": results.rows[0] })
    } catch (e) {
        return next(e);
    };
});

// DELETE routes
router.delete('/:code', async (req, res, next) => {
    try {
        const code = req.params.code;
        const check = await db.query(
            `SELECT * FROM industries WHERE code=$1`,
            [code]
        );
        if (check.rows.length === 0) throw new ExpressError(`Industry not in DB: ${code}`, 404);
        const results = await db.query(
            `DELETE FROM industries WHERE code=$1`,
            [code]
        );
        return res.json({ message: `${check.rows[0].industry} has been deleted!` })
    } catch (e) {
        return next(e)
    }
})

module.exports = router;