function curriedAdd(total) {
    if (total === undefined) return 0;
    if (typeof (total) !== 'number') return 'Numbers only!';
    return function addAnother(num) {
        if (num === undefined) return total;
        total += num;
        return addAnother;
    };
};

module.exports = { curriedAdd };
