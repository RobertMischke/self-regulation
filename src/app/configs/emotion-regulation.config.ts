import { DashboardConfig } from '../models/dashboard-config';

export const emotionRegulationConfig: DashboardConfig = {
  key: 'emotion-regulation',
  title: 'Emotions-Regulations-Dashboard',
  icon: '💛',
  subtitle: 'Emotionale Zustände erkennen, einordnen und gezielt regulieren.',
  goal: 'Gefühle regulieren, Überflutung reduzieren und wieder handlungsfähig werden.',
  audience: 'Für Stress, Frust, Unsicherheit, Scham und emotionale Stabilisierung.',
  disclaimer:
    'Dieses Dashboard ersetzt keine Therapie. Es hilft dir, deine emotionale Lage bewusst wahrzunehmen und passende Regulationsschritte zu finden.',
  metricLabels: ['Emotionaler Druck', 'Selbstwert', 'Sicherheit', 'Beruhigung'],

  sliders: [
    { key: 'emotionalPressure', label: 'Emotionaler Druck', left: 'ruhig', right: 'hoch' },
    { key: 'selfWorth', label: 'Selbstwertgefühl', left: 'niedrig', right: 'stabil' },
    { key: 'safety', label: 'Innere Sicherheit', left: 'unsicher', right: 'sicher' },
    { key: 'shame', label: 'Scham / Bewertungsdruck', left: 'wenig', right: 'stark' },
    { key: 'frustration', label: 'Frustration', left: 'gelassen', right: 'frustriert' },
    { key: 'bodyTension', label: 'Körperspannung', left: 'locker', right: 'verspannt' },
  ],

  defaultValues: {
    emotionalPressure: 55, selfWorth: 42, safety: 38,
    shame: 48, frustration: 52, bodyTension: 50,
  },
  resetValues: {
    emotionalPressure: 30, selfWorth: 65, safety: 65,
    shame: 25, frustration: 28, bodyTension: 30,
  },

  computedMetrics: [
    {
      key: 'emotionalLoad',
      label: 'Emotionale Belastung',
      danger: true,
      weights: [
        { sliderKey: 'emotionalPressure', weight: 0.3 },
        { sliderKey: 'shame', weight: 0.25 },
        { sliderKey: 'frustration', weight: 0.25 },
        { sliderKey: 'bodyTension', weight: 0.2 },
      ],
    },
    {
      key: 'emotionalStability',
      label: 'Emotionale Stabilität',
      weights: [
        { sliderKey: 'selfWorth', weight: 0.35 },
        { sliderKey: 'safety', weight: 0.35 },
        { sliderKey: 'emotionalPressure', weight: 0.15, invert: true, offset: 100 },
        { sliderKey: 'bodyTension', weight: 0.15, invert: true, offset: 100 },
      ],
    },
    {
      key: 'regulation',
      label: 'Regulation',
      weights: [
        { sliderKey: 'selfWorth', weight: 0.3 },
        { sliderKey: 'safety', weight: 0.3 },
        { sliderKey: 'emotionalPressure', weight: 0.2, invert: true, offset: 100 },
        { sliderKey: 'frustration', weight: 0.2, invert: true, offset: 100 },
      ],
    },
    {
      key: 'friction',
      label: 'Friktion',
      danger: true,
      weights: [
        { sliderKey: 'emotionalPressure', weight: 0.3 },
        { sliderKey: 'shame', weight: 0.25 },
        { sliderKey: 'frustration', weight: 0.2 },
        { sliderKey: 'selfWorth', weight: -0.15 },
        { sliderKey: 'safety', weight: -0.1 },
      ],
    },
  ],

  primaryMetrics: { regulationKey: 'regulation', frictionKey: 'friction' },

  modeRules: [
    {
      modeKey: 'crisis',
      priority: 30,
      conditions: [{ type: 'computed', key: 'emotionalLoad', operator: '>', value: 70 }],
    },
    {
      modeKey: 'crisis',
      priority: 29,
      conditions: [
        { type: 'slider', key: 'emotionalPressure', operator: '>', value: 75 },
        { type: 'slider', key: 'safety', operator: '<', value: 30 },
      ],
    },
    {
      modeKey: 'soothe',
      priority: 20,
      conditions: [
        { type: 'slider', key: 'shame', operator: '>', value: 60 },
      ],
    },
    {
      modeKey: 'soothe',
      priority: 19,
      conditions: [
        { type: 'slider', key: 'frustration', operator: '>', value: 65 },
      ],
    },
    {
      modeKey: 'reflect',
      priority: 10,
      conditions: [
        { type: 'slider', key: 'selfWorth', operator: '>', value: 55 },
        { type: 'slider', key: 'safety', operator: '>', value: 50 },
        { type: 'slider', key: 'emotionalPressure', operator: '<', value: 40 },
      ],
    },
  ],
  defaultModeKey: 'stabilize',

  modes: {
    crisis: {
      label: 'Krisenmodus',
      description: 'Emotionale Überflutung – erst sichern, dann sortieren.',
      reflectiveQuestion: 'Was brauchst du gerade am dringendsten: Ruhe, Sicherheit oder Abstand?',
      interventions: [
        'Atme 4 Sekunden ein, halte 4, atme 6 aus. Wiederhole 3x.',
        'Nenne 5 Dinge, die du siehst. Dann 4, die du hörst. (5-4-3-2-1)',
        'Hände unter kaltes Wasser halten.',
        'Erlaube dir, gerade nichts lösen zu müssen.',
      ],
    },
    soothe: {
      label: 'Beruhigen',
      description: 'Scham, Frust oder Unsicherheit sind aktiviert – sanft regulieren.',
      reflectiveQuestion: 'Ist das gerade ein echtes Problem oder eine alte Bewertung?',
      interventions: [
        'Sprich mit dir wie mit einem Freund – nicht wie mit einem Richter.',
        'Schreibe auf, was dich gerade belastet. Nur 3 Sätze.',
        'Mach etwas Körperliches: Dehnen, Spazieren, Schultern lockern.',
        'Erinnere dich: Scham ist kein Beweis für Versagen.',
      ],
    },
    stabilize: {
      label: 'Stabilisieren',
      description: 'Emotionen sind präsent, aber handhabbar. Struktur hilft.',
      reflectiveQuestion: 'Was ist gerade eine kleine Handlung, die dir Kontrolle zurückgibt?',
      interventions: [
        'Mach eine Aufgabe, die dir leichtfällt – das stabilisiert.',
        'Vermeide gerade Bewertungssituationen, wenn möglich.',
        'Halte Kontakt zu einer vertrauensvollen Person.',
        'Plane den nächsten Schritt, aber nicht den ganzen Tag.',
      ],
    },
    reflect: {
      label: 'Reflektieren',
      description: 'Stabile Basis – guter Moment für tiefere Auseinandersetzung.',
      reflectiveQuestion: 'Was war heute emotional leichter als erwartet – und warum?',
      interventions: [
        'Journaling: Was hat heute Druck ausgelöst? Was hat geholfen?',
        'Überprüfe deine Bewertungsmuster: Ist dein innerer Kritiker fair?',
        'Überlege, welche Situation morgen schwierig werden könnte – und plane.',
        'Feiere etwas, das du heute geschafft hast, egal wie klein.',
      ],
    },
  },

  feedbacks: {
    crisis: {
      title: 'Emotionale Überflutung erkannt.',
      text: 'Dein System ist gerade überlastet. Keine Entscheidungen treffen, erst regulieren. Du bist nicht unfähig – du bist überreizt.',
      badge: 'Emotionale Überflutung',
    },
    soothe: {
      title: 'Scham oder Frust sind gerade laut.',
      text: 'Dein Innerer Kritiker ist wahrscheinlich aktiv. Versuche, sanft mit dir zu sein. Reaktionen sind nicht immer Realität.',
      badge: 'Beruhigung empfohlen',
    },
    stabilize: {
      title: 'Emotionaler Boden ist da, aber wacklig.',
      text: 'Du bist nicht in der Krise, aber auch nicht stabil. Struktur und Verlässlichkeit helfen jetzt mehr als Ambition.',
      badge: 'Stabilisieren',
    },
    reflect: {
      title: 'Emotional stabil genug zum Nachdenken.',
      text: 'Guter Moment, um Muster zu erkennen und bewusst zu reflektieren. Nicht erzwingen – nur hinschauen.',
      badge: 'Reflexionsfenster',
    },
  },

  idealValues: [
    { sliderKey: 'emotionalPressure', target: 25 },
    { sliderKey: 'selfWorth', target: 72 },
    { sliderKey: 'safety', target: 75 },
    { sliderKey: 'shame', target: 18 },
    { sliderKey: 'frustration', target: 20 },
    { sliderKey: 'bodyTension', target: 25 },
  ],

  questionGroups: [
    {
      title: 'Emotionaler Druck',
      questions: [
        'Fühlst du gerade inneren Druck, ohne klaren Auslöser?',
        'Reagierst du stärker als die Situation es erfordert?',
        'Fällt es dir schwer, zur Ruhe zu kommen?',
      ],
    },
    {
      title: 'Scham & Selbstbewertung',
      questions: [
        'Bewertest du dich gerade hart für etwas?',
        'Hast du das Gefühl, nicht zu genügen?',
        'Vergleichst du dich gerade mit anderen?',
      ],
    },
    {
      title: 'Sicherheit & Bindung',
      questions: [
        'Fühlst du dich gerade sicher in deinen Beziehungen?',
        'Hast du das Gefühl, dazuzugehören?',
        'Gibt es jemanden, den du jetzt anrufen könntest?',
      ],
    },
    {
      title: 'Körperreaktion',
      questions: [
        'Sind Schultern, Kiefer oder Bauch angespannt?',
        'Hast du einen Kloß im Hals oder Enge in der Brust?',
        'Ist dein Atem flach oder unregelmäßig?',
      ],
    },
  ],

  defaultTask: 'Ich möchte verstehen, was mich gerade emotional belastet, und einen ersten Schritt zur Regulation finden.',
  defaultMicroCommitment: 'Einmal bewusst durchatmen und hinspüren.',
  resetMicroCommitment: 'Kurz innehalten und wahrnehmen, wie es mir gerade geht.',
};
