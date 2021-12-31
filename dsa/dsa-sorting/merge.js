/* works */
// function merge(arr1, arr2) {
//     let p1 = 0;
//     let p2 = 0;
//     let newArr = [];
//     while (p1 < arr1.length && p2 < arr2.length) {
//         if (arr1[p1] < arr2[p2]) {
//             newArr.push(arr1[p1]);
//             p1++;
//         } else {
//             newArr.push(arr2[p2]);
//             p2++;
//         };
//     };
//     if (p1 < arr1.length) {
//         for (let i = p1; i < arr1.length; i++) {
//             newArr.push(arr1[i]);
//         };
//     };
//     if (p2 < arr2.length) {
//         for (let i = p2; i < arr2.length; i++) {
//             newArr.push(arr2[i]);
//         }
//     };
//     return newArr;
// };
/* same as above, but while instead of for nested in if */
function merge(arr1, arr2) {
    let p1 = 0;
    let p2 = 0;
    let newArr = [];
    while (p1 < arr1.length && p2 < arr2.length) {
        if (arr1[p1] < arr2[p2]) {
            newArr.push(arr1[p1]);
            p1++;
        } else {
            newArr.push(arr2[p2]);
            p2++;
        };
    };
    while (p1 < arr1.length) {
        newArr.push(arr1[p1]);
        p1++;
    };
    while (p2 < arr2.length) {
        newArr.push(arr2[p2]);
        p2++;
    };
    return newArr;
};

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
};

module.exports = { merge, mergeSort };
