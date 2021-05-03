require('module-alias/register');
const rewire = require('rewire');
const Attribute = require('@Commands/Attribute');

const rewireUtils = rewire('@Commands/Attribute');
const HandleNamedAttributes = rewireUtils.__get__('HandleNamedAttributes');
const getAttributeLevel = rewireUtils.__get__('getAttributeLevel');
const getAttribute = rewireUtils.__get__('getAttribute');
const handleAttributeCheck = rewireUtils.__get__('handleAttributeCheck');
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
    expect(getAttribute('mut')).toEqual(obj);
});
it('should return undefined', () => {
    expect(getAttribute()).toBeUndefined();
});

it('returns a number ', () => {
    expect(getAttributeLevel({ attributes: [{ id: 'mut', level: 8 }] }, { id: 'mut' })).toBe(8);
});

it('should return an object', () => {
    const Character = {
        attributes: [{ id: 'mut', level: 8 }],
    };
    expect(HandleNamedAttributes({ Character: Character, args: ['mut'] })).toEqual({
        Name: 'Mut',
        Level: 8,
    });
});

it('should return with no errors', () => {
    const reply = jest.fn(str => str);
    const message = {
        reply: reply,
        author: {
            tag: 'test',
        },
    };
    const doc = { character: { attributes: [{ id: 'mut', level: 8 }] } };
    const args = ['mut'];
    expect(handleAttributeCheck(doc, { message, args })).toEqual(expect.any(String));
});
it('should return with no errors', () => {
    const reply = jest.fn(str => str);
    const message = {
        reply: reply,
        author: {
            tag: 'test',
        },
    };
    const docs = { character: { attributes: [{ id: 'mut', level: 8 }] } };
    const args = ['MU'];
    expect(handleAttributeCheck(docs, { message, args })).toEqual(expect.any(String));
});
it('should return with no errors', () => {
    const reply = jest.fn(str => str);
    const message = {
        reply: reply,
        author: {
            tag: 'test',
        },
    };
    const docs = [{ character: { attributes: [{ id: 'mut', level: 8 }] } }];
    const args = [8];
    for (let i = 0; i < 30; i += 1) {
        expect(handleAttributeCheck(docs, { message, args })).toEqual(expect.any(String));
    }
});
it('should return with no errors', () => {
    const reply = jest.fn(str => str);
    const message = {
        reply: reply,
        author: {
            tag: 'test',
        },
    };
    const docs = [{ character: { attributes: [{ id: 'mut', level: 8 }] } }];
    const args = [8, '+2'];
    for (let i = 0; i < 30; i += 1) {
        expect(handleAttributeCheck(docs, { message, args })).toEqual(expect.any(String));
    }
});

it('should return empty', () => {
    const message = { author: { tag: 'test' }, reply: jest.fn(str => str) };
    const args = ['MU'];
    expect(Attribute.exec(message, args)).toBeInstanceOf(Promise);
    //expect(Attribute.exec(message, args)).resolves.toBeUndefined();
});

/*

const reply = jest.fn(str => str);
const message = {
    reply: reply,
    author: {
        tag: 'test',
    },
};
const docs = [{ character: { attributes: [{ id: 'mut', level: 8 }] } }];
const args = ['MU'];
const run = [];
for (let i = 1; i < 100; i++) {
    run.push(i);
}

test.each(run)('run multiple times (%s)', () => {
    expect(handleAttributeCheck(docs, { message, args })).toEqual(expect.any(String));
});
*/
