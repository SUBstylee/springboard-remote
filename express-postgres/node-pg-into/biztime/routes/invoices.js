// routes for invoices
const express = require('express');
const ExpressError = require('../expressError');
const db = require('../db');

let router = new express.Router();

// GET routes
router.get('/', async (req, res, next) => {
    try {
        const result = await db.query(
            `SELECT id, comp_code
            FROM invoices
            ORDER BY id`
        );
        return res.json({ "invoices": result.rows });
    } catch (e) {
        return next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const check = await db.query(
            `SELECT * FROM invoices WHERE id=$1`,
            [id]
        );
        if (check.rows.length === 0) throw new ExpressError(`Invoice not in DB: ${id}`, 404);
        const result = await db.query(
            `SELECT i.id, 
                    i.comp_code, 
                    i.amt, 
                    i.paid, 
                    i.add_date, 
                    i.paid_date, 
                    c.name, 
                    c.description 
            FROM invoices AS i
                INNER JOIN companies AS c ON (i.comp_code = c.code)  
            WHERE id = $1`,
            [id]
        );
        const data = result.rows[0];
        const invoice = {
            id: data.id,
            company: {
                code: data.comp_code,
                name: data.name,
                description: data.description,
            },
            amt: data.amt,
            paid: data.paid,
            add_date: data.add_date,
            paid_date: data.paid_date,
        };

        return res.json({ "invoice": invoice });
    } catch (e) {
        return next(e);
    };
})
// POST routes
router.post('/', async (req, res, next) => {
    try {
        const { comp_code, amt } = req.body;
        const result = await db.query(
            `INSERT INTO invoices (comp_code,amt) 
            VALUES ($1,$2) 
            RETURNING id,comp_code,amt,paid,add_date,paid_date`,
            [comp_code, amt]
        );
        return res.status(201).json({ "invoice": result.rows[0] });
    } catch (e) {
        return next(e);
    }
});

// PUT routes
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const check = await db.query(
            `SELECT * FROM invoices WHERE id=$1`,
            [id]
        );
        if (check.rows.length === 0) throw new ExpressError(`Invoice not in DB: ${id}`, 404);
        const { amt, paid } = req.body;
        let paidDate = null;
        const currResult = await db.query(
            `SELECT paid
            FROM invoices
            WHERE id=$1`,
            [id]
        );
        const currPaidDate = currResult.rows[0].paid_date;
        if (!currPaidDate && paid) {
            paidDate = new Date();
        } else if (!paid) {
            paidDate = null;
        } else {
            paidDate = currPaidDate;
        };
        const result = await db.query(
            `UPDATE invoices
            SET amt=$1,paid=$2,paid_date=$3
            WHERE id=$4
            RETURNING id,comp_code,amt,paid,add_date,paid_date`,
            [amt, paid, paidDate, id]
        );
        return res.json({ "invoice": result.rows[0] })
    } catch (e) {
        return next(e);
    };
});

// DELETE routes
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const check = await db.query(
            `SELECT * FROM invoices WHERE id=$1`,
            [id]
        );
        if (check.rows.length === 0) throw new ExpressError(`Invoice not in DB: ${id}`, 404);
        const results = await db.query(
            `DELETE FROM invoices WHERE id=$1`,
            [id]
        );
        return res.json({ message: `${check.rows[0].id} has been deleted!` })
    } catch (e) {
        return next(e)
    }
})

module.exports = router;