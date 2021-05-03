require('module-alias/register');
const { isEmpty } = require('@dsabot/isEmpty');

it('should return true statements', () => {
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty()).toBeTruthy();
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty({ key: 'value' })).toBeFalsy();
    expect(isEmpty([null])).toBeFalsy();
    expect(isEmpty([''])).toBeFalsy();
});
