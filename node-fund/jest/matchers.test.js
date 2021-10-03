describe('test matchers', function () {
    test('compare toBe with toEqual', function () {
        const nums = [3, 4, 5];
        const copy = [...nums];
        const nums2 = nums;
        expect(copy).toEqual(nums);
        expect(nums2).toBe(nums);
    });
    test('checkout the toContain matcher', function () {
        const colors = ['red', 'orange'];
        expect(colors).toContain('orange');
        expect(colors).not.toContain('RED');
        expect('hello').toContain('hel');
    });
    test('checkout the numeric matchers', function () {
        expect(7).toBeGreaterThanOrEqual(2);
        expect(7).toBeGreaterThanOrEqual(7);
    });
    test('checkout the boolean matchers', function () {
        expect('hi').toBeTruthy();
        expect('').toBeFalsy();
    });
    test('checkout any matcher', function () {
        const randNum = Math.random() * 6;
        expect(randNum).toEqual(expect.any(Number));
        expect('abdjfdkj').toEqual(expect.any(String));
    });
    test('checkout not matcher', function () {
        const numLives = 9;
        expect(numLives).not.toEqual(0);
        expect(numLives).not.toEqual(expect.any(Array));
    });
});