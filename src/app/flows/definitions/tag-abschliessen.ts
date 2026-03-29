import { FlowDefinition } from '../flow.model';

export const TAG_ABSCHLIESSEN: FlowDefinition = {
  id: 'tag-abschliessen',
  title: 'Tag abschließen',
  description: 'Den Tag bewusst beenden, damit er nicht ins Bett mitkommt.',
  duration: '5–8 Min',
  style: 'kompakt',
  tags: ['abends', 'Reflexion'],
  category: 'schlaf-abend',
  meta: {
    strengths: [
      'Einfach und niedrigschwellig',
      'Gute Reflexions-Struktur: positiv + loslassen',
      'Passender Abschluss-Charakter',
    ],
    weaknesses: [
      'Initiale Auswahl "Überfordernd" könnte zu einem intensiveren Pfad führen',
      'Loslassen-Schritt ist abstrakt – manche brauchen mehr Anleitung',
    ],
    analysis: 'Hatte keinen Recheck – jetzt eingefügt. Bei "Noch nicht" → zurück zum Loslassen-Schritt. Bei "Überfordernd" als Tageszustand geht der Flow jetzt über einen Recheck, der bei Bedarf zum Schlaf-Flow verlinkt.',
    reviewedAt: '2026-03-29',
  },
  steps: [
    {
      id: 'check',
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
      id: 'ok',
      type: 'action',
      prompt: 'Nenne eine Sache, die heute ok war.',
      body: 'Nur eine. Sie muss nicht groß sein. Vielleicht hast du etwas erledigt, jemanden gesehen oder einfach durchgehalten.',
      nextLabel: 'Hab ich',
    },
    {
      id: 'letgo',
      type: 'action',
      prompt: 'Gibt es etwas, das du bewusst loslässt für heute?',
      body: 'Ein Gedanke, eine Aufgabe, ein Gespräch. Du kannst es morgen wieder aufnehmen. Aber jetzt nicht.',
      nextLabel: 'Losgelassen',
    },
    {
      id: 'recheck',
      type: 'recheck',
      prompt: 'Fühlt sich der Tag abgeschlossen an?',
      options: [
        { label: 'Ja, reicht für heute', next: 'end' },
        { label: 'Fast, aber ok', next: 'end' },
        { label: 'Noch nicht – es kreist noch', next: 'letgo' },
      ],
    },
    {
      id: 'end',
      type: 'end',
      prompt: 'Der Tag ist abgeschlossen.',
      body: 'Du hast genug getan. Der Rest kann warten.',
    },
  ],
};
