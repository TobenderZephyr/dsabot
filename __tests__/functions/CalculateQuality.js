require('module-alias/register');
const { CalculateQuality } = require('@dsabot/CalculateQuality');

const TestValues = [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 2],
    [5, 2],
    [6, 2],
    [7, 3],
    [8, 3],
    [9, 3],
    [10, 4],
    [11, 4],
    [12, 4],
    [13, 5],
    [14, 5],
    [15, 5],
    [16, 6],
    [17, 6],
    [18, 6],
    [19, 6],
    [20, 6],
];

test.each(TestValues)('Retrieving Quality for %s', (input, output) => {
    expect(CalculateQuality(input)).toBe(output);
});

it('should return 1 without input', () => {
    expect(CalculateQuality()).toBe(1);
});
