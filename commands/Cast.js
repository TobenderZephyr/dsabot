const globals = require('../globals');
const Discord = require('discord.js');
const db = globals.db;
const {	roll } = require('@dsabot/Roll');
const {	findMessage } = require('@dsabot/findMessage');
const { getSkill } = require('@dsabot/getSkill');
const { CalculateQuality } = require('@dsabot/CalculateQuality');
const { CompareResults } = require('@dsabot/CompareResults');
module.exports = {
	name: 'cast',
	description: ' Du machst eine Fertigkeitsprobe auf Magietalente.\n' +
		' Es werden drei Würfel auf deine Eigenschaftswerte geworfen. Deine Boni werden in' +
		' die Berechnung einbezogen.',
	aliases: ['zaubern'],
	usage: '<Zaubern> [<-Erschwernis> / <+Erleichterung>]',
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
							value: `${(Passed === 0) ? 'Keine Probe' : `nur ${Passed}/3 Proben`} erfolgreich. 😪`,
							inline: false
						});
					} else {
						Reply.addFields({
							name: findMessage('TITLE_SUCCESS'),
							value: `Dein verbleibender Bonus: ${PointsRemaining}/${Skill.Level} (QS${CalculateQuality(PointsRemaining)})`,
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