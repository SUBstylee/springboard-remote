function addToArrImpure(arr, val) {
    arr.push(val);
    return arr;
};

function addToArrPure(arr, val) {
    return [...arr, val];
};

function addToObjImpure(obj, key, val) {
    obj[key] = val;
    return obj;
};

function addToArrPure(obj, key, val) {
    return { ...obj, [key]: val }
}

function doubleImpure(nums) {
    nums.forEach((i) => nums[i] *= 2);
    return nums;
};

function doublePure(nums) {
    return nums.map((i) => i *= 2);
};