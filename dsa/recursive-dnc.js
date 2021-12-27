function binarySearch(arr, val, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === val) return mid;
    if (arr[left] === val) return left;
    if (arr[right] === val) return right;

    if (arr[mid] > val) {
        binarySearch(arr, val, left, right = mid--);
    } else {
        binarySearch(arr, val, left = mid++, right);
    }
}

binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3);