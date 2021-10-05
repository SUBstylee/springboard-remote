// splits query into a string of arrays (used with every route)
function queryToArr(query) {
    return query.split(',');
}

// checks if it is a str of numbers, and then returns it as an array (used with every route).
function strToArr(str) {
    let numArr = [];
    for (let i = 0; i < str.length; i++) {
        let num = Number(str[i]);
        if (Number.isNaN(num)) {
            return new Error(`The value '${str[i]}' at index '${i}' is not a valid number!`);
        };
        numArr.push(num);
    };
    return numArr;
}

function findMean(nums) {
    if (nums.length === 0) return 0;
    return nums.reduce((acc, n) => { return acc + n }) / nums.length;
}

function findMedian(nums) {
    nums.sort((a, b) => a - b);
    const midNum = Math.floor(nums.length / 2);
    let median;
    if (nums.length % 2 === 0) median = (nums[midNum] + nums[midNum - 1]) / 2;
    else median = nums[midNum];
    return median;
}

// creates object needed to find mode
function freqCounter(arr) {
    return arr.reduce((acc, n) => {
        acc[n] = (acc[n] || 0) + 1;// if number key is found, adds one to val, if not, adds key then sets val to 1
        return acc;
    }, {});
}

function findMode(nums) {
    const freqObj = freqCounter(nums);// moved to own function so that each function does one thing
    let count = 0;
    let mostFreq;
    for (let key in freqObj) {
        if (freqObj[key] > count) {
            mostFreq = key;
            count = freqObj[key];
        }
    }
    return mostFreq;
}


module.exports = {
    queryToArr,
    strToArr,
    findMean,
    findMedian,
    freqCounter,
    findMode
};