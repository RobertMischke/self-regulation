import { DashboardConfig } from '../models/dashboard-config';

export const socialRegulationConfig: DashboardConfig = {
  key: 'social-regulation',
  title: 'Soziale Regulation',
  icon: '🤝',
  subtitle: 'Beziehungsdynamiken einordnen, Grenzen spüren und Sicherheit wiederfinden.',
  goal: 'Beziehungsdynamiken einordnen, Grenzen spüren und Sicherheit wiederfinden.',
  audience: 'Für Situationen, in denen zwischenmenschliche Spannung deine innere Stabilität beeinflusst.',
  disclaimer:
    'Dieses Tool ersetzt keine Therapie und keine Beziehungsberatung. Es hilft dir, soziale Belastungen sichtbar zu machen und passende nächste Schritte zu finden.',
  metricLabels: ['Bindung', 'Grenzen', 'Sicherheit', 'Konfliktniveau'],

  sliders: [
    {
      key: 'safetyInRelations',
      label: 'Sicherheit in Beziehungen',
      left: 'unsicher',
      right: 'sicher',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe',
          message: 'Du fühlst dich in deinen Beziehungen sehr unsicher. Das aktiviert Schutzmechanismen, die Nähe und Klarheit blockieren.',
          interventions: ['Benenne für dich, wer gerade Unsicherheit auslöst.', 'Suche bewusst den Kontakt zu einer Person, bei der du dich sicher fühlst.', 'Erlaube dir, jetzt Distanz zu nehmen — das ist kein Rückzug, sondern Schutz.'],
        },
        {
          direction: 'low', threshold: 40, severity: 'moderate',
          message: 'Dein Sicherheitsgefühl in Beziehungen ist eingeschränkt. Das kann unterschwellig viel Energie kosten.',
          interventions: ['Frage dich: Wer tut mir gerade gut, wer eher nicht?', 'Ein kurzes Gespräch mit einer vertrauten Person kann helfen.'],
        },
      ],
    },
    {
      key: 'boundaryClarity',
      label: 'Grenzen-Klarheit',
      left: 'diffus',
      right: 'klar',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe',
          message: 'Du hast gerade kaum Gespür für deine Grenzen. Damit steigt das Risiko, dich zu überfordern oder übergangen zu fühlen.',
          interventions: ['Stopp: Was davon ist meins, was gehört jemand anderem?', 'Sage heute bewusst einmal Nein — auch wenn es klein ist.', 'Körpersignal beachten: Wo spürst du Enge, Druck oder Widerstand?'],
        },
        {
          direction: 'low', threshold: 40, severity: 'moderate',
          message: 'Deine Grenzen sind gerade etwas verschwommen. Typisch, wenn du viel für andere da bist.',
          interventions: ['Formuliere einen Satz, der anfängt mit: „Ich brauche gerade …"', 'Plane bewusst 30 Minuten nur für dich ein.'],
        },
      ],
    },
    {
      key: 'belongingNeed',
      label: 'Zugehörigkeitsbedürfnis',
      left: 'erfüllt',
      right: 'unerfüllt',
      feedbackZones: [
        {
          direction: 'high', threshold: 80, severity: 'severe',
          message: 'Du fühlst dich stark isoliert oder nicht zugehörig. Das ist ein fundamentales Bedürfnis — nimm es ernst.',
          interventions: ['Schreibe einer Person, die dir etwas bedeutet — auch ohne Anlass.', 'Geh an einen Ort mit Menschen (Café, Park, Bibliothek).', 'Erinnere dich: Zugehörigkeit entsteht oft durch kleine Gesten, nicht durch große.'],
        },
        {
          direction: 'high', threshold: 60, severity: 'moderate',
          message: 'Dein Bedürfnis nach Zugehörigkeit ist erhöht. Vielleicht warst du zu lange allein oder fühlst dich ausgeschlossen.',
          interventions: ['Plane ein Treffen oder einen Anruf ein.', 'Auch kurze Kontakte zählen — ein Gruß, ein Lächeln.'],
        },
      ],
    },
    {
      key: 'conflictLevel',
      label: 'Konfliktniveau',
      left: 'friedlich',
      right: 'belastet',
      feedbackZones: [
        {
          direction: 'high', threshold: 80, severity: 'severe',
          message: 'Der Konfliktpegel ist sehr hoch. In diesem Zustand sind produktive Gespräche kaum möglich.',
          interventions: ['Nicht jetzt klären. Erst regulieren, dann reden.', 'Schreibe auf, was dich wirklich stört — ohne es abzuschicken.', 'Frage dich: Was davon ist akuter Frust, was tieferer Schmerz?'],
        },
        {
          direction: 'high', threshold: 55, severity: 'moderate',
          message: 'Du trägst gerade einen Konflikt mit dir. Das bindet Energie und Aufmerksamkeit.',
          interventions: ['Benenne den Konflikt in einem Satz für dich.', 'Überlege: Muss das heute geklärt werden oder kann es warten?'],
        },
      ],
    },
    {
      key: 'emotionalExposure',
      label: 'Emotionale Offenheit',
      left: 'verschlossen',
      right: 'sehr offen',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'moderate',
          message: 'Du bist emotional sehr verschlossen. Das kann schützen, aber auch isolieren.',
          interventions: ['Frage dich: Schütze ich mich — oder verstecke ich mich?', 'Teile einer Person ein kleines, ehrliches Gefühl mit.'],
        },
        {
          direction: 'high', threshold: 80, severity: 'moderate',
          message: 'Du bist emotional sehr offen — achte darauf, dass du dabei nicht verletzlich wirst, ohne Rückhalt zu haben.',
          interventions: ['Prüfe: Habe ich gerade jemanden, der mir Sicherheit gibt?', 'Es ist okay, dich zwischendurch abzugrenzen.'],
        },
      ],
    },
    {
      key: 'socialEnergy',
      label: 'Soziale Energie',
      left: 'erschöpft',
      right: 'voll',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe',
          message: 'Deine soziale Energie ist aufgebraucht. Jede weitere Interaktion kostet überproportional viel.',
          interventions: ['Gib dir Erlaubnis, dich zurückzuziehen — ohne schlechtes Gewissen.', 'Sage ein Treffen ab, wenn es nicht essenziell ist.', 'Stille und Alleinsein ist jetzt Erholung, nicht Vermeidung.'],
        },
        {
          direction: 'low', threshold: 40, severity: 'moderate',
          message: 'Deine soziale Energie ist niedrig. Wähle bewusst, mit wem du sie gerade teilst.',
          interventions: ['Plane bewusst eine soziale Pause ein.', 'Wenn möglich: asynchrone Kommunikation bevorzugen.'],
        },
      ],
    },
  ],

  defaultValues: {
    safetyInRelations: 48, boundaryClarity: 40, belongingNeed: 55,
    conflictLevel: 45, emotionalExposure: 50, socialEnergy: 42,
  },
  resetValues: {
    safetyInRelations: 68, boundaryClarity: 65, belongingNeed: 30,
    conflictLevel: 25, emotionalExposure: 50, socialEnergy: 65,
  },

  computedMetrics: [
    {
      key: 'socialSafety',
      label: 'Soziale Sicherheit',
      weights: [
        { sliderKey: 'safetyInRelations', weight: 0.35 },
        { sliderKey: 'boundaryClarity', weight: 0.25 },
        { sliderKey: 'conflictLevel', weight: 0.2, invert: true, offset: 100 },
        { sliderKey: 'socialEnergy', weight: 0.2 },
      ],
    },
    {
      key: 'socialStrain',
      label: 'Soziale Belastung',
      danger: true,
      weights: [
        { sliderKey: 'conflictLevel', weight: 0.3 },
        { sliderKey: 'belongingNeed', weight: 0.25 },
        { sliderKey: 'safetyInRelations', weight: -0.25 },
        { sliderKey: 'socialEnergy', weight: -0.2 },
      ],
    },
    {
      key: 'regulation',
      label: 'Regulation',
      weights: [
        { sliderKey: 'safetyInRelations', weight: 0.25 },
        { sliderKey: 'boundaryClarity', weight: 0.25 },
        { sliderKey: 'socialEnergy', weight: 0.2 },
        { sliderKey: 'conflictLevel', weight: 0.15, invert: true, offset: 100 },
        { sliderKey: 'belongingNeed', weight: 0.15, invert: true, offset: 100 },
      ],
    },
    {
      key: 'friction',
      label: 'Friktion',
      danger: true,
      weights: [
        { sliderKey: 'conflictLevel', weight: 0.3 },
        { sliderKey: 'belongingNeed', weight: 0.2 },
        { sliderKey: 'boundaryClarity', weight: -0.2 },
        { sliderKey: 'safetyInRelations', weight: -0.2 },
        { sliderKey: 'socialEnergy', weight: -0.1 },
      ],
    },
  ],

  primaryMetrics: { regulationKey: 'regulation', frictionKey: 'friction' },

  modeRules: [
    {
      modeKey: 'retreat',
      priority: 30,
      conditions: [{ type: 'slider', key: 'socialEnergy', operator: '<', value: 20 }],
    },
    {
      modeKey: 'retreat',
      priority: 29,
      conditions: [{ type: 'slider', key: 'conflictLevel', operator: '>', value: 75 }],
    },
    {
      modeKey: 'protect',
      priority: 20,
      conditions: [{ type: 'slider', key: 'boundaryClarity', operator: '<', value: 30 }],
    },
    {
      modeKey: 'connect',
      priority: 10,
      conditions: [
        { type: 'slider', key: 'safetyInRelations', operator: '>', value: 55 },
        { type: 'slider', key: 'socialEnergy', operator: '>', value: 45 },
        { type: 'slider', key: 'conflictLevel', operator: '<', value: 40 },
      ],
    },
  ],
  defaultModeKey: 'navigate',

  modes: {
    retreat: {
      label: 'Rückzug',
      description: 'Du brauchst Abstand — entweder wegen Erschöpfung oder weil ein Konflikt zu belastend ist.',
      reflectiveQuestion: 'Was brauchst du gerade mehr — Ruhe von anderen oder Ruhe von dir selbst?',
      interventions: [
        'Erlaube dir Rückzug ohne Rechtfertigung.',
        'Sage ab, was abgesagt werden kann.',
        'Stille und Alleinsein ist jetzt keine Schwäche.',
        'Setze eine klare Grenze: „Ich melde mich, wenn ich bereit bin."',
      ],
    },
    protect: {
      label: 'Schützen',
      description: 'Deine Grenzen sind verschwommen. Jetzt aktiv abgrenzen und eigene Bedürfnisse priorisieren.',
      reflectiveQuestion: 'Wo hast du zuletzt Ja gesagt, obwohl du Nein gemeint hast?',
      interventions: [
        'Sage heute bewusst einmal Nein.',
        'Formuliere klar, was du brauchst — auch dir selbst gegenüber.',
        'Prüfe: Sorge ich gerade für andere auf meine Kosten?',
        'Eine halbe Stunde nur für dich einplanen.',
      ],
    },
    navigate: {
      label: 'Navigieren',
      description: 'Du bist sozial funktionsfähig, aber nicht ganz in Balance. Bewusst steuern statt reagieren.',
      reflectiveQuestion: 'Welche Beziehung fordert gerade am meisten — und was brauchst du dort?',
      interventions: [
        'Überlege, welches Gespräch überfällig ist.',
        'Wähle bewusst: Mit wem teilst du heute Energie?',
        'Kleine ehrliche Geste statt große Klärung.',
        'Einen Menschen anrufen, der dir gut tut.',
      ],
    },
    connect: {
      label: 'Verbinden',
      description: 'Du hast genug Sicherheit und Energie, um echte Nähe zuzulassen.',
      reflectiveQuestion: 'Wen möchtest du erreichen — und was möchtest du teilen?',
      interventions: [
        'Schreibe oder rufe jemanden an, einfach so.',
        'Teile etwas Persönliches mit jemandem, dem du vertraust.',
        'Plane ein gemeinsames Erlebnis — auch etwas Kleines.',
        'Sag jemandem, was du an ihm schätzt.',
      ],
    },
  },

  feedbacks: {
    retreat: {
      title: 'Dein System braucht gerade Abstand.',
      text: 'Das ist kein Versagen, sondern eine sinnvolle Schutzreaktion. Erst regulieren, dann sozial interagieren.',
      badge: 'Rückzugsmodus',
    },
    protect: {
      title: 'Deine Grenzen brauchen gerade Aufmerksamkeit.',
      text: 'Wenn du nicht weißt, wo deine Grenzen sind, kann jede Interaktion zu viel sein. Jetzt aktiv abgrenzen.',
      badge: 'Grenzen stärken',
    },
    navigate: {
      title: 'Du bist sozial unterwegs, aber aufmerksam.',
      text: 'Nicht alles ist leicht gerade — aber du kannst bewusst steuern, wo du Energie investierst.',
      badge: 'Bewusstes Navigieren',
    },
    connect: {
      title: 'Guter Moment für echte Verbindung.',
      text: 'Du hast genug innere Sicherheit und Energie, um Nähe zuzulassen. Nutze das Fenster.',
      badge: 'Verbindungsfenster',
    },
  },

  idealValues: [
    { sliderKey: 'safetyInRelations', target: 75 },
    { sliderKey: 'boundaryClarity', target: 72 },
    { sliderKey: 'belongingNeed', target: 25 },
    { sliderKey: 'conflictLevel', target: 18 },
    { sliderKey: 'emotionalExposure', target: 55 },
    { sliderKey: 'socialEnergy', target: 70 },
  ],
};
