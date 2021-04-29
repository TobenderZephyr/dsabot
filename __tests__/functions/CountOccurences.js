const { CountOccurences } = require('../../functions/CountOccurences');
test('Counting Occurences', () => {
    expect(CountOccurences([1, 2, 3, 4, 1], 1)).toBe(2);
});
