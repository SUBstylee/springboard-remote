function countZeroes(arr) {
    let leftIndex = 0;
    let rightIndex = arr.length - 1;
    let midIndex = Math.floor((leftIndex + rightIndex) / 2);

    if (arr[rightIndex] === 1) return 0;
    if (arr[leftIndex] === 0) return arr.length;

    while (leftIndex <= rightIndex) {
        if (arr[midIndex] === 0) {
            rightIndex = midIndex - 1;
            if (arr[rightIndex] === 1) return arr.length - rightIndex - 1;
            midIndex = Math.floor((leftIndex + rightIndex) / 2);
        } else if (arr[midIndex] === 1) {
            leftIndex = midIndex + 1;
            if (arr[leftIndex] === 0) return arr.length - leftIndex;
            midIndex = Math.floor((leftIndex + rightIndex) / 2);
        };
    };
};

module.exports = countZeroes