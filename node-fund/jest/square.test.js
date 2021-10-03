const { square, cube } = require('./square');

describe('square function', function () {
    test('square should square positive numbers', function () {
        const res = square(3);
        expect(res).toEqual(9);
    });

    test('square should square negative numbers', function () {
        const res = square(-9);
        expect(res).toEqual(81);
    })
});

describe('cube function', function () {
    test('cube should cube positive numbers', function () {
        const res = cube(3);
        expect(res).toEqual(27);
        const res2 = cube(2);
        expect(res2).toEqual(8);
    });

    test('cube should cube negative numbers', function () {
        const res = cube(-9);
        expect(res).toEqual(-729);
        const res2 = cube(-20);
        expect(res2).toEqual(-8000);
        const res3 = cube(-1);
        expect(res3).toEqual(-1);
    });
});
