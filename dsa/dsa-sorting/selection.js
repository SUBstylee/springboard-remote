// /* works but too many unnecessary swaps */
// function selectionSort(arr) {
//     if (arr.length <= 1) arr;
//     for (let i = 0; i < arr.length - 1; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[i] > arr[j]) {
//                 let check = arr[i];
//                 arr[i] = arr[j];
//                 arr[j] = check;
//             };
//         };
//     };
//     return arr;
// }

/* works but still some unnecessary swaps */
// function selectionSort(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         var lowest = i;
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[j] < arr[lowest]) {
//                 lowest = j;
//             };
//         }
//         let swap = arr[i];
//         arr[i] = arr[lowest];
//         arr[lowest] = swap;
//     };
//     return arr;
// };

/* works, no unnecessary swaps */

// function selectionSort(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         var lowest = i;
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[j] < arr[lowest]) {
//                 lowest = j;
//             };
//         }
//         if (i !== lowest) {
//             let swap = arr[i];
//             arr[i] = arr[lowest];
//             arr[lowest] = swap;
//         };
//     };
//     return arr;
// };

/* same as above but es2015 syntax */

// function selectionSort(arr) {
//     const swap = (arr, idx1, idx2) => ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);
//     for (let i = 0; i < arr.length; i++) {
//         var lowest = i;
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[j] < arr[lowest]) {
//                 lowest = j;
//             };
//         }
//         if (i !== lowest) swap(arr, i, lowest);
//     };
//     return arr;
// };



module.exports = selectionSort;