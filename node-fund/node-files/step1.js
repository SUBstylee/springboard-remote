const fs = require('fs');
const { exit } = require('process');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log('ERROR: ', err);
            process.exit(1);
        }
        console.log(data);
        process.exit(0);
    })
}

cat(process.argv[2]);