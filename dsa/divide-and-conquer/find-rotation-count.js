function findRotationCount(arr) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);

    while (leftIdx <= rightIdx) {
        if (midIdx < rightIdx && arr[midIdx + 1] < arr[midIdx]) {
            return midIdx + 1;
        } else if (midIdx > leftIdx && arr[midIdx] < arr[midIdx - 1]) {
            return midIdx;
        } else if (arr[rightIdx] > arr[midIdx]) {
            rightIdx = midIdx - 1;
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        } else {
            leftIdx = midIdx + 1;
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        }
    };
    return 0;

}

module.exports = findRotationCount