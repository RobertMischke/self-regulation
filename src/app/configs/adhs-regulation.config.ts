import { DashboardConfig } from '../models/dashboard-config';

export const adhsRegulationConfig: DashboardConfig = {
  key: 'adhs-regulation',
  title: 'ADHS-Regulations-Dashboard',
  icon: '🧠',
  subtitle: 'Interaktive Feedback-Schleife für Aktivierung, Gefühlslage, Mitte und Arbeitsmodus.',
  goal: 'Aufmerksamkeit stabilisieren, Reibung senken und ins Arbeiten kommen.',
  audience: 'Für Fokus, Deep Work, exekutive Steuerung und kognitive Klarheit.',
  disclaimer:
    'Dieses Tool ist eine Hilfe zur Selbststeuerung, nicht zur Diagnose. Es soll dich dabei unterstützen, den passenden Modus zu finden: Starten, Routine, Deep Work oder Reset.',
  metricLabels: ['Aktivierung', 'Klarheit', 'Friktion', 'Stimulation'],

  sliders: [
    { key: 'arousal', label: 'Aktivierung / Arousal', left: 'zu niedrig', right: 'zu hoch' },
    { key: 'mood', label: 'Gefühlslage', left: 'niedrig', right: 'gut' },
    { key: 'centeredness', label: 'Mitte / innere Balance', left: 'weg', right: 'zentriert' },
    { key: 'clarity', label: 'Klarheit', left: 'vernebelt', right: 'klar' },
    { key: 'bodyEnergy', label: 'Körperenergie', left: 'leer', right: 'wach' },
    { key: 'emotionalPressure', label: 'Emotionaler Druck', left: 'ruhig', right: 'hoch' },
    { key: 'stimulationNeed', label: 'Bedarf an Stimulation', left: 'wenig', right: 'viel' },
  ],

  defaultValues: {
    arousal: 46, mood: 58, centeredness: 43, clarity: 49,
    bodyEnergy: 55, emotionalPressure: 41, stimulationNeed: 63,
  },
  resetValues: {
    arousal: 55, mood: 62, centeredness: 60, clarity: 61,
    bodyEnergy: 60, emotionalPressure: 34, stimulationNeed: 50,
  },

  computedMetrics: [
    {
      key: 'underStimulation',
      label: 'Unterstimulation',
      weights: [
        { sliderKey: 'arousal', weight: 0.35, invert: true, offset: 50 },
        { sliderKey: 'bodyEnergy', weight: 0.25, invert: true, offset: 50 },
        { sliderKey: 'stimulationNeed', weight: 0.2 },
        { sliderKey: 'clarity', weight: 0.2, invert: true, offset: 50 },
      ],
    },
    {
      key: 'overStimulation',
      label: 'Überstimulation',
      danger: true,
      weights: [
        { sliderKey: 'arousal', weight: 0.4, offset: -50 },
        { sliderKey: 'emotionalPressure', weight: 0.25 },
        { sliderKey: 'centeredness', weight: 0.2, invert: true, offset: 50 },
        { sliderKey: 'clarity', weight: 0.15, invert: true, offset: 50 },
      ],
    },
    {
      key: 'regulation',
      label: 'Regulation',
      weights: [
        { sliderKey: 'centeredness', weight: 0.35 },
        { sliderKey: 'clarity', weight: 0.25 },
        { sliderKey: 'mood', weight: 0.15 },
        { sliderKey: 'bodyEnergy', weight: 0.15 },
        { sliderKey: 'emotionalPressure', weight: 0.1, invert: true, offset: 100 },
      ],
    },
    {
      key: 'friction',
      label: 'Friktion',
      danger: true,
      weights: [
        { sliderKey: 'centeredness', weight: -0.35 },
        { sliderKey: 'clarity', weight: -0.25 },
        { sliderKey: 'mood', weight: -0.15 },
        { sliderKey: 'bodyEnergy', weight: -0.15 },
        { sliderKey: 'emotionalPressure', weight: 0.25 },
        { sliderKey: 'stimulationNeed', weight: 0.15 },
      ],
    },
  ],

  primaryMetrics: { regulationKey: 'regulation', frictionKey: 'friction' },

  modeRules: [
    {
      modeKey: 'reset',
      priority: 30,
      conditions: [{ type: 'computed', key: 'overStimulation', operator: '>', value: 60 }],
    },
    {
      modeKey: 'reset',
      priority: 29,
      conditions: [{ type: 'slider', key: 'emotionalPressure', operator: '>', value: 70 }],
    },
    {
      modeKey: 'start',
      priority: 20,
      conditions: [{ type: 'computed', key: 'underStimulation', operator: '>', value: 60 }],
    },
    {
      modeKey: 'deepWork',
      priority: 10,
      conditions: [
        { type: 'slider', key: 'clarity', operator: '>', value: 65 },
        { type: 'slider', key: 'centeredness', operator: '>', value: 60 },
        { type: 'slider', key: 'emotionalPressure', operator: '<', value: 45 },
      ],
    },
  ],
  defaultModeKey: 'routine',

  modes: {
    start: {
      label: 'Starten',
      description: 'Wenn du nicht ins Tun kommst und einen sanften Einstieg brauchst.',
      reflectiveQuestion: 'Welche Mini-Handlung bringt dich jetzt in Bewegung, ohne dass du Motivation brauchst?',
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
      reflectiveQuestion: 'Welche überschaubare Aufgabe kannst du jetzt zuverlässig abarbeiten?',
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
      reflectiveQuestion: 'Was ist die eine präzise Denkfrage, die du in diesem Block beantworten willst?',
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
      reflectiveQuestion: 'Was ist gerade zu viel – Reiz, Druck, Unsicherheit oder offene Schleifen?',
      interventions: [
        '2 Minuten atmen und langsamer werden.',
        'Augen, Nacken und Schultern kurz entspannen.',
        'Wasser trinken, aufstehen, Licht oder frische Luft.',
        'Danach erst neu bewerten, nicht mitten im Alarmmodus.',
      ],
    },
  },

  feedbacks: {
    reset: {
      title: 'Du wirkst eher überladen als unfähig.',
      text: 'Gerade ist wahrscheinlich nicht mehr Druck sinnvoll, sondern weniger innere und äußere Komplexität. Erst regulieren, dann leisten.',
      badge: 'Überreizung wahrscheinlich',
    },
    start: {
      title: 'Du brauchst vermutlich Aktivierung statt mehr Willenskraft.',
      text: 'Das passt gut zu einem ADHS-Muster: Nicht zu wenig Können, sondern zu wenig Anlaufenergie. Nutze bewusst Stimulation, aber dosiert.',
      badge: 'Unterstimulation wahrscheinlich',
    },
    deepWork: {
      title: 'Guter Zustand für präzises Denken.',
      text: 'Deine Werte sprechen eher für Klarheit und Mitte. Jetzt lohnt es sich, Reize zu reduzieren und eine anspruchsvolle Aufgabe gezielt anzugehen.',
      badge: 'Deep-Work-Fenster',
    },
    routine: {
      title: 'Solider Arbeitsmodus.',
      text: 'Nicht perfekt, aber funktionsfähig. Eher auf Routine, Struktur und Verlässlichkeit setzen als auf Inspiration.',
      badge: 'Arbeitsmodus stabil',
    },
  },

  idealValues: [
    { sliderKey: 'arousal', target: 58 },
    { sliderKey: 'mood', target: 68 },
    { sliderKey: 'centeredness', target: 70 },
    { sliderKey: 'clarity', target: 72 },
    { sliderKey: 'bodyEnergy', target: 68 },
    { sliderKey: 'emotionalPressure', target: 28 },
    { sliderKey: 'stimulationNeed', target: 48 },
  ],

  questionGroups: [
    {
      title: 'Fragen bei Unterstimulation',
      questions: [
        'Fällt dir das Anfangen gerade schwer?',
        'Schweifen deine Gedanken weg, obwohl du etwas tun willst?',
        'Fühlst du dich eher flach, leer oder nicht richtig online?',
      ],
    },
    {
      title: 'Fragen bei Überstimulation',
      questions: [
        'Bist du innerlich hektisch oder reizüberflutet?',
        'Springst du zwischen Tabs, Gedanken oder Aufgaben?',
        'Fühlt sich dein Kopf voll oder zu laut an?',
      ],
    },
    {
      title: 'Fragen zu Gefühlen',
      questions: [
        'Ist gerade starker Druck, Frust oder Unsicherheit da?',
        'Hast du das Gefühl, dass Gefühle deine Steuerung kapern?',
        'Ist die Selbstbewertung gerade eher hart als hilfreich?',
      ],
    },
    {
      title: 'Fragen zum Körper',
      questions: [
        'Bist du müde, hungrig, verspannt oder unruhig?',
        'Hast du heute genug getrunken und gegessen?',
        'Hattest du Schlaf, Licht und etwas Bewegung?',
      ],
    },
  ],

  defaultTask: 'Ich möchte meine Aufmerksamkeit so regulieren, dass ich gut arbeite, ohne mich zu überreizen.',
  defaultMicroCommitment: 'Nur den nächsten kleinen Schritt sichtbar machen.',
  resetMicroCommitment: 'Den kleinsten nächsten Schritt auswählen und anfangen.',
};