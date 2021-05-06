require('module-alias/register');
require('babel-plugin-rewire');

const command = require('@dsabot/getChant');

describe('getChant integration test', () => {
    it('should not find an entry for a chant', () => {
        const getChant = command.__get__('getChant');
        expect(getChant({ Character: { name: '' }, chant_name: 'test' })).toBeNull();
    });

    it('should return null if char has no chants.', () => {
        const Character = {
            attributes: [
                { id: 'mut', level: 10 },
                { id: 'klugheit', level: 11 },
                { id: 'charisma', level: 12 },
            ],
        };
        command.__set__('Chants', [{ id: 'test', name: 'Test', attributes: ['MU', 'KL', 'CH'] }]);

        const getChant = command.__get__('getChant');

        expect(getChant({ Character: Character, chant_name: 'test' })).toBeNull();
    });

    it('should return a correct chant result.', () => {
        const Character = {
            attributes: [
                { id: 'mut', level: 10 },
                { id: 'klugheit', level: 11 },
                { id: 'charisma', level: 12 },
            ],
            chants: [{ id: 'test', level: 7 }, { id: 'no-level' }],
        };
        const Chants = [
            {
                id: 'test',
                name: 'Testchant',
                attributes: ['MU', 'KL', 'CH'],
            },
            { id: 'no-level', name: 'No Level', attributes: ['MU', 'KL', 'CH'] },
        ];

        command.__set__('Chants', Chants);

        const getChant = command.__get__('getChant');

        expect(getChant({ Character: Character, chant_name: 'test' })).toEqual(
            expect.objectContaining({
                Name: 'Testchant',
                Level: 7,
                Attributes: [
                    { Level: 10, Name: 'MU' },
                    { Level: 11, Name: 'KL' },
                    { Level: 12, Name: 'CH' },
                ],
            })
        );

        expect(getChant({ Character: Character, chant_name: 'Testchant' })).toEqual(
            expect.objectContaining({
                Name: 'Testchant',
                Level: 7,
                Attributes: [
                    { Level: 10, Name: 'MU' },
                    { Level: 11, Name: 'KL' },
                    { Level: 12, Name: 'CH' },
                ],
            })
        );

        expect(getChant({ Character: Character, chant_name: 'no-level' })).toEqual(
            expect.objectContaining({
                Name: 'No Level',
                Level: 0,
                Attributes: [
                    { Level: 10, Name: 'MU' },
                    { Level: 11, Name: 'KL' },
                    { Level: 12, Name: 'CH' },
                ],
            })
        );
    });

    it('should not find the chant.', () => {
        const Character = {
            attributes: [
                { id: 'mut', level: 10 },
                { id: 'klugheit', level: 11 },
                { id: 'charisma', level: 12 },
            ],
            chants: [{ id: 'test', level: 7 }],
        };
        const Chants = [{ id: 'test', name: 'Testchant', attributes: ['MU', 'KL', 'CH'] }];

        command.__set__('Chants', Chants);

        const getChant = command.__get__('getChant');

        expect(getChant({ Character: Character, chant_name: 'well-hidden' })).toBeNull();
    });
});
