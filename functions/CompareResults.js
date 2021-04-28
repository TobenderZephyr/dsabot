/**
 * Compares each item inside an array Throws
 * with corresponding AttributeLevels (With added bonus)
 *
 * @param  {Array} Throws=[]
 * @param  {Array} AttributeLevels=[8,8,8]
 * @param  {BigInt} Bonus=0
 * @param  {BigInt} PointsRemaining=0
 */
const CompareResults = (
    Throws = [],
    AttributeLevels = [8, 8, 8],
    Bonus = 0,
    PointsRemaining = 0
) => {
    let Passed = 0;
    let Fumbles = 0;
    let CriticalHit = 0;
    let AllPointsUsed = [];

    for (let i = 0; i < Throws.length; i++) {
        let PointsUsed = 0;
        if (Math.floor(AttributeLevels[i] + Bonus) >= Throws[i]) {
            Passed++;
        } else if (Math.floor(AttributeLevels[i] + PointsRemaining + Bonus) >= Throws[i]) {
            Passed++;
            PointsUsed = Throws[i] - Bonus - AttributeLevels[i];
            PointsRemaining -= PointsUsed;
        } else {
            // We need to use all our points, so that next die/dice
            // would not return a 'Passed'.
            PointsUsed = PointsRemaining;
            PointsRemaining -= PointsUsed;
        }
        if (Throws[i] == 1) {
            CriticalHit++;
        }
        if (Throws[i] == 20) {
            Fumbles++;
        }
        AllPointsUsed.push(PointsUsed);
    }
    return {
        Passed: Passed,
        CriticalHit: CriticalHit,
        Fumbles: Fumbles,
        PointsUsed: AllPointsUsed,
        PointsRemaining: PointsRemaining,
    };
};
module.exports = { CompareResults };
