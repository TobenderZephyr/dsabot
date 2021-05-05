require('module-alias/register');
require('babel-plugin-rewire');

const command = require('@dsabot/getChant');
const getChant = command.__get__('getChant');
//const { getChant } = require('@dsabot/getChant');

describe('getChant integration test', () => {
    const expected = {
        Name: 'Test',
        Level: 14,
        Attributes: [
            { id: 'MU', Level: 10 },
            { id: 'CH', Level: 8 },
            { id: 'KL', level: 9 },
        ],
    };

    it('should not find an entry for a chant', () => {
        const getChant = command.__get__('getChant');
        expect(getChant({ Character: { name: '' }, chant_name: 'test' })).toBeNull();
    });

    it('should find a chant.', () => {
        command.__Rewire__('getChant', {
            Chants: {
                find: () => [
                    {
                        id: 'test',
                        Name: 'Test',
                        Attributes: ['MU', 'CH', 'KL'],
                    },
                ],
            },
        });
        const Character = {
            attributes: [
                { id: 'mut', level: 10 },
                { id: 'charisma', level: 8 },
                { id: 'klugheit', level: 9 },
            ],
        };
        const chant_name = 'test';
        expect(getChant({ Character, chant_name })).toBeNull();
    });
});
