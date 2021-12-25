function findRotatedIndex(arr, val) {
    let pivot;
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);

    if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;

    while (leftIdx <= rightIdx && !pivot) {
        if (arr[midIdx] > arr[midIdx + 1]) pivot = midIdx + 1;
        else if (arr[leftIdx] <= arr[midIdx]) {
            leftIdx = midIdx + 1
        } else {
            rightIdx = midIdx - 1;
        };
    };

    if (leftIdx > rightIdx || !pivot) return -1;

    if (pivot > 0 && val >= arr[0] && val <= arr[pivot - 1]) {
        leftIdx = 0;
        rightIdx = pivot - 1;
    } else {
        leftIdx = pivot;
        rightIdx = arr.length - 1;
    };
    midIdx = Math.floor((leftIdx + rightIdx) / 2);

    while (leftIdx <= rightIdx) {
        if (arr[midIdx] === val) return midIdx;
        else if (val < arr[midIdx]) {
            rightIdx = midIdx - 1
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        } else {
            leftIdx = midIdx + 1
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        };
    };
    return -1;
}

module.exports = findRotatedIndex