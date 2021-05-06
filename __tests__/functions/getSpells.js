require('module-alias/register');
require('babel-plugin-rewire');

const command = require('@dsabot/getSpell');

describe('getSpell integration test', () => {
    it('should not find an entry for a spell', () => {
        const getSpell = command.__get__('getSpell');
        expect(getSpell({ Character: { name: '' }, spell_name: 'test' })).toBeNull();
    });

    it('should return null if char has no spells.', () => {
        const Character = {
            attributes: [
                { id: 'mut', level: 10 },
                { id: 'klugheit', level: 11 },
                { id: 'charisma', level: 12 },
            ],
        };
        command.__set__('Spells', [
            { id: 'test', name: 'Test', attributes: ['MU', 'KL', 'CH'], modified_by: ['SK'] },
        ]);

        const getSpell = command.__get__('getSpell');

        expect(getSpell({ Character: Character, spell_name: 'test' })).toBeNull();
    });

    it('should return a correct spell result.', () => {
        const Character = {
            attributes: [
                { id: 'mut', level: 10 },
                { id: 'klugheit', level: 11 },
                { id: 'charisma', level: 12 },
            ],
            spells: [{ id: 'test', level: 7 }, { id: 'no-level' }],
        };
        const Spells = [
            {
                id: 'test',
                name: 'Testspell',
                attributes: ['MU', 'KL', 'CH'],
                modified_by: ['SK'],
            },
            { id: 'no-level', name: 'No Level', attributes: ['MU', 'KL', 'CH'], modified_by: [] },
        ];

        command.__set__('Spells', Spells);

        const getSpell = command.__get__('getSpell');

        expect(getSpell({ Character: Character, spell_name: 'test' })).toEqual(
            expect.objectContaining({
                Name: 'Testspell',
                Level: 7,
                Attributes: [
                    { Level: 10, Name: 'MU' },
                    { Level: 11, Name: 'KL' },
                    { Level: 12, Name: 'CH' },
                ],
                ModifiedBy: ['SK'],
            })
        );

        expect(getSpell({ Character: Character, spell_name: 'Testspell' })).toEqual(
            expect.objectContaining({
                Name: 'Testspell',
                Level: 7,
                Attributes: [
                    { Level: 10, Name: 'MU' },
                    { Level: 11, Name: 'KL' },
                    { Level: 12, Name: 'CH' },
                ],
                ModifiedBy: ['SK'],
            })
        );

        expect(getSpell({ Character: Character, spell_name: 'no-level' })).toEqual(
            expect.objectContaining({
                Name: 'No Level',
                Level: 0,
                Attributes: [
                    { Level: 10, Name: 'MU' },
                    { Level: 11, Name: 'KL' },
                    { Level: 12, Name: 'CH' },
                ],
                ModifiedBy: [],
            })
        );
    });

    it('should not find the spell.', () => {
        const Character = {
            attributes: [
                { id: 'mut', level: 10 },
                { id: 'klugheit', level: 11 },
                { id: 'charisma', level: 12 },
            ],
            spells: [{ id: 'test', level: 7 }],
        };
        const Spells = [{ id: 'test', name: 'Testspell', attributes: ['MU', 'KL', 'CH'] }];

        command.__set__('Spells', Spells);

        const getSpell = command.__get__('getSpell');

        expect(getSpell({ Character: Character, spell_name: 'well-hidden' })).toBeNull();
    });
});
