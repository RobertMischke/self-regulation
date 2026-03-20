import { FlowDefinition } from '../flow.model';

export const GEDANKEN_SORTIEREN: FlowDefinition = {
  id: 'gedanken-sortieren',
  title: 'Gedanken sortieren',
  description: 'Struktur ins Chaos bringen, wenn zu viel gleichzeitig kreist.',
  duration: '5–10 Min',
  style: 'ruhig',
  tags: ['Klarheit', 'Struktur'],
  category: 'klarheit-orientierung',
  steps: [
    {
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
      type: 'action',
      prompt: 'Alles raus.',
      body: 'Schreib alles auf, was gerade in deinem Kopf ist. Ungefiltert, unsortiert. Zettel, Notiz-App, egal. Einfach raus damit.',
      duration: '2 Minuten',
      nextLabel: 'Fertig',
    },
    {
      type: 'action',
      prompt: 'Jetzt sortieren.',
      body: 'Schau auf die Liste. Streiche alles, was nicht heute relevant ist. Was bleibt übrig?',
      nextLabel: 'Sortiert',
    },
    {
      type: 'recheck',
      prompt: 'Ist es klarer?',
      options: [
        'Ja, deutlich',
        'Etwas besser',
        'Noch nicht',
      ],
    },
    {
      type: 'end',
      prompt: 'Kopf aufgeräumt.',
      body: 'Du musst nicht alles tun. Nur wissen, was da ist.',
    },
  ],
};
