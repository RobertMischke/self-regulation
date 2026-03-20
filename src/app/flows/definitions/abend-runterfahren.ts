import { FlowDefinition } from '../flow.model';

export const ABEND_RUNTERFAHREN: FlowDefinition = {
  id: 'abend-runterfahren',
  title: 'Abend runterfahren',
  description: 'Vom Tagesmodus in Ruhe wechseln – Schritt für Schritt.',
  duration: '5–10 Min',
  style: 'ruhig',
  tags: ['abends', 'Entspannung'],
  category: 'schlaf-abend',
  steps: [
    {
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
      type: 'action',
      prompt: 'Wechsle bewusst in den Abendmodus.',
      body: 'Dimme das Licht. Mach etwas Langsames: Tee kochen, Musik hören, oder einfach still sitzen.',
      duration: '3–5 Minuten',
      nextLabel: 'Weiter',
    },
    {
      type: 'recheck',
      prompt: 'Fühlst du dich angekommen?',
      options: [
        'Ja, der Abend kann beginnen',
        'Fast – brauche noch einen Moment',
        'Noch nicht wirklich',
      ],
    },
    {
      type: 'end',
      prompt: 'Der Abend gehört dir.',
      body: 'Kein Bildschirm, kein Druck. Einfach da sein.',
    },
  ],
};
