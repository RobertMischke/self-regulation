import { DashboardConfig } from '../models/dashboard-config';

export const orientationCheckConfig: DashboardConfig = {
  key: 'orientation-check',
  title: 'Orientierungs-Check',
  icon: '🧭',
  subtitle: 'Klarheit gewinnen, wenn sich alles diffus anfühlt.',
  goal: 'Klarheit gewinnen, wenn sich alles diffus anfühlt — Prioritäten spüren statt planen.',
  audience: 'Für Momente, in denen du nicht weißt, wo du anfangen sollst.',
  disclaimer:
    'Dieses Tool ist kein Planungsinstrument. Es hilft dir, diffuse Zustände zu sortieren und einen ersten klaren Schritt zu finden.',
  metricLabels: ['Klarheit', 'Richtung', 'Entscheidung', 'Überforderung'],

  sliders: [
    {
      key: 'mentalClarity',
      label: 'Mentale Klarheit',
      left: 'vernebelt',
      right: 'klar',
      description: 'Wie klar du gerade denken kannst. Diffuses Denken, Brain Fog oder Reizüberflutung senken diesen Wert. Ideal: ~72.',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe', microLabel: 'Brain Fog',
          message: 'Dein Denken ist stark vernebelt. In diesem Zustand sind Entscheidungen kaum möglich — erst Klarheit schaffen.',
          interventions: ['Alles aufschreiben, was im Kopf kreist — unstrukturiert, einfach raus.', 'Grundbedürfnisse prüfen: Schlaf, Essen, Wasser.', '5 Minuten an die frische Luft gehen.'],
        },
        {
          direction: 'low', threshold: 40, severity: 'moderate', microLabel: 'Klarheit fehlt',
          message: 'Deine Klarheit ist eingeschränkt. Versuche nicht, alles gleichzeitig zu sortieren.',
          interventions: ['Nur eine einzige Frage beantworten: Was ist gerade am dringendsten?', 'Umgebung aufräumen — äußere Ordnung hilft innerer Klarheit.'],
        },
      ],
    },
    {
      key: 'directionSense',
      label: 'Richtungsgefühl',
      left: 'orientierungslos',
      right: 'klar ausgerichtet',
      description: 'Ob du ein inneres Gefühl für deine Richtung hast. Nicht: perfekter Plan. Sondern: "Ich weiß ungefähr, was als Nächstes dran ist." Ideal: ~70.',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe', microLabel: 'Orientierung fehlt',
          message: 'Du hast gerade kein Gefühl dafür, wohin es gehen soll. Das ist anstrengend, aber normal.',
          interventions: ['Schreibe 3 Dinge auf, die dir gerade wichtig sind — egal wie klein.', 'Frage dich: Was würde mich morgen entlasten, wenn ich es heute tue?', 'Es reicht ein einziger nächster Schritt.'],
        },
        {
          direction: 'low', threshold: 40, severity: 'moderate', microLabel: 'Richtung klären',
          message: 'Dein Richtungsgefühl ist schwach. Oft hilft es, eine klare Absicht zu formulieren.',
          interventions: ['Formuliere einen Satz: „Heute will ich …" — ohne Perfektion.', 'Wähle eine Aufgabe, die unter 15 Minuten dauert.'],
        },
      ],
    },
    {
      key: 'decisionAbility',
      label: 'Entscheidungsfähigkeit',
      left: 'blockiert',
      right: 'entscheidungsstark',
      description: 'Wie leicht du gerade Entscheidungen treffen kannst. Paralyse und Überwägen senken diesen Wert. Ideal: ~68.',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe', microLabel: 'Entscheidungsblockade',
          message: 'Du steckst in Entscheidungsparalyse. Nichts fühlt sich richtig an — das ist ein Schutzmechanismus, kein Versagen.',
          interventions: ['Triff eine bewusst kleine, reversible Entscheidung — egal welche.', 'Setze ein Zeitlimit: In 2 Minuten wähle ich eins von zwei.', 'Erlaube dir, falsch zu liegen. Korrigieren geht immer.'],
        },
        {
          direction: 'low', threshold: 40, severity: 'moderate', microLabel: 'vereinfachen',
          message: 'Entscheidungen fallen dir gerade schwer. Vermutlich wägt du zu viel ab.',
          interventions: ['Reduziere Optionen auf maximal zwei.', 'Frage dich: Was würde ich einer Freundin raten?'],
        },
      ],
    },
    {
      key: 'overwhelm',
      label: 'Überforderungsgefühl',
      left: 'ruhig',
      right: 'überwältigt',
      description: 'Wie stark das Gefühl der Überforderung gerade ist. Ideal: niedrig (~25). Hohe Werte blockieren jede Handlung.',
      feedbackZones: [
        {
          direction: 'high', threshold: 80, severity: 'severe', microLabel: 'Überforderung',
          message: 'Du bist massiv überfordert. Dein System ist im Schutzmodus — jede weitere Anforderung verstärkt die Blockade.',
          interventions: ['Sofort Anforderungen reduzieren. Alles, was warten kann, wartet.', 'Atme langsam: 4 ein, 6 aus, 5 Runden.', 'Sag jemandem: „Ich brauche gerade 10 Minuten."'],
        },
        {
          direction: 'high', threshold: 60, severity: 'moderate', microLabel: 'erst sortieren',
          message: 'Überforderung baut sich auf. Bevor du mehr draufpackst, sortiere das Vorhandene.',
          interventions: ['Erstelle eine Brain-Dump-Liste: alles raus, ohne Ordnung.', 'Streiche bewusst 2 Dinge von der Liste.'],
        },
      ],
    },
    {
      key: 'innerNoise',
      label: 'Inneres Rauschen',
      left: 'still',
      right: 'laut',
      description: 'Wie viele Gedanken, Impulse und innere Stimmen gleichzeitig aktiv sind. Ideal: niedrig (~28). Hohes Rauschen verhindert fokussiertes Denken.',
      feedbackZones: [
        {
          direction: 'high', threshold: 75, severity: 'severe', microLabel: 'inneres Rauschen',
          message: 'Sehr hohes inneres Rauschen. Deine Gedanken überlagern sich — Klarheit ist so kaum möglich.',
          interventions: ['Schreib alles auf, was im Kopf ist — 5 Minuten, ohne zu bewerten.', 'Lege das Handy weg und schließe alle Tabs.', 'Stille oder monotoner Sound für 5 Minuten.'],
        },
        {
          direction: 'high', threshold: 55, severity: 'moderate', microLabel: 'Kopf beruhigen',
          message: 'Dein Kopf ist unruhig. Bevor du sortierst, hilft es, erst mal runterzukommen.',
          interventions: ['Kurze Atem-Übung: 3 tiefe Atemzüge, bewusst langsam.', 'Einen Gedanken aufschreiben, der besonders laut ist.'],
        },
      ],
    },
    {
      key: 'bodyGrounding',
      label: 'Körperliche Erdung',
      left: 'abgehoben',
      right: 'geerdet',
      description: 'Wie präsent du in deinem Körper bist. Erdung gibt Orientierung, wenn der Kopf es nicht kann. Ideal: ~72.',
      feedbackZones: [
        {
          direction: 'low', threshold: 25, severity: 'severe', microLabel: 'nicht geerdet',
          message: 'Du bist kaum in deinem Körper. Kopf-gesteuerte Orientierung funktioniert so nicht.',
          interventions: ['Füße bewusst auf den Boden drücken, Haltung aufrichten.', 'Kaltes Wasser über die Hände laufen lassen.', 'Einen Gegenstand in die Hand nehmen und bewusst fühlen.'],
        },
        {
          direction: 'low', threshold: 40, severity: 'moderate', microLabel: 'mehr Erdung',
          message: 'Du bist etwas entwurzelt. Dein Körper kann dir Orientierung geben, wenn dein Kopf kreist.',
          interventions: ['Bewusst aufstehen und dich strecken.', '1 Minute bewusst kauen (Kaugummi, Apfel, Nüsse).'],
        },
      ],
    },
  ],

  defaultValues: {
    mentalClarity: 38, directionSense: 35, decisionAbility: 42,
    overwhelm: 55, innerNoise: 60, bodyGrounding: 45,
  },
  resetValues: {
    mentalClarity: 72, directionSense: 70, decisionAbility: 68,
    overwhelm: 25, innerNoise: 28, bodyGrounding: 72,
  },

  computedMetrics: [
    {
      key: 'orientation',
      label: 'Orientierung',
      description: 'Gesamtmaß für deine Orientierung — kombiniert Klarheit, Richtungsgefühl, Entscheidungsfähigkeit und (umgekehrt) Überforderung.',
      weights: [
        { sliderKey: 'mentalClarity', weight: 0.3 },
        { sliderKey: 'directionSense', weight: 0.3 },
        { sliderKey: 'decisionAbility', weight: 0.2 },
        { sliderKey: 'overwhelm', weight: 0.2, invert: true, offset: 100 },
      ],
    },
    {
      key: 'confusion',
      label: 'Diffusität',
      description: 'Wie diffus und unklar dein Zustand ist — basierend auf geringer Klarheit, fehlendem Richtungsgefühl und hohem inneren Rauschen. Hohe Werte = alles verschwimmt.',
      danger: true,
      weights: [
        { sliderKey: 'mentalClarity', weight: -0.3 },
        { sliderKey: 'directionSense', weight: -0.25 },
        { sliderKey: 'innerNoise', weight: 0.25 },
        { sliderKey: 'overwhelm', weight: 0.2 },
      ],
    },
    {
      key: 'regulation',
      label: 'Regulation',
      description: 'Wie gut du dich gerade orientieren und steuern kannst — basierend auf Klarheit, Richtung, Erdung und (umgekehrt) Überforderung.',
      weights: [
        { sliderKey: 'mentalClarity', weight: 0.25 },
        { sliderKey: 'directionSense', weight: 0.25 },
        { sliderKey: 'bodyGrounding', weight: 0.2 },
        { sliderKey: 'overwhelm', weight: 0.15, invert: true, offset: 100 },
        { sliderKey: 'innerNoise', weight: 0.15, invert: true, offset: 100 },
      ],
    },
    {
      key: 'friction',
      label: 'Friktion',
      description: 'Innerer Widerstand gegen Orientierung und Handlung — hohe Werte zeigen: zu viel Rauschen, Überforderung und zu wenig Klarheit.',
      danger: true,
      weights: [
        { sliderKey: 'mentalClarity', weight: -0.25 },
        { sliderKey: 'decisionAbility', weight: -0.2 },
        { sliderKey: 'overwhelm', weight: 0.25 },
        { sliderKey: 'innerNoise', weight: 0.2 },
        { sliderKey: 'bodyGrounding', weight: -0.1 },
      ],
    },
  ],

  primaryMetrics: { regulationKey: 'regulation', frictionKey: 'friction' },

  modeRules: [
    {
      modeKey: 'pause',
      priority: 30,
      conditions: [{ type: 'slider', key: 'overwhelm', operator: '>', value: 75 }],
    },
    {
      modeKey: 'pause',
      priority: 29,
      conditions: [{ type: 'computed', key: 'confusion', operator: '>', value: 60 }],
    },
    {
      modeKey: 'explore',
      priority: 20,
      conditions: [{ type: 'slider', key: 'mentalClarity', operator: '<', value: 35 }],
    },
    {
      modeKey: 'decide',
      priority: 10,
      conditions: [
        { type: 'slider', key: 'mentalClarity', operator: '>', value: 55 },
        { type: 'slider', key: 'directionSense', operator: '>', value: 50 },
        { type: 'slider', key: 'overwhelm', operator: '<', value: 45 },
      ],
    },
  ],
  defaultModeKey: 'sort',

  modes: {
    pause: {
      label: 'Pause',
      description: 'Du bist zu überfordert oder diffus, um zu sortieren. Erst runterfahren.',
      reflectiveQuestion: 'Was ist gerade zu viel — die Menge, die Unklarheit oder der Druck?',
      interventions: [
        'Alles stoppen und 3 Minuten nur atmen.',
        'Schreibe alles auf, was im Kopf kreist — ohne Ordnung.',
        'Sage dir: Ich muss jetzt nichts entscheiden.',
        'Einen Tee machen, Fenster öffnen, langsam werden.',
      ],
    },
    explore: {
      label: 'Erkunden',
      description: 'Wenn noch nicht klar ist, was wichtig ist. Erst spüren, dann sortieren.',
      reflectiveQuestion: 'Was fällt dir als Erstes ein, wenn du an den Tag denkst? Was davon zieht?',
      interventions: [
        'Brain Dump: 5 Minuten alles aufschreiben, was da ist.',
        'Markiere danach 1–2 Dinge, die sich wichtig anfühlen.',
        'Nicht planen — nur wahrnehmen, was Energie hat.',
        'Spaziergang ohne Ziel kann Klarheit bringen.',
      ],
    },
    sort: {
      label: 'Sortieren',
      description: 'Du hast erste Orientierung. Jetzt Struktur geben und priorisieren.',
      reflectiveQuestion: 'Welche 2–3 Dinge sind heute wirklich relevant? Was kann warten?',
      interventions: [
        'Schreibe maximal 3 Aufgaben auf, die heute zählen.',
        'Reihenfolge festlegen: Was zuerst, was danach?',
        'Zeitblöcke grob verteilen — nicht überplanen.',
        'Eine erste Aufgabe direkt beginnen.',
      ],
    },
    decide: {
      label: 'Entscheiden',
      description: 'Du hast genug Klarheit, um echte Entscheidungen zu treffen.',
      reflectiveQuestion: 'Welche Entscheidung steht an, und was brauchst du, um sie zu treffen?',
      interventions: [
        'Formuliere die Entscheidung als Frage mit maximal 2 Optionen.',
        'Setze ein Zeitlimit: In 10 Minuten ist entschieden.',
        'Erlaube dir, falsch zu liegen — Korrektur ist möglich.',
        'Teile die Entscheidung jemandem mit — das macht sie real.',
      ],
    },
  },

  feedbacks: {
    pause: {
      title: 'Du bist gerade überladen, nicht orientierungslos.',
      text: 'Bevor du sortierst, lass erst den Druck raus. Klarheit kommt, wenn der Kopf Platz hat.',
      badge: 'Überforderung aktiv',
    },
    explore: {
      title: 'Noch ist vieles diffus — das ist okay.',
      text: 'Du brauchst keine fertige Richtung. Fang damit an, wahrzunehmen, was da ist.',
      badge: 'Erkundungsphase',
    },
    sort: {
      title: 'Du hast erste Anhaltspunkte.',
      text: 'Jetzt geht es darum, aus vielen Möglichkeiten wenige auszuwählen und eine Reihenfolge zu finden.',
      badge: 'Sortierungsmodus',
    },
    decide: {
      title: 'Du bist bereit, Entscheidungen zu treffen.',
      text: 'Deine Klarheit reicht, um bewusst zu wählen. Nicht perfekt — aber gut genug.',
      badge: 'Entscheidungsfenster',
    },
  },

  idealValues: [
    { sliderKey: 'mentalClarity', target: 72 },
    { sliderKey: 'directionSense', target: 70 },
    { sliderKey: 'decisionAbility', target: 68 },
    { sliderKey: 'overwhelm', target: 25 },
    { sliderKey: 'innerNoise', target: 28 },
    { sliderKey: 'bodyGrounding', target: 72 },
  ],
};
