const Roll = require('@dsabot/Roll');

describe('Beware of a misunderstanding! A sequence of dice rolls', () => {
  const expected = [1,2,3,4,5,6];
  it('matches even with an unexpected number 7', () => {
    expect(Roll(1,6)).not.toEqual(
      expect.arrayContaining(expected),
    );
  });
});