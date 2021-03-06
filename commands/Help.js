const Discord = require('discord.js');
const prfx = process.env.CMDPREFIX || '!';

module.exports = {
    name: 'help',
    description: '',
    aliases: ['hilfe'],
    usage: '',
    needs_args: false,
    async exec(message) {
        const Help = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Hilfe')
            .setDescription(
                'Das sind die Befehle, die du verwenden kannst.\n' +
                    'Werte in Klammern müssen nicht mit angegeben werden.'
            )

            .addFields(
                {
                    name: `${prfx}kopf`,
                    value: `Wirf eine Münze. Kopf oder Zahl?`,
                    inline: false,
                },
                {
                    name: `${prfx}roll <Anzahl> W <Augenzahl>`,
                    value: `Lass die Würfel rollen. Benötigt wird die Anzahl sowie die Augenzahl auf den Würfeln.`,
                    inline: false,
                },
                {
                    name: `${prfx}ep/ap <Eigenschaftswert>`,
                    value:
                        `Du machst eine Eigenschaftsprobe / Attributprobe.\n` +
                        ` Du würfelst mit einem W20 auf deinen Eigenschaftswert.\n` +
                        ` Bei einer 1 oder 20 wird der Bestätigungswurf ausgeführt.`,
                    inline: false,
                },
                {
                    name: `${prfx}tp/fp <Eigenschaftswert1> <Eigenschaftswert2> <Eigenschaftswert3> (Fertigkeitswert) (+Erleichtert/-Erschwert)`,
                    value:
                        ` Du machst eine Fertigkeitsprobe.\n` +
                        ` Es werden drei Würfel auf deine Eigenschaftswerte geworfen. Hast du Boni auf dein Talent und/oder` +
                        ` ist der Wurf erleichtert oder erschwert, wird dies in die Berechnung einbezogen.`,
                    inline: false,
                },
                {
                    name: `${prfx}talents`,
                    value: `Du erhälst eine Liste mit den Talentnamen, die du für ${prfx}talent/${prfx}skill nutzen kannst.`,
                    inline: false,
                },
                {
                    name: `${prfx}weapons`,
                    value: `Du erhälst eine Liste mit den Waffen, die du für ${prfx}attack/${prfx}angriff nutzen kannst.`,
                    inline: false,
                },
                {
                    name: '\u200B',
                    value: '\u200B',
                },
                {
                    name: '\u200B',
                    value: 'Wenn du mir deine .tdc Datei zusendest, kannst du folgendes nutzen:',
                },
                {
                    name: `${prfx}attack [Waffe] (+Erleichtert/-Erschwert)`,
                    value: `Du greifst mit deiner Waffe an. Es wird gleichzeitig Schaden gewürfelt, sofern dein Gegner den Schaden nicht abwenden kann.`,
                    inline: false,
                },
                {
                    name: `${prfx}parry [Waffe] (+Erleichtert/-Erschwert)`,
                    value: `Du versuchst, mit der gewählten Waffe zu parieren.`,
                    inline: false,
                },
                {
                    name: `${prfx}ep/ap [Klugheit] oder ${prfx}ep/ap [FF]`,
                    value: `siehe oben. Du brauchst deinen Wert nicht wissen.`,
                    inline: false,
                },
                {
                    name: `${prfx}talent <Talentname> (+Erleichtert/-Erschwert)`,
                    value: `siehe tp. Allerdings musst du deine Werte nicht wissen.`,
                    inline: false,
                },
                {
                    name: `${prfx}skill <Talentname>`,
                    value: `Zeigt dir deinen Fertigkeitswert im jeweiligen Talent.`,
                    inline: false,
                },
                {
                    name: `${prfx}remove`,
                    value: `Löscht deinen Charakter aus der Datenbank. Sinnvoll, wenn du mir eine neue zusenden möchtest.`,
                    inline: false,
                }
            );
        message.author.send(Help);
    },
};
