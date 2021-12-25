// binary search
console.log('working');

const binarySearch = (arr, val) => {
    let leftIdx = 0
    let rightIdx = arr.length - 1;
    let middleIdx = Math.floor(rightIdx / 2);
    console.log(`left index is at ${leftIdx}, right index is at ${rightIdx}, middle index is at ${arr[middleIdx]}`);
    while (leftIdx <= rightIdx) {
        if (arr[middleIdx] > val) {
            rightIdx = middleIdx - 1;
            middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        } else if (arr[middleIdx] < val) {
            leftIdx = middleIdx + 1;
            middleIdx = Math.floor((leftIdx + rightIdx) / 2);
        } else {
            console.log(middleIdx);
            return middleIdx;
        };
    };
    console.log(-1);
    return -1


};

module.exports = binarySearch;