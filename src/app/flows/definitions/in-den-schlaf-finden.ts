import { FlowDefinition } from '../flow.model';

export const IN_DEN_SCHLAF_FINDEN: FlowDefinition = {
  id: 'in-den-schlaf-finden',
  title: 'In den Schlaf finden',
  description: 'Gedankenkarussell stoppen und den Körper auf Schlaf einstellen.',
  duration: '8–12 Min',
  style: 'ruhig',
  tags: ['abends', 'Schlaf'],
  category: 'schlaf-abend',
  steps: [
    {
      type: 'choice',
      prompt: 'Was hält dich gerade wach?',
      options: [
        'Gedankenkarussell',
        'Körperliche Anspannung',
        'Handy / Bildschirm',
        'Unklare Unruhe',
      ],
    },
    {
      type: 'action',
      prompt: 'Mach es jetzt sehr klein.',
      items: [
        'Lege das Handy außer Reichweite.',
        'Löse einmal bewusst Kiefer und Schultern.',
        'Atme 4 ruhige Atemzüge aus – länger aus als ein.',
      ],
      duration: '45 Sekunden',
      nextLabel: 'Gemacht',
      backLabel: 'Noch nicht',
    },
    {
      type: 'action',
      prompt: 'Lass den Körper ankommen.',
      body: 'Spüre, wie dein Körper auf der Matratze aufliegt. Du musst nichts tun. Lass den Atem von allein kommen.',
      duration: '60 Sekunden',
      nextLabel: 'Weiter',
    },
    {
      type: 'recheck',
      prompt: 'Wie ist es jetzt?',
      options: [
        'Ruhiger – ich kann schlafen',
        'Etwas besser',
        'Noch unruhig',
      ],
    },
    {
      type: 'end',
      prompt: 'Gute Nacht.',
      body: 'Lass den Rest los. Morgen ist ein neuer Tag.',
    },
  ],
};
