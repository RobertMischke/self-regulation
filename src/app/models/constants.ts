import { ModeKey, ModeDefinition } from './types';

export const modeDefinitions: Record<ModeKey, ModeDefinition> = {
  start: {
    label: 'Starten',
    description: 'Wenn du nicht ins Tun kommst und einen sanften Einstieg brauchst.',
    interventions: [
      'Nur 3 Minuten anfangen – kein Leistungsanspruch.',
      'Brown Noise, instrumentale Musik oder Café-Sound testen.',
      'Ein einziges sichtbares To-do formulieren.',
      'Timer auf 5 oder 10 Minuten setzen.',
    ],
  },
  routine: {
    label: 'Routine',
    description: 'Für Fleißarbeit, Abarbeiten, Sortieren, Tickets, Mails und einfache Coding-Schritte.',
    interventions: [
      'Leichte Hintergrundstimulation nutzen.',
      'Kleine Checkliste sichtbar halten.',
      '25 Minuten Fokus, dann kurz resetten.',
      'Nicht optimieren – nur durchziehen.',
    ],
  },
  deepWork: {
    label: 'Deep Work',
    description: 'Für Architektur, harte Bugs, präzise Texte und Denken mit hoher Genauigkeit.',
    interventions: [
      'Semantische Reize raus: keine Serie, keine Sprache im Hintergrund.',
      'Tabs reduzieren und Kontext schließen.',
      'Vorher Ziel und Hypothese notieren.',
      '50 Minuten ruhig arbeiten, dann Pause.',
    ],
  },
  reset: {
    label: 'Reset',
    description: 'Wenn du überreizt bist oder emotional aus der Spur gerätst.',
    interventions: [
      '2 Minuten atmen und langsamer werden.',
      'Augen, Nacken und Schultern kurz entspannen.',
      'Wasser trinken, aufstehen, Licht oder frische Luft.',
      'Danach erst neu bewerten, nicht mitten im Alarmmodus.',
    ],
  },
};
