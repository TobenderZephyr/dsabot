const globals = require('../globals');
const Discord = require('discord.js');
const db = globals.db;
const {	roll } = require('@dsabot/Roll');
const {	findMessage } = require('@dsabot/findMessage');
const { getSkill } = require('@dsabot/getSkill')
module.exports = {
	name: 'talent',
	description: ' Du machst eine Fertigkeitsprobe.\n' +
		' Es werden drei Würfel auf deine Eigenschaftswerte geworfen. Hast du Boni auf dein Talent und/oder' +
		' ist der Wurf erleichtert oder erschwert, wird dies in die Berechnung einbezogen.',
	aliases: ['t'],
	usage: '<Talent> [<-Erschwernis> / <+Erleichterung>]',
	needs_args: true,
	async exec(message, args) {
		try {
			db.find({
				user: message.author.tag,
			}, function (err, docs) {
				if (docs.length === 0) {
					return message.reply(findMessage('NOENTRY'));
				}
				if (!isNaN(args[0])) {
					return message.reply(findMessage('WRONG_ARGUMENTS'));
				} else {
	
					const Skill = getSkill({Character: docs[0].character, args: args});
					if(!Skill) { return message.reply(findMessage('TALENT_UNKNOWN'));}
	
					const Attributes = Skill.Attributes;
					const DiceThrow = roll(3, 20, message.author.tag).dice;
					const Bonus = parseInt(args[1]) || 0;
					let { Passed, 
						CriticalHit, 
						Fumbles,
						PointsUsed,
						PointsRemaining } = CompareResults(
														DiceThrow, 
														Attributes.map(attr => attr.Level), 
														Bonus, 
														Skill.Level);
					const Reply = new Discord.MessageEmbed();
					Reply.addFields({
						name: `Du würfelst auf das Talent **${Skill.Name}** (Stufe ${Skill.Level} + ${Bonus})`,
						value: CreateTable({Attributes: Attributes, Throws: DiceThrow, PointsUsed: PointsUsed}),
						inline: false
					});
					if (Fumbles >= 2) {
						Reply.setColor('#900c3f');
						Reply.addFields({
							name: findMessage('TITLE_CRIT_FAILURE'),
							value: findMessage('MSG_CRIT_FAILURE'),
							inline: false
						});
					} else if (CriticalHit >= 2) {
						Reply.setColor('#1E8449');
						Reply.addFields({
							name: findMessage('TITLE_CRIT_SUCCESS'),
							value: findMessage('MSG_CRIT_SUCCESS'),
							inline: false
						});
					} else if (Passed < 3) {
						Reply.addFields({
							name: findMessage('TITLE_FAILURE'),
							value: `nur ${Passed}/3 Proben erfolgreich. 😪`,
							inline: false
						});
					} else {
						Reply.addFields({
							name: findMessage('TITLE_SUCCESS'),
							value: `Dein Bonus: ${PointsRemaining}/${Skill.Level} (QS${CalculateQuality(PointsRemaining)})`,
							inline: false
						});
					}
	
					message.reply(Reply);
				}
			});
		} catch (e) {
			throw e;
		}
	},
};

const CalculateQuality = (PointsAvailable = 0) => {
	if (PointsAvailable<=3) return 1;
	else if (PointsAvailable>3&&PointsAvailable<=6) return 2;
	else if (PointsAvailable>6&&PointsAvailable<=9) return 3;
	else if (PointsAvailable>9&&PointsAvailable<=12) return 4;
	else if (PointsAvailable>12&&PointsAvailable<=15) return 5;
	else if (PointsAvailable>15) return 6;
};


const CompareResults = (Throws = [], AttributeLevels = [8,8,8], Bonus = 0, PointsRemaining= 0) => {
	
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
			PointsUsed = (Throws[i] - Bonus - AttributeLevels[i]);
			PointsRemaining -= PointsUsed;
		}
		else {
			// We need to use all our points, so that next die/dice
			// would not return a 'Passed'.
			PointsUsed = PointsRemaining;
			PointsRemaining -= PointsUsed;
		}
		if(Throws[i] == 1) {CriticalHit++;}
		if(Throws[i] == 20) {Fumbles++;}
		AllPointsUsed.push(PointsUsed);
	}
	return { 
		Passed: Passed, 
		CriticalHit: CriticalHit,
		Fumbles: Fumbles,
		PointsUsed: AllPointsUsed,
		PointsRemaining: PointsRemaining };
};

function Pad(Number = 0) {
	return Number.toString().padStart(1, ' ');
}

const CreateTable = ({Attributes: Attributes, Throws: Throws, PointsUsed: PointsUsed}) => {
	return `
	\`\`\`
	${' '.padEnd(15)} ${Attributes.map(attr => `${attr.Name}`.padStart(5)).join('\t|\t')}\t|
	${'Dein Wert'.padEnd(15)} ${Attributes.map(attr => `${attr.Level}`.padStart(5)).join('\t|\t')}\t|
	${'Dein Wurf'.padEnd(15)} ${Throws.map(Throw => `${Throw}`.padStart(5)).join('\t|\t')}\t|
	${'Abzüge'.padEnd(15)} ${PointsUsed.map(Points => `${Points}`.replace(0,'--').padStart(5)).join('\t|\t')}\t|
	${'Gesamt'.padEnd(15)} ${PointsUsed.reduce((acc,cur) => acc+cur).toString().padStart(5)}
	\`\`\`
	`;
};