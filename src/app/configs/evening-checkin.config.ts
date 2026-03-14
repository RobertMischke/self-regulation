import { DashboardConfig } from '../models/dashboard-config';

export const eveningCheckinConfig: DashboardConfig = {
  key: 'evening-checkin',
  title: 'Abend-Check-in',
  icon: '🌙',
  subtitle: 'Den Tag einordnen, loslassen und den Übergang in den Abend bewusst gestalten.',
  goal: 'Den Tag einordnen, loslassen und den Übergang in den Abend bewusst gestalten.',
  audience: 'Für den Tagesabschluss, wenn Gedanken kreisen und der Kopf nicht zur Ruhe kommt.',
  disclaimer:
    'Keine Schlafmedizin, keine Therapie. Dieses Dashboard hilft dir, den Tag bewusst abzuschließen und den Übergang in Erholung zu gestalten.',
  metricLabels: ['Reflexion', 'Loslassen', 'Schlaf', 'Abschluss'],

  sliders: [
    {
      key: 'mentalRest',
      label: 'Mentale Ruhe',
      left: 'unruhig',
      right: 'still',
      description: 'Wie ruhig dein Kopf gerade ist. Kreisende Gedanken und Grübeln senken diesen Wert. Ideal: ~75 — still genug zum Einschlafen.',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe', microLabel: 'Kopf zu unruhig',
          message: 'Dein Kopf ist extrem unruhig. In diesem Zustand wirst du kaum einschlafen können — erst runterfahren.',
          interventions: ['Alles aufschreiben, was im Kopf kreist — ein Brain Dump vor dem Schlafen.', 'Bildschirme ab jetzt aus. Licht dimmen.', 'Atemübung: 4 ein, 7 halten, 8 aus — 5 Runden.'],
        },
        {
          direction: 'low', threshold: 40, severity: 'moderate', microLabel: 'erst runterfahren',
          message: 'Dein Kopf ist noch recht aktiv. Typisch, wenn der Tag viel Input hatte.',
          interventions: ['10-Minuten-Regel: Ab jetzt kein neues Thema mehr anfangen.', 'Leichte Lektüre oder ruhige Musik statt Bildschirm.'],
        },
      ],
    },
    {
      key: 'dayCompletion',
      label: 'Tagesabschluss-Gefühl',
      left: 'offen',
      right: 'abgeschlossen',
      description: 'Ob sich der Tag "fertig" anfühlt. Offene Schleifen halten den Kopf wach. Ideal: ~78 — das Gefühl, genug getan zu haben.',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe', microLabel: 'Tag offen',
          message: 'Du hast das Gefühl, der Tag ist noch nicht fertig. Offene Schleifen machen den Kopf unruhig.',
          interventions: ['Schreibe 3 Dinge auf, die du heute geschafft hast — egal wie klein.', 'Notiere 1 Ding, das morgen dran ist — und dann loslassen.', 'Sage dir bewusst: Der Tag ist jetzt beendet.'],
        },
        {
          direction: 'low', threshold: 40, severity: 'moderate', microLabel: 'Rückblick hilfreich',
          message: 'Der Tag fühlt sich noch nicht ganz abgeschlossen an. Ein kurzer Rückblick kann helfen.',
          interventions: ['Kurze Reflexion: Was lief gut, was bleibt offen?', 'Tomorrow-Liste: 1–2 Aufgaben für morgen notieren.'],
        },
      ],
    },
    {
      key: 'emotionalWeight',
      label: 'Emotionales Gewicht',
      left: 'leicht',
      right: 'schwer',
      description: 'Wie viel emotionale Last du vom Tag mitträgst. Ideal: niedrig (~22). Hohe Werte machen Loslassen und Einschlafen schwer.',
      feedbackZones: [
        {
          direction: 'high', threshold: 80, severity: 'severe', microLabel: 'Last ablegen',
          message: 'Du trägst gerade viel emotionales Gewicht. Das macht es schwer, loszulassen und zur Ruhe zu kommen.',
          interventions: ['Schreibe 2 Sätze auf, was dich belastet — nicht lösen, nur benennen.', 'Teile dich jemandem mit — auch kurz per Nachricht.', 'Erlaube dir, dass es heute so ist. Nicht jeder Tag endet leicht.'],
        },
        {
          direction: 'high', threshold: 55, severity: 'moderate', microLabel: 'Gewicht spürbar',
          message: 'Du trägst spürbar etwas mit dir. Versuche, das Gefühl bewusst abzulegen.',
          interventions: ['Journaling: 5 Minuten frei schreiben, ohne Ziel.', 'Frage dich: Muss ich das jetzt noch lösen, oder kann es warten?'],
        },
      ],
    },
    {
      key: 'bodyRelaxation',
      label: 'Körperliche Entspannung',
      left: 'angespannt',
      right: 'entspannt',
      description: 'Wie entspannt dein Körper ist. Körperanspannung blockiert Schlaf. Ideal: ~78 — locker und gelöst.',
      feedbackZones: [
        {
          direction: 'low', threshold: 20, severity: 'severe', microLabel: 'Körper angespannt',
          message: 'Dein Körper ist sehr angespannt. Schlaf wird schwer, wenn der Körper nicht loslässt.',
          interventions: ['Progressive Muskelentspannung: Anspannen, 5 Sek halten, loslassen.', 'Warme Dusche oder Wärmflasche können helfen.', 'Sanftes Dehnen: Nacken, Schultern, Rücken.'],
        },
        {
          direction: 'low', threshold: 40, severity: 'moderate', microLabel: 'mehr Entspannung',
          message: 'Restliche Anspannung im Körper spürbar. Ein paar Minuten bewusste Entspannung helfen.',
          interventions: ['Kurzes Stretching im Liegen.', 'Bewusst jeden Körperteil durchgehen und loslassen.'],
        },
      ],
    },
    {
      key: 'gratitude',
      label: 'Dankbarkeit / Positives',
      left: 'nichts',
      right: 'viel',
      feedbackZones: [
        {
          direction: 'low', threshold: 25, severity: 'moderate', microLabel: 'Positives suchen',
          message: 'Dir fällt gerade nichts Positives am Tag auf. Das ist an schweren Tagen normal.',
          interventions: ['Suche eine einzige kleine Sache, die okay war — auch wenn es nur der Kaffee war.', 'Dankbarkeit muss nicht groß sein. Winziges zählt.'],
        },
        {
          direction: 'high', threshold: 75, severity: 'mild', microLabel: 'gutes Zeichen',
          message: 'Du nimmst Positives wahr — ein gutes Zeichen. Lass dieses Gefühl wirken.',
          interventions: ['Schreibe 3 Dinge auf, für die du heute dankbar bist.', 'Teile ein positives Erlebnis mit jemandem.'],
        },
      ],
    },
    {
      key: 'screenExposure',
      label: 'Bildschirm-Nachwirkung',
      left: 'kaum',
      right: 'stark',
      feedbackZones: [
        {
          direction: 'high', threshold: 75, severity: 'severe', microLabel: 'Bildschirm aus',
          message: 'Dein System ist noch stark von Bildschirmreizen beeinflusst. Blaues Licht und Scroll-Dopamin wirken nach.',
          interventions: ['Alle Bildschirme aus — jetzt, nicht in 10 Minuten.', 'Nachtmodus oder Rotlichtfilter aktivieren.', 'Stattdessen: Buch, Podcast, Gespräch oder Stille.'],
        },
        {
          direction: 'high', threshold: 55, severity: 'moderate', microLabel: 'Bildschirmzeit',
          message: 'Du bist noch etwas aufgedreht von Bildschirmzeit. Achte auf den Übergang.',
          interventions: ['Letzte 30 Minuten ohne Bildschirm planen.', 'Dim das Licht in deiner Umgebung.'],
        },
      ],
    },
  ],

  defaultValues: {
    mentalRest: 35, dayCompletion: 38, emotionalWeight: 52,
    bodyRelaxation: 42, gratitude: 45, screenExposure: 58,
  },
  resetValues: {
    mentalRest: 75, dayCompletion: 78, emotionalWeight: 22,
    bodyRelaxation: 78, gratitude: 68, screenExposure: 15,
  },

  computedMetrics: [
    {
      key: 'readiness',
      label: 'Abend-Bereitschaft',
      description: 'Wie bereit du für den Abend und Schlaf bist — basierend auf mentaler Ruhe, Körperentspannung, Tagesabschluss und (umgekehrt) Bildschirmzeit.',
      weights: [
        { sliderKey: 'mentalRest', weight: 0.3 },
        { sliderKey: 'bodyRelaxation', weight: 0.25 },
        { sliderKey: 'dayCompletion', weight: 0.2 },
        { sliderKey: 'screenExposure', weight: 0.25, invert: true, offset: 100 },
      ],
    },
    {
      key: 'residualLoad',
      label: 'Restbelastung',
      description: 'Was vom Tag noch nachwirkt — emotionales Gewicht, mentale Unruhe, Bildschirmzeit. Hohe Werte bedeuten: der Tag ist noch nicht losgelassen.',
      danger: true,
      weights: [
        { sliderKey: 'emotionalWeight', weight: 0.3 },
        { sliderKey: 'mentalRest', weight: 0.25, invert: true, offset: 100 },
        { sliderKey: 'screenExposure', weight: 0.25 },
        { sliderKey: 'dayCompletion', weight: 0.2, invert: true, offset: 100 },
      ],
    },
    {
      key: 'regulation',
      label: 'Regulation',
      description: 'Wie gut du gerade in der Lage bist, den Tag abzuschließen und in die Ruhe zu finden.',
      weights: [
        { sliderKey: 'mentalRest', weight: 0.25 },
        { sliderKey: 'bodyRelaxation', weight: 0.25 },
        { sliderKey: 'dayCompletion', weight: 0.2 },
        { sliderKey: 'emotionalWeight', weight: 0.15, invert: true, offset: 100 },
        { sliderKey: 'screenExposure', weight: 0.15, invert: true, offset: 100 },
      ],
    },
    {
      key: 'friction',
      label: 'Friktion',
      description: 'Innerer Widerstand gegen Loslassen und Zur-Ruhe-Kommen — hohe Werte zeigen, dass der Abend noch belastet ist.',
      danger: true,

      weights: [
        { sliderKey: 'mentalRest', weight: -0.25 },
        { sliderKey: 'emotionalWeight', weight: 0.25 },
        { sliderKey: 'screenExposure', weight: 0.2 },
        { sliderKey: 'dayCompletion', weight: -0.15 },
        { sliderKey: 'bodyRelaxation', weight: -0.15 },
      ],
    },
  ],

  primaryMetrics: { regulationKey: 'regulation', frictionKey: 'friction' },

  modeRules: [
    {
      modeKey: 'release',
      priority: 30,
      conditions: [{ type: 'slider', key: 'emotionalWeight', operator: '>', value: 75 }],
    },
    {
      modeKey: 'release',
      priority: 29,
      conditions: [{ type: 'computed', key: 'residualLoad', operator: '>', value: 60 }],
    },
    {
      modeKey: 'windDown',
      priority: 20,
      conditions: [{ type: 'slider', key: 'mentalRest', operator: '<', value: 35 }],
    },
    {
      modeKey: 'rest',
      priority: 10,
      conditions: [
        { type: 'slider', key: 'mentalRest', operator: '>', value: 60 },
        { type: 'slider', key: 'bodyRelaxation', operator: '>', value: 55 },
        { type: 'slider', key: 'emotionalWeight', operator: '<', value: 40 },
      ],
    },
  ],
  defaultModeKey: 'reflect',

  modes: {
    release: {
      label: 'Loslassen',
      description: 'Du trägst zu viel mit in den Abend. Erst ablegen, dann zur Ruhe kommen.',
      reflectiveQuestion: 'Was hältst du gerade fest, das du heute nicht mehr lösen kannst?',
      interventions: [
        'Schreibe alles auf, was dich belastet — dann Heft zuklappen.',
        'Emotionale Entladung: Weinen, Bewegen, Schütteln darf sein.',
        'Sage dir klar: „Das gehört zu heute, nicht zu heute Nacht."',
        'Ätherisches Öl, warmes Licht, bewusster Übergang.',
      ],
    },
    windDown: {
      label: 'Runterfahren',
      description: 'Dein System ist noch im Tagesmodus. Bewusst den Übergang gestalten.',
      reflectiveQuestion: 'Was hilft dir, vom Tag in den Abend zu wechseln?',
      interventions: [
        'Bildschirme dimmen oder ausmachen.',
        'Ruhige Musik, Podcast oder Hörbuch statt Scrolling.',
        'Licht reduzieren — das Signal für dein System: Tag vorbei.',
        'Feste Abendroutine einhalten, auch wenn es nur 10 Minuten sind.',
      ],
    },
    reflect: {
      label: 'Reflektieren',
      description: 'Du bist weder zu aufgedreht noch zu belastet. Ein guter Moment für Rückblick.',
      reflectiveQuestion: 'Was nimmst du aus dem heutigen Tag mit — und was lässt du zurück?',
      interventions: [
        '3 Dinge aufschreiben, die heute gut waren.',
        '1 Ding notieren, das du morgen anders machen möchtest.',
        'Einen Moment Stille: 2 Minuten, einfach nur da sein.',
        'Tomorrow-Liste: 1–2 Aufgaben für morgen notieren.',
      ],
    },
    rest: {
      label: 'Ruhe',
      description: 'Du bist bereit für den Abend. Genieße die Stille.',
      reflectiveQuestion: 'Was würde dir jetzt gut tun — Stille, Wärme oder sanfte Unterhaltung?',
      interventions: [
        'Alles ist getan. Du darfst jetzt einfach sein.',
        'Warmer Tee, bequeme Kleidung, sanftes Licht.',
        'Progressive Muskelentspannung oder Body Scan.',
        'Geh schlafen, wenn du müde wirst — nicht erst, wenn du fertig bist.',
      ],
    },
  },

  feedbacks: {
    release: {
      title: 'Der Tag sitzt noch tief.',
      text: 'Erst das Gewicht des Tages abladen, dann kommt die Ruhe von selbst. Nicht drüberschlafen — erst loswerden.',
      badge: 'Emotionale Last aktiv',
    },
    windDown: {
      title: 'Dein System ist noch im Tagesmodus.',
      text: 'Der Kopf rattert noch. Jetzt bewusst den Übergang gestalten — vom Tun ins Sein.',
      badge: 'Noch hochgefahren',
    },
    reflect: {
      title: 'Guter Moment für einen Rückblick.',
      text: 'Du bist ruhig genug, um den Tag einzuordnen. Nutze das für eine kurze Reflexion.',
      badge: 'Reflexionsmodus',
    },
    rest: {
      title: 'Du bist bereit für Ruhe.',
      text: 'Der Tag ist abgeschlossen, dein System kommt zur Ruhe. Genieße den Abend.',
      badge: 'Bereit für Ruhe',
    },
  },

  idealValues: [
    { sliderKey: 'mentalRest', target: 75 },
    { sliderKey: 'dayCompletion', target: 78 },
    { sliderKey: 'emotionalWeight', target: 22 },
    { sliderKey: 'bodyRelaxation', target: 78 },
    { sliderKey: 'gratitude', target: 68 },
    { sliderKey: 'screenExposure', target: 15 },
  ],
};
