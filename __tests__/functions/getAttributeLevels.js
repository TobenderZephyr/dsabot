require('module-alias/register');
const { getAttributeLevels } = require('@dsabot/getAttributeLevels');

const Character = {
    attributes: [
        { id: 'mut', level: 10 },
        { id: 'klugheit', level: 11 },
        { id: 'intuition', level: 12 },
        { id: 'charisma', level: 13 },
        { id: 'fingerfertigkeit', level: 14 },
        { id: 'gewandtheit', level: 15 },
        { id: 'konstitution', level: 16 },
        { id: 'koerperkraft', level: 17 },
    ],
};

it('should return an array', () => {
    expect(getAttributeLevels(['MU', 'IN', 'KO'], Character)).toBeInstanceOf(Array);
});

it('should have 3 items in it.', () => {
    expect(getAttributeLevels(['MU', 'IN', 'KO'], Character)).toHaveLength(3);
});
