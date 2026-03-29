import { FlowDefinition } from '../flow.model';

export const WIEDER_INS_ARBEITEN: FlowDefinition = {
  id: 'wieder-ins-arbeiten',
  title: 'Wieder ins Arbeiten kommen',
  description: 'Den inneren Widerstand überwinden und sanft starten.',
  duration: '5–8 Min',
  style: 'aktivierend',
  tags: ['Fokus', 'Arbeit'],
  category: 'fokus-arbeit',
  meta: {
    strengths: [
      'Micro-Action-Ansatz ist ADHS-gerecht – absurd klein denken hilft',
      'Timer auf der Umsetzung erzeugt sanften Druck',
      'Gute psychologische Rahmung: "Danach entscheidest du neu"',
    ],
    weaknesses: [
      'Initiale Auswahl differenziert den Pfad nicht',
      '"Keine Lust" und "Ablenkung" könnten spezifischere Interventionen brauchen',
    ],
    analysis: 'Recheck verzweigt jetzt: "Fast" → kleiner Nudge und dann Ende, "Blockiert" → Cross-Flow zu "Nächsten Schritt finden". Das fängt den wichtigsten Frustfall ab.',
    reviewedAt: '2026-03-29',
  },
  steps: [
    {
      id: 'check',
      type: 'choice',
      prompt: 'Was blockiert gerade am meisten?',
      options: [
        'Keine Lust',
        'Zu viel auf einmal',
        'Unklar, wo anfangen',
        'Ablenkung',
      ],
    },
    {
      id: 'find',
      type: 'action',
      prompt: 'Finde die lächerlich kleinste Einstiegshandlung.',
      body: 'Was könntest du in unter 2 Minuten tun? Eine Datei öffnen. Einen Satz schreiben. Eine Zeile lesen. Denk absurd klein.',
      nextLabel: 'Hab eine',
    },
    {
      id: 'doit',
      type: 'action',
      prompt: 'Mach genau das jetzt.',
      body: 'Setz einen Timer auf 2 Minuten. Nur diese eine Mini-Handlung. Danach entscheidest du neu.',
      duration: '2 Minuten',
      nextLabel: 'Gemacht',
      backLabel: 'Noch nicht',
    },
    {
      id: 'recheck',
      type: 'recheck',
      prompt: 'Ist der Einstieg geschafft?',
      options: [
        { label: 'Ja, ich bin drin', next: 'end' },
        { label: 'Fast – noch ein kleiner Schub', next: 'doit' },
        { label: 'Nein, blockiert noch', flowId: 'naechsten-schritt-finden' },
      ],
    },
    {
      id: 'end',
      type: 'end',
      prompt: 'Du bist gestartet.',
      body: 'Der schwierigste Teil ist vorbei. Bleib jetzt einfach dran – ohne großen Plan.',
    },
  ],
};
