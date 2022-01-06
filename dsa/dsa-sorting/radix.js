function radixSort(arr) {
    const numLoops = mostDigits(arr);
    for (let k = 0; k < numLoops; k++) {
        let buckets = Array.from({ length: 10 }, () => []);
        for (let i = 0; i < arr.length; i++) {
            buckets[getDigit(arr[i], k)].push(arr[i]);
        };
        arr = [].concat(...buckets);
    };
    return arr;

}

//helper functions
function getDigit(num, i) {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
};

function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
    //alternatively
    // return num.toString().length;
};

function mostDigits(arr) {
    let most = 0;
    for (let i = 0; i < arr.length; i++) {
        most = Math.max(most, digitCount(arr[i]));
    };
    return most;
};

module.exports = { radixSort, getDigit, digitCount, mostDigits };