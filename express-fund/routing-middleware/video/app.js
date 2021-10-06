const express = require('express');
const ExpressError = require('./expressError');
const middleware = require('./middleware');
const morgan = require('morgan');

const userRoutes = require('./userRoutes');

const app = express();

app.use(express.json());
app.use(middleware.logger);
app.use(morgan('dev'));


app.use('/users', userRoutes);
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.get('/secret', middleware.checkForPassword, (req, res, next) => {
    return res.send('You got the password correct!');
});

app.get('/private', middleware.checkForPassword, (req, res, next) => {
    return res.send('You got the password for private page!');
});

// 404 handler
app.use((req, res, next) => {
    return next(new ExpressError('Not Found', 404));
});

// generic error handler
app.use((err, req, res, next) => {
    // default status is 500 internal server error
    const status = err.status || 500;
    // set status and alert user
    return res.status(status).json({
        error: {
            message: err.msg,
            status: status
        }
    });
});

module.exports = app;