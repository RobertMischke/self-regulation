import { ModeKey, ModeDefinition, DashboardDefinition } from './types';

export const modeDefinitions: Record<ModeKey, ModeDefinition> = {
  start: {
    label: 'Starten',
    description: 'Wenn du nicht ins Tun kommst und einen sanften Einstieg brauchst.',
    interventions: [
      'Nur 3 Minuten anfangen – kein Leistungsanspruch.',
      'Brown Noise, instrumentale Musik oder Café-Sound testen.',
      'Ein einziges sichtbares To-do formulieren.',
      'Timer auf 5 oder 10 Minuten setzen.',
    ],
  },
  routine: {
    label: 'Routine',
    description: 'Für Fleißarbeit, Abarbeiten, Sortieren, Tickets, Mails und einfache Coding-Schritte.',
    interventions: [
      'Leichte Hintergrundstimulation nutzen.',
      'Kleine Checkliste sichtbar halten.',
      '25 Minuten Fokus, dann kurz resetten.',
      'Nicht optimieren – nur durchziehen.',
    ],
  },
  deepWork: {
    label: 'Deep Work',
    description: 'Für Architektur, harte Bugs, präzise Texte und Denken mit hoher Genauigkeit.',
    interventions: [
      'Semantische Reize raus: keine Serie, keine Sprache im Hintergrund.',
      'Tabs reduzieren und Kontext schließen.',
      'Vorher Ziel und Hypothese notieren.',
      '50 Minuten ruhig arbeiten, dann Pause.',
    ],
  },
  reset: {
    label: 'Reset',
    description: 'Wenn du überreizt bist oder emotional aus der Spur gerätst.',
    interventions: [
      '2 Minuten atmen und langsamer werden.',
      'Augen, Nacken und Schultern kurz entspannen.',
      'Wasser trinken, aufstehen, Licht oder frische Luft.',
      'Danach erst neu bewerten, nicht mitten im Alarmmodus.',
    ],
  },
};

export const dashboardDefinitions: DashboardDefinition[] = [
  {
    key: 'focus',
    title: 'Focus Dashboard',
    goal: 'Aufmerksamkeit stabilisieren, Reibung senken und ins Arbeiten kommen.',
    audience: 'Für Fokus, Deep Work, exekutive Steuerung und kognitive Klarheit.',
    metrics: ['Aktivierung', 'Klarheit', 'Friktion', 'Stimulation'],
  },
  {
    key: 'emotion',
    title: 'Emotion Dashboard',
    goal: 'Gefühle regulieren, Überflutung reduzieren und wieder handlungsfähig werden.',
    audience: 'Für Stress, Frust, Unsicherheit, Scham und emotionale Stabilisierung.',
    metrics: ['Emotionaler Druck', 'Selbstwert', 'Sicherheit', 'Beruhigung'],
  },
  {
    key: 'social',
    title: 'Social Dashboard',
    goal: 'Soziale Energie, Nähe, Distanz und Interaktion passend steuern.',
    audience: 'Für soziale Unsicherheit, Reizüberflutung, Masking und Beziehungspflege.',
    metrics: ['Soziale Energie', 'Nähe', 'Reizlast', 'Authentizität'],
  },
  {
    key: 'recovery',
    title: 'Recovery Dashboard',
    goal: 'Erholung erkennen, Energie schützen und Überlastung früh abfangen.',
    audience: 'Für Erschöpfung, Burnout-Prophylaxe, Schlafdefizit und Regeneration.',
    metrics: ['Energie', 'Körperlast', 'Schlaf', 'Erholungsgrad'],
  },
  {
    key: 'relationship',
    title: 'Relationship Dashboard',
    goal: 'Konflikte, Bindung und Kommunikation bewusster regulieren.',
    audience: 'Für Partnerschaft, Nähe-Distanz-Dynamiken und schwierige Gespräche.',
    metrics: ['Verbundenheit', 'Defensivität', 'Verletzlichkeit', 'Klarheit'],
  },
  {
    key: 'identity',
    title: 'Identity Dashboard',
    goal: 'Rollen, Werte und innere Stimmigkeit ausbalancieren.',
    audience: 'Für Sinn, Selbstbild, Masking, Kongruenz und Rollenstress.',
    metrics: ['Stimmigkeit', 'Wertefit', 'Maskierung', 'Orientierung'],
  },
];

export const questionGroups = {
  underStimulated: [
    'Fällt dir das Anfangen gerade schwer?',
    'Schweifen deine Gedanken weg, obwohl du etwas tun willst?',
    'Fühlst du dich eher flach, leer oder nicht richtig \'online\'?',
  ],
  overStimulated: [
    'Bist du innerlich hektisch oder reizüberflutet?',
    'Springst du zwischen Tabs, Gedanken oder Aufgaben?',
    'Fühlt sich dein Kopf voll oder zu laut an?',
  ],
  emotionalLoad: [
    'Ist gerade starker Druck, Frust oder Unsicherheit da?',
    'Hast du das Gefühl, dass Gefühle deine Steuerung kapern?',
    'Ist die Selbstbewertung gerade eher hart als hilfreich?',
  ],
  bodySignals: [
    'Bist du müde, hungrig, verspannt oder unruhig?',
    'Hast du heute genug getrunken und gegessen?',
    'Hattest du Schlaf, Licht und etwas Bewegung?',
  ],
};
