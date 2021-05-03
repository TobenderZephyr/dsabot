/**
 * Compares each item inside an array Throws
 * with corresponding AttributeLevels (With added bonus)
 *
 * @param  {Array} Throws=[]
 * @param  {Array} AttributeLevels=[8,8,8]
 * @param  {BigInt} Bonus=0
 * @param  {BigInt} PointsRemaining=0
 */
const CompareResults = (Throws = [], AttributeLevels = [8, 8, 8], Bonus = 0, Points = 0) => {
    let Passed = 0;
    let Fumbles = 0;
    let CriticalHit = 0;
    let PointsRemaining = Points;
    const AllPointsUsed = [];

    Throws.forEach((Throw, key) => {
        let PointsUsed = 0;
        const AttributeLevel = AttributeLevels.find((v, k) => key === k);
        if (Math.floor(AttributeLevel + Bonus) >= Throw) {
            Passed += 1;
        } else if (Math.floor(AttributeLevel + PointsRemaining + Bonus) >= Throw) {
            Passed += 1;
            PointsUsed = Throw - Bonus - AttributeLevel;
            PointsRemaining -= PointsUsed;
        } else {
            PointsUsed = PointsRemaining;
            PointsRemaining -= PointsUsed;
        }
        if (Throw === 1) {
            CriticalHit += 1;
        }
        if (Throw === 20) {
            Fumbles += 1;
        }
        AllPointsUsed.push(PointsUsed);
    });

    return {
        Passed: Passed,
        CriticalHit: CriticalHit,
        Fumbles: Fumbles,
        PointsUsed: AllPointsUsed,
        PointsRemaining: PointsRemaining,
    };
};
module.exports = { CompareResults };
