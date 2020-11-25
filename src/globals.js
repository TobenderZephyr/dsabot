const money = [{
	'GD': 'Golddukaten',
	'ST': 'Silbertaler',


}];
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
const TalentKategorien = ['Körpertalente','Gesellschaftstalente','Naturtalente','Wissenstalente','Handwerkstalente']

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
	{ id: 'musizieren', name: 'Musizieren', values: ['CH', 'FF', 'KO'], categoryid: 4  },
	{ id: 'schloesserknacken', name: 'Schlösserknacken', values: ['IN', 'FF', 'FF'], categoryid: 4  },
	{ id: 'steinbearbeitung', name: 'Steinbearbeitung', values: ['FF', 'FF', 'KK'], categoryid: 4  },
	{ id: 'stoffbearbeitung', name: 'Stoffbearbeitung', values: ['KL', 'FF', 'FF'], categoryid: 4  },

];
module.exports = { Werte, Talente, Coin, TalentKategorien };