const express = require('express');
const itemsRoutes = require('./routes/items');
const ExpressError = require('./expressError');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/items', itemsRoutes);
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// 404
app.use((req, res, next) => {
    return next(new ExpressError("Not Found", 404));
});

// general errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({ error: err.message })
});

module.exports = app;