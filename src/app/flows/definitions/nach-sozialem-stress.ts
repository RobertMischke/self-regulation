import { FlowDefinition } from '../flow.model';

export const NACH_SOZIALEM_STRESS: FlowDefinition = {
  id: 'nach-sozialem-stress',
  title: 'Nach sozialem Stress stabilisieren',
  description: 'Wieder zu dir kommen nach einer anstrengenden Begegnung.',
  duration: '5–10 Min',
  style: 'ruhig',
  tags: ['nach Stress', 'sozial'],
  category: 'soziale-situationen',
  steps: [
    {
      type: 'choice',
      prompt: 'Was ist gerade am stärksten?',
      options: [
        'Ich bin aufgewühlt',
        'Ich fühle mich falsch',
        'Ich bin erschöpft',
        'Ich kreise um das Gespräch',
      ],
    },
    {
      type: 'action',
      prompt: 'Du bist jetzt allein. Das ist sicher.',
      items: [
        'Atme 3× tief durch.',
        'Spüre deine Füße auf dem Boden.',
        'Lass die Schultern fallen.',
      ],
      duration: '30 Sekunden',
      nextLabel: 'Gemacht',
    },
    {
      type: 'action',
      prompt: 'Nenne eine Sache, die stimmt.',
      body: 'Unabhängig von dem Gespräch, unabhängig von der anderen Person. Etwas, das für dich wahr ist.',
      nextLabel: 'Hab ich',
    },
    {
      type: 'recheck',
      prompt: 'Wie geht es dir jetzt?',
      options: [
        'Etwas ruhiger',
        'Noch aufgewühlt',
        'Brauche mehr Zeit',
      ],
    },
    {
      type: 'end',
      prompt: 'Du darfst jetzt einfach nur sein.',
      body: 'Nicht analysieren. Nicht bewerten. Einfach ankommen.',
    },
  ],
};
