"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {
    /** Create a job (from data), update db, return new job data.
     *
     * data should be { title, salary, equity, company_handle }
     *
     * Returns { title, salary, equity, company_handle }
     *
     * Throws BadRequestError if job at same company already in database.
     * */

    static async create({ title, salary, equity, company_handle }) {
        const duplicateCheck = await db.query(
            `SELECT id
           FROM jobs
           WHERE title=$1 AND company_handle=$2`,
            [title, company_handle]);

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate job: ${title}, at ${company_handle}`);

        const result = await db.query(
            `INSERT INTO jobs
           (title, salary, equity, company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING title, salary, equity, company_handle`,
            [
                title,
                salary,
                equity,
                company_handle,
            ],
        );
        const job = result.rows[0];

        return job;
    }

    /** Find all jobs, accepting optional filter params as a query string.
     *
     * Returns [{ handle, name, description, numEmployees, logoUrl }, ...] ordered by title
     * */

    static async findAll(filterParams = []) {
        const filter = Object.keys(filterParams).length === 0 ? '' : Job.buildWhereClause(filterParams);
        const selectClause = filter.selectStatement || '';
        const whereClause = filter.whereStatement || '1=1';
        if (selectClause != '') selectClause += ', ';
        const jobsRes = await db.query(
            `SELECT title,
                  salary,
                  equity,
                  company_handle
           FROM jobs
           WHERE ${whereClause}
           ORDER BY title`);
        return jobsRes.rows;
    }

    /** Given a job id, return data about job.
     *
     * Returns { title, salary, equity, company_handle }
     *   where jobs is [{ id, title, salary, equity, companyHandle }, ...]
     *
     * Throws NotFoundError if not found.
     **/

    static async get(id) {
        const jobRes = await db.query(
            `SELECT title,
                  salary,
                  equity,
                  company_handle
           FROM jobs
           WHERE id = $1`,
            [id]);

        const job = jobRes.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);

        return job;
    }

    /** Update job data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain all the
     * fields; this only changes provided ones.
     *
     * Data can include: {title, salary, equity}
     *
     * Returns {id, title, salary, equity, company_handle}
     *
     * Throws NotFoundError if not found.
     */

    static async update(id, data) {
        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                title: "title",
                salary: "salary",
                equity: "equity",
            });
        const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${id} 
                      RETURNING id, 
                                title, 
                                salary, 
                                equity, 
                                company_handle`;
        const result = await db.query(querySql, [...values]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job for id: ${id}`);

        return job;
    }

    /** Delete given job from database; returns undefined.
     *
     * Throws NotFoundError if job not found.
     **/

    static async remove(id) {
        const result = await db.query(
            `DELETE FROM jobs
               WHERE id = $1
               RETURNING id`, [id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError(`No job: ${id}`);
    }

    /** Takes in an object with optional query string params.
     *
     * Returns a dynamic WHERE to add to SQL query.
     **/

    static buildWhereClause(filterParams) {
        const { title = null, minSalary = null, maxSalary = null } = filterParams;
        const clauses = {
            title: `title ILIKE '%${title}%'`,
            minSalary: `salary >= ${minSalary}`,
            maxSalary: `salary <= ${maxSalary}`
        };
        const returnArray = Object.entries(filterParams)
            .filter(([key, val]) => val != null)
            .map(([key, val]) => clauses[key]);
        const selectStatement = Object.entries(filterParams)
            .filter(([key, val]) => val !== null)
            .map(([key, val]) => (['minSalary', 'maxSalary'].includes(key) ? 'salary' : key));
        return { selectStatement: selectStatement.join(' , '), whereStatement: returnArray.join(' AND ') };
    }
}

module.exports = Job;
