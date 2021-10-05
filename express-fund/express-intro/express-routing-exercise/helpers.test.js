const { queryToArr, strToArr, findMean, findMedian, freqCounter, findMode } = require('./helpers');

describe('test helper functions', () => {

    test('queryToArr -- takes comma seperated values and returns an array of strings', () => {
        expect(queryToArr('1,2,3')).toEqual(['1', '2', '3']);
        expect(queryToArr('1,bubble,3')).toEqual(['1', 'bubble', '3']);
    })

    test('checkArr -- takes an array of strings or string and converts it to an array of numbers', () => {
        expect(strToArr('1234')).toEqual([1, 2, 3, 4]);
        expect(strToArr(['1', '2', '3', '4'])).toEqual([1, 2, 3, 4]);
        expect(() => (strToArr('12HI4')).toThrow());
        expect(() => (strToArr('1', '2', 'HI', '4')).toThrow());
    });

    test('findMean -- takes an array of numbers and finds the average or mean', () => {
        expect(findMean([1, 2, 3])).toEqual(2);
        expect(findMean([])).toEqual(0);
    });

    test('findMedian -- takes an array of numbers, sorts, then finds the middle or median', () => {
        expect(findMedian([6, 9, 5])).toEqual(6);
        expect(findMedian([6, 6, 9, 7])).toEqual(6.5);
    });

    const allSame = [1, 1, 1];
    const sameCount = [2, 1, 3];
    const threeIsMost = [3, 2, 1, 2, 1, 1, 3, 3, 3];

    test('freqCounter -- takes an array and returns an object telling number of occurences of individual numbers', () => {
        expect(freqCounter(allSame)).toEqual({ '1': 3 })
        expect(freqCounter(sameCount)).toEqual({ '2': 1, '1': 1, '3': 1 })
        expect(freqCounter(threeIsMost)).toEqual({ '3': 4, '2': 2, '1': 3 })
    });

    test('findMode -- takes an array and finds the most frequent number, or lowest val if same frequency', () => {
        expect(findMode(allSame)).toEqual('1');
        expect(findMode(sameCount)).toEqual('1');
        expect(findMode(threeIsMost)).toEqual('3');
    });
})