import { FlowDefinition } from '../flow.model';

export const ABLENKUNG_UNTERBRECHEN: FlowDefinition = {
  id: 'ablenkung-unterbrechen',
  title: 'Ablenkung unterbrechen',
  description: 'Aus dem Ablenkungsmodus ausbrechen und umschalten.',
  duration: '3–5 Min',
  style: 'kompakt',
  tags: ['Ablenkung', 'Reset'],
  category: 'fokus-arbeit',
  meta: {
    strengths: [
      'Direkt und praktisch – keine Überanalyse',
      'Quellen-Unterbrechung als erster Schritt ist richtig',
      'Aufgaben-Erinnerung holt den Fokus zurück',
    ],
    weaknesses: [
      'Initiale Auswahl "Innere Unruhe" könnte einen anderen Pfad brauchen als "Handy"',
      'Gedanken aufschreiben und weglegen ist kurz – könnte ein Timer helfen',
    ],
    analysis: 'Hatte keinen Recheck – jetzt eingefügt. Bei "Immer noch abgelenkt" → zurück zur Quellen-Unterbrechung. Bei "Will nicht arbeiten" → Cross-Flow zu "Wieder ins Arbeiten". Solider Quick-Fix-Flow.',
    reviewedAt: '2026-03-29',
  },
  steps: [
    {
      id: 'check',
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
      id: 'interrupt',
      type: 'action',
      prompt: 'Unterbrich die Quelle.',
      items: [
        'Lege die Ablenkungsquelle außer Reichweite oder schließe sie.',
        'Wenn es Gedanken sind: Schreib sie kurz auf und leg den Zettel weg.',
      ],
      nextLabel: 'Gemacht',
    },
    {
      id: 'recall',
      type: 'action',
      prompt: 'Was war eigentlich die Aufgabe?',
      body: 'Nenne laut oder leise den einen Satz: Was wolltest du gerade tun? Sag es dir selbst.',
      nextLabel: 'Weiß ich wieder',
    },
    {
      id: 'recheck',
      type: 'recheck',
      prompt: 'Bist du wieder da?',
      options: [
        { label: 'Ja, Fokus ist zurück', next: 'end' },
        { label: 'Immer noch abgelenkt', next: 'interrupt' },
        { label: 'Will eigentlich nicht arbeiten', flowId: 'wieder-ins-arbeiten' },
      ],
    },
    {
      id: 'end',
      type: 'end',
      prompt: 'Fokus wiederhergestellt.',
      body: 'Fang jetzt an – bevor der nächste Impuls kommt.',
    },
  ],
};
