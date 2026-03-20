import { FlowDefinition } from '../flow.model';

export const WENN_ALLES_ZU_VIEL: FlowDefinition = {
  id: 'wenn-alles-zu-viel',
  title: 'Wenn alles zu viel ist',
  description: 'Erste Hilfe für den Moment, in dem nichts mehr geht.',
  duration: '3–5 Min',
  style: 'kompakt',
  tags: ['akut', 'Überforderung'],
  category: 'stress-ueberforderung',
  steps: [
    {
      type: 'choice',
      prompt: 'Was ist gerade am stärksten?',
      options: [
        'Innerer Druck',
        'Gedankenflut',
        'Körperliche Enge',
        'Alles gleichzeitig',
      ],
    },
    {
      type: 'action',
      prompt: 'Du musst jetzt genau eine Sache tun: Nichts.',
      body: '60 Sekunden. Einfach nur sitzen. Nicht lösen. Nicht planen. Nicht reagieren. Nur da sein.',
      duration: '60 Sekunden',
      nextLabel: 'Geschafft',
      backLabel: 'Kann ich nicht',
    },
    {
      type: 'recheck',
      prompt: 'Hat sich etwas verändert?',
      options: [
        'Ja, etwas leichter',
        'Nein, noch dicht',
        'Ich weiß nicht',
      ],
    },
    {
      type: 'end',
      prompt: 'Das war genug.',
      body: 'Du musst nicht alles auf einmal lösen. Ein Schritt reicht. Trink ein Glas Wasser.',
    },
  ],
};
