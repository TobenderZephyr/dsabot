const cmdprefix = process.env.CMDPREFIX || '!';
module.exports = async (message, args, db) => {
	message.author.send(
        'Hinweis: Werte in Klammern müssen nicht angegeben werden.\n\n' +
        cmdprefix + '**kopf**\n' +
        ' Wirf eine Münze. Kopf oder Zahl?\n\n' +

        cmdprefix + '**roll __Anzahl__ W __Augenzahl__**\n' +
        ' Lass die Würfel rollen. Benötigt wird die Anzahl sowie die Augenzahl auf den Würfeln.\n\n' +

        cmdprefix + '**ep/ap __Eigenschaftswert__** \n' +
        ' Du machst eine Eigenschaftsprobe / Attributprobe.\n' +
        ' Du würfelst mit einem W20 auf deinen Eigenschaftswert.\n' +
        ' Bei einer 1 oder 20 wird der Bestätigungswurf ausgeführt.\n\n' +

        cmdprefix + '**tp/fp __Eigenschaftswert1__ __Eigenschaftswert2__ __Eigenschaftswert3__ (Fertigkeitswert) (+Eleichtert/-Erschwert)**\n' +
        ' Du machst eine Fertigkeitsprobe.\n' + 
        ' Es werden drei Würfel auf deine Eigenschaftswerte geworfen. Hast du Boni auf dein Talent und/oder ' +
        'ist der Wurf erleichtert oder erschwert, wird dies in die Berechnung einbezogen.\n\n' +

        cmdprefix + '**talents**\\n' +
        ' Du erhälst eine Liste mit den Talentnamen, die du für ' + cmdprefix + 'talent/skill nutzen kannst.\n\n' +

        'Folgendes funktioniert, wenn du mir deine `tda`-Datei zuschickst:\n\n' +

        cmdprefix + '**ep/ap Klugheit** oder ' + cmdprefix + '**ep/ap FF**\n\n' +

        cmdprefix + '**talent __Talentname__ (+Erleichtert/-Erschwert)**\n' + 
        ' siehe ' + cmdprefix + 'tp.\n' +
        ' Hier musst du allerdings deine Eigenschaftswerte und Fertigkeitswerte nicht raussuchen.\n\n' +

        cmdprefix + '**skill __Talentname__**\n' +
        ' Ich sage dir deinen Fertigkeitswert im Talent.\n\n' +

        cmdprefix + '**remove**\n' +
        ' Ich lösche deinen Charakter aus meiner Datenbank. Schicke mir gerne erneut eine `tda`-Datei zu.'
        );
};