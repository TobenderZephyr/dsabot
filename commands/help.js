const Discord = require('discord.js');
const cmdprefix = process.env.CMDPREFIX || '!';


module.exports = {
	name: 'help',
	description: '',
	aliases: ['hilfe'],
	usage: '',
	needs_args: false,
	async exec(message, args) {
		const Help = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Hilfe')
			.setDescription('Das sind die Befehle, die du verwenden kannst.\n' +
                                'Werte in Klammern müssen nicht mit angegeben werden.')

			.addFields({
				name: cmdprefix + 'kopf',
				value: 'Wirf eine Münze. Kopf oder Zahl?',
				inline: false,
			}, {
				name: cmdprefix + 'roll <Anzahl> W <Augenzahl>',
				value: 'Lass die Würfel rollen. Benötigt wird die Anzahl sowie die Augenzahl auf den Würfeln.',
				inline: false,
			}, {
				name: cmdprefix + 'ep/ap <Eigenschaftswert>',
				value: ' Du machst eine Eigenschaftsprobe / Attributprobe.\n' +
                                        ' Du würfelst mit einem W20 auf deinen Eigenschaftswert.\n' +
                                        ' Bei einer 1 oder 20 wird der Bestätigungswurf ausgeführt.',
				inline: false,
			}, {
				name: cmdprefix + 'tp/fp <Eigenschaftswert1> <Eigenschaftswert2> <Eigenschaftswert3> (Fertigkeitswert) (+Erleichtert/-Erschwert)',
				value: ' Du machst eine Fertigkeitsprobe.\n' +
                                        ' Es werden drei Würfel auf deine Eigenschaftswerte geworfen. Hast du Boni auf dein Talent und/oder' +
                                        ' ist der Wurf erleichtert oder erschwert, wird dies in die Berechnung einbezogen.',
				inline: false,
			}, {
				name: cmdprefix + 'talents',
				value: ' Du erhälst eine Liste mit den Talentnamen, die du für ' +
                                        cmdprefix + 'talent/' + cmdprefix + 'skill nutzen kannst.',
				inline: false,
			}, {
				name: '\u200B',
				value: '\u200B',
			}, {
				name: '\u200B',
				value: 'Wenn du mir deine .tdc Datei zusendest, kannst du folgendes nutzen:',
			}, {
				name: cmdprefix + 'ep/ap [Klugheit] oder ' + cmdprefix + 'ep/ap [FF]',
				value: 'siehe oben. Du brauchst deinen Wert nicht wissen.',
				inline: false,
			}, {
				name: cmdprefix + 'talent <Talentname> (+Erleichtert/-Erschwert)',
				value: 'siehe tp. Allerdings musst du deine Werte nicht wissen.',
				inline: false,
			}, {
				name: cmdprefix + 'skill <Talentname>',
				value: 'Zeigt dir deinen Fertigkeitswert im jeweiligen Talent.',
				inline: false,
			}, {
				name: cmdprefix + 'remove',
				value: 'Löscht deinen Charakter aus der Datenbank. Sinnvoll, wenn du mir eine neue zusenden möchtest.',
				inline: false,
			});
		message.author.send(Help);
	},
};