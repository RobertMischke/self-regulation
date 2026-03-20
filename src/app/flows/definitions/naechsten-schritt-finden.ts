import { FlowDefinition } from '../flow.model';

export const NAECHSTEN_SCHRITT_FINDEN: FlowDefinition = {
  id: 'naechsten-schritt-finden',
  title: 'Nächsten Schritt finden',
  description: 'Aus der Starre in eine erste konkrete Handlung kommen.',
  duration: '5–8 Min',
  style: 'aktivierend',
  tags: ['Orientierung', 'Handlung'],
  category: 'klarheit-orientierung',
  steps: [
    {
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
      type: 'action',
      prompt: 'Vervollständige diesen Satz:',
      body: '„Das Wichtigste, was ich jetzt tun kann, ist ___." Nur ein Satz. Nicht perfekt, nur ehrlich.',
      nextLabel: 'Hab ich',
    },
    {
      type: 'action',
      prompt: 'Mach es kleiner.',
      body: 'Was ist der allererste Schritt davon? Der, der unter 5 Minuten dauert? Mach ihn so klein, dass du ihn nicht aufschieben kannst.',
      nextLabel: 'Weiß ich',
    },
    {
      type: 'end',
      prompt: 'Du hast deinen nächsten Schritt.',
      body: 'Mach ihn jetzt. Nicht gleich. Jetzt.',
    },
  ],
};
