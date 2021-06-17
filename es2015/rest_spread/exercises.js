//	Given this function:
// function filterOutOdds() {
//     var nums = Array.prototype.slice.call(arguments);
//     return nums.filter(function (num) {
//         return num % 2 === 0
//     });
// }

//	Refactor it to use the rest operator & an arrow function:
const filterOutOdds = (...nums) => nums.filter(num => num % 2 === 0);

//	findMin
const findMin = (...nums) => Math.min(...nums);
//const findMin = (nums)=>Math.min(...nums); //this one if nums is an array already

//	mergeObjects
const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });

doubleAndReturnArgs
const doubleAndReturnArgs = (arr, ...arg) => ([...arr, ...arg.map(a => a * 2)]);

//	Slice and Dice!
/** 	remove a random element in the items array
    and return a new array without that item. */
const removeRandom = (items) => {
    const rand = Math.floor(Math.random() * items.length);
    return [...items.slice(0, rand), ...items.slice(rand + 1)];
}
/** 	Return a new array with every item in array1 and array2. */
const extend = (array1, array2) => ([...array1, ...array2]);
/** 	Return a new object with all the keys and values
    from obj and a new key/value pair */
const addKeyVal = (obj, key, val) => ({ ...obj, [key]: val });
/** 	Return a new object with a key removed. */
const removeKey = (obj, key) => {
    let newObj = { ...obj };
    delete newObj[key];
    return newObj;
}
/** 	Combine two objects and return a new object. */
const combine = (obj1, obj2) => ({ ...obj1, ...obj2 });
/** 	Return a new object with a modified key and value. */

function update(obj, key, val) {

}
const update = (obj, key, val) => ({ ...obj, [key]: val });