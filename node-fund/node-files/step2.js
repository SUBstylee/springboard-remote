const fs = require('fs');
const { exit, argv } = require('process');
// const process = require('process'); decided to just try requiring what I am immediately using from process on this one
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log('ERROR: ', err);
            exit(1);
        };
        console.log(data);
        exit(0);
    });
};

async function webCat(path) {
    try {
        const res = await axios.get(path);
        console.log(res.data);
        exit(0);
    }
    catch (err) {
        console.log('ERROR: ', err);
        exit(1);
    };
};

if (argv[2].slice(0, 4) === 'http') {
    webCat(argv[2]);
} else {
    cat(argv[2]);
};


