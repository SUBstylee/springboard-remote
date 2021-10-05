const express = require('express');
const ExpressError = require('./expressError');
const app = express();

// app.use(express.json());

// app.use((req, res, next) => {
//     console.log('THE SERVER GOT A REQUEST');
//     next();
// });
// app.use((req, res, next) => {
//     console.log('Hello, just saying hi.');
//     next();
// });

function attemptToSaveToDB() {
    throw 'CONNECTION ERROR!';
};

const USERS = [
    { username: "StacysMom", city: "Reno" },
    { username: "Rosalia", city: "R" },
];

app.get('/users/:username', (req, res, next) => {
    try {
        const user = USERS.find(u => u.username === req.params.username);
        if (!user) throw new ExpressError('invalid username', 404);
        return res.send({ user });
    } catch (e) {
        next(e);
    }
})

app.get('/secret', (req, res, next) => {
    debugger;
    try {
        if (req.query.password != 'popcorn') {
            throw new ExpressError('invalid password', 403);
        }
        return res.send('CONGRATS YOU KNOW THE PASSWORD');
    } catch (e) {
        next(e);
    }
});

app.get('/savetodb', (req, res, next) => {
    try {
        attemptToSaveToDB();
        return res.send('SAVED TO DB!');
    } catch (e) {
        return next(new ExpressError('Database Error'))
    }
});

//404 error handler -- this does not work at all
app.use((req, res, next) => {
    const err = new ExpressError('page not found', 404);
    next(err);
})

// app.use((err, req, res, next) => {
//     // console.log(err.msg)
//     res.status(err.status).send(err.msg);
// })
app.use((err, req, res, next) => {
    //the default status is 500 Internal Server Error
    let status = err.status || 500;
    let msg = err.msg;
    //set the status and alert the user
    return res.status(status).json({ err: { msg, status } });
});

app.listen(3000, () => {
    console.log('App on port 3000.')
});