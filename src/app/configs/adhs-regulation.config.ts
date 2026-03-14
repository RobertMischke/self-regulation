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
    {
      key: 'arousal',
      label: 'Aktivierung / Arousal',
      left: 'zu niedrig',
      right: 'zu hoch',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe',
          message: 'Deine Aktivierung ist extrem niedrig. Ohne minimale Energie kann dein Gehirn keine Aufgabe starten – das ist kein Willensproblem.',
          interventions: ['Kaltes Wasser ins Gesicht oder über die Hände.', 'Aufstehen und 2 Minuten gehen.', 'Einen starken sensorischen Reiz setzen (Musik, Licht, frische Luft).'],
        },
        {
          direction: 'low', threshold: 35, severity: 'moderate',
          message: 'Dein Aktivierungslevel ist spürbar niedrig. ADHS-typisch: Nicht zu wenig Wollen, sondern zu wenig Anlaufenergie.',
          interventions: ['Einen Mini-Start setzen: nur 3 Minuten, keine Qualitätsansprüche.', 'Leichte Hintergrundstimulation nutzen (Brown Noise, Lo-Fi).'],
        },
        {
          direction: 'high', threshold: 75, severity: 'moderate',
          message: 'Deine Aktivierung ist erhöht – prüfe, ob das produktive Energie oder innere Unruhe ist.',
          interventions: ['Kurz innehalten und prüfen: Bin ich fokussiert oder getrieben?', 'Reize reduzieren: Tabs schließen, Lautstärke senken.'],
        },
        {
          direction: 'high', threshold: 90, severity: 'severe',
          message: 'Sehr hohes Arousal – dein System ist vermutlich überreizt. Erst runterfahren, bevor du entscheidest.',
          interventions: ['Sofort Reize reduzieren: Kopfhörer ab, Bildschirm dimmen.', 'Box-Breathing: 4-4-4-4 Sekunden, mindestens 5 Runden.', 'Nicht in diesem Zustand Entscheidungen treffen.'],
        },
      ],
    },
    {
      key: 'mood',
      label: 'Gefühlslage',
      left: 'niedrig',
      right: 'gut',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe',
          message: 'Deine Stimmung ist sehr niedrig. Überlege ernsthaft, ob du jetzt weiterarbeiten solltest, oder ob Fürsorge Vorrang hat.',
          interventions: ['Mach Pause. Das ist kein Luxus, sondern Regulation.', 'Sprich mit jemandem, dem du vertraust.', 'Kein Leistungsanspruch jetzt – nur Stabilisierung.'],
        },
        {
          direction: 'low', threshold: 35, severity: 'moderate',
          message: 'Deine Stimmung ist gedrückt. Prüfe, ob du wirklich weitermachen möchtest, oder ob eine Pause hilft.',
          interventions: ['Leichte, angenehme Aufgabe wählen statt etwas Anspruchsvolles.', 'Kurze körperliche Aktivierung: Dehnen, frische Luft.'],
        },
      ],
    },
    {
      key: 'centeredness',
      label: 'Mitte / innere Balance',
      left: 'weg',
      right: 'zentriert',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe',
          message: 'Du bist weit von deiner Mitte entfernt. In diesem Zustand ist präzises Arbeiten kaum möglich.',
          interventions: ['Alles stoppen und 2 Minuten nur atmen.', 'Körperlich erden: Füße bewusst auf den Boden, Haltung aufrichten.', 'Einen sicheren, ruhigen Ort aufsuchen.'],
        },
        {
          direction: 'low', threshold: 35, severity: 'moderate',
          message: 'Du spürst innere Unruhe oder Zerstreutheit. Typisch bei ADHS – dein System sucht Orientierung.',
          interventions: ['Einen klaren nächsten Schritt formulieren und aufschreiben.', 'Äußere Struktur nutzen: Timer, Liste, feste Reihenfolge.'],
        },
      ],
    },
    {
      key: 'clarity',
      label: 'Klarheit',
      left: 'vernebelt',
      right: 'klar',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe',
          message: 'Dein Denken ist stark vernebelt. Brain Fog bei ADHS kann viele Ursachen haben – Schlaf, Essen, Überreizung.',
          interventions: ['Grundbedürfnisse prüfen: Hast du gegessen, getrunken, geschlafen?', 'Keine komplexen Aufgaben jetzt – nur Einfaches oder Pause.', 'Bewegung kann den Nebel lichten: 5 Minuten Spaziergang.'],
        },
        {
          direction: 'low', threshold: 40, severity: 'moderate',
          message: 'Deine Klarheit ist eingeschränkt. Vermeide gerade Aufgaben, die hohe Genauigkeit erfordern.',
          interventions: ['Wechsel auf eine einfachere Aufgabe.', 'Frische Luft oder ein Glas Wasser können helfen.'],
        },
      ],
    },
    {
      key: 'bodyEnergy',
      label: 'Körperenergie',
      left: 'leer',
      right: 'wach',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe',
          message: 'Dein Körper meldet starken Energiemangel. Kognitive Steuerung ist so kaum möglich.',
          interventions: ['Essen und Trinken – jetzt, nicht später.', 'Wenn möglich: kurzes Powernap (10–20 Min).', 'Keine anspruchsvollen Entscheidungen in diesem Zustand.'],
        },
        {
          direction: 'low', threshold: 35, severity: 'moderate',
          message: 'Deine Körperenergie ist niedrig. Das beeinflusst direkt deine Exekutivfunktionen.',
          interventions: ['Snack oder Mahlzeit planen.', 'Kurz aufstehen und bewegen.'],
        },
      ],
    },
    {
      key: 'emotionalPressure',
      label: 'Emotionaler Druck',
      left: 'ruhig',
      right: 'hoch',
      feedbackZones: [
        {
          direction: 'high', threshold: 80, severity: 'severe',
          message: 'Sehr hoher emotionaler Druck. Dein Nervensystem ist im Alarmmodus – Leistung ist hier nicht der richtige Fokus.',
          interventions: ['Alles pausieren. Erst regulieren, dann handeln.', 'Atem-Übung: 4 ein, 6 aus, 5 Runden.', 'Schreibe in 2 Sätzen auf, was dich gerade belastet.'],
        },
        {
          direction: 'high', threshold: 60, severity: 'moderate',
          message: 'Emotionaler Druck ist spürbar erhöht. Das kann bei ADHS schnell die Steuerung übernehmen.',
          interventions: ['Versuche den Druck zu benennen: Was genau stresst dich?', 'Wechsel auf eine Aufgabe, die dir Kontrolle gibt.'],
        },
      ],
    },
    {
      key: 'stimulationNeed',
      label: 'Bedarf an Stimulation',
      left: 'wenig',
      right: 'viel',
      feedbackZones: [
        {
          direction: 'high', threshold: 80, severity: 'severe',
          message: 'Dein Stimulationsbedarf ist extrem hoch. ADHS-typisch: Das Dopamin-System sucht verzweifelt nach Input.',
          interventions: ['Bewusst dosierte Stimulation: schnelle Mini-Aufgabe, Musik, körperliche Bewegung.', 'Nicht mit Social Media oder Doom-Scrolling sättigen – das verstärkt den Hunger.', 'Timer auf 5 Minuten: eine einzige kleine Sache, dann neu bewerten.'],
        },
        {
          direction: 'high', threshold: 65, severity: 'moderate',
          message: 'Erhöhter Stimulationsbedarf. Dein Gehirn braucht mehr Input, um in Gang zu kommen.',
          interventions: ['Nutze erlaubte Stimulation: Musik, Ambient Noise, Zeitdruck.', 'Gamification: Mach dir die Aufgabe zum Spiel oder Wettbewerb.'],
        },
        {
          direction: 'low', threshold: 20, severity: 'mild',
          message: 'Dein Stimulationsbedarf ist ungewöhnlich niedrig. Nutze dieses Fenster für ruhige, präzise Arbeit.',
          interventions: ['Guter Moment für Deep Work oder konzeptionelle Aufgaben.', 'Reize bewusst niedrig halten, um den Zustand zu nutzen.'],
        },
      ],
    },
  ],

  defaultValues: {
    arousal: 46, mood: 58, centeredness: 32, clarity: 49,
    bodyEnergy: 55, emotionalPressure: 41, stimulationNeed: 68,
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
};