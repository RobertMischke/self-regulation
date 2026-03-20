import { FlowDefinition } from '../flow.model';

export const KOERPERSIGNALE_PRUEFEN: FlowDefinition = {
  id: 'koerpersignale-pruefen',
  title: 'Körpersignale prüfen',
  description: 'Kurzer Check: Was braucht dein Körper gerade wirklich?',
  duration: '3–5 Min',
  style: 'ruhig',
  tags: ['Körper', 'Check-in'],
  category: 'koerper-beduerfnisse',
  steps: [
    {
      type: 'choice',
      prompt: 'Was spürst du gerade am stärksten?',
      options: [
        'Hunger',
        'Müdigkeit',
        'Anspannung',
        'Bewegungsdrang',
        'Nichts Spürbares',
      ],
    },
    {
      type: 'action',
      prompt: 'Kurzer Body-Scan.',
      body: 'Schließe kurz die Augen. Spüre nacheinander in Kopf, Schultern, Bauch und Beine. Wo ist etwas? Wo ist nichts?',
      duration: '30 Sekunden',
      nextLabel: 'Weiter',
    },
    {
      type: 'choice',
      prompt: 'Was signalisiert dein Körper?',
      options: [
        'Ich brauche Essen',
        'Ich brauche Pause',
        'Ich brauche Bewegung',
        'Ich bin eigentlich ok',
      ],
    },
    {
      type: 'end',
      prompt: 'Signal erkannt.',
      body: 'Tu jetzt das eine, was dein Körper braucht. Nicht mehr.',
    },
  ],
};
