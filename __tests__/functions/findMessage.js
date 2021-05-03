require('module-alias/register');
const { findMessage } = require('@dsabot/findMessage');

it('should capitalize the first letter.', () => {
    expect(findMessage('ERROR')).toBe('Irgendwas ist schief gelaufen. 🤔');
});
