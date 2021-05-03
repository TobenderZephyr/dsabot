require('module-alias/register');
const { isString } = require('@dsabot/isString');

it('should return true statements', () => {
    expect(isString({})).toBeFalsy();
    expect(isString()).toBeFalsy();
    expect(isString('')).toBeTruthy();
    expect(isString([])).toBeFalsy();
    expect(isString({ key: 'value' })).toBeFalsy();
    expect(isString([null])).toBeFalsy();
    expect(isString([''])).toBeFalsy();
});
