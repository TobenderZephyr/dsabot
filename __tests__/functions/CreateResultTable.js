require('module-alias/register');

const { CreateResultTable, f } = require('@dsabot/CreateResultTable');

it('turn any number into a string', () => {
    expect(f(2)).toBe('+2');
    expect(f(0)).toBe('0');
    expect(f(-1)).toBe('-1');
});
