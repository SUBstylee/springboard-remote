const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('HOMEPAGE');
});

app.get('/dogs', (req, res) => {
    console.log('you asked for /dogs!');
    console.log(req);
    res.send('<h1>I am dog woof woof!</h1>')
});

app.get('/dogs', (req, res) => {
    res.send('meowmeowmeow')
});

app.get('/chickens', (req, res) => {
    res.send('bock! bock! bock! (get request)');
});

app.post('/chickens', function createChicken(req, res) {
    res.send('YOU CREATED A NEW CHICKEN (not really)');
});

const greetings = {
    en: 'hello',
    fr: 'bonjour',
    ic: 'hallo',
    jp: 'konnichiwa'
};

app.get('/greet/:language', (req, res) => {
    const lang = req.params.language;
    const greeting = greetings[lang];
    if (!greeting) return res.send('INVALID LANGUAGE');
    return res.send(greeting.toUpperCase());
});

app.get('/search', (req, res) => {
    const { term = 'stuff', sort = 'top' } = req.query;
    return res.send(`search page! term is: ${term}, sort is: ${sort}.`);
});

app.get('/show-me-headers', (req, res) => {
    return res.send(req.headers);
})

app.get('/show-language', (req, res) => {
    const lang = req.headers['accept-language'];
    return res.send(`Your language preference is: ${lang}.`);
})

app.post('/register', (req, res) => {
    return res.send(`Welcome, ${req.body.username}.`);
})

// 
app.listen(3000, () => {
    console.log('App on port 3000');
});