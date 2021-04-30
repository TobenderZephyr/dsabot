require('module-alias/register');

const { CompareResults } = require('@dsabot/CompareResults');

it('should return an object', () => {
    let Obj = {
        Passed: 0,
        CriticalHit: 0,
        Fumbles: 0,
        PointsUsed: [],
        PointsRemaining: 0,
    };
    expect(CompareResults).toBeInstanceOf(Object);
    expect(CompareResults()).toMatchObject(Obj);
});

it('should match No. of Fumbles', () => {
    let Obj = {
        Passed: 0,
        CriticalHit: 0,
        Fumbles: 2,
        PointsUsed: [0, 0, 0],
        PointsRemaining: 0,
    };
    expect(CompareResults([9, 20, 20])).toMatchObject(Obj);
});

it('should match No. of Passed', () => {
    let Obj = {
        Passed: 3,
        CriticalHit: 0,
        Fumbles: 0,
        PointsUsed: [0, 0, 0],
        PointsRemaining: 0,
    };
    expect(CompareResults([7, 7, 7])).toMatchObject(Obj);
});

it('should match No. of Critical Hits', () => {
    let Obj = {
        Passed: 3,
        CriticalHit: 2,
        Fumbles: 0,
        PointsUsed: [0, 0, 0],
        PointsRemaining: 0,
    };
    expect(CompareResults([8, 1, 1])).toMatchObject(Obj);
});

it('should decrease Points remaining', () => {
    let Obj = {
        Passed: 3,
        CriticalHit: 0,
        Fumbles: 0,
        PointsUsed: [0, 0, 3],
        PointsRemaining: 3,
    };

    expect(CompareResults([11, 9, 15], [12, 12, 12], 0, 6)).toMatchObject(Obj);
});
