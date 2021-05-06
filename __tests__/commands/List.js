require('module-alias/register');
require('babel-plugin-rewire');
const List = require('@Commands/List');

// const getStats = reWireUtils.__get__('getStats');
const getAttribute = List.__get__('getAttribute');
const printHeader = List.__get__('printHeader');
const listStats = List.__get__('listStats');

describe('getAttributes', () => {
    it('should return an attribute object', () => {
        expect(getAttribute({ id: 'mut', level: 9 })).toEqual(
            expect.objectContaining({
                id: 'mut',
                Name: 'Mut',
                Level: 9,
            })
        );
        expect(getAttribute()).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                Name: expect.any(String),
                Level: expect.any(Number),
            })
        );
    });
});
describe('printHeader', () => {
    it('should return null with no params', () => {
        expect(printHeader()).toBeNull();
    });
    it('should return a string', () => {
        const attributes = [{ Short: 'AA' }, { Short: 'BB' }, { Short: 'CC' }];
        expect(printHeader(attributes)).toMatch(/\s+AA\s+[|]\s+BB\s+[|]\s+CC\s+/g);
    });
});

describe('listStats', () => {
    it('should return a string', () => {
        expect(listStats([{ Level: 8 }, { Level: 9 }, { Level: 10 }])).toMatch(
            /\s+8\s+[|]\s+9\s+[|]\s+10\s+/
        );
    });
});

describe('findUser', () => {
    const expected = {
        user: 'Test',
        character: {
            name: 'test',
        },
    };

    List.__Rewire__('db', {
        findOne: () => Promise.resolve(expected),
    });
    const findUser = List.__get__('findUser');
    expect(findUser()).toBeInstanceOf(Promise);
    expect(findUser()).resolves.toEqual(expected);
});
/*
describe('findUsers', () => {
    const expected = {
        user: 'Test',
        character: {
            name: 'test',
            attributes: [{ id: 'mut', level: 9 }],
        },
    };

    List.__Rewire__('db', {
        findOne: () => {
            return Promise.resolve(expected);
        },
    });
    const findUsers = List.__get__('findUsers');
    expect(findUser()).toBeInstanceOf(Promise);
    expect(findUser()).resolves.toEqual(expected);
});*/

describe('getStats', () => {
    it('should give name, id and level in order', () => {
        const getStats = List.__get__('getStats');
        const user = {
            character: {
                attributes: [
                    { id: 'mut', level: 10 },
                    { id: 'klugheit', level: 11 },
                ],
            },
        };

        expect(getStats(user)).toEqual(
            expect.arrayContaining([
                {
                    Name: expect.any(String),
                    Level: expect.any(Number),
                    Short: expect.any(String),
                    id: expect.any(String),
                },
            ])
        );
    });
});

describe('returnResult', () => {
    const returnResult = List.__get__('returnResult');

    const message = { reply: str => str };
    const characters = [
        {
            Name: 'Zulu',
            Attributes: [
                { id: 'charisma', Level: 7, Short: 'CH' },
                { id: 'mut', Level: 14, Short: 'MU' },
            ],
        },
        {
            Name: 'Alfa',
            Attributes: [
                { id: 'mut', Level: 10, Short: 'MU' },
                { id: 'charisma', Level: 11, Short: 'CH' },
            ],
        },
    ];
    it('returns if no characters were found', () => {
        expect(returnResult(message, [])).toBe('Keine Benutzer auf dieser Liste gefunden.');
        expect(returnResult(message)).toBe('Keine Benutzer auf dieser Liste gefunden.');
    });

    it('returns a string ', () => {
        expect(returnResult(message, characters)).toMatch(/.*/);
    });
});
