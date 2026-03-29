import { FlowDefinition } from '../flow.model';

export const KURZER_RESET: FlowDefinition = {
  id: 'kurzer-reset',
  title: 'Kurzer Reset',
  description: 'Schnell raus aus dem Stress-Modus und neu starten.',
  duration: '3–5 Min',
  style: 'aktivierend',
  tags: ['Reset', 'kompakt'],
  category: 'stress-ueberforderung',
  meta: {
    strengths: [
      'Niedrigschwellig und schnell',
      'Lässt dem User die Wahl der Reset-Methode',
      'Guter Einstieg für Leute, die sich nicht auf längere Flows einlassen',
    ],
    weaknesses: [
      'Hatte zwei Choices ohne Action – User wählte "Kurz bewegen", tat es aber nie',
      'Recheck hatte kein Branching',
    ],
    analysis: 'Grundlegend überarbeitet: Nach der Methodenwahl kommt jetzt ein Action-Schritt mit Timer, der die gewählte Methode umsetzt. Recheck verzweigt: "Gleich" → noch eine Runde, "Noch zu viel" → Cross-Flow zu "Wenn alles zu viel".',
    reviewedAt: '2026-03-29',
  },
  steps: [
    {
      id: 'check',
      type: 'choice',
      prompt: 'Was ist gerade am meisten im Vordergrund?',
      options: [
        'Innerer Druck',
        'Müdigkeit',
        'Ablenkung',
        'Überreizung',
      ],
    },
    {
      id: 'method',
      type: 'choice',
      prompt: 'Was würde dir jetzt am ehesten helfen?',
      options: [
        '2 Minuten Ruhe',
        'Wasser holen',
        'Kurz bewegen',
        'Aufgabe verkleinern',
      ],
    },
    {
      id: 'doit',
      type: 'action',
      prompt: 'Mach genau das jetzt.',
      body: 'Nicht nachdenken, nicht optimieren. Tu genau das, was du gewählt hast. 2 Minuten reichen.',
      duration: '2 Minuten',
      nextLabel: 'Gemacht',
    },
    {
      id: 'recheck',
      type: 'recheck',
      prompt: 'Wie ist es jetzt?',
      options: [
        { label: 'Etwas besser', next: 'end' },
        { label: 'Gleich', next: 'method' },
        { label: 'Noch zu viel', flowId: 'wenn-alles-zu-viel' },
      ],
    },
    {
      id: 'end',
      type: 'end',
      prompt: 'Reset erledigt.',
      body: 'Manchmal reichen 3 Minuten. Du kannst jetzt weitermachen – oder den nächsten kleinen Schritt wählen.',
    },
  ],
};
