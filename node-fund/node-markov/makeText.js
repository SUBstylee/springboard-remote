/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');
const striptags = require('striptags');

// use the Markov Machine with text (can use string from command line to call directly)
function markovString(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
    process.exit(0)
};

// use the Markov Machine with text file
function markovFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1)
        }
        markovString(data);
    });
};

// user the markov Machine with url
async function markovUrl(url) {
    try {
        res = await axios.get(url);
    } catch (err) {
        console.error(`Error communicating with ${url}: ${err}`);
        process.exit(1)
    }
    markovString(striptags(res.data));
}

// get info from cli
let [method, path] = process.argv.slice(2);
if (method === 'string') {
    markovString(path);
} else if (method === 'file') {
    markovFile(path);
} else if (method === 'url') {
    markovUrl(path);
} else {
    console.error(`Unknown method: ${method}`);
    console.log('Valid methods are: string, file, or url');
}
