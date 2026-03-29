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
      id: 'check',
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
      id: 'pause',
      type: 'action',
      prompt: 'Du musst jetzt genau eine Sache tun: Nichts.',
      body: '60 Sekunden. Einfach nur sitzen. Nicht lösen. Nicht planen. Nicht reagieren. Nur da sein.',
      duration: '60 Sekunden',
      nextLabel: 'Geschafft',
      backLabel: 'Kann ich nicht',
    },
    {
      id: 'recheck',
      type: 'recheck',
      prompt: 'Hat sich etwas verändert?',
      options: [
        { label: 'Ja, etwas leichter', next: 'end' },
        { label: 'Nein, noch dicht', next: 'deeper' },
        { label: 'Ich weiß nicht', next: 'pause' },
      ],
    },
    {
      id: 'deeper',
      type: 'action',
      prompt: 'Probier eine kleine Sache.',
      body: 'Halt deine Hände unter kaltes Wasser für 30 Sekunden. Oder leg dir etwas Kühles auf die Stirn. Nur ein Reiz, der dich kurz ins Hier holt.',
      duration: '30 Sekunden',
      nextLabel: 'Gemacht',
      next: 'end',
    },
    {
      id: 'end',
      type: 'end',
      prompt: 'Das war genug.',
      body: 'Du musst nicht alles auf einmal lösen. Ein Schritt reicht. Trink ein Glas Wasser.',
    },
  ],
};
