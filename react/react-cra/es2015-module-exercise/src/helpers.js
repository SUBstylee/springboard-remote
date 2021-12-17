function choice(items) {
    const idx = Math.floor(Math.random() * items.length);
    return items[idx];
};

function remove(items, item) {
    let remainingFruit = [];
    items.filter(i => {
        if (i !== item) {
            remainingFruit.push(i);
        };
    });
    return remainingFruit;
};

export { choice, remove };