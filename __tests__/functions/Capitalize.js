require('module-alias/register');
const { Capitalize } = require('@dsabot/Capitalize');

it('should capitalize the first letter.', () => {
    expect(Capitalize('mother')).toBe('Mother');
});

it('should capitalize without any word given', () => {
    expect(Capitalize()).toBe('None');
});
