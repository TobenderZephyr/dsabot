const Chants = [
    {
        id: 'bannderdunkelheit',
        name: 'Bann der Dunkelheit',
        attributes: ['MU', 'KL', 'CH'],
        cost: {
            initial: 4,
            additional: { amount: 2, interval: 1, unit: 'Minute' },
        },
        effect: {
            description:
                'Aus der Hand des Geweihten strahlt ein helles Licht. Das Licht zählt regeltechnisch als Sonnenlicht.',
            duration: { amount: 1, modifier: null, unit: 'Minute' },
            unit: null,
        },
        chant: {
            duration: { amount: 1, unit: 'Aktion' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'bannderfurcht',
        name: 'Bann der Furcht',
        attributes: ['IN', 'CH', 'CH'],
        cost: {
            initial: 8,
            additional: {},
        },
        effect: {
            description:
                'Durch diese Liturgie wird pro QS eine Stufe des Zustands Furcht aufgehoben.',
            duration: {},
            unit: null,
        },
        chant: {
            duration: { amount: 2, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'banndeslichts',
        name: 'Bann des Lichts',
        attributes: ['MU', 'KL', 'CH'],
        cost: {
            initial: 16,
            additional: { amount: 8, interval: 5, unit: 'Minuten' },
        },
        effect: {
            description:
                'Um den Geweihten herum bildet sich eine Kugel aus Dunkelheit mit einem Durchmesser von QS x 3 Schritt. Pro QS erschweren sich die Sichtverhältnisse um eine Stufe. Natürliche und magische Lichtquellen können die Dunkelheit nicht erhellen. Bei karmalen Lichtquellen entscheidet die höhere QS (wie bei einer Vergleichsprobe), ob das Licht zu sehen ist oder nicht. Hierbei gilt alles oder nichts Das Licht wird nicht um die QS der Liturgie gedämpft, sondern die höhere QS entscheidet darüber ob Licht zu sehen ist oder nicht. Für den Geweihten werden die Sichtverhältnisse durch die Liturgie nicht erschwert. Der Geweihte muss vor dem Wirken der Liturgie entscheiden, ob die Zone der Dunkelheit an Ort und Stelle verbleiben oder sich mit ihm als Zentrum bewegen soll.',
            duration: { amount: 5, modifier: null, unit: 'Minuten' },
            unit: null,
        },
        chant: {
            duration: { amount: 4, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'blendstrahl',
        name: 'Blendstrahl',
        attributes: ['MU', 'KL', 'IN'],
        cost: {
            initial: 4,
            additional: {},
        },
        effect: {
            description:
                'Der Betroffene wird geblendet. Es erhält eine Stufe des Zustands Verwirrung.',
            duration: { amount: 1, modifier: 'QS', unit: 'Kampfrunden' },
            unit: null,
        },
        chant: {
            duration: { amount: 1, unit: 'Aktion' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'ehrenhaftigkeit',
        name: 'Ehrenhaftigkeit',
        attributes: ['MU', 'IN', 'CH'],
        cost: {
            initial: 8,
            additional: {},
        },
        effect: {
            description:
                'Ehrenhaft bedeutet in diesem Fall, dass der Betroffene sich an die Gebote des Geweihten hält. Dies kann je nach Auslegung und Kultur bedeuten, dass der Betroffene bei Patzern des Gegners auf weitere Angriffe verzichtet, nicht von hinten angreift, dem Gegner die Chance gibt, eine verlorene Waffe wieder aufzusammeln, auf Waffengifte verzichtet usw.',
            duration: { amount: 3, modifier: 'QS', unit: 'Minuten' },
            unit: null,
        },
        chant: {
            duration: { amount: 4, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'entzifferung',
        name: 'Entzifferung',
        attributes: ['KL', 'KL', 'IN'],
        cost: {
            initial: 4,
            additional: {},
        },
        effect: {
            description:
                'Die Textmenge richtet sich nach der QS. Für jede QS kann er fünf Foliantenseiten in normaler Schriftgröße entziffern.',
            duration: { amount: 3, modifier: 'QS', unit: 'Minuten' },
            unit: null,
        },
        chant: {
            duration: { amount: 8, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'ermutigung',
        name: 'Ermutigung',
        attributes: ['MU', 'IN', 'CH'],
        cost: {
            initial: 4,
            additional: {},
        },
        effect: {
            description:
                'Das Ziel wird zuversichtlicher und mutiger. Je nach QS erhält es verschiedene Boni. Die Boni sind kumulativ, d.h. bei QS 3 hat das Ziel insgesamt MU +2 und AT +1.',
            duration: { amount: 3, modifier: 'QS', unit: 'Minuten' },
            unit: null,
        },
        chant: {
            duration: { amount: 8, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'fallinsnichts',
        name: 'Fall ins Nichts',
        attributes: ['MU', 'IN', 'GE'],
        cost: {
            initial: 8,
            additional: {},
        },
        effect: {
            description: 'Für jede QS kann der Geweihte drei Schritt Fallschaden ignorieren.',
            duration: { amount: 3, modifier: 'QS', unit: 'Kampfrunden' },
            unit: null,
        },
        chant: {
            duration: { amount: 1, unit: 'Aktion' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'friedvolleaura',
        name: 'Friedvolle Aura',
        attributes: ['MU', 'IN', 'CH'],
        cost: {
            initial: 8,
            additional: {},
        },
        effect: {
            description:
                'Um den Geweihten anzugreifen, ist eine Probe auf Willenskraft (Bedrohungen standhalten) des Gegners notwendig, bei der er mehr QS haben muss als der Geweihte. Ist diese Probe nicht erfolgreich, kann der Angriff nicht ausgeführt werden. Gelingt sie, so ist die Attacke gegen den Geweihten dennoch um QS der Liturgie erschwert. Die Wirkung der Liturgie bezieht sich nur auf den Geweihten. Während der Wirkung der Liturgie kann der Geweihte keine Angriffe (Attacke, Fernkampf) oder sonstige offensive Handlungen gegen seine Feinde ausführen, wohl aber seine Kampfgefährten mit Handlungen unterstützen.',
            duration: { amount: 3, modifier: 'QS', unit: 'Kampfrunden' },
            unit: null,
        },
        chant: {
            duration: { amount: 1, unit: 'Aktion' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'giftbann',
        name: 'Giftbann',
        attributes: ['KL', 'IN', 'CH'],
        cost: {
            initial: 2,
            additional: { amount: 2, interval: 1, unit: 'Giftstufe(n)' },
        },
        effect: {
            description:
                'Der Giftbann neutralisiert ein Gift. Die maximale Giftstufe darf die QS nicht übersteigen, sonst wirkt die Liturgie nicht und gilt als misslungen.',
            duration: { amount: 3, modifier: 'QS', unit: 'Kampfrunden' },
            unit: null,
        },
        chant: {
            duration: { amount: 4, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'goettlicherfingerzeig',
        name: 'Göttlicher Fingerzeig',
        attributes: ['KL', 'IN', 'IN'],
        cost: {
            initial: 8,
            additional: {},
        },
        effect: {
            description:
                'Voraussetzung ist, dass ein solcher Gegenstand überhaupt in Reichweite liegt. Dies kann z. B. ein verborgener Schlüssel für eine Truhe, ein Zettel mit Hinweisen oder ein benötigtes improvisiertes Werkzeug sein. Ist der Gegenstand durch Magie oder karmales Wirken verborgen, kann der Geweihte das Objekt nicht mittels dieser Liturgie entdecken. Der Gegenstand darf sich maximal QS Schritt vom Geweihten entfernt.',
            duration: { amount: 1, modifier: null, unit: 'Minute' },
            unit: null,
        },
        chant: {
            duration: { amount: 4, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'goettlicheszeichen',
        name: 'Göttliches Zeichen',
        attributes: ['IN', 'IN', 'CH'],
        cost: {
            initial: 4,
            additional: {},
        },
        effect: {
            description:
                'Das Zeichen äußert sich z. B. als Donnergrollen, obwohl keine Wolken am Himmel zu sehen sind (Rondra), das Schnattern eines Storches (Peraine) oder als kurzer Moment der Stille (Boron). Innerhalb der Zone der Liturgie können Personen das göttliche Zeichen wahrnehmen. Der Radius der Zone beträgt QS x 10 in Schritt. Bei Proben auf Bekehren & Überzeugen kann der Meister eine Erleichterung von 1 gewähren, wenn der Geweihte das Zeichen bei der Anwendung miteinbezieht.',
            duration: { amount: 3, modifier: 'QS', unit: 'Kampfrunden' },
            unit: null,
        },
        chant: {
            duration: { amount: 4, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'heilsegen',
        name: 'Heilsegen',
        attributes: ['KL', 'IN', 'CH'],
        cost: {
            initial: 4,
            additional: { amount: 1, interval: 1, unit: 'LeP' },
        },
        effect: {
            description:
                'Der Betroffene erhält innerhalb von 5 Minuten nach dem Wirken der Liturgie verlorene LeP in Höhe der verwendeten KaP zurück. Der Geweihte kann maximal so viele KaP einsetzen, wie er FW hat. Wird die Liturgie vor dem Ablauf der durch den Konstitutionswert angegebenen Frist für den Tod eines Helden begonnen, kann er gerettet werden. Wird die Liturgie jedoch unterbrochen, überlebt der Patient danach nur noch die verbliebenen Kampfrunden.',
            duration: {},
            unit: null,
        },
        chant: {
            duration: { amount: 16, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'kleinerbannwideruntote',
        name: 'Kleiner Bann wider Untote',
        attributes: ['MU', 'MU', 'CH'],
        cost: {
            initial: 4,
            additional: {},
        },
        effect: {
            description:
                'Der Bann verursacht 2W6+(QS x2) SP gegen ein untotes Wesen. Der Bann trifft automatisch sein Ziel und dieses kann sich dagegen nicht verteidigen.',
            duration: {},
            unit: null,
        },
        chant: {
            duration: { amount: 1, unit: 'Aktion' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'kleinerbannstrahl',
        name: 'Kleiner Bannstrahl',
        attributes: ['MU', 'IN', 'CH'],
        cost: {
            initial: 8,
            additional: {},
        },
        effect: {
            description:
                'Der Bannstrahl richtet gegen einen Dämon 2W6+(QS x2) SP an. Gegen Dämonen aus Blakharaz’ Domäne wird der Schaden verdoppelt. Der Bannstrahl trifft automatisch sein Ziel und dieses kann sich dagegen nicht verteidigen. Der kleine Bannstrahl ist nicht davon abhängig, ob der Himmel zu sehen ist. Der Strahl entsteht direkt beim Dämon, auf den der Strahl wirken soll.',
            duration: {},
            unit: null,
        },
        chant: {
            duration: { amount: 2, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'krankheitsbann',
        name: 'Krankheitsbann',
        attributes: ['KL', 'IN', 'CH'],
        cost: {
            initial: 2,
            additional: { amount: 2, interval: 1, unit: 'Krankheitsstufe(n)' },
        },
        effect: {
            description:
                'Diese Liturgie heilt Krankheiten (die bisher erlittenen Auswirkungen werden nicht geheilt). Die maximale Krankheitsstufe darf die QS nicht übersteigen, sonst wirkt die Liturgie nicht und gilt als misslungen. Die Liturgie heilt auch alle Symptome der Krankheit, aber keine bis dahin entstandenen Schäden (LeP-Verlust, Narben usw.).',
            duration: {},
            unit: null,
        },
        chant: {
            duration: { amount: 16, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'lautlos',
        name: 'Lautlos',
        attributes: ['IN', 'IN', 'GE'],
        cost: {
            initial: 4,
            additional: { amount: 2, interval: 1, unit: 'Minute' },
        },
        effect: {
            description: 'Proben auf Verbergen (Schleichen) sind um QS erleichtert.',
            duration: { amount: 1, modifier: null, unit: 'Minute' },
            unit: null,
        },
        chant: {
            duration: { amount: 4, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'magieschutz',
        name: 'Magieschutz',
        attributes: ['MU', 'IN', 'CH'],
        cost: {
            initial: 8,
            additional: { amount: 4, interval: 10, unit: 'Minuten' },
        },
        effect: {
            description:
                'Er erhält einen Bonus von QS –1 auf SK und ZK (mindestens jedoch 1 Punkt) gegen magische Effekte.',
            duration: { amount: 1, modifier: null, unit: 'Minute' },
            unit: null,
        },
        chant: {
            duration: { amount: 4, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'magiesicht',
        name: 'Magiesicht',
        attributes: ['KL', 'IN', 'IN'],
        cost: {
            initial: 4,
            additional: {},
        },
        effect: {
            description:
                'Mit dieser Liturgie lässt sich aktives magisches Wirken auf Gegenständen und Personen erkennen. Je nach Stärke der astralen Kräfte im Objekt kann die Probe erleichtert oder erschwert werden. Je nach QS können dabei nachfolgende Analysen mittels des Zaubers ANALYS oder entsprechenden Liturgien beeinflusst werden. Der Geweihte kann nur ein ausgewähltes Wesen oder Objekt in Reichweite untersuchen. Er hat keine Rundumsicht.',
            duration: { amount: 1, modifier: null, unit: 'Minute' },
            unit: null,
        },
        chant: {
            duration: { amount: 2, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
    {
        id: 'mondsicht',
        name: 'Mondsicht',
        attributes: ['KL', 'KL', 'IN'],
        cost: {
            initial: 2,
            additional: { amount: 1, interval: 10, unit: 'Minuten' },
        },
        effect: {
            description:
                'Erschwernisse der Sichtverhältnisse durch Dunkelheit werden um QS –1 Stufen gesenkt (mindestens jedoch 1',
            duration: { amount: 1, modifier: null, unit: 'Minute' },
            unit: null,
        },
        chant: {
            duration: { amount: 4, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },

    {
        id: 'mondsilberzunge',
        name: 'Mondsilberzunge',
        attributes: ['KL', 'IN', 'CH'],
        cost: {
            initial: 8,
            additional: {},
        },
        effect: {
            description:
                'Der Held wirkt vertrauenerweckend. Er erhält eine Erleichterung von QS auf die Fertigkeiten Überreden und Handel (Feilschen).',
            duration: { amount: 3, modifier: 'QS', unit: 'Minute' },
            unit: null,
        },
        chant: {
            duration: { amount: 1, unit: 'Aktionen' },
            type: 'Chant',
            property: '',
        },
    },
];

module.exports = { Chants };
