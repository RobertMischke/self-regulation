import { FlowDefinition } from '../flow.model';

export const IN_DEN_SCHLAF_FINDEN: FlowDefinition = {
  id: 'in-den-schlaf-finden',
  title: 'In den Schlaf finden',
  description: 'Gedankenkarussell stoppen und den Körper auf Schlaf einstellen.',
  duration: '8–12 Min',
  style: 'ruhig',
  tags: ['abends', 'Schlaf'],
  category: 'schlaf-abend',
  meta: {
    strengths: [
      'Progressive Entspannungssequenz gut aufgebaut',
      'Timer für Körperübungen hilfreich',
      'Klarer Schlaf-Fokus, gute Abendroutine',
    ],
    weaknesses: [
      'Initiale Auswahl beeinflusst den Pfad nicht – könnte spezifischer routen',
      'Könnte bei starker Unruhe einen intensiveren Alternativpfad anbieten',
    ],
    analysis: 'Solider Schlaf-Flow. Recheck verzweigt jetzt: "Noch unruhig" loopt zurück zur Körperübung, "Etwas besser" bietet sanften Abschluss. Gute Balance zwischen Kürze und Wirksamkeit.',
    reviewedAt: '2026-03-29',
  },
  steps: [
    {
      id: 'check',
      type: 'choice',
      prompt: 'Was hält dich gerade wach?',
      options: [
        'Gedankenkarussell',
        'Körperliche Anspannung',
        'Handy / Bildschirm',
        'Unklare Unruhe',
      ],
    },
    {
      id: 'small',
      type: 'action',
      prompt: 'Mach es jetzt sehr klein.',
      items: [
        'Lege das Handy außer Reichweite.',
        'Löse einmal bewusst Kiefer und Schultern.',
        'Atme 4 ruhige Atemzüge aus – länger aus als ein.',
      ],
      duration: '45 Sekunden',
      nextLabel: 'Gemacht',
      backLabel: 'Noch nicht',
    },
    {
      id: 'body',
      type: 'action',
      prompt: 'Lass den Körper ankommen.',
      body: 'Spüre, wie dein Körper auf der Matratze aufliegt. Du musst nichts tun. Lass den Atem von allein kommen.',
      duration: '60 Sekunden',
      nextLabel: 'Weiter',
    },
    {
      id: 'recheck',
      type: 'recheck',
      prompt: 'Wie ist es jetzt?',
      options: [
        { label: 'Ruhiger – ich kann schlafen', next: 'end' },
        { label: 'Etwas besser', next: 'end' },
        { label: 'Noch unruhig', next: 'body' },
      ],
    },
    {
      id: 'end',
      type: 'end',
      prompt: 'Gute Nacht.',
      body: 'Lass den Rest los. Morgen ist ein neuer Tag.',
    },
  ],
};
