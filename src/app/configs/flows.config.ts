export interface FlowConfig {
  title: string;
  description: string;
  duration: string;
  style: string;
  tags: string[];
  category: FlowCategory;
}

export type FlowCategory =
  | 'schlaf-abend'
  | 'stress-ueberforderung'
  | 'fokus-arbeit'
  | 'koerper-beduerfnisse'
  | 'soziale-situationen'
  | 'klarheit-orientierung';

export interface FlowCategoryMeta {
  key: FlowCategory;
  label: string;
}

export const FLOW_CATEGORIES: FlowCategoryMeta[] = [
  { key: 'schlaf-abend', label: 'Schlaf & Abend' },
  { key: 'stress-ueberforderung', label: 'Stress & Überforderung' },
  { key: 'fokus-arbeit', label: 'Fokus & Arbeit' },
  { key: 'koerper-beduerfnisse', label: 'Körper & Bedürfnisse' },
  { key: 'soziale-situationen', label: 'Soziale Situationen' },
  { key: 'klarheit-orientierung', label: 'Klarheit & Orientierung' },
];

export const FLOWS: FlowConfig[] = [
  // Schlaf & Abend
  {
    title: 'In den Schlaf finden',
    description: 'Gedankenkarussell stoppen und den Körper auf Schlaf einstellen.',
    duration: '8–12 Min',
    style: 'ruhig',
    tags: ['abends', 'Schlaf'],
    category: 'schlaf-abend',
  },
  {
    title: 'Abend runterfahren',
    description: 'Vom Tagesmodus in Ruhe wechseln – Schritt für Schritt.',
    duration: '5–10 Min',
    style: 'ruhig',
    tags: ['abends', 'Entspannung'],
    category: 'schlaf-abend',
  },
  {
    title: 'Tag abschließen',
    description: 'Den Tag bewusst beenden, damit er nicht ins Bett mitkommt.',
    duration: '5–8 Min',
    style: 'kompakt',
    tags: ['abends', 'Reflexion'],
    category: 'schlaf-abend',
  },

  // Stress & Überforderung
  {
    title: 'Nach Überforderung runterregeln',
    description: 'Nervensystem beruhigen, wenn alles auf einmal reinkam.',
    duration: '5–10 Min',
    style: 'ruhig',
    tags: ['nach Stress', 'Regulation'],
    category: 'stress-ueberforderung',
  },
  {
    title: 'Wenn alles zu viel ist',
    description: 'Erste Hilfe für den Moment, in dem nichts mehr geht.',
    duration: '3–5 Min',
    style: 'kompakt',
    tags: ['akut', 'Überforderung'],
    category: 'stress-ueberforderung',
  },
  {
    title: 'Kurzer Reset',
    description: 'Schnell raus aus dem Stress-Modus und neu starten.',
    duration: '3–5 Min',
    style: 'aktivierend',
    tags: ['Reset', 'kompakt'],
    category: 'stress-ueberforderung',
  },

  // Fokus & Arbeit
  {
    title: 'Wieder ins Arbeiten kommen',
    description: 'Den inneren Widerstand überwinden und sanft starten.',
    duration: '5–8 Min',
    style: 'aktivierend',
    tags: ['Fokus', 'Arbeit'],
    category: 'fokus-arbeit',
  },
  {
    title: 'Vor einer wichtigen Aufgabe sammeln',
    description: 'Klarheit und Ruhe aufbauen, bevor es losgeht.',
    duration: '5–10 Min',
    style: 'ruhig',
    tags: ['Vorbereitung', 'Fokus'],
    category: 'fokus-arbeit',
  },
  {
    title: 'Ablenkung unterbrechen',
    description: 'Aus dem Ablenkungsmodus ausbrechen und umschalten.',
    duration: '3–5 Min',
    style: 'kompakt',
    tags: ['Ablenkung', 'Reset'],
    category: 'fokus-arbeit',
  },

  // Körper & Bedürfnisse
  {
    title: 'Körpersignale prüfen',
    description: 'Kurzer Check: Was braucht dein Körper gerade wirklich?',
    duration: '3–5 Min',
    style: 'ruhig',
    tags: ['Körper', 'Check-in'],
    category: 'koerper-beduerfnisse',
  },
  {
    title: 'Bin ich hungrig oder überreizt?',
    description: 'Hunger von Reizüberflutung unterscheiden lernen.',
    duration: '3–5 Min',
    style: 'kompakt',
    tags: ['Körper', 'Bedürfnisse'],
    category: 'koerper-beduerfnisse',
  },
  {
    title: 'Bewegungsbedarf klären',
    description: 'Herausfinden, ob dein Körper Bewegung braucht – und welche.',
    duration: '3–5 Min',
    style: 'aktivierend',
    tags: ['Bewegung', 'Körper'],
    category: 'koerper-beduerfnisse',
  },

  // Soziale Situationen
  {
    title: 'Nach sozialem Stress stabilisieren',
    description: 'Wieder zu dir kommen nach einer anstrengenden Begegnung.',
    duration: '5–10 Min',
    style: 'ruhig',
    tags: ['nach Stress', 'sozial'],
    category: 'soziale-situationen',
  },
  {
    title: 'Vor einem schwierigen Gespräch',
    description: 'Innere Haltung aufbauen, bevor es ernst wird.',
    duration: '5–8 Min',
    style: 'ruhig',
    tags: ['Vorbereitung', 'sozial'],
    category: 'soziale-situationen',
  },
  {
    title: 'Nach einem Konflikt runterkommen',
    description: 'Aufgewühlte Energie abbauen und Klarheit zurückgewinnen.',
    duration: '5–10 Min',
    style: 'ruhig',
    tags: ['nach Stress', 'Konflikt'],
    category: 'soziale-situationen',
  },

  // Klarheit & Orientierung
  {
    title: 'Gedanken sortieren',
    description: 'Struktur ins Chaos bringen, wenn zu viel gleichzeitig kreist.',
    duration: '5–10 Min',
    style: 'ruhig',
    tags: ['Klarheit', 'Struktur'],
    category: 'klarheit-orientierung',
  },
  {
    title: 'Nächsten Schritt finden',
    description: 'Aus der Starre in eine erste konkrete Handlung kommen.',
    duration: '5–8 Min',
    style: 'aktivierend',
    tags: ['Orientierung', 'Handlung'],
    category: 'klarheit-orientierung',
  },
  {
    title: 'Aus diffusem Druck in Klarheit kommen',
    description: 'Unklaren Druck in benennbare Schritte übersetzen.',
    duration: '8–12 Min',
    style: 'ruhig',
    tags: ['Druck', 'Klarheit'],
    category: 'klarheit-orientierung',
  },
];
