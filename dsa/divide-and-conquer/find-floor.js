function findFloor(arr, val) {
    leftIdx = 0;
    rightIdx = arr.length - 1;

    if (val >= arr[rightIdx]) return arr[rightIdx];

    midIdx = Math.floor((leftIdx + rightIdx) / 2);

    if (arr[midIdx] === val) return arr[midIdx];

    while (leftIdx <= rightIdx) {
        if (midIdx > 0 && arr[midIdx - 1] <= val && val < arr[midIdx]) return arr[midIdx - 1];
        if (val < arr[midIdx]) {
            rightIdx = midIdx - 1;
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        } else {
            leftIdx = midIdx + 1;
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        };
    };
    return -1;
};

module.exports = findFloor