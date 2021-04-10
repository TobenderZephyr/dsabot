const CountOccurrences = require('@dsabot/CountOccurences');
test('Counting Occurences', () => {
    expect(CountOccurrences([1, 2, 3, 4, 1],1)).toBe(2);
  });