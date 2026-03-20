import { FlowDefinition } from '../flow.model';

export const WIEDER_INS_ARBEITEN: FlowDefinition = {
  id: 'wieder-ins-arbeiten',
  title: 'Wieder ins Arbeiten kommen',
  description: 'Den inneren Widerstand überwinden und sanft starten.',
  duration: '5–8 Min',
  style: 'aktivierend',
  tags: ['Fokus', 'Arbeit'],
  category: 'fokus-arbeit',
  steps: [
    {
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
      type: 'action',
      prompt: 'Finde die lächerlich kleinste Einstiegshandlung.',
      body: 'Was könntest du in unter 2 Minuten tun? Eine Datei öffnen. Einen Satz schreiben. Eine Zeile lesen. Denk absurd klein.',
      nextLabel: 'Hab eine',
    },
    {
      type: 'action',
      prompt: 'Mach genau das jetzt.',
      body: 'Setz einen Timer auf 2 Minuten. Nur diese eine Mini-Handlung. Danach entscheidest du neu.',
      duration: '2 Minuten',
      nextLabel: 'Gemacht',
      backLabel: 'Noch nicht',
    },
    {
      type: 'recheck',
      prompt: 'Ist der Einstieg geschafft?',
      options: [
        'Ja, ich bin drin',
        'Fast – noch ein kleiner Schub',
        'Nein, blockiert noch',
      ],
    },
    {
      type: 'end',
      prompt: 'Du bist gestartet.',
      body: 'Der schwierigste Teil ist vorbei. Bleib jetzt einfach dran – ohne großen Plan.',
    },
  ],
};
