import { FlowDefinition } from '../flow.model';

export const NACH_UEBERFORDERUNG: FlowDefinition = {
  id: 'nach-ueberforderung',
  title: 'Nach Überforderung runterregeln',
  description: 'Nervensystem beruhigen, wenn alles auf einmal reinkam.',
  duration: '5–10 Min',
  style: 'ruhig',
  tags: ['nach Stress', 'Regulation'],
  category: 'stress-ueberforderung',
  steps: [
    {
      id: 'check',
      type: 'choice',
      prompt: 'Was trifft gerade am ehesten zu?',
      options: [
        'Ich bin hektisch',
        'Ich bin dicht / zu',
        'Ich kreise gedanklich',
        'Ich bin körperlich angespannt',
      ],
    },
    {
      id: 'ground',
      type: 'action',
      prompt: 'Erst mal ankommen.',
      items: [
        'Setz dich hin.',
        'Füße auf den Boden – spüre den Kontakt.',
        'Hände auf die Oberschenkel.',
      ],
      duration: '30 Sekunden',
      nextLabel: 'Gemacht',
    },
    {
      id: 'breathe',
      type: 'action',
      prompt: 'Atme bewusst langsamer.',
      body: 'Atme 4× ein (4 Sekunden) und aus (6 Sekunden). Langsamer, als du denkst. Das Ausatmen ist länger als das Einatmen.',
      duration: '60 Sekunden',
      nextLabel: 'Gemacht',
      backLabel: 'Noch nicht',
    },
    {
      id: 'recheck',
      type: 'recheck',
      prompt: 'Wie ist es jetzt?',
      options: [
        { label: 'Etwas besser', next: 'end' },
        { label: 'Gleich', next: 'breathe' },
        { label: 'Noch zu viel', flowId: 'wenn-alles-zu-viel' },
      ],
    },
    {
      id: 'end',
      type: 'end',
      prompt: 'Du hast runtergeregelt.',
      body: 'Das war genug. Wenn es noch nachwirkt: Wasser trinken, kurz bewegen, oder einfach noch einen Moment sitzen bleiben.',
    },
  ],
};
