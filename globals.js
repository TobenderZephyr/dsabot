const Discord = require('discord.js');
const Datastore = require('nedb'),
	db = new Datastore({
		filename: 'data/dsabot.db',
		autoload: true,
	});
const MessageEmbed = new Discord.MessageEmbed();
const money = [{
	'GD': 'Golddukaten',
	'ST': 'Silbertaler',
}];
const DiceRegex = /\s?[DdWw]\s?|(?=\-|\+)/;
const Coin = ['Kopf', 'Zahl'];
const Werte = [
	{ id: 'mut', kuerzel: 'MU', name: 'Mut' },
	{ id: 'klugheit', kuerzel: 'KL', name: 'Klugheit' },
	{ id: 'intuition', kuerzel: 'IN', name: 'Intuition' },
	{ id: 'charisma', kuerzel: 'CH', name: 'Charisma' },
	{ id: 'fingerfertigkeit', kuerzel: 'FF', name: 'Fingerfertigkeit' },
	{ id: 'gewandtheit', kuerzel: 'GE', name: 'Gewandheit' },
	{ id: 'konstitution', kuerzel: 'KO', name: 'Konstitution' },
	{ id: 'koerperkraft', kuerzel: 'KK', name: 'Körperkraft' },
];
const TalentKategorien = ['Körpertalente','Gesellschaftstalente','Naturtalente','Wissenstalente','Handwerkstalente'];

const Talente = [
	// Körpertalente
	{ id: 'fliegen', name: 'Fliegen', values: ['MU', 'IN', 'GE'], categoryid: 0 },
	{ id: 'gaukeleien', name: 'Gaugekleien', values: ['MU', 'CH', 'FF'], categoryid: 0 },
	{ id: 'klettern', name:'Klettern', values: ['MU', 'GE', 'KK'], categoryid: 0 },
	{ id: 'koerperbeherrschung', name: 'Körperbeherrschung', values: ['GE', 'GE', 'KO'], categoryid: 0 },
	{ id: 'kraftakt', name: 'Kraftakt', values: ['KO', 'KK', 'KK'], categoryid: 0 },
	{ id: 'reiten', name: 'Reiten', values: ['CH', 'GE', 'KK'], categoryid: 0 },
	{ id: 'schwimmen', name: 'Schwimmen', values: ['GE', 'KO', 'KK'], categoryid: 0 },
	{ id: 'selbstbeherrschung', name: 'Selbstbeherrschung', values: ['MU', 'MU', 'KO'], categoryid: 0 },
	{ id: 'singen', name: 'Singen', values: ['KL', 'CH', 'KO'], categoryid: 0 },
	{ id: 'sinnesschaerfe', name: 'Sinnesschärfe', values: ['KL', 'IN', 'IN'], categoryid: 0 },
	{ id: 'tanzen', name: 'Tanzen', values: ['KL', 'CH', 'GE'], categoryid: 0 },
	{ id: 'taschendiebstahl', name: 'Taschendiebstahl', values: ['MU', 'FF', 'GE'], categoryid: 0 },
	{ id: 'verbergen', name: 'Verbergen', values: ['MU', 'IN', 'GE'], categoryid: 0 },
	{ id: 'zechen', name: 'Zechen', values: ['KL', 'KO', 'KK'], categoryid: 0 },

	// Gesellschaftstalente
	{ id: 'bekehrenueberzeugen', name: 'Bekehren & Überzeugen', values: ['MU', 'KL', 'CH'], categoryid: 1 },
	{ id: 'betoeren', name: 'Betören', values: ['MU', 'CH', 'CH'], categoryid: 1  },
	{ id: 'einschuechtern', name: 'Einschüchtern', values: ['MU', 'IN', 'CH'], categoryid: 1  },
	{ id: 'etikette', name: 'Etikette', values: ['KL', 'IN', 'CH'], categoryid: 1  },
	{ id: 'gassenwissen', name: 'Gassenwissen', values: ['KL', 'IN', 'CH'], categoryid: 1  },
	{ id: 'menschenkenntnis', name: 'Menschenkenntnis', values: ['KL', 'IN', 'CH'], categoryid: 1  },
	{ id: 'ueberreden', name: 'Überreden', values: ['MU', 'IN', 'CH'], categoryid: 1  },
	{ id: 'willenskraft', name: 'Willenskraft', values: ['MU', 'IN', 'CH'], categoryid: 1  },
	{ id: 'verkleiden', name: 'Verkleiden', values: ['IN','CH','GE'], categoryid: 1 },
	// Naturtalente
	{ id: 'faehrtensuchen', name: 'Fährtensuchen', values: ['MU', 'IN', 'GE'], categoryid: 2  },
	{ id: 'fesseln', name: 'Fesseln', values: ['KL', 'FF', 'KK'], categoryid: 2  },
	{ id: 'fischenangeln', name: 'Fischen & Angeln', values: ['FF', 'GE', 'KO'], categoryid: 2  },
	{ id: 'orientierung', name: 'Orientierung', values: ['KL', 'IN', 'IN'], categoryid: 2  },
	{ id: 'pflanzenkunde', name: 'Pflanzenkunde', values: ['KL', 'FF', 'KO'], categoryid: 2  },
	{ id: 'tierkunde', name: 'Tierkunde', values: ['MU', 'MU', 'CH'], categoryid: 2  },
	{ id: 'wildnisleben', name: 'Wildnisleben', values: ['MU', 'GE', 'KO'], categoryid: 2  },

	// Wissenstalente
	{ id: 'brettspiel', name: 'Brett- & Glücksspiel', values: ['KL', 'KL', 'IN'], categoryid: 3  },
	{ id: 'geographie', name: 'Geographie', values: ['KL', 'KL', 'IN'], categoryid: 3  },
	{ id: 'geschichtswissen', name: 'Geschichtswissen', values: ['KL', 'KL', 'IN'], categoryid: 3  },
	{ id: 'goetterkulte', name: 'Götter & Kulte', values: ['KL', 'KL', 'IN'], categoryid: 3  },
	{ id: 'kriegkunst', name: 'Kriegskunst', values: ['MU', 'KL', 'IN'], categoryid: 3  },
	{ id: 'magiekunde', name: 'Magiekunde', values: ['KL', 'KL', 'IN'], categoryid: 3  },
	{ id: 'mechanik', name: 'Mechanik', values: ['KL', 'KL', 'FF'], categoryid: 3  },
	{ id: 'rechnen', name: 'Rechnen', values: ['KL', 'KL', 'IN'], categoryid: 3  },
	{ id: 'rechtskunde', name: 'Rechtskunde', values: ['KL', 'KL', 'IN'], categoryid: 3  },
	{ id: 'sagenlegenden', name: 'Sagen & Legenden', values: ['KL', 'KL', 'IN'], categoryid: 3  },
	{ id: 'sphaerenkunde', name: 'Sphärenkunde', values: ['KL', 'KL', 'IN'], categoryid: 3  },
	{ id: 'sternkunde', name: 'Sternkunde', values: ['KL', 'KL', 'IN'], categoryid: 3  },

	// Handwerkstalente
	{ id: 'alchimie', name: 'Alchimie', values: ['MU', 'KL', 'FF'], categoryid: 4  },
	{ id: 'boote', name: 'Boote & Schiffe', values: ['FF', 'GE', 'KK'], categoryid: 4  },
	{ id: 'fahrzeuge', name: 'Fahrzeuge', values: ['CH', 'FF', 'KO'], categoryid: 4  },
	{ id: 'handel', name: 'Handel', values: ['KL', 'IN', 'CH'], categoryid: 4  },
	{ id: 'heilkundegift', name: 'Heilkunde: Gift', values: ['MU', 'KL', 'IN'], categoryid: 4  },
	{ id: 'heilkundekrankheiten', name: 'Heilkunde: Krankheiten', values: ['MU', 'IN', 'KO'], categoryid: 4  },
	{ id: 'heilkundeseele', name: 'Heilkunde: Seele', values: ['IN', 'CH', 'KO'], categoryid: 4  },
	{ id: 'heilkundewunden', name: 'Heilkunde: Wunden', values: ['KL', 'FF', 'FF'], categoryid: 4  },
	{ id: 'holzbearbeitung', name: 'Holzbearbeitung', values: ['FF', 'GE', 'KK'], categoryid: 4  },
	{ id: 'lebensmittel', name: 'Lebensmittelbearbeitung', values: ['IN', 'FF', 'FF'], categoryid: 4  },
	{ id: 'lederbearbeitung', name: 'Lederbearbeitung', values: ['FF', 'GE', 'KO'], categoryid: 4  },
	{ id: 'malenzeichnen', name: 'Malen & Zeichnen', values: ['IN', 'FF', 'FF'], categoryid: 4  },
	{ id: 'metallbearbeitung', name: 'Metallbearbeitung', values: ['FF','KO','KK'], categoryid: 4 },
	{ id: 'musizieren', name: 'Musizieren', values: ['CH', 'FF', 'KO'], categoryid: 4  },
	{ id: 'schloesserknacken', name: 'Schlösserknacken', values: ['IN', 'FF', 'FF'], categoryid: 4  },
	{ id: 'steinbearbeitung', name: 'Steinbearbeitung', values: ['FF', 'FF', 'KK'], categoryid: 4  },
	{ id: 'stoffbearbeitung', name: 'Stoffbearbeitung', values: ['KL', 'FF', 'FF'], categoryid: 4  },

];

const CombatTechniques = [
	{ id: 'armbrueste', 		name: 'Armbrüste', 			Leiteigenschaft: ['FF'] },
	{ id: 'boegen', 			name: 'Bögen', 				Leiteigenschaft: ['FF']},
	{ id: 'dolche', 			name: 'Dolche', 			Leiteigenschaft: ['GE']},
	{ id: 'fechtwaffen', 		name: 'Fechtwaffen', 		Leiteigenschaft: ['GE']},
	{ id: 'hiebwaffen', 		name: 'Hiebwaffen', 		Leiteigenschaft: ['KK']},
	{ id: 'kettenwaffen', 		name: 'Kettenwaffen', 		Leiteigenschaft: ['KK']},
	{ id: 'lanzen', 			name: 'Lanzen', 			Leiteigenschaft: ['KK']},
	{ id: 'raufen', 			name: 'Raufen', 			Leiteigenschaft: ['GE', 'KK']},
	{ id: 'schilde', 			name: 'Schilde', 			Leiteigenschaft: ['KK']},
	{ id: 'schwerter', 			name: 'Schwerter', 			Leiteigenschaft: ['GE', 'KK']},
	{ id: 'stangenwaffen', 		name: 'Stangenwaffen', 		Leiteigenschaft: ['GE', 'KK']},
	{ id: 'wurfwaffen', 		name: 'Wurfwaffen', 		Leiteigenschaft: ['FF']},
	{ id: 'zweihandhiebwaffen', name: 'Zweihandhiebwaffen', Leiteigenschaft: ['KK']},
	{ id: 'zweihandschwerter', 	name: 'Zweihandschwerter', 	Leiteigenschaft: ['KK']}
];

const Replies = [
	{ id: 'NOENTRY',  			string: 'Sorry, für dich habe ich leider keinen Eintrag 😥' },
	{ id: 'ERROR', 				string: 'Irgendwas ist schief gelaufen. 🤔'},
	{ id: 'WRONG_ARGUMENTS',	string: 'Die Angaben sind fehlerhaft. Nutze !help um zu erfahren, wie es richtig geht.'},
	{ id: 'TITLE_CRIT_FAILURE',	string: 'Patzer!' },
	{ id: 'TITLE_CRIT_SUCCESS', string: 'Kritischer Erfolg!'},
	{ id: 'TITLE_SUCCESS', 		string: 'Bestanden'},
	{ id: 'TITLE_FAILURE', 		string: 'Nicht bestanden'},
	{ id: 'MSG_CRIT_FAILURE', 	string: 'Du hast aber auch Pech 😥'},
	{ id: 'MSG_CRIT_SUCCESS', 	string: '🎈✨🥳'},
	{ id: 'MSG_SUCCESS', 		string: ''},
	{ id: 'MSG_FAILURE', 		string: ''},
	{ id: 'TOO_FEW_ARGS', 		string: 'Du hast zu wenig Angaben gemacht. Probiere es einmal so:\n'},
	{ id: 'SAVED_DATA', 		string: 'Ich habe deine Daten abgespeichert.'},
	{ id: 'DELETED_DATA',		string: 'Ich habe deine Daten entfernt.'},
	{ id: 'NO_SUCH_WEAPON',		string: 'Diese Waffe gibt es nicht.'},
	{ id: 'COMBAT_CRIT_SUCCESS',string: 'Kritischer Treffer 🎈✨🥳! Der Verteidigungswert deines Gegners halbiert sich!\n'},
	{ id: 'COMBAT_CRIT_FAIL',	string: 'Patzer 😪! Du erleidest 1W6+2 Schadenspunkte.'},
	{ id: 'COMBAT_FAIL',		string: 'Leider gelingt dir kein Treffer.'},
	{ id: 'COMBAT_SUCCESS',		string:	'Dir gelingt ein Treffer.'},
	{ id: 'COMBAT_DOUBLEDAMAGE',string: 'Zusätzlich wird sämtlicher Schaden verdoppelt!\n'},
	{ id: 'TALENT_UNKNOWN', 	string: 'Das Talent ist mir unbekannt.'},
	{ id: 'PARRY_WRONG_WEAPON', string: 'Mit dieser Waffe kannst du nicht parieren!'},
	{ id: 'PARRY_FAIL',			string: 'Deine Parade schlägt fehl.'},
	{ id: 'PARRY_CRIT_FAIL',	string: 'Kritischer Fehlschlag! Du erleidest zusätzlich 1W6+2 Schadenspunkte!'},
	{ id: 'PARRY_SUCCESS',		string: 'Parade erfolgreich.'},
	{ id: 'PARRY_CRIT_SUCCESS',	string: 'Kritischer Erfolg! Du darfst einen Passierschlag ausführen!'},
	{ id: 'ROLL', 				string: 'Du würfelst:'},
	{ id: 'HEADS_OR_TAILS', 	string: 'Die Münze landet auf ' },
	{ id: 'SPELL_UNKNOWN',		string: 'Diesen Zauber kenne ich nicht.'}
];
const Declination = ['dem', 'der', 'dem', '']; // Maskulinum, Feminimum, Neutrum, None
const Articles = ['Der','Die','Das',''];
const MeleeWeapons = [
	{ id: 'basiliskenzunge', 	name: 'Basiliskenzunge', 	dice: 1, diemodificator: 2, at_mod: 0, pa_mod: -1,	article: 1, DmgThreshold: 14, combattechnique: 'dolche' },
	{ id: 'dolch',				name: 'Dolch', 				dice: 1, diemodificator: 1, at_mod: 0, pa_mod: 0,	article: 0, DmgThreshold: 14, combattechnique: 'dolche' },
	{ id: 'drachenzahn', 		name: 'Drachenzahn', 		dice: 1, diemodificator: 2, at_mod: 0, pa_mod: -1,	article: 0, DmgThreshold: 14, combattechnique: 'dolche' },
	{ id: 'linkhand',			name: 'Linkhand', 			dice: 1, diemodificator: 1, at_mod: 0, pa_mod: 0,	article: 3, DmgThreshold: 14, combattechnique: 'dolche' },
	{ id: 'messer',				name: 'Messer',				dice: 1, diemodificator: 1, at_mod: 0, pa_mod: -2,	article: 2, DmgThreshold: 14, combattechnique: 'dolche' },
	{ id: 'schwererdolch',		name: 'Schwerer Dolch', 	dice: 1, diemodificator: 2, at_mod: 0, pa_mod: -1,	article: 0, DmgThreshold: 14, combattechnique: 'dolche' },
	{ id: 'waqqif', 			name: 'Waqqif', 			dice: 1, diemodificator: 2, at_mod: 0, pa_mod: -1,	article: 0, DmgThreshold: 14, combattechnique: 'dolche' },
	{ id: 'florett', 			name: 'Florett',			dice: 1, diemodificator: 2, at_mod: 1, pa_mod: 0,	article: 2, DmgThreshold: 14, combattechnique: 'fechtwaffen' },
	{ id: 'rapier', 			name: 'Rapier',				dice: 1, diemodificator: 3, at_mod: 1, pa_mod: 0,	article: 2, DmgThreshold: 15, combattechnique: 'fechtwaffen' },
	{ id: 'wolfsmesser', 		name: 'Wolfsmesser',		dice: 1, diemodificator: 3, at_mod: 1, pa_mod: 1,	article: 2, DmgThreshold: 15, combattechnique: 'fechtwaffen' },
	{ id: 'brabakbengel',		name: 'Brabakbengel',		dice: 1, diemodificator: 5, at_mod: -1, pa_mod: -2,	article: 0, DmgThreshold: 14, combattechnique: 'hiebwaffen'},
	{ id: 'keule',				name: 'Keule',				dice: 1, diemodificator: 3, at_mod: 0, pa_mod: -1,	article: 1, DmgThreshold: 14, combattechnique: 'hiebwaffen'},
	{ id: 'knueppel',			name: 'Knüppel',			dice: 1, diemodificator: 2, at_mod: 0, pa_mod: -2,	article: 0, DmgThreshold: 14, combattechnique: 'hiebwaffen'},
	{ id: 'lindwurmschlaeger', 	name: 'Lindwurmschläger',	dice: 1, diemodificator: 4, at_mod: 0, pa_mod: -1,	article: 0, DmgThreshold: 14, combattechnique: 'hiebwaffen'},
	{ id: 'magierstabkurz', 	name: 'Magierstab: Kurz',	dice: 1, diemodificator: 1, at_mod: 0, pa_mod: -1,	article: 0, DmgThreshold: 14, combattechnique: 'hiebwaffen'},
	{ id: 'magierstabmittel',	name: 'Magierstab: Lang',	dice: 1, diemodificator: 2, at_mod: 0, pa_mod: -1,	article: 0, DmgThreshold: 14, combattechnique: 'hiebwaffen'},
	{ id: 'molokdeschnaja',		name: 'Molokdeschnaja',		dice: 1, diemodificator: 4, at_mod: 0, pa_mod: -1,	article: 3, DmgThreshold: 14, combattechnique: 'hiebwaffen'},
	{ id: 'orknase',			name: 'Orknase',			dice: 1, diemodificator: 5, at_mod: -1, pa_mod: -2,	article: 1, DmgThreshold: 14, combattechnique: 'hiebwaffen'},
	{ id: 'rabenschnabel',		name: 'Rabenschnabel',		dice: 1, diemodificator: 4, at_mod: 0, pa_mod: -1,	article: 3, DmgThreshold: 14, combattechnique: 'hiebwaffen'},
	{ id: 'sonnenzepter',		name: 'Sonnenzepter',		dice: 1, diemodificator: 3, at_mod: 0, pa_mod: -1,	article: 2, DmgThreshold: 14, combattechnique: 'hiebwaffen'},
	{ id: 'streitaxt',			name: 'Streitaxt',			dice: 1, diemodificator: 4, at_mod: 0, pa_mod: -1,	article: 1, DmgThreshold: 14, combattechnique: 'hiebwaffen'},
	{ id: 'streitkolben',		name: 'Streitkolben',		dice: 1, diemodificator: 4, at_mod: 0, pa_mod: -1,	article: 0, DmgThreshold: 14, combattechnique: 'hiebwaffen'},
	{ id: 'morgenstern',		name: 'Morgenstern',		dice: 1, diemodificator: 5, at_mod: 0, pa_mod: null,	article: 0, DmgThreshold: 14, combattechnique: 'kettenwaffen' },
	{ id: 'kriegslanze',		name: 'Kriegslanze',		dice: 2, diemodificator: 6, at_mod: null, pa_mod: null,	article: 1, DmgThreshold: null, combattechnique: 'lanzen' },
	{ id: 'schlagring',			name: 'Schlagring',			dice: 1, diemodificator: 1, at_mod: 0, pa_mod: 0,	article: 0, DmgThreshold: 15, combattechnique: 'raufen'},
	{ id: 'waffenlos',			name: 'Waffenlos',			dice: 1, diemodificator: 0, at_mod: 0, pa_mod: 0,	article: 3, DmgThreshold: 14, combattechnique: 'raufen'},
	{ id: 'holzschild',			name: 'Holzschild',			dice: 1, diemodificator: 0, at_mod: -4, pa_mod: 1,	article: 2, DmgThreshold: 16, combattechnique: 'schilde'},
	{ id: 'lederschild',		name: 'Lederschild',		dice: 1, diemodificator: 0, at_mod: -4, pa_mod: 1,	article: 2, DmgThreshold: 16, combattechnique: 'schilde'},
	{ id: 'thorwalerschild',	name: 'Thorwalerschild',	dice: 1, diemodificator: 1, at_mod: -5, pa_mod: 2,	article: 2, DmgThreshold: 16, combattechnique: 'schilde'},
	{ id: 'grossschild',		name: 'Großschild',			dice: 1, diemodificator: 1, at_mod: -6, pa_mod: 3,	article: 2, DmgThreshold: 16, combattechnique: 'schilde'},
	{ id: 'barbarenschwert',	name: 'Barbarenschwert',	dice: 1, diemodificator: 5, at_mod: -1, pa_mod: -1,	article: 2, DmgThreshold: 15, combattechnique: 'schwerter'},
	{ id: 'entermesser', 		name: 'Entermesser',		dice: 1, diemodificator: 3, at_mod: 0, pa_mod: -1,	article: 2, DmgThreshold: 15, combattechnique: 'schwerter'},
	{ id: 'haumesser',			name: 'Haumesser',			dice: 1, diemodificator: 3, at_mod: 0, pa_mod: -1,	article: 2, DmgThreshold: 15, combattechnique: 'schwerter'},
	{ id: 'khunchomer',			name: 'Khunchomer',			dice: 1, diemodificator: 4, at_mod: 0, pa_mod: 0,	article: 3, DmgThreshold: 15, combattechnique: 'schwerter'},
	{ id: 'kurzschwert',		name: 'Kurzschwert',		dice: 1, diemodificator: 2, at_mod: 0, pa_mod: 0,	article: 2, DmgThreshold: 15, combattechnique: 'schwerter'},
	{ id: 'langschwert',		name: 'Langschwert',		dice: 1, diemodificator: 4, at_mod: 0, pa_mod: 0,	article: 2, DmgThreshold: 15, combattechnique: 'schwerter'},
	{ id: 'robbentoeter',		name: 'Robbentöter',		dice: 1, diemodificator: 4, at_mod: 0, pa_mod: 0,	article: 0, DmgThreshold: 15, combattechnique: 'schwerter'},
	{ id: 'saebel',				name: 'Säbel',				dice: 1, diemodificator: 3, at_mod: 0, pa_mod: 0,	article: 0, DmgThreshold: 15, combattechnique: 'schwerter'},
	{ id: 'sklaventod',			name: 'Sklaventod',			dice: 1, diemodificator: 4, at_mod: 0, pa_mod: 0,	article: 3, DmgThreshold: 15, combattechnique: 'schwerter'},
	{ id: 'dreizack',			name: 'Dreizack',			dice: 1, diemodificator: 4, at_mod: 0, pa_mod: 0,	article: 1, DmgThreshold: 15, combattechnique: 'stangenwaffen'},
	{ id: 'dschadra',			name: 'Dschadra',			dice: 1, diemodificator: 5, at_mod: 0, pa_mod: -1,	article: 3, DmgThreshold: 15, combattechnique: 'stangenwaffen'},
	{ id: 'hellebarde',			name: 'Hellebarde',			dice: 1, diemodificator: 6, at_mod: 0, pa_mod: -1,	article: 1, DmgThreshold: 15, combattechnique: 'stangenwaffen'},
	{ id: 'holzspeer',			name: 'Holzspeer',			dice: 1, diemodificator: 2, at_mod: 0, pa_mod: 0,	article: 0, DmgThreshold: 15, combattechnique: 'stangenwaffen'},
	{ id: 'kampfstab',			name: 'Kampfstab',			dice: 1, diemodificator: 2, at_mod: 0, pa_mod: 2,	article: 0, DmgThreshold: 15, combattechnique: 'stangenwaffen'},
	{ id: 'magierstablang',		name: 'Magierstab: Lang',	dice: 1, diemodificator: 2, at_mod: -1, pa_mod: 2,	article: 0, DmgThreshold: 16, combattechnique: 'stangenwaffen'},
	{ id: 'speer',				name: 'Speer',				dice: 1, diemodificator: 4, at_mod: 0, pa_mod: 0,	article: 0, DmgThreshold: 15, combattechnique: 'stangenwaffen'},
	{ id: 'zweililien',			name: 'Zweililien',			dice: 1, diemodificator: 4, at_mod: 0, pa_mod: 0,	article: 3, DmgThreshold: 15, combattechnique: 'stangenwaffen'},
	{ id: 'anderthalbhaender',	name: 'Anderthalbhänder',	dice: 1, diemodificator: 6, at_mod: 0, pa_mod: 0,	article: 0, DmgThreshold: 14, combattechnique: 'zweihandschwerter'},
	{ id: 'doppelkhunchomer',	name: 'Doppelkhunchomer',	dice: 2, diemodificator: 3, at_mod: 0, pa_mod: -2,	article: 3, DmgThreshold: 14, combattechnique: 'zweihandschwerter'},
	{ id: 'grossersklaventod',	name: 'Großer Sklaventod', 	dice: 2, diemodificator: 6, at_mod: 0, pa_mod: -2,	article: 3, DmgThreshold: 14, combattechnique: 'zweihandschwerter'},
	{ id: 'tuzakmesser',		name: 'Tuzakmesser',		dice: 2, diemodificator: 2, at_mod: 0, pa_mod: -1,	article: 2, DmgThreshold: 14, combattechnique: 'zweihandschwerter'},
	{ id: 'rondrakamm',			name: 'Rondrakamm',			dice: 2, diemodificator: 6, at_mod: 0, pa_mod: 0,	article: 3, DmgThreshold: 14, combattechnique: 'zweihandschwerter'},
	{ id: 'zweihaender',		name: 'Zweihänder',			dice: 2, diemodificator: 4, at_mod: 0, pa_mod: -3,	article: 0, DmgThreshold: 14, combattechnique: 'zweihandschwerter'},
	{ id: 'barbarenstreitaxt',	name: 'Barbarenstreitaxt',	dice: 2, diemodificator: 4, at_mod: 0, pa_mod: -4,	article: 1, DmgThreshold: 13, combattechnique: 'zweihandhiebwaffen'},
	{ id: 'felsspalter',		name: 'Felsspalter',		dice: 2, diemodificator: 2, at_mod: 0, pa_mod: -2,	article: 0, DmgThreshold: 13, combattechnique: 'zweihandhiebwaffen'},
	{ id: 'kriegshammer',		name: 'Kriegshammer',		dice: 2, diemodificator: 3, at_mod: 0, pa_mod: -3,	article: 0, DmgThreshold: 13, combattechnique: 'zweihandhiebwaffen'},
	{ id: 'zwergenschlaegel', 	name: 'Zwergenschlägel',	dice: 1, diemodificator: 6, at_mod: 0, pa_mod: -1,	article: 0, DmgThreshold: 13, combattechnique: 'zweihandhiebwaffen'},
];
const RangedWeapons = [

	{ id: 'balestrina',			name: 'Balestrina',			dice: 1, diemodificator: 4,	article: 1, combattechnique: 'armbrueste'},
	{ id: 'eisenwalder',		name: 'Eisenwalder',		dice: 1, diemodificator: 4,	article: 0, combattechnique: 'armbrueste'},
	{ id: 'handarmbrust',		name: 'Handarmbrust',		dice: 1, diemodificator: 3,	article: 1, combattechnique: 'armbrueste'},
	{ id: 'leichtearmbrust',	name: 'Leichte Armbrust',	dice: 1, diemodificator: 6,	article: 1, combattechnique: 'armbrueste'},
	{ id: 'schwerearmbrust',	name: 'Schwere Armbrust',	dice: 2, diemodificator: 6,	article: 1, combattechnique: 'armbrueste'},
	{ id: 'elfenbogen',			name: 'Elfenbogen',			dice: 1, diemodificator: 5,	article: 0, combattechnique: 'boegen'},
	{ id: 'kompositbogen',		name: 'Kompositbogen',		dice: 1, diemodificator: 7,	article: 0, combattechnique: 'boegen'},
	{ id: 'kurzbogen',			name: 'kurzbogen',			dice: 1, diemodificator: 4,	article: 0, combattechnique: 'boegen'},
	{ id: 'langbogen',			name: 'langbogen',			dice: 1, diemodificator: 8,	article: 0, combattechnique: 'boegen'},
	{ id: 'schneidzahn',		name: 'Schneidzahn',		dice: 1, diemodificator: 4,	article: 3, combattechnique: 'wurfwaffen'},
	{ id: 'stein',				name: 'Stein',				dice: 1, diemodificator: 0,	article: 0, combattechnique: 'wurfwaffen'},
	{ id: 'wurfbeil',			name: 'Wurfbeil',			dice: 1, diemodificator: 3,	article: 0, combattechnique: 'wurfwaffen'},
	{ id: 'wurfdolch',			name: 'Wurfdolch',			dice: 1, diemodificator: 1,	article: 0, combattechnique: 'wurfwaffen'},
	{ id: 'wurfkeule',			name: 'Wurfkeule',			dice: 1, diemodificator: 2,	article: 1, combattechnique: 'wurfwaffen'},
	{ id: 'wurfring',			name: 'Wurfring',			dice: 1, diemodificator: 1,	article: 0, combattechnique: 'wurfwaffen'},
	{ id: 'wurfscheibe',		name: 'Wurfscheibe',		dice: 1, diemodificator: 1,	article: 1, combattechnique: 'wurfwaffen'},
	{ id: 'wurfstern',			name: 'Wurfstern',			dice: 1, diemodificator: 1,	article: 0, combattechnique: 'wurfwaffen'},
	{ id: 'wurfspeer',			name: 'Wurfspeer',			dice: 1, diemodificator: 2,	article: 0, combattechnique: 'wurfwaffen'}
];
const Weapons = MeleeWeapons.concat(RangedWeapons);

const Advantages = [
	{}
];
const Disadvantages = [
	{}
];

module.exports = { Werte, Talente, Coin, TalentKategorien, DiceRegex, Discord, MessageEmbed, db, Replies, MeleeWeapons, Weapons, RangedWeapons, CombatTechniques, Articles, Declination };

