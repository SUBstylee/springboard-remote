function choice(items) {
    //randomly chooses then returns one of the items from the array passed into it
    const idx = Math.floor(Math.random() * items.length);
    return items[idx];
};

function remove(items, item) {
    //removes an 'item' from the 'items' in the array. - Using filter, creates and returns a new array without 'item' in it.
    let remainingFruit = [];
    items.filter(i => {
        if (i !== item) {
            remainingFruit.push(i);
        };
    });
    return remainingFruit;
};

export { choice, remove };