require('module-alias/register');
require('babel-plugin-rewire');

const Chants = require('@Commands/Chants');
const createChantList = Chants.__get__('createChantList');
const TestValue = {
    Name: 'Test',
    Level: 10,
    Attributes: [
        { Name: 'Klugheit', Level: 10 },
        { Name: 'Charisma', Level: 11 },
        { Name: 'Mut', Level: 12 },
    ],
};

describe('createChantList', () => {
    it('should return an array with expected object(s)', () => {
        const Test = { chants: [{ id: 'test', level: 10 }] };
        const expected = {
            Name: 'Test',
            Level: 10,
            Attributes: [
                { Name: 'Klugheit', Level: 10 },
                { Name: 'Charisma', Level: 11 },
                { Name: 'Mut', Level: 12 },
            ],
        };
        Chants.__Rewire__('getChant', () => expected);

        expect(createChantList(Test)).toEqual(expect.arrayContaining([expected]));
        Chants.__ResetDependency__('getChant');
    });
    it('should abort if character has no chants', () => {
        expect(createChantList({ attributes: [] })).toBeNull();
        expect(createChantList()).toBeNull();
        expect(createChantList({})).toBeNull();
    });
});

describe('ReplyChant', () => {
    const ReplyChant = Chants.__get__('ReplyChant');
    it('should return null if no param given.', () => {
        expect(ReplyChant()).toBeNull();
    });

    it('should return a string', () => {
        // toBeInstanceOf(String) is not working :(
        expect(
            ReplyChant({
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

    Chants.__ResetDependency__('ReplyChant');
});

describe('ReplyChantList', () => {
    const ReplyChantList = Chants.__get__('ReplyChantList');
    it('should return null if params are empty', () => {
        expect(ReplyChantList('')).toBeNull();
        expect(ReplyChantList([])).toBeNull();
        expect(ReplyChantList()).toBeNull();
    });

    it('should return Name and Level', () => {
        const input = [TestValue];
        expect(ReplyChantList(input)).toMatch('Test (10)');
    });
});
