require('module-alias/register');
require('babel-plugin-rewire');

const Spells = require('@Commands/Spells');
const createSpellList = Spells.__get__('createSpellList');
const TestValue = {
    Name: 'Test',
    Level: 10,
    Attributes: [
        { Name: 'Klugheit', Level: 10 },
        { Name: 'Charisma', Level: 11 },
        { Name: 'Mut', Level: 12 },
    ],
};

describe('createSpellList', () => {
    it('should return an array with expected object(s)', () => {
        const Test = { spells: [{ id: 'test', level: 10 }] };
        const expected = {
            Name: 'Test',
            Level: 10,
            Attributes: [
                { Name: 'Klugheit', Level: 10 },
                { Name: 'Charisma', Level: 11 },
                { Name: 'Mut', Level: 12 },
            ],
        };
        Spells.__Rewire__('getSpell', () => expected);

        expect(createSpellList(Test)).toEqual(expect.arrayContaining([expected]));
        Spells.__ResetDependency__('getSpell');
    });
    it('should abort if character has no chants', () => {
        expect(createSpellList({ attributes: [] })).toBeNull();
        expect(createSpellList()).toBeNull();
        expect(createSpellList({})).toBeNull();
    });
});

describe('ReplySpell', () => {
    const ReplySpell = Spells.__get__('ReplySpell');
    it('should return null if no param given.', () => {
        expect(ReplySpell()).toBeNull();
    });

    it('should return a string', () => {
        // toBeInstanceOf(String) is not working :(
        expect(
            ReplySpell({
                Name: 'Test',
                Level: 9,
                Attributes: [
                    { Name: 'Klugheit', Level: 10 },
                    { Name: 'Charisma', Level: 11 },
                    { Name: 'Mut', Level: 12 },
                ],
            })
        ).toMatch(/.*Test.*(9)?.*/);
    });

    Spells.__ResetDependency__('ReplySpell');
});

describe('ReplySpellList', () => {
    const ReplySpellList = Spells.__get__('ReplySpellList');
    it('should return null if params are empty', () => {
        expect(ReplySpellList('')).toBe('Du kennst keine Zaubersprüche.');
        expect(ReplySpellList([])).toBe('Du kennst keine Zaubersprüche.');
        expect(ReplySpellList()).toBe('Du kennst keine Zaubersprüche.');
    });

    it('should return Name and Level', () => {
        const input = [TestValue];
        expect(ReplySpellList(input)).toMatch('Test (10)');
    });
});
