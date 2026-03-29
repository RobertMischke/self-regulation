import { FlowDefinition } from '../flow.model';

export const NAECHSTEN_SCHRITT_FINDEN: FlowDefinition = {
  id: 'naechsten-schritt-finden',
  title: 'Nächsten Schritt finden',
  description: 'Aus der Starre in eine erste konkrete Handlung kommen.',
  duration: '5–8 Min',
  style: 'aktivierend',
  tags: ['Orientierung', 'Handlung'],
  category: 'klarheit-orientierung',
  meta: {
    strengths: [
      'Klassische Micro-Commitment-Technik – bewährt bei ADHS',
      '"Absurd klein machen" durchbricht Perfektionismus',
      'Direkter, aktivierender Ton',
    ],
    weaknesses: [
      'Initiale Auswahl "Blockiert" vs. "Diffuser Druck" könnte unterschiedliche Pfade brauchen',
      'Satz-Vervollständigung kann bei starker Blockade zu abstrakt sein',
    ],
    analysis: 'Hatte keinen Recheck – jetzt eingefügt. Bei "Noch blockiert" → zurück zum Verkleinern. Bei "Zu viel Druck" → Cross-Flow zu "Wenn alles zu viel". Gutes Auffang-Netz für andere Flows, die hierher verlinken.',
    reviewedAt: '2026-03-29',
  },
  steps: [
    {
      id: 'check',
      type: 'choice',
      prompt: 'Was beschreibt deine Lage am besten?',
      options: [
        'Zu viele Optionen',
        'Keine Idee, was zuerst',
        'Blockiert',
        'Diffuser Druck',
      ],
    },
    {
      id: 'sentence',
      type: 'action',
      prompt: 'Vervollständige diesen Satz:',
      body: '„Das Wichtigste, was ich jetzt tun kann, ist ___." Nur ein Satz. Nicht perfekt, nur ehrlich.',
      nextLabel: 'Hab ich',
    },
    {
      id: 'smaller',
      type: 'action',
      prompt: 'Mach es kleiner.',
      body: 'Was ist der allererste Schritt davon? Der, der unter 5 Minuten dauert? Mach ihn so klein, dass du ihn nicht aufschieben kannst.',
      nextLabel: 'Weiß ich',
    },
    {
      id: 'recheck',
      type: 'recheck',
      prompt: 'Hast du deinen nächsten Schritt?',
      options: [
        { label: 'Ja, ich weiß was ich tue', next: 'end' },
        { label: 'Noch nicht klar genug', next: 'smaller' },
        { label: 'Zu viel Druck gerade', flowId: 'wenn-alles-zu-viel' },
      ],
    },
    {
      id: 'end',
      type: 'end',
      prompt: 'Du hast deinen nächsten Schritt.',
      body: 'Mach ihn jetzt. Nicht gleich. Jetzt.',
    },
  ],
};
