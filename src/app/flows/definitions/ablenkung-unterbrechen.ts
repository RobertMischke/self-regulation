import { FlowDefinition } from '../flow.model';

export const ABLENKUNG_UNTERBRECHEN: FlowDefinition = {
  id: 'ablenkung-unterbrechen',
  title: 'Ablenkung unterbrechen',
  description: 'Aus dem Ablenkungsmodus ausbrechen und umschalten.',
  duration: '3–5 Min',
  style: 'kompakt',
  tags: ['Ablenkung', 'Reset'],
  category: 'fokus-arbeit',
  steps: [
    {
      type: 'choice',
      prompt: 'Was lenkt dich gerade ab?',
      options: [
        'Handy / Social Media',
        'Gedanken',
        'Umgebung / Geräusche',
        'Innere Unruhe',
      ],
    },
    {
      type: 'action',
      prompt: 'Unterbrich die Quelle.',
      items: [
        'Lege die Ablenkungsquelle außer Reichweite oder schließe sie.',
        'Wenn es Gedanken sind: Schreib sie kurz auf und leg den Zettel weg.',
      ],
      nextLabel: 'Gemacht',
    },
    {
      type: 'action',
      prompt: 'Was war eigentlich die Aufgabe?',
      body: 'Nenne laut oder leise den einen Satz: Was wolltest du gerade tun? Sag es dir selbst.',
      nextLabel: 'Weiß ich wieder',
    },
    {
      type: 'end',
      prompt: 'Fokus wiederhergestellt.',
      body: 'Fang jetzt an – bevor der nächste Impuls kommt.',
    },
  ],
};
