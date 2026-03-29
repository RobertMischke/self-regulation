import { FlowDefinition } from '../flow.model';

export const ABEND_RUNTERFAHREN: FlowDefinition = {
  id: 'abend-runterfahren',
  title: 'Abend runterfahren',
  description: 'Vom Tagesmodus in Ruhe wechseln – Schritt für Schritt.',
  duration: '5–10 Min',
  style: 'ruhig',
  tags: ['abends', 'Entspannung'],
  category: 'schlaf-abend',
  meta: {
    strengths: [
      'Praktische digitale Hygiene-Schritte',
      'Guter Ritual-Aufbau: digital → körperlich → Ruhe',
      'Realistischer Zeitrahmen für ADHS',
    ],
    weaknesses: [
      'Initiale Auswahl differenziert den Pfad nicht',
      'Könnte für "Überreizt vom Tag" einen intensiveren Grounding-Schritt anbieten',
    ],
    analysis: 'Solider Abendroutine-Flow. Recheck verzweigt jetzt: "Noch nicht" loopt zur Abendmodus-Übung, "Fast" geht direkt zum Ende. Gut geeignet als Einstieg in Schlaf-Flows.',
    reviewedAt: '2026-03-29',
  },
  steps: [
    {
      id: 'check',
      type: 'choice',
      prompt: 'Wo stehst du gerade?',
      options: [
        'Noch im Arbeitsmodus',
        'Überreizt vom Tag',
        'Unruhig ohne klaren Grund',
        'Eigentlich ok – will abschalten',
      ],
    },
    {
      id: 'digital',
      type: 'action',
      prompt: 'Schließe den Tag digital ab.',
      items: [
        'Schließe alle offenen Tabs und Apps.',
        'Schreib kurz auf, was morgen dran ist.',
        'Lege das Handy beiseite.',
      ],
      duration: '2 Minuten',
      nextLabel: 'Gemacht',
    },
    {
      id: 'evening',
      type: 'action',
      prompt: 'Wechsle bewusst in den Abendmodus.',
      body: 'Dimme das Licht. Mach etwas Langsames: Tee kochen, Musik hören, oder einfach still sitzen.',
      duration: '3 Minuten',
      nextLabel: 'Weiter',
    },
    {
      id: 'recheck',
      type: 'recheck',
      prompt: 'Fühlst du dich angekommen?',
      options: [
        { label: 'Ja, der Abend kann beginnen', next: 'end' },
        { label: 'Fast – brauche noch einen Moment', next: 'end' },
        { label: 'Noch nicht wirklich', next: 'evening' },
      ],
    },
    {
      id: 'end',
      type: 'end',
      prompt: 'Der Abend gehört dir.',
      body: 'Kein Bildschirm, kein Druck. Einfach da sein.',
    },
  ],
};
