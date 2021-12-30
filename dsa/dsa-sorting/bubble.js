// function bubbleSort(arr) {
//     let count = 0;
//     if (arr.length <= 1) arr;
//     for (let i = 0; i < arr.length; i++) {
//         count++
//         for (let j = 0; j < arr.length - i; j++) {
//             count++
//             if (arr[j] > arr[j + 1]) {
//                 let temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;
//             };
//         };
//     };
//     console.log(count);
//     return arr;
// };
// function bubbleSort(arr) {
//     let count = 0;
//     if (arr.length <= 1) arr;
//     for (let i = 0; i < arr.length - 1; i++) {
//         count++
//         for (let j = 0; j < arr.length - i; j++) {
//             count++
//             if (arr[j] > arr[j + 1]) {
//                 let temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;
//             };
//         };
//     };
//     console.log(count);
//     return arr;
// };
// function bubbleSort(arr) {
//     let count = 0;
//     let swapped = true;
//     if (arr.length <= 1) arr;
//     for (let i = 0; i < arr.length - 1; i++) {
//         count++
//         swapped = false;
//         for (let j = 0; j < arr.length - i; j++) {
//             count++
//             if (arr[j] > arr[j + 1]) {
//                 let temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;
//                 swapped = true;
//             };
//         };
//         if (!swapped) break;
//     };
//     console.log(count);
//     return arr;
// };
function bubbleSort(arr) {
    let swapped = true;
    if (arr.length <= 1) arr;
    while (swapped) {
        swapped = false;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i; j++) {
                let check = arr[j];
                if (arr[j] > arr[j + 1]) {
                    arr[j] = arr[j + 1];
                    arr[j + 1] = check;
                    swapped = true;
                }
            }
        }
    };
    return arr;
};
module.exports = bubbleSort;