require('module-alias/register');
require('babel-plugin-rewire');

const command = require('@dsabot/getChant');

describe('getChant integration test', () => {
    it('should not find an entry for a chant', () => {
        const getChant = command.__get__('getChant');
        expect(getChant({ Character: { name: '' }, chant_name: 'test' })).toBeNull();
    });
});
