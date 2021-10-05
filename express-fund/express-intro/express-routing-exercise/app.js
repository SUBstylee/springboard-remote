const express = require('express');
const ExpressError = require('./expressError');
const { queryToArr, strToArr, findMean, findMedian, findMode } = require('./helpers');
const app = express();

const numError = new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
// ********* routes

// mean - average of numbers passed in
app.get('/mean', (req, res, next) => {
    try {
        if (!req.query.nums) throw numError;
        let numsStr = queryToArr(req.query.nums);
        let nums = strToArr(numsStr);
        if (nums instanceof Error) throw new ExpressError(nums.message);
        let result = {
            operation: 'mean',
            result: findMean(nums)
        };
        return res.send(result);
    } catch (e) {
        return next(e);
    };
});

// median - midpoint of numbers passed in
app.get('/median', (req, res, next) => {
    try {
        if (!req.query.nums) throw numError;
        let numsStr = queryToArr(req.query.nums);
        let nums = strToArr(numsStr);
        if (nums instanceof Error) throw new ExpressError(nums.message);
        let result = {
            operation: 'median',
            result: findMedian(nums)
        };
        return res.send(result);
    } catch (e) {
        return next(e);
    };
});

// mode - most frequent of numbers passed in
app.get('/mode', (req, res, next) => {
    try {
        if (!req.query.nums) throw numError;
        let numsStr = queryToArr(req.query.nums);
        let nums = strToArr(numsStr);
        if (nums instanceof Error) throw new ExpressError(nums.message);
        let result = {
            operation: 'mode',
            result: findMode(nums)
        };
        return res.send(result);
    } catch (e) {
        return next(e);
    };
});

// all - mean, median, and mode
app.get('/all', (req, res, next) => {
    try {
        if (!req.query.nums) throw numError;
        let numsStr = queryToArr(req.query.nums);
        let nums = strToArr(numsStr);
        if (nums instanceof Error) throw new ExpressError(nums.message);
        let result = {
            operation: 'all',
            mean: findMean(nums),
            median: findMedian(nums),
            mode: findMode(nums)
        };
        return res.send(result);
    } catch (e) {
        return next(e);
    };
});

// ********* error handlers

// 404 - page not found
app.use((req, res, next) => {
    const err = new ExpressError('Not Found', 404);
    next(err);
});

// general
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err,
        message: err.message
    });
});

// ********* listening

app.listen(3000, () => {
    console.log('App starting on port 3000');
});
