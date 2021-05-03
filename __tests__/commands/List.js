require('module-alias/register');
//const { List } = require('@Commands/List');
const rewire = require('rewire');
const reWireUtils = rewire('@Commands/List');
//const getStats = reWireUtils.__get__('getStats');
const getAttribute = reWireUtils.__get__('getAttribute');
/*
it('should call db', () => {
    expect(getStats('test')).toEqual(expect.arrayContaining([{ Name: 'Mut' }]));
    //expect(mocked_db.findOne).toHaveBeenCalled();
    //expect(db.findOne('test')).toHaveBeenCalled();
});
/*
it('should return an array.', () => {
    expect(getModifiers()).toEqual({});
    expect(getModifiers({})).toEqual({});
});*/

it('should return an attribute object', () => {
    expect(getAttribute({ id: 'mut', level: 9 })).toEqual(
        expect.objectContaining({
            id: expect.any(String),
            Name: expect.any(String),
            Level: expect.any(Number),
        })
    );
});
