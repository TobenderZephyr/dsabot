const {
  roll
} = require('../../functions/Roll');

describe('rolling dice', () => {
  const expected = [1, 2, 3, 4, 5, 6];
  it('contain only numbers from 1 to 6', () => {
    expect(roll(100, 6).dice).toEqual(
      expect.arrayContaining(expected),
    );
  });
});

//todo: return sum