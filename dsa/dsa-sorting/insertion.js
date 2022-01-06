// function insertionSort(arr) {
//     for (let i = 1; i < arr.length; i++) {
//         let curVal = arr[i];
//         for (var j = i - 1; j >= 0 && arr[j] > curVal; j--) {//need j to be var for hoisting
//             arr[j + 1] = arr[j];
//         };
//         arr[j + 1] = curVal;//hoisted here
//     };
//     return arr;
// };

// function insertionSort(arr) {
//     for (let i = 1; i < arr.length; i++) {
//         let curVal = arr[i];
//         let j = i - 1; //need j to be declared here or will be outside of scope for call after looping
//         for (; j >= 0 && arr[j] > curVal; j--) {
//             arr[j + 1] = arr[j];
//         };
//         arr[j + 1] = curVal;
//     };
//     return arr;
// };

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let curVal = arr[i];
        for (let j = i - 1; j >= 0 && arr[j] > curVal; j--) {
            [arr[j], arr[j + 1]] = [curVal, arr[j]];
        };
    };
    return arr;
};


module.exports = insertionSort;