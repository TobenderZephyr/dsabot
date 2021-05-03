const CalculateQuality = (PointsAvailable = 0) => {
    if (PointsAvailable <= 3) return 1;
    if (PointsAvailable > 3 && PointsAvailable <= 6) return 2;
    if (PointsAvailable > 6 && PointsAvailable <= 9) return 3;
    if (PointsAvailable > 9 && PointsAvailable <= 12) return 4;
    if (PointsAvailable > 12 && PointsAvailable <= 15) return 5;
    return 6;
};
module.exports = { CalculateQuality };
