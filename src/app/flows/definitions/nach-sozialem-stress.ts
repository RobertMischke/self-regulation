import { FlowDefinition } from '../flow.model';

export const NACH_SOZIALEM_STRESS: FlowDefinition = {
  id: 'nach-sozialem-stress',
  title: 'Nach sozialem Stress stabilisieren',
  description: 'Wieder zu dir kommen nach einer anstrengenden Begegnung.',
  duration: '5–10 Min',
  style: 'ruhig',
  tags: ['nach Stress', 'sozial'],
  category: 'soziale-situationen',
  meta: {
    strengths: [
      'Validierender Ton: "Das ist sicher" – nimmt Druck',
      'Grounding-Sequenz ist physiologisch sinnvoll',
      '"Eine Sache die stimmt" ist ein starker Anker gegen Rumination',
    ],
    weaknesses: [
      'Initiale Auswahl "Ich kreise um das Gespräch" könnte spezifischere Intervention brauchen',
      'Könnte einen Schritt zur Abgrenzung / Boundary-Setting anbieten',
    ],
    analysis: 'Recheck verzweigt jetzt: "Noch aufgewühlt" → zurück zur Grounding-Übung, "Brauche mehr Zeit" → akzeptierendes Ende. Emotional sensibler Flow, Ton ist gut kalibriert.',
    reviewedAt: '2026-03-29',
  },
  steps: [
    {
      id: 'check',
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
      id: 'ground',
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
      id: 'truth',
      type: 'action',
      prompt: 'Nenne eine Sache, die stimmt.',
      body: 'Unabhängig von dem Gespräch, unabhängig von der anderen Person. Etwas, das für dich wahr ist.',
      nextLabel: 'Hab ich',
    },
    {
      id: 'recheck',
      type: 'recheck',
      prompt: 'Wie geht es dir jetzt?',
      options: [
        { label: 'Etwas ruhiger', next: 'end' },
        { label: 'Noch aufgewühlt', next: 'ground' },
        { label: 'Brauche mehr Zeit', next: 'end' },
      ],
    },
    {
      id: 'end',
      type: 'end',
      prompt: 'Du darfst jetzt einfach nur sein.',
      body: 'Nicht analysieren. Nicht bewerten. Einfach ankommen.',
    },
  ],
};
