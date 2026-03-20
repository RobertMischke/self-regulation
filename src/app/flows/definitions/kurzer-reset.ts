import { FlowDefinition } from '../flow.model';

export const KURZER_RESET: FlowDefinition = {
  id: 'kurzer-reset',
  title: 'Kurzer Reset',
  description: 'Schnell raus aus dem Stress-Modus und neu starten.',
  duration: '3–5 Min',
  style: 'aktivierend',
  tags: ['Reset', 'kompakt'],
  category: 'stress-ueberforderung',
  steps: [
    {
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
      type: 'recheck',
      prompt: 'Wie ist es jetzt?',
      options: [
        'Etwas besser',
        'Gleich',
        'Noch zu viel',
      ],
    },
    {
      type: 'end',
      prompt: 'Reset erledigt.',
      body: 'Manchmal reichen 3 Minuten. Du kannst jetzt weitermachen – oder den nächsten kleinen Schritt wählen.',
    },
  ],
};
