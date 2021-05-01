require('module-alias/register');

const { CreateResultTable, f } = require('@dsabot/CreateResultTable');

it('turn any number into a string', () => {
    expect(f(2)).toBe('+2');
    expect(f(0)).toBe('0');
    expect(f(-1)).toBe('-1');
});

it('should return a string', () => {
    const obj = {
        Attributes: [8, 8, 8],
        Throws: [7, 7, 7],
        PointsUsed: [0, 0, 0],
        Bonus: 0,
    };
    expect(CreateResultTable(obj)).toEqual(expect.any(String));
});
