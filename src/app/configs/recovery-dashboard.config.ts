import { DashboardConfig } from '../models/dashboard-config';

export const recoveryDashboardConfig: DashboardConfig = {
  key: 'recovery',
  title: 'Recovery-Dashboard',
  icon: '🔋',
  subtitle: 'Energiehaushalt überwachen, Überlastung abfangen und Erholung planen.',
  goal: 'Erholung erkennen, Energie schützen und Überlastung früh abfangen.',
  audience: 'Für Erschöpfung, Burnout-Prophylaxe, Schlafdefizit und Regeneration.',
  disclaimer:
    'Dieses Dashboard ist kein medizinisches Instrument. Es hilft dir, deinen Energiehaushalt bewusster wahrzunehmen und rechtzeitig gegenzusteuern.',
  metricLabels: ['Energie', 'Körperlast', 'Schlaf', 'Erholungsgrad'],

  sliders: [
    { key: 'energy', label: 'Allgemeine Energie', left: 'erschöpft', right: 'energiegeladen' },
    { key: 'sleepQuality', label: 'Schlafqualität (letzte Nacht)', left: 'schlecht', right: 'erholsam' },
    { key: 'bodyLoad', label: 'Körperliche Belastung', left: 'leicht', right: 'schwer' },
    { key: 'mentalLoad', label: 'Mentale Last', left: 'klar', right: 'überladen' },
    { key: 'recoveryTime', label: 'Erholungszeit (letzter Tag)', left: 'keine', right: 'viel' },
    { key: 'motivation', label: 'Antrieb / Motivation', left: 'leer', right: 'motiviert' },
  ],

  defaultValues: {
    energy: 38, sleepQuality: 42, bodyLoad: 55,
    mentalLoad: 62, recoveryTime: 30, motivation: 35,
  },
  resetValues: {
    energy: 65, sleepQuality: 70, bodyLoad: 30,
    mentalLoad: 30, recoveryTime: 60, motivation: 60,
  },

  computedMetrics: [
    {
      key: 'exhaustion',
      label: 'Erschöpfungsindex',
      danger: true,
      weights: [
        { sliderKey: 'energy', weight: 0.3, invert: true, offset: 100 },
        { sliderKey: 'sleepQuality', weight: 0.25, invert: true, offset: 100 },
        { sliderKey: 'bodyLoad', weight: 0.2 },
        { sliderKey: 'mentalLoad', weight: 0.25 },
      ],
    },
    {
      key: 'recoveryScore',
      label: 'Erholungsscore',
      weights: [
        { sliderKey: 'recoveryTime', weight: 0.3 },
        { sliderKey: 'sleepQuality', weight: 0.3 },
        { sliderKey: 'energy', weight: 0.2 },
        { sliderKey: 'motivation', weight: 0.2 },
      ],
    },
    {
      key: 'regulation',
      label: 'Regulation',
      weights: [
        { sliderKey: 'energy', weight: 0.25 },
        { sliderKey: 'sleepQuality', weight: 0.25 },
        { sliderKey: 'recoveryTime', weight: 0.2 },
        { sliderKey: 'mentalLoad', weight: 0.15, invert: true, offset: 100 },
        { sliderKey: 'bodyLoad', weight: 0.15, invert: true, offset: 100 },
      ],
    },
    {
      key: 'friction',
      label: 'Friktion',
      danger: true,
      weights: [
        { sliderKey: 'mentalLoad', weight: 0.3 },
        { sliderKey: 'bodyLoad', weight: 0.25 },
        { sliderKey: 'energy', weight: -0.25 },
        { sliderKey: 'motivation', weight: -0.2 },
      ],
    },
  ],

  primaryMetrics: { regulationKey: 'regulation', frictionKey: 'friction' },

  modeRules: [
    {
      modeKey: 'emergency',
      priority: 30,
      conditions: [{ type: 'computed', key: 'exhaustion', operator: '>', value: 75 }],
    },
    {
      modeKey: 'emergency',
      priority: 29,
      conditions: [
        { type: 'slider', key: 'energy', operator: '<', value: 20 },
        { type: 'slider', key: 'sleepQuality', operator: '<', value: 25 },
      ],
    },
    {
      modeKey: 'rest',
      priority: 20,
      conditions: [{ type: 'computed', key: 'exhaustion', operator: '>', value: 55 }],
    },
    {
      modeKey: 'recharge',
      priority: 10,
      conditions: [
        { type: 'slider', key: 'energy', operator: '>', value: 50 },
        { type: 'slider', key: 'sleepQuality', operator: '>', value: 55 },
        { type: 'slider', key: 'mentalLoad', operator: '<', value: 40 },
      ],
    },
  ],
  defaultModeKey: 'conserve',

  modes: {
    emergency: {
      label: 'Notbremse',
      description: 'Dein System ist stark erschöpft. Jetzt Belastung sofort reduzieren.',
      reflectiveQuestion: 'Was kannst du heute absagen, verschieben oder delegieren?',
      interventions: [
        'Heute keine neuen Aufgaben annehmen.',
        'Frühestmöglich schlafen gehen – alles andere kann warten.',
        'Essen und trinken, auch wenn du keinen Hunger hast.',
        'Bildschirmzeit auf ein Minimum reduzieren.',
      ],
    },
    rest: {
      label: 'Ruhe',
      description: 'Du brauchst gezielte Erholung. Nicht mehr leisten, sondern auffüllen.',
      reflectiveQuestion: 'Welche Art von Ruhe tut dir gerade am meisten gut?',
      interventions: [
        'Plane mindestens 30 Minuten bewusste, reizarme Pause ein.',
        'Nimm einen kurzen Spaziergang an der frischen Luft.',
        'Vermeide Doomscrolling – das ist keine Erholung.',
        'Power-Nap von 20 Minuten, wenn möglich.',
      ],
    },
    conserve: {
      label: 'Haushalten',
      description: 'Energie ist begrenzt. Mach nur, was nötig ist, und spare Reserven.',
      reflectiveQuestion: 'Was ist heute wirklich nötig – und was kann morgen warten?',
      interventions: [
        'Plane maximal 3 Aufgaben für den Rest des Tages.',
        'Pausen zwischen Aufgaben bewusst einhalten.',
        'Keine schwierigen Gespräche oder Entscheidungen heute.',
        'Am Abend: kurz aufschreiben, was gut gelaufen ist.',
      ],
    },
    recharge: {
      label: 'Aufladen',
      description: 'Gute Basis – nutze den Zustand, um Reserven aktiv aufzubauen.',
      reflectiveQuestion: 'Was gibt dir langfristig Energie, das du diese Woche tun könntest?',
      interventions: [
        'Sport, Natur oder kreative Aktivität einplanen.',
        'Soziale Kontakte pflegen, die dir guttun.',
        'Vorausplanen: Was sind die nächsten entspannten Abende?',
        'Schlafrhythmus stabilisieren – auch am Wochenende.',
      ],
    },
  },

  feedbacks: {
    emergency: {
      title: 'Akute Erschöpfung erkannt.',
      text: 'Dein Körper und Kopf brauchen sofort Entlastung. Leistung ist jetzt kontraproduktiv. Erst schützen, dann planen.',
      badge: 'Notbremse',
    },
    rest: {
      title: 'Du brauchst Erholung, nicht Disziplin.',
      text: 'Deine Werte zeigen deutliche Erschöpfungszeichen. Erholung ist keine Schwäche – sie ist die Voraussetzung für alles andere.',
      badge: 'Erholung nötig',
    },
    conserve: {
      title: 'Energie ist begrenzt – haushalte.',
      text: 'Du bist funktionsfähig, aber nicht voll belastbar. Setze Prioritäten und schütze deine Reserven.',
      badge: 'Energie begrenzt',
    },
    recharge: {
      title: 'Gute Basis – jetzt Reserven aufbauen.',
      text: 'Du bist in einem guten Zustand. Nutze das nicht für den nächsten Sprint, sondern um nachhaltig aufzuladen.',
      badge: 'Aufladen möglich',
    },
  },

  idealValues: [
    { sliderKey: 'energy', target: 72 },
    { sliderKey: 'sleepQuality', target: 78 },
    { sliderKey: 'bodyLoad', target: 25 },
    { sliderKey: 'mentalLoad', target: 25 },
    { sliderKey: 'recoveryTime', target: 65 },
    { sliderKey: 'motivation', target: 68 },
  ],

  questionGroups: [
    {
      title: 'Energie & Erschöpfung',
      questions: [
        'Fühlst du dich schon morgens müde?',
        'Brauchst du Koffein, um überhaupt zu funktionieren?',
        'Hast du das Gefühl, dass Erholung nicht mehr reicht?',
      ],
    },
    {
      title: 'Schlaf & Rhythmus',
      questions: [
        'Wachst du nachts auf oder schläfst du unruhig?',
        'Ist dein Schlafrhythmus gerade regelmäßig?',
        'Fühlst du dich morgens erholt?',
      ],
    },
    {
      title: 'Körpersignale',
      questions: [
        'Hast du Kopfschmerzen, Rückenschmerzen oder Verspannungen?',
        'Isst du regelmäßig und ausgewogen?',
        'Trinkst du genug Wasser?',
      ],
    },
    {
      title: 'Mentale Last',
      questions: [
        'Kreisen deine Gedanken, auch wenn du abschalten willst?',
        'Fällt es dir schwer, Dinge loszulassen?',
        'Hast du das Gefühl, nie fertig zu werden?',
      ],
    },
  ],

  defaultTask: 'Ich möchte meinen Energiehaushalt verstehen und herausfinden, was ich heute brauche.',
  defaultMicroCommitment: 'Einmal kurz innehalten und spüren, wie müde ich wirklich bin.',
  resetMicroCommitment: 'Einen Moment Ruhe nehmen und nichts leisten müssen.',
};
