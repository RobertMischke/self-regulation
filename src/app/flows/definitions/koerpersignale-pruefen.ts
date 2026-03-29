import { FlowDefinition } from '../flow.model';

export const KOERPERSIGNALE_PRUEFEN: FlowDefinition = {
  id: 'koerpersignale-pruefen',
  title: 'Körpersignale prüfen',
  description: 'Kurzer Check: Was braucht dein Körper gerade wirklich?',
  duration: '3–5 Min',
  style: 'ruhig',
  tags: ['Körper', 'Check-in'],
  category: 'koerper-beduerfnisse',
  meta: {
    strengths: [
      'Body-Scan als Bewusstmachung ist evidenzbasiert',
      'Niedrigschwellig und kurz',
      'Gutes Framework: spüren → benennen → handeln',
    ],
    weaknesses: [
      'Die 5 Optionen im initialen Check sind ungewöhnlich viel – "Nichts Spürbares" ist ein Sonderfall',
      'Könnte für wiederkehrende Nutzung variieren (z.B. andere Körperteile im Scan)',
    ],
    analysis: 'Grundlegend überarbeitet: Zweite Choice routed jetzt zu spezifischen Micro-Actions pro Signal (Essen, Pause, Bewegung). "Eigentlich ok" geht direkt zum Ende. Jeder Pfad hat eine konkrete Handlungsanweisung.',
    reviewedAt: '2026-03-29',
  },
  steps: [
    {
      id: 'check',
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
      id: 'scan',
      type: 'action',
      prompt: 'Kurzer Body-Scan.',
      body: 'Schließe kurz die Augen. Spüre nacheinander in Kopf, Schultern, Bauch und Beine. Wo ist etwas? Wo ist nichts?',
      duration: '30 Sekunden',
      nextLabel: 'Weiter',
    },
    {
      id: 'signal',
      type: 'choice',
      prompt: 'Was signalisiert dein Körper?',
      options: [
        { label: 'Ich brauche Essen', next: 'eat' },
        { label: 'Ich brauche Pause', next: 'rest' },
        { label: 'Ich brauche Bewegung', next: 'move' },
        { label: 'Ich bin eigentlich ok', next: 'end' },
      ],
    },
    {
      id: 'eat',
      type: 'action',
      prompt: 'Hol dir jetzt etwas zu essen.',
      body: 'Etwas Kleines reicht. Ein Apfel, eine Handvoll Nüsse, ein Brot. Nicht planen – einfach das Nächstbeste.',
      nextLabel: 'Gemacht',
      next: 'end',
    },
    {
      id: 'rest',
      type: 'action',
      prompt: 'Gönn dir 5 Minuten Pause.',
      body: 'Augen schließen, Kopf zurücklehnen, nichts tun. Kein Handy. Einfach kurz abschalten.',
      duration: '5 Minuten',
      nextLabel: 'Gemacht',
      next: 'end',
    },
    {
      id: 'move',
      type: 'action',
      prompt: 'Beweg dich kurz.',
      body: 'Steh auf, streck dich, geh einmal durchs Zimmer. Schultern kreisen, Arme schütteln. 2 Minuten reichen.',
      duration: '2 Minuten',
      nextLabel: 'Gemacht',
      next: 'end',
    },
    {
      id: 'end',
      type: 'end',
      prompt: 'Signal erkannt.',
      body: 'Tu jetzt das eine, was dein Körper braucht. Nicht mehr.',
    },
  ],
};
