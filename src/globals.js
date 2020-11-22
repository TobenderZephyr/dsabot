const money = [{
    "GD": "Golddukaten",
    "ST": "Silbertaler",
    

}]

const Werte = [
    { id: "mut", kuerzel: "MU", name: "Mut" },
    { id: "klugheit", kuerzel: "KL", name: "Klugheit"},
    { id: "intuition", kuerzel: "IN", name: "Intuition"},
    { id: "charisma", kuerzel: "CH", name: "Charisma"},
    { id: "fingerfertigkeit", kuerzel: "FF", name: "Fingerfertigkeit"},
    { id: "gewandtheit", kuerzel: "GE", name: "Gewandheit" },
    { id: "konstitution", kuerzel: "KO", name: "Konstitution"},
    { id: "koerperkraft", kuerzel: "KK", name: "Körperkraft"}
]

const Talente = [
    // Körpertalente
    { id: "fliegen", name: "Fliegen", values: ["MU","IN","GE"]},
    { id: "gaukeleien", name: "Gaugekleien", values: ["MU","CH","FF"]},
    { id: "klettern", name:"Klettern",values: ["MU","GE","KK"]},
    { id: "koerperbeherrschung", name: "Körperbeherrschung", values: ["GE","GE","KO"]},
    { id: "kraftakt", name: "Kraftakt", values: ["KO","KK","KK"]},
    { id: "reiten", name: "Reiten", values: ["CH","GE","KK"]},
    { id: "schwimmen", name: "Schwimmen", values: ["GE","KO","KK"]},
    { id: "selbstbeherrschung", name: "Selbstbeherrschung", values: ["MU","MU","KO"]},
    { id: "singen", name: "Singen", values: ["KL","CH","KO"]},
    { id: "sinnesschaerfe", name: "Sinnesschärfe", values: ["KL","IN","IN"]},
    { id: "tanzen", name: "Tanzen", values: ["KL","CH","GE"]},
    { id: "taschendiebstahl", name: "Taschendiebstahl", values: ["MU","FF","GE"]},
    { id: "verbergen", name: "Verbergen", values: ["MU","IN","GE"]},
    { id: "zechen", name: "Zechen", values: ["KL","KO","KK"]},

    // Gesellschaftstalente
    { id: "bekehrenueberzeugen", name: "Bekehren & Überzeugen", values: ["MU","KL","CH"]},
    { id: "betoeren", name: "Betören", values: ["MU","CH","CH"]},
    { id: "einschuechtern", name: "Einschüchtern", values: ["MU","IN","CH"]},
    { id: "etikette", name: "Etikette", values: ["KL","IN","CH"]},
    { id: "gassenwissen", name: "Gassenwissen", values: ["KL","IN","CH"]},
    { id: "menschenkenntnis", name: "Menschenkenntnis", values: ["KL","IN","CH"]},
    { id: "ueberreden", name: "Überreden", values: ["MU","IN","CH"]},
    { id: "willenskraft", name: "Willenskraft", values: ["MU","IN","CH"]},

    // Naturtalente
    { id: "faehrtensuchen", name: "Fährtensuchen", values: ["MU","IN","GE"]},
    { id: "fesseln", name: "Fesseln", values: ["KL","FF","KK"]},
    { id: "fischenangeln", name: "Fischen & Angeln", values: ["FF","GE","KO"]},
    { id: "orientierung", name: "Orientierung", values: ["KL","IN","IN"]},
    { id: "pflanzenkunde", name: "Pflanzenkunde", values: ["KL","FF","KO"]},
    { id: "tierkunde", name: "Tierkunde", values: ["MU","MU","CH"]},
    { id: "wildnisleben", name: "Wildnisleben", values: ["MU","GE","KO"]},

    // Wissenstalente
    { id: "brettspiel", name: "Brett- & Glücksspiel", values: ["KL","KL","IN"]},
    { id: "geographie", name: "Geographie", values: ["KL","KL","IN"]},
    { id: "geschichtswissen", name: "Geschichtswissen", values: ["KL","KL","IN"]},
    { id: "goetterkulte", name: "Götter & Kulte", values: ["KL","KL","IN"]},
    { id: "kriegkunst", name: "Kriegskunst", values: ["MU","KL","IN"]},
    { id: "magiekunde", name: "Magiekunde", values: ["KL","KL","IN"]},
    { id: "mechanik", name: "Mechanik", values: ["KL","KL","FF"]},
    { id: "rechnen", name: "Rechnen", values: ["KL","KL","IN"]},
    { id: "rechtskunde", name: "Rechtskunde", values: ["KL","KL","IN"]},
    { id: "sagenlegenden", name: "Sagen & Legenden", values: ["KL","KL","IN"]},
    { id: "sphaerenkunde", name: "Sphärenkunde", values: ["KL","KL","IN"]},
    { id: "sternkunde", name: "Sternkunde", values: ["KL","KL","IN"]},

    // Handwerkstalente
    { id: "alchimie", name: "Alchimie", values: ["MU","KL","FF"]},
    { id: "boote", name: "Boote & Schiffe", values: ["FF","GE","KK"]},
    { id: "fahrzeuge", name: "Fahrzeuge", values: ["CH","FF","KO"]},
    { id: "handel", name: "Handel", values: ["KL","IN","CH"]},
    { id: "heilkundegift", name: "Heilkunde: Gift", values: ["MU","KL","IN"]},
    { id: "heilkundekrankheiten", name: "Heilkunde: Krankheiten", values: ["MU","IN","KO"]},
    { id: "heilkundeseele", name: "Heilkunde: Seele", values: ["IN","CH","KO"]},
    { id: "heilkundewunden", name: "Heilkunde: Wunden", values: ["KL","FF","FF"]},
    { id: "holzbearbeitung", name: "Holzbearbeitung", values: ["FF","GE","KK"]},
    { id: "lebensmittel", name: "Lebensmittelbearbeitung", values: ["IN","FF","FF"]},
    { id: "lederbearbeitung", name: "Lederbearbeitung", values: ["FF","GE","KO"]},
    { id: "malenzeichnen", name: "Malen & Zeichnen", values: ["IN","FF","FF"]},
    { id: "musizieren", name: "Musizieren", values: ["CH","FF","KO"]},
    { id: "schloesserknacken", name: "Schlösserknacken", values: ["IN","FF","FF"]},
    { id: "steinbearbeitung", name: "Steinbearbeitung", values: ["FF","FF","KK"]},
    { id: "stoffbearbeitung", name: "Stoffbearbeitung", values: ["KL","FF","FF"]}

]
module.exports = { Werte, Talente }