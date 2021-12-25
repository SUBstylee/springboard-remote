const binarySearch = require("./dnc")

describe("#binarySearch", function () {
    it("returns the index of the searched value.  returns -1 if not found.  uses divide and conquer reducing O time complexity to log n", function () {
        const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        expect(binarySearch(numArr, 22)).toBe(-1);
        expect(binarySearch(numArr, 4)).toBe(3);
        expect(binarySearch(numArr, 14)).toBe(13);
        expect(binarySearch(numArr, 15)).toBe(14);
        expect(binarySearch(numArr, 1)).toBe(0);
        expect(binarySearch(numArr, 8)).toBe(7);
    });
});