require('module-alias/register');
require('babel-plugin-rewire');

const Chants = require('@Commands/Chants');
const createChantList = Chants.__get__('createChantList');

describe('createChanList', () => {
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
});
