const CalculateQuality = (PointsAvailable = 0) => {
	if (PointsAvailable <= 3)
		return 1;
	else if (PointsAvailable > 3 && PointsAvailable <= 6)
		return 2;
	else if (PointsAvailable > 6 && PointsAvailable <= 9)
		return 3;
	else if (PointsAvailable > 9 && PointsAvailable <= 12)
		return 4;
	else if (PointsAvailable > 12 && PointsAvailable <= 15)
		return 5;
	else if (PointsAvailable > 15)
		return 6;
};
module.exports = { CalculateQuality };
