function f(n) {
    return (n > 0 ? '+' : '') + n;
}

const CreateResultTable = ({
    Attributes: Attributes,
    Throws: Throws,
    PointsUsed: PointsUsed,
    Bonus: Bonus = 0,
}) => {
    return `
	\`\`\`
	${''.padEnd(15)} ${Attributes.map(attr => `${attr.Name}`.padStart(6)).join('\t|\t')}\t|
	${'Dein Wert'.padEnd(15)} ${Attributes.map(attr =>
        `${attr.Level}${Bonus ? `(${f(Bonus)})` : ``}`.padStart(6)
    ).join('\t|\t')}\t|
	${'Dein Wurf'.padEnd(15)} ${Throws.map(Throw => `${Throw}`.padStart(6)).join('\t|\t')}\t|
	${'Abzüge'.padEnd(15)} ${PointsUsed.map(Points => `${Points}`.replace(0, '--').padStart(6)).join(
        '\t|\t'
    )}\t|
	${'Gesamt'.padEnd(15)} ${PointsUsed.reduce((acc, cur) => acc + cur)
        .toString()
        .padStart(6)}
	\`\`\`
	`;
};

module.exports = { CreateResultTable, f };
