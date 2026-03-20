import { FlowDefinition } from '../flow.model';

export const TAG_ABSCHLIESSEN: FlowDefinition = {
  id: 'tag-abschliessen',
  title: 'Tag abschließen',
  description: 'Den Tag bewusst beenden, damit er nicht ins Bett mitkommt.',
  duration: '5–8 Min',
  style: 'kompakt',
  tags: ['abends', 'Reflexion'],
  category: 'schlaf-abend',
  steps: [
    {
      type: 'choice',
      prompt: 'Wie war dein Tag?',
      options: [
        'Produktiv',
        'Anstrengend',
        'Diffus',
        'Überfordernd',
      ],
    },
    {
      type: 'action',
      prompt: 'Nenne eine Sache, die heute ok war.',
      body: 'Nur eine. Sie muss nicht groß sein. Vielleicht hast du etwas erledigt, jemanden gesehen oder einfach durchgehalten.',
      nextLabel: 'Hab ich',
    },
    {
      type: 'action',
      prompt: 'Gibt es etwas, das du bewusst loslässt für heute?',
      body: 'Ein Gedanke, eine Aufgabe, ein Gespräch. Du kannst es morgen wieder aufnehmen. Aber jetzt nicht.',
      nextLabel: 'Losgelassen',
    },
    {
      type: 'end',
      prompt: 'Der Tag ist abgeschlossen.',
      body: 'Du hast genug getan. Der Rest kann warten.',
    },
  ],
};
