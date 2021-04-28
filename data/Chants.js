module.exports = [
    {
        id: 'bannderdunkelheit',
        name: 'Bann der Dunkelheit',
        attributes: ['MU', 'KL', 'CH'],
        cost: { initial: 4, additional: { amount: 2, interval: 1, unit: 'Minute' } },
        effect: {
            description:
                'Aus der Hand des Geweihten strahlt ein helles Licht. Das Licht zählt regeltechnisch als Sonnenlicht.',
            duration: {},
            instant: false,
            pulse: true,
        },
        chant: { duration: { amount: 1, unit: 'Aktion' }, type: 'Chant', property: '' },
    },
    {
        id: 'bannderfurcht',
        name: 'Bann der Furcht',
        attributes: ['IN', 'CH', 'CH'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Durch diese Liturgie wird pro QS eine Stufe des Zustands Furcht aufgehoben.',
            duration: {},
            instant: true,
            pulse: false,
        },
        chant: { duration: { amount: 2, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'banndeslichts',
        name: 'Bann des Lichts',
        attributes: ['MU', 'KL', 'CH'],
        cost: { initial: 16, additional: { amount: 8, interval: 5, unit: 'Minuten' } },
        effect: {
            description:
                'Um den Geweihten herum bildet sich eine Kugel aus Dunkelheit mit einem Durchmesser von QS x 3 Schritt. Pro QS erschweren sich die Sichtverhältnisse um eine Stufe. Natürliche und magische Lichtquellen können die Dunkelheit nicht erhellen. Bei karmalen Lichtquellen entscheidet die höhere QS (wie bei einer Vergleichsprobe), ob das Licht zu sehen ist oder nicht. Hierbei gilt alles oder nichts Das Licht wird nicht um die QS der Liturgie gedämpft, sondern die höhere QS entscheidet darüber ob Licht zu sehen ist oder nicht. Für den Geweihten werden die Sichtverhältnisse durch die Liturgie nicht erschwert. Der Geweihte muss vor dem Wirken der Liturgie entscheiden, ob die Zone der Dunkelheit an Ort und Stelle verbleiben oder sich mit ihm als Zentrum bewegen soll.',
            duration: {},
            instant: false,
            pulse: true,
        },
        chant: { duration: { amount: 4, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'blendstrahl',
        name: 'Blendstrahl',
        attributes: ['MU', 'KL', 'IN'],
        cost: { initial: 4, additional: {} },
        effect: {
            description:
                'Der Betroffene wird geblendet. Es erhält eine Stufe des Zustands Verwirrung.',
            duration: { amount: 1, modifier: 'QS', unit: 'Kampfrunden' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 1, unit: 'Aktion' }, type: 'Chant', property: '' },
    },
    {
        id: 'ehrenhaftigkeit',
        name: 'Ehrenhaftigkeit',
        attributes: ['MU', 'IN', 'CH'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Ehrenhaft bedeutet in diesem Fall, dass der Betroffene sich an die Gebote des Geweihten hält. Dies kann je nach Auslegung und Kultur bedeuten, dass der Betroffene bei Patzern des Gegners auf weitere Angriffe verzichtet, nicht von hinten angreift, dem Gegner die Chance gibt, eine verlorene Waffe wieder aufzusammeln, auf Waffengifte verzichtet usw.',
            duration: { amount: 3, modifier: 'QS', unit: 'Minuten' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 4, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'entzifferung',
        name: 'Entzifferung',
        attributes: ['KL', 'KL', 'IN'],
        cost: { initial: 4, additional: {} },
        effect: {
            description:
                'Die Textmenge richtet sich nach der QS. Für jede QS kann er fünf Foliantenseiten in normaler Schriftgröße entziffern.',
            duration: { amount: 3, modifier: 'QS', unit: 'Minuten' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 8, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'ermutigung',
        name: 'Ermutigung',
        attributes: ['MU', 'IN', 'CH'],
        cost: { initial: 4, additional: {} },
        effect: {
            description:
                'Das Ziel wird zuversichtlicher und mutiger. Je nach QS erhält es verschiedene Boni. Die Boni sind kumulativ, d.h. bei QS 3 hat das Ziel insgesamt MU +2 und AT +1.',
            duration: { amount: 3, modifier: 'QS', unit: 'Minuten' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 8, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'fallinsnichts',
        name: 'Fall ins Nichts',
        attributes: ['MU', 'IN', 'GE'],
        cost: { initial: 8, additional: {} },
        effect: {
            description: 'Für jede QS kann der Geweihte drei Schritt Fallschaden ignorieren.',
            duration: { amount: 3, modifier: 'QS', unit: 'Kampfrunden' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 1, unit: 'Aktion' }, type: 'Chant', property: '' },
    },
    {
        id: 'friedvolleaura',
        name: 'Friedvolle Aura',
        attributes: ['MU', 'IN', 'CH'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Um den Geweihten anzugreifen, ist eine Probe auf Willenskraft (Bedrohungen standhalten) des Gegners notwendig, bei der er mehr QS haben muss als der Geweihte. Ist diese Probe nicht erfolgreich, kann der Angriff nicht ausgeführt werden. Gelingt sie, so ist die Attacke gegen den Geweihten dennoch um QS der Liturgie erschwert. Die Wirkung der Liturgie bezieht sich nur auf den Geweihten. Während der Wirkung der Liturgie kann der Geweihte keine Angriffe (Attacke, Fernkampf) oder sonstige offensive Handlungen gegen seine Feinde ausführen, wohl aber seine Kampfgefährten mit Handlungen unterstützen.',
            duration: { amount: 3, modifier: 'QS', unit: 'Kampfrunden' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 1, unit: 'Aktion' }, type: 'Chant', property: '' },
    },
    {
        id: 'giftbann',
        name: 'Giftbann',
        attributes: ['KL', 'IN', 'CH'],
        cost: { initial: 2, additional: { amount: 2, interval: 1, unit: 'Giftstufe(n)' } },
        effect: {
            description:
                'Der Giftbann neutralisiert ein Gift. Die maximale Giftstufe darf die QS nicht übersteigen, sonst wirkt die Liturgie nicht und gilt als misslungen.',
            duration: { amount: 3, modifier: 'QS', unit: 'Kampfrunden' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 4, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'goettlicherfingerzeig',
        name: 'Göttlicher Fingerzeig',
        attributes: ['KL', 'IN', 'IN'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Voraussetzung ist, dass ein solcher Gegenstand überhaupt in Reichweite liegt. Dies kann z. B. ein verborgener Schlüssel für eine Truhe, ein Zettel mit Hinweisen oder ein benötigtes improvisiertes Werkzeug sein. Ist der Gegenstand durch Magie oder karmales Wirken verborgen, kann der Geweihte das Objekt nicht mittels dieser Liturgie entdecken. Der Gegenstand darf sich maximal QS Schritt vom Geweihten entfernt.',
            duration: { amount: 1, modifier: null, unit: 'Minute' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 4, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'goettlicheszeichen',
        name: 'Göttliches Zeichen',
        attributes: ['IN', 'IN', 'CH'],
        cost: { initial: 4, additional: {} },
        effect: {
            description:
                'Das Zeichen äußert sich z. B. als Donnergrollen, obwohl keine Wolken am Himmel zu sehen sind (Rondra), das Schnattern eines Storches (Peraine) oder als kurzer Moment der Stille (Boron). Innerhalb der Zone der Liturgie können Personen das göttliche Zeichen wahrnehmen. Der Radius der Zone beträgt QS x 10 in Schritt. Bei Proben auf Bekehren & Überzeugen kann der Meister eine Erleichterung von 1 gewähren, wenn der Geweihte das Zeichen bei der Anwendung miteinbezieht.',
            duration: { amount: 3, modifier: 'QS', unit: 'Kampfrunden' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 4, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'heilsegen',
        name: 'Heilsegen',
        attributes: ['KL', 'IN', 'CH'],
        cost: { initial: 4, additional: { amount: 1, interval: 1, unit: 'LeP' } },
        effect: {
            description:
                'Der Betroffene erhält innerhalb von 5 Minuten nach dem Wirken der Liturgie verlorene LeP in Höhe der verwendeten KaP zurück. Der Geweihte kann maximal so viele KaP einsetzen, wie er FW hat. Wird die Liturgie vor dem Ablauf der durch den Konstitutionswert angegebenen Frist für den Tod eines Helden begonnen, kann er gerettet werden. Wird die Liturgie jedoch unterbrochen, überlebt der Patient danach nur noch die verbliebenen Kampfrunden.',
            duration: {},
            instant: true,
            pulse: false,
        },
        chant: { duration: { amount: 16, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'kleinerbannwideruntote',
        name: 'Kleiner Bann wider Untote',
        attributes: ['MU', 'MU', 'CH'],
        cost: { initial: 4, additional: {} },
        effect: {
            description:
                'Der Bann verursacht 2W6+(QS x2) SP gegen ein untotes Wesen. Der Bann trifft automatisch sein Ziel und dieses kann sich dagegen nicht verteidigen.',
            duration: {},
            instant: true,
            pulse: false,
        },
        chant: { duration: { amount: 1, unit: 'Aktion' }, type: 'Chant', property: '' },
    },
    {
        id: 'kleinerbannstrahl',
        name: 'Kleiner Bannstrahl',
        attributes: ['MU', 'IN', 'CH'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Der Bannstrahl richtet gegen einen Dämon 2W6+(QS x2) SP an. Gegen Dämonen aus Blakharaz’ Domäne wird der Schaden verdoppelt. Der Bannstrahl trifft automatisch sein Ziel und dieses kann sich dagegen nicht verteidigen. Der kleine Bannstrahl ist nicht davon abhängig, ob der Himmel zu sehen ist. Der Strahl entsteht direkt beim Dämon, auf den der Strahl wirken soll.',
            duration: {},
            instant: true,
            pulse: false,
        },
        chant: { duration: { amount: 2, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'krankheitsbann',
        name: 'Krankheitsbann',
        attributes: ['KL', 'IN', 'CH'],
        cost: { initial: 2, additional: { amount: 2, interval: 1, unit: 'Krankheitsstufe(n)' } },
        effect: {
            description:
                'Diese Liturgie heilt Krankheiten (die bisher erlittenen Auswirkungen werden nicht geheilt). Die maximale Krankheitsstufe darf die QS nicht übersteigen, sonst wirkt die Liturgie nicht und gilt als misslungen. Die Liturgie heilt auch alle Symptome der Krankheit, aber keine bis dahin entstandenen Schäden (LeP-Verlust, Narben usw.).',
            duration: {},
            instant: true,
            pulse: false,
        },
        chant: { duration: { amount: 16, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'lautlos',
        name: 'Lautlos',
        attributes: ['IN', 'IN', 'GE'],
        cost: { initial: 4, additional: { amount: 2, interval: 1, unit: 'Minute' } },
        effect: {
            description: 'Proben auf Verbergen (Schleichen) sind um QS erleichtert.',
            duration: {},
            instant: false,
            pulse: true,
        },
        chant: { duration: { amount: 4, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'magieschutz',
        name: 'Magieschutz',
        attributes: ['MU', 'IN', 'CH'],
        cost: { initial: 8, additional: { amount: 4, interval: 10, unit: 'Minuten' } },
        effect: {
            description:
                'Er erhält einen Bonus von QS –1 auf SK und ZK (mindestens jedoch 1 Punkt) gegen magische Effekte.',
            duration: {},
            instant: false,
            pulse: true,
        },
        chant: { duration: { amount: 4, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'magiesicht',
        name: 'Magiesicht',
        attributes: ['KL', 'IN', 'IN'],
        cost: { initial: 4, additional: {} },
        effect: {
            description:
                'Mit dieser Liturgie lässt sich aktives magisches Wirken auf Gegenständen und Personen erkennen. Je nach Stärke der astralen Kräfte im Objekt kann die Probe erleichtert oder erschwert werden. Je nach QS können dabei nachfolgende Analysen mittels des Zaubers ANALYS oder entsprechenden Liturgien beeinflusst werden. Der Geweihte kann nur ein ausgewähltes Wesen oder Objekt in Reichweite untersuchen. Er hat keine Rundumsicht.',
            duration: { amount: 1, modifier: null, unit: 'Minute' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 2, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'mondsicht',
        name: 'Mondsicht',
        attributes: ['KL', 'KL', 'IN'],
        cost: { initial: 2, additional: { amount: 1, interval: 10, unit: 'Minuten' } },
        effect: {
            description:
                'Erschwernisse der Sichtverhältnisse durch Dunkelheit werden um QS –1 Stufen gesenkt (mindestens jedoch 1',
            duration: {},
            instant: false,
            pulse: true,
        },
        chant: { duration: { amount: 4, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'mondsilberzunge',
        name: 'Mondsilberzunge',
        attributes: ['KL', 'IN', 'CH'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Der Held wirkt vertrauenerweckend. Er erhält eine Erleichterung von QS auf die Fertigkeiten Überreden und Handel (Feilschen).',
            duration: { amount: 3, modifier: 'QS', unit: 'Minute' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 1, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'objektsegen',
        name: 'Objektsegen',
        attributes: ['MU', 'IN', 'CH'],
        cost: { initial: 4, additional: {} },
        effect: {
            description:
                'Mit dieser Liturgie werden für Götterdienste benötigte Materialien (z. B. Salbungsöl eines Borongeweihten, das Saatgut eines Perainegeweihten oder Sternenstaub bei Phexgeweihten) gesegnet. Der Gegenstand zählt nicht als geweiht, sondern nur als gesegnet.',
            duration: { amount: 3, modifier: 'QS', unit: 'Stunden' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 4, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'ortderruhe',
        name: 'Ort der Ruhe',
        attributes: ['MU', 'KL', 'IN'],
        cost: { initial: 4, additional: {} },
        effect: {
            description:
                'Innerhalb der Zone werden Geräusche gedämpft. Der Radius der Zone beträgt QS x 3 Schritt. Proben gegen Sinnesschärfe (Wahrnehmen), um leise Geräusche wie Flüstern zu hören, sind innerhalb der Zone um QS erschwert. Die Zone verbleibt an Ort und Stelle. Geräusche, die aus der Zone dringen, bleiben gedämpft, Geräusche, die in die Zone eindringen, werden gedämpft.',
            duration: { amount: 3, modifier: 'QS', unit: 'Stunden' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 8, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'pflanzenwuchs',
        name: 'Pflanzenwuchs',
        attributes: ['KL', 'IN', 'CH'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Die Liturgie lässt eine maximal buschgroße Pflanze übernatürlich schnell wachsen. Pro QS wächst die Pflanze 30 % schneller als für die Gattung typisch.',
            duration: { amount: 1, modifier: null, unit: 'Jahr' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 16, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'rabenruf',
        name: 'Rabenruf',
        attributes: ['MU', 'KL', 'IN'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Der Geweihte ruft bis zu QS x 3 Raben aus einem Radius von QS x 3 Meilen herbei. Die Vögel verhalten sich ihm gegenüber zutraulich. Der Geweihte kann einen der Raben dazu benutzen, einen kleinen Gegenstand wie einen Ring zu transportieren, maximal bis zu einer Reichweite von QS x 3 Meile. Der Rabe findet den Zielort in der Regel automatisch. Es können maximal so viele Raben zum Geweihten fliegen, wie sich zu diesem Zeitpunkt in der Reichweite der Liturgie befinden.',
            duration: { amount: 3, modifier: 'QS', unit: 'Stunden' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 16, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'schlaf',
        name: 'Schlaf',
        attributes: ['KL', 'IN', 'CH'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Der Geweihte betäubt den Betroffenen. Erreicht dieser so Betäubung Stufe IV, schläft er ein und ist vor Ablauf der Wirkungsdauer nur durch großen Lärm, kräftiges Anstoßen oder Ähnliches zu wecken. Ungestört schläft er, bis er auf natürlichem Wege erwacht.',
            duration: { amount: 3, modifier: 'QS', unit: 'Minuten' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 2, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'schlangenstab',
        name: 'Schlangenstab',
        attributes: ['MU', 'KL', 'IN'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Die Schlange beschützt den Geweihten mit den ihr zur Verfügung stehenden Mitteln und folgt ihm. Stirbt die Schlange, verwandelt sie sich wieder zurück in das Objekt. Die Schlange gilt als gesegnet wie durch einen Objektsegen.',
            duration: { amount: 3, modifier: 'QS', unit: 'Minuten' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 2, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'schlangenzunge',
        name: 'Schlangenzunge',
        attributes: ['MU', 'KL', 'IN'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Für Umstehende klingt dies wie zischende Laute. Bei der Darstellung eines solchen Gespräches sollte bedacht werden, dass Schlangen einen tierischen Verstand haben und die Welt anders wahrnehmen als Menschen.',
            duration: { amount: 3, modifier: 'QS', unit: 'Minuten' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 8, unit: 'Aktionen' }, type: 'Chant', property: '' },
    },
    {
        id: 'schmerzresistenz',
        name: 'Schmerzresistenz',
        attributes: ['MU', 'IN', 'KO'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Alle Effekte der Stufen des Zustands Schmerz können ignoriert werden, bis auf Stufe IV (ab Stufe IV wird der Geweihe von den ganz normalen Auswirkungen des Zustands betroffen).',
            duration: { amount: 3, modifier: 'QS', unit: 'Kampfrunden' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 1, unit: 'Aktion' }, type: 'Chant', property: '' },
    },
    {
        id: 'schutzderwehrlosen',
        name: 'Schutz der Wehrlosen',
        attributes: ['MU', 'IN', 'CH'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Der Geweihte kann einen Kämpfer, der eine wehr- oder schutzlose Person angreift oder angreifen will, herausfordern. Der Herausgeforderte lässt von seinem Opfer ab und greift stattdessen den Rondrageweihten an.',
            duration: { amount: 3, modifier: 'QS', unit: 'Minuten' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 1, unit: 'Aktion' }, type: 'Chant', property: '' },
    },
    {
        id: 'sternenglanz',
        name: 'Sternenglanz',
        attributes: ['KL', 'IN', 'CH'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Es kann so einen um QS x 10 % höheren Preis erzielen. Misstrauische Käufer können diese Täuschung durchschauen, wenn ihnen eine vergleichende Probe auf Sinnesschärfe (Suchen) erschwert um QS +2 gelingt.',
            duration: { amount: 15, modifier: 'QS', unit: 'Minuten' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 2, unit: 'Aktion' }, type: 'Chant', property: '' },
    },
    {
        id: 'wahrheit',
        name: 'Wahrheit',
        attributes: ['MU', 'KL', 'IN'],
        cost: { initial: 16, additional: {} },
        effect: {
            description:
                'Der Betroffene muss dem Geweihten (und nur ihm) wahrheitsgemäß auf jede seiner Frage antworten, so lange die Wirkungsdauer der Liturgie anhält. Das Opfer der Liturgie weiß, was es sagt.',
            duration: { amount: 3, modifier: 'QS', unit: 'Minuten' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 8, unit: 'Aktion' }, type: 'Chant', property: '' },
    },
    {
        id: 'wieselflink',
        name: 'Wieselflink',
        attributes: ['IN', 'IN', 'GE'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Der Geweihte wird flinker und schneller. Je nach QS erhält er verschiedene Boni. Die Boni sind kumulativ, d.h. bei QS 5 hat der Geweihte insgesamt GE +3, GS + 1 und AW +1. Durch die Steigerung der GE können auch die Schadensschwellen bei Kampftechniken mit GE betroffen sein. Der Geweihte macht also eventuell mehr Schaden mit einigen Waffen.',
            duration: { amount: 3, modifier: 'QS', unit: 'Minuten' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 2, unit: 'Aktion' }, type: 'Chant', property: '' },
    },
    {
        id: 'wundersameverstaendigung',
        name: 'Wundersame Verständigung',
        attributes: ['KL', 'KL', 'IN'],
        cost: { initial: 8, additional: {} },
        effect: {
            description:
                'Der Geweihte erhält die Stufen in der Sprache, die er gerade für seine Kommunikation benötigt. Es ist nicht notwendig, dass der Geweihte schon einmal etwas von der Sprache gehört oder gelesen hat.',
            duration: { amount: 3, modifier: 'QS', unit: 'Stunden' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 2, unit: 'Aktion' }, type: 'Chant', property: '' },
    },
    {
        id: 'ackersegen',
        name: 'Ackersegen',
        attributes: ['MU', 'KL', 'IN'],
        cost: { initial: 16, additional: {} },
        effect: {
            description:
                'Der Geweihte wandert über das frisch gesäte Feld und segnet die Ackerfrüchte. Die Wirkung des Segens entfaltet sich auf einer Fläche von bis zu QS x 1.000 Quadratschritt (der Geweihte darf vom Zentrum des betroffenen Gebietes aber nicht weiter weg sein, als die Reichweite der Liturgie beträgt). Die Ackerfrucht ist weniger anfällig gegen Krankheiten und Ungeziefer, während alle anderen Pflanzen auf dem Acker in ihrem Wachstum gehemmt werden. Der Segen schützt die Pflanzen jedoch nicht vor äußeren Einflüssen wie Dürre, Überflutung oder Hagelschlag.',
            duration: { amount: 1, modifier: null, unit: 'Wachstumszyklus (6-12Mo)' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 1, unit: 'Stunden' }, type: 'Ceremonie', property: '' },
    },
    {
        id: 'exorzismus',
        name: 'Exorzismus',
        attributes: ['MU', 'IN', 'CH'],
        cost: { initial: 32, additional: {} },
        effect: {
            description:
                'Mit einem Exorzismus werden Dämonen und Geister ausgetrieben, die Besitz von einem Lebewesen ergriffen haben. Gelingt der Exorzismus, wird der Dämon oder Geist aus dem Körper vertrieben und zurück in die Niederhöllen oder ins Totenreich verbannt.',
            duration: {},
            instant: true,
            pulse: false,
        },
        chant: { duration: { amount: 8, unit: 'Stunden' }, type: 'Ceremonie', property: '' },
    },
    {
        id: 'geweihterpanzer',
        name: 'Geweihter Panzer',
        attributes: ['MU', 'IN', 'CH'],
        cost: { initial: 16, additional: {} },
        effect: {
            description:
                'Die Rüstung des Geweihten gilt als geweiht. Wenn Dämonen den Geweihten angreifen, verursachen erfolgreiche Angriffe des Dämons 1W3 SP bei ihm, da er den Geweihten oder seine Rüstung berühren muss.',
            duration: { amount: 15, modifier: 'QS', unit: 'Minuten' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 30, unit: 'Minuten' }, type: 'Ceremonie', property: '' },
    },
    {
        id: 'loewengestalt',
        name: 'Löwengestalt',
        attributes: ['MU', 'KL', 'IN'],
        cost: { initial: 16, additional: {} },
        effect: {
            description:
                'Der Geweihte verwandelt sich in einen Löwen. Hierbei wird die Kleidung nicht mitverwandelt. In der Löwengestalt behält der Geweihte seine geistigen Eigenschaften und erhält die körperlichen Eigenschaften und Fähigkeiten des Löwen. Zudem kann er QS x 2 Punkte zusätzlich auf die körperlichen Eigenschaften des Löwen verteilen. In der Löwengestalt kann er keine übernatürlichen Fähigkeiten wie Zauber und Liturgien wirken. In Löwengestalt gilt der Geweihte als gesegnet.',
            duration: { amount: 3, modifier: 'QS', unit: 'Stunden' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 30, unit: 'Minuten' }, type: 'Ceremonie', property: '' },
    },
    {
        id: 'nebelleib',
        name: 'Nebelleib',
        attributes: ['KL', 'IN', 'CH'],
        cost: { initial: 16, additional: {} },
        effect: {
            description:
                'Der Körper des Phexgeweihten verwandelt sich in Nebel. Seine Kleidung und Gegenstände, die er am Körper trug, werden nicht mitverwandelt. Profane, magische und geweihte Waffen richten gegen den Nebel keinen Schaden an. Zauber mit dem Merkmal Verwandlung können nicht gegen den Nebel eingesetzt werden. Der Geweihte kann sich bei relativer Windstille mit GS 4 willentlich fortbewegen; bei leichtem Gegenwind muss er eine Probe auf Willenskraft bestehen, um nicht abgetrieben zu werden; bei starkem Gegenwind wird er aber in Windrichtung davongeblasen, ohne sich dagegen wehren zu können. Der Geweihte kann seine Umgebung mit allen fünf Sinnen wahrnehmen. Der Geweihte bleibt so lange ein Nebel, bis die Wirkungsdauer vorüber ist.',
            duration: { amount: 10, modifier: 'QS', unit: 'Minuten' },
            instant: false,
            pulse: false,
        },
        chant: { duration: { amount: 30, unit: 'Minuten' }, type: 'Ceremonie', property: '' },
    },
    {
        id: 'objektweihe',
        name: 'Objektweihe',
        attributes: ['KL', 'IN', 'CH'],
        cost: { initial: 16, additional: {} },
        effect: {
            description:
                'Das Objekt, üblicherweise ein liturgischer Gegenstand oder eine rituelle Waffe wie ein Sonnenzepter oder ein Rondrakamm, wird geweiht. Damit wird es von den karmalen Kräften der jeweiligen Gottheit durchdrungen, weswegen üblicherweise nur ausgewählte, der Gottheit gefällige Gegenstände geweiht und nur wahren Gläubigen ausgehändigt werden. Sollte das geweihte Objekt eine Waffe sein, gilt sie nun als geweihte Waffe. Das Objekt darf maximal 4 Stein wiegen. Für jede QS kann das Objekt 1 Stein mehr wiegen. Die Objektweihe wird vor allem für die geweihten Rabenschnäbel der Borongeweihten, das Sonnenzepter der Praioten und die Rondrakämme der Rondrageweihtenschaft verwendet. (Für die Herstellung von Zeremonialgegenständen ist allerdings noch die SF "Zeremonialgegenstände herstellen" notwendig.)',
            duration: {},
            instant: true,
            pulse: false,
        },
        chant: { duration: { amount: 2, unit: 'Stunden' }, type: 'Ceremonie', property: '' },
    },
];
