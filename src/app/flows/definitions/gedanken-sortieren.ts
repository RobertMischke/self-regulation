import { FlowDefinition } from '../flow.model';

export const GEDANKEN_SORTIEREN: FlowDefinition = {
  id: 'gedanken-sortieren',
  title: 'Gedanken sortieren',
  description: 'Struktur ins Chaos bringen, wenn zu viel gleichzeitig kreist.',
  duration: '5–10 Min',
  style: 'ruhig',
  tags: ['Klarheit', 'Struktur'],
  category: 'klarheit-orientierung',
  meta: {
    strengths: [
      'Externalisierungs-Technik (Brain Dump) ist evidenzbasiert und ADHS-gerecht',
      'Sortier-Schritt reduziert Komplexität konkret',
      'Gute Reihenfolge: raus → sortieren → prüfen',
    ],
    weaknesses: [
      'Initiale Auswahl differenziert nicht',
      '"Unter Druck" könnte einen Stress-Pfad brauchen statt reine Sortierung',
    ],
    analysis: 'Recheck verzweigt jetzt: "Noch nicht" → zurück zum Sortieren, "Etwas besser" → Cross-Flow zu "Nächsten Schritt finden" für die, die weiter wollen. Solider Klarheits-Flow.',
    reviewedAt: '2026-03-29',
  },
  steps: [
    {
      id: 'check',
      type: 'choice',
      prompt: 'Wie fühlt sich dein Kopf gerade an?',
      options: [
        'Voll',
        'Kreisend',
        'Diffus',
        'Unter Druck',
      ],
    },
    {
      id: 'dump',
      type: 'action',
      prompt: 'Alles raus.',
      body: 'Schreib alles auf, was gerade in deinem Kopf ist. Ungefiltert, unsortiert. Zettel, Notiz-App, egal. Einfach raus damit.',
      duration: '2 Minuten',
      nextLabel: 'Fertig',
    },
    {
      id: 'sort',
      type: 'action',
      prompt: 'Jetzt sortieren.',
      body: 'Schau auf die Liste. Streiche alles, was nicht heute relevant ist. Was bleibt übrig?',
      nextLabel: 'Sortiert',
    },
    {
      id: 'recheck',
      type: 'recheck',
      prompt: 'Ist es klarer?',
      options: [
        { label: 'Ja, deutlich', next: 'end' },
        { label: 'Etwas besser', next: 'end' },
        { label: 'Noch nicht', next: 'sort' },
      ],
    },
    {
      id: 'end',
      type: 'end',
      prompt: 'Kopf aufgeräumt.',
      body: 'Du musst nicht alles tun. Nur wissen, was da ist.',
    },
  ],
};
