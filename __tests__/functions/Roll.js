const { roll } = require('@dsabot/Roll');

describe('rolling dice', () => {
    const expected = [1, 2, 3, 4, 5, 6];
    test.each(expected)('contains only numbers from 1 to 6', value => {
        expect(roll(200, 6).dice).toContain(value);
    });
});

describe('rolling dice', () => {
    const expected = [1, 2, 3, 4, 5, 6];
    test.each(expected)('contains only numbers from 1 to 6', value => {
        expect(roll(200, 6, 'test').dice).toContain(value);
    });
});
