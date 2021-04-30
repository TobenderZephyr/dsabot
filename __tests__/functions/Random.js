require('module-alias/register');

const { Random } = require('@dsabot/Random');

it('should return with no min or max value', () => {
    expect(Random.int()).toBeUndefined();
});
it('call for use should return true', () => {
    expect(Random.use(null)).toBeTruthy();
});
it('should return between 1 and 2', () => {
    expect(Random.int(1, 2)).toBeGreaterThanOrEqual(1);
});
it('should return between 1 and 2', () => {
    expect(Random.int(1, 2)).toBeLessThanOrEqual(2);
});
it('should return exactly 1', () => {
    expect(Random.int(1, 1)).toBe(1);
});
