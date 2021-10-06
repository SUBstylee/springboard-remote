// const items = require('./fakeDB');
// changed this so that it will read and write persistently to a JSON file
const fs = require('fs');
let rawdata = fs.readFileSync('fakeDB.json');
let items = JSON.parse(rawdata);

// write items to fakeDB.json
function updateFakeDB() {
    const itemsStr = JSON.stringify(items, null, 2);
    fs.writeFile('fakeDB.json', itemsStr, (error) => {
        if (error) throw error;
    });
};

// create a class for handling items in fakeDB.js
class Item {
    // GET item(s) from items array in fakeDB.js
    static getAll() {
        return items;
    }
    static getItem(name) {
        const findItem = items.find(el => el.name === name);
        if (findItem === undefined) throw { message: 'Item not found!', status: 404 };
        return findItem;
    }
    // POST new items to items array in fakeDB.js
    constructor(name, price) {
        if (name === undefined || price === undefined) throw { message: 'You must include a name and price!', status: 400 };
        if (!+price) throw { message: 'Price must be number!', status: 400 };
        this.name = name;
        this.price = price;
        items.push(this);
        updateFakeDB();
    }
    // PATCH item from items array in fakeDB.js
    static patchItem(name, data) {
        const findItem = items.find(el => el.name === name);
        if (findItem === undefined) throw { message: 'Item not found!', status: 404 };
        if (data.name === undefined && data.price === undefined) throw { message: 'You must include a name or price!', status: 400 };
        if (data.price) {
            if (!+data.price) throw { message: 'Price must be number!', status: 400 };
            findItem.price = +data.price;
        }
        if (data.name) findItem.name = data.name;
        updateFakeDB();
        return findItem;
    }
    // DELETE item from items array in fakeDB.js
    static deleteItem(name) {
        // use index here to remove whole object
        const itemIndex = items.findIndex(el => el.name === name);
        if (itemIndex === -1) throw { message: 'Item not found!', status: 404 };
        items.splice(itemIndex, 1);
        updateFakeDB();
    }
};
module.exports = Item;