const fs = require('fs');
const { exit, argv } = require('process');
// const process = require('process'); decided to just try requiring what I am immediately using from process on this one
const axios = require('axios');

function cat(path, writeTo) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            handleError(err);
        } else {
            writeCat(data, writeTo);
        };
    });
};

async function webCat(path, writeTo) {
    try {
        const res = await axios.get(path);
        writeCat(res.data, writeTo);
    }
    catch (err) {
        handleError(err);
    };
};

function writeCat(data, writeTo) {
    if (writeTo !== undefined) {
        fs.writeFile(writeTo, data, 'utf8', (err) => {
            if (err) {
                handleError(err);
            };
            console.log(`Data written into ${writeTo}`);
            exit(0);
        });
    } else {
        console.log(text);
    };
};

function handleError(err) {
    console.log('ERROR: ', err);
    exit(1);
}

if ((argv[2] === '--out') && (argv[4].slice(0, 4) === 'http')) {
    webCat(argv[4], argv[3]);
} else if (argv[2] === '--out') {
    cat(argv[4], argv[3]);
} else if (argv[2].slice(0, 4) === 'http') {
    webCat(argv[2], undefined);
} else {
    cat(argv[2], undefined);
};