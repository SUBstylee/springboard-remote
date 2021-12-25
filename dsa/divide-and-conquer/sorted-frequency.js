function sortedFrequency(arr, val) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    let firstIdx;
    let lastIdx;
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);

    if ((arr[leftIdx] === val && arr[leftIdx + 1] !== val) || (arr[rightIdx] === val && arr[leftIdx - 1] !== val)) return 1;

    do {
        if (arr[0] === val) {
            firstIdx = 0;
            break;
        } else if ((midIdx === 0 || val > arr[midIdx - 1]) && arr[midIdx] === val) {
            firstIdx = midIdx;
        } else if (val > arr[midIdx]) {
            leftIdx = midIdx + 1;
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        } else {
            midIdx = midIdx - 1;
        }
        if (leftIdx > rightIdx) {
            return -1;
        }
    } while (!firstIdx);

    midIdx = Math.floor((leftIdx + rightIdx) / 2);

    do {
        if ((midIdx === arr.length - 1 || val < arr[midIdx + 1]) && arr[midIdx] === val) {
            lastIdx = midIdx;
        } else if (val < arr[midIdx]) {
            rightIdx = midIdx - 1;
            midIdx = Math.floor((leftIdx + rightIdx) / 2);
        } else {
            midIdx = midIdx + 1;
        }
        if (leftIdx > rightIdx) {
            return -1;
        }
    } while (!lastIdx);

    return lastIdx - firstIdx + 1;
};


module.exports = sortedFrequency