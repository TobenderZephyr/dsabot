require('module-alias/register');
const rewire = require('rewire');
const rewireUtils = rewire('@Commands/Attack');

const getWeapon = rewireUtils.__get__('getWeapon');
const getAttributeLevel = rewireUtils.__get__('getAttributeLevel');
const getCombatTechniqueLevel = rewireUtils.__get__('getCombatTechniqueLevel');
const isMeleeWeapon = rewireUtils.__get__('isMeleeWeapon');
const getAttribute = rewireUtils.__get__('getAttribute');
const CompareAttackResult = rewireUtils.__get__('CompareAttackResult');
const getCombatTechnique = rewireUtils.__get__('getCombatTechnique');

it('should be undefined without value', () => {
    expect(getCombatTechnique({})).toBeUndefined();
});
it('should return defined object', () => {
    expect(getCombatTechnique({ combattechnique: 'dolche' })).toEqual(
        expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            Leiteigenschaft: expect.anything(),
        })
    );
});
test('getAttribute should return Object', () => {
    const obj = { id: 'mut', kuerzel: 'MU', name: 'Mut' };
    expect(getAttribute('KK')).toEqual(
        expect.objectContaining({
            id: expect.any(String),
            kuerzel: expect.any(String),
            name: expect.any(String),
        })
    );
    expect(getAttribute('MU')).toEqual(obj);
});

test('CompareAttackResults', () => {
    expect(CompareAttackResult()).toEqual(
        expect.objectContaining({
            Ok: expect.any(Boolean),
            Patzer: expect.any(Boolean),
            CriticalHit: expect.any(Boolean),
            DoubleDamage: expect.any(Boolean),
            Dice: expect.anything(),
        })
    );
});

it('should return object with fumble', () => {
    const obj = {
        Ok: false,
        Patzer: true,
        CriticalHit: false,
        DoubleDamage: false,
        Dice: [20, 14],
    };
    expect(CompareAttackResult([20, 14], 8)).toEqual(obj);
});
it('should return object with crit', () => {
    const obj = {
        Ok: true,
        Patzer: false,
        CriticalHit: true,
        DoubleDamage: false,
        Dice: [1, 14],
    };
    expect(CompareAttackResult([1, 14], 8)).toEqual(obj);
});

it('should return object with double damage', () => {
    const obj = {
        Ok: true,
        Patzer: false,
        CriticalHit: true,
        DoubleDamage: true,
        Dice: [1, 4],
    };
    expect(CompareAttackResult([1, 4], 8)).toEqual(obj);
});

it('should return object without passing', () => {
    const obj = {
        Ok: false,
        Patzer: false,
        CriticalHit: false,
        DoubleDamage: false,
        Dice: [10],
    };
    expect(CompareAttackResult([10, 14], 8)).toEqual(obj);
});

it('returns a number ', () => {
    expect(getAttributeLevel({ attributes: [{ id: 'mut', level: 8 }] }, 'mut')).toBe(8);
});

it('returnsa defined object ', () => {
    const Player = { combattechniques: [{ id: 'dolche', level: 9 }] };
    const CombatTechnique = { name: 'Dolche', id: 'dolche', Leiteigenschaft: ['GE'] };

    expect(getCombatTechniqueLevel(Player, CombatTechnique)).toEqual(
        expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            level: expect.any(Number),
            Leiteigenschaft: expect.any(Array),
        })
    );
});

it('returns a defined object ', () => {
    expect(getWeapon('waqqif')).toEqual(
        expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            dice: expect.any(Number),
            diemodificator: expect.any(Number),
            at_mod: expect.any(Number),
            pa_mod: expect.any(Number),
            article: expect.any(Number),
            DmgThreshold: expect.any(Number),
            combattechnique: expect.any(String),
        })
    );
});
it('returns true ', () => {
    expect(isMeleeWeapon({ id: 'waqqif' })).toBeTruthy();
});
it('returns false ', () => {
    expect(isMeleeWeapon({ id: 'bogen' })).toBeFalsy();
});

// main function

it('should abort with a message: no entry found', () => {
    const reply = jest.fn(str => str);

    const message = {
        reply: reply,
    };
    const handleAttack = rewireUtils.__get__('handleAttack');
    //expect(handleAttack(err)).toThrowError();
    expect(handleAttack([], { message: message })).toEqual(
        'Sorry, für dich habe ich leider keinen Eintrag 😥'
    );
});

it('should abort with a message: No such weapon', () => {
    const reply = jest.fn(str => str);

    const message = {
        reply: reply,
    };
    const handleAttack = rewireUtils.__get__('handleAttack');
    const args = [''];
    expect(handleAttack([{ character: {} }], { message: message, args: args })).toEqual(
        'Diese Waffe gibt es nicht.'
    );
});

it('complete run with melee weapon', () => {
    const reply = jest.fn(str => str);

    const message = {
        reply: reply,
    };
    const character = {
        attributes: [
            { id: 'mut', level: 10 },
            { id: 'fingerfertigkeit', level: 10 },
            { id: 'klugheit', level: 10 },
            { id: 'intuition', level: 10 },
            { id: 'charisma', level: 10 },
            { id: 'gewandtheit', level: 16 },
            { id: 'konstitution', level: 10 },
            { id: 'koerperkraft', level: 10 },
        ],
        combattechniques: [{ id: 'dolche', level: 8 }],
    };
    const handleAttack = rewireUtils.__get__('handleAttack');
    const args = ['messer'];
    expect(handleAttack([{ character: character }], { message: message, args: args })).toEqual(
        expect.any(String)
    );
});

it('complete run with ranged weapon', () => {
    const reply = jest.fn(str => str);

    const message = {
        reply: reply,
    };
    const character = {
        attributes: [
            { id: 'mut', level: 10 },
            { id: 'fingerfertigkeit', level: 14 },
            { id: 'klugheit', level: 10 },
            { id: 'intuition', level: 10 },
            { id: 'charisma', level: 10 },
            { id: 'gewandtheit', level: 16 },
            { id: 'konstitution', level: 10 },
            { id: 'koerperkraft', level: 10 },
        ],
        combattechniques: [{ id: 'boegen', level: 8 }],
    };
    const handleAttack = rewireUtils.__get__('handleAttack');
    const args = ['langbogen'];
    expect(handleAttack([{ character: character }], { message: message, args: args })).toEqual(
        expect.any(String)
    );
});
