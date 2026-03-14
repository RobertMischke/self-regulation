import { CalculationInput, ModeKey, RegulationModel } from './types';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function calculateModel(input: CalculationInput): RegulationModel {
  const underStimulation = clamp(
    (50 - input.arousal) * 0.35 +
      (50 - input.bodyEnergy) * 0.25 +
      input.stimulationNeed * 0.2 +
      (50 - input.clarity) * 0.2,
    0,
    100
  );

  const overStimulation = clamp(
    (input.arousal - 50) * 0.4 +
      input.emotionalPressure * 0.25 +
      (50 - input.centeredness) * 0.2 +
      (50 - input.clarity) * 0.15,
    0,
    100
  );

  const regulation = clamp(
    input.centeredness * 0.35 +
      input.clarity * 0.25 +
      input.mood * 0.15 +
      input.bodyEnergy * 0.15 +
      (100 - input.emotionalPressure) * 0.1,
    0,
    100
  );

  const friction = clamp(100 - regulation + Math.max(underStimulation, overStimulation) * 0.35, 0, 100);

  let modeKey: ModeKey = 'routine';

  if (overStimulation > 60 || input.emotionalPressure > 70) {
    modeKey = 'reset';
  } else if (underStimulation > 60) {
    modeKey = 'start';
  } else if (input.clarity > 65 && input.centeredness > 60 && input.emotionalPressure < 45) {
    modeKey = 'deepWork';
  }

  const reflectiveQuestion =
    modeKey === 'reset'
      ? 'Was ist gerade zu viel – Reiz, Druck, Unsicherheit oder offene Schleifen?'
      : modeKey === 'start'
        ? 'Welche Mini-Handlung bringt dich jetzt in Bewegung, ohne dass du Motivation brauchst?'
        : modeKey === 'deepWork'
          ? 'Was ist die eine präzise Denkfrage, die du in diesem Block beantworten willst?'
          : 'Welche überschaubare Aufgabe kannst du jetzt zuverlässig abarbeiten?';

  return {
    underStimulation: Math.round(underStimulation),
    overStimulation: Math.round(overStimulation),
    regulation: Math.round(regulation),
    friction: Math.round(friction),
    modeKey,
    reflectiveQuestion,
  };
}

export function calculateIdealStateDistance(
  arousal: number,
  mood: number,
  centeredness: number,
  clarity: number,
  bodyEnergy: number,
  emotionalPressure: number,
  stimulationNeed: number
): number {
  return clamp(
    Math.round(
      (Math.abs(arousal - 58) +
        Math.abs(mood - 68) +
        Math.abs(centeredness - 70) +
        Math.abs(clarity - 72) +
        Math.abs(bodyEnergy - 68) +
        Math.abs(emotionalPressure - 28) +
        Math.abs(stimulationNeed - 48)) /
        7
    ),
    0,
    100
  );
}

export function getSystemFeedback(modeKey: ModeKey): { title: string; text: string; badge: string } {
  if (modeKey === 'reset') {
    return {
      title: 'Du wirkst eher überladen als unfähig.',
      text: 'Gerade ist wahrscheinlich nicht mehr Druck sinnvoll, sondern weniger innere und äußere Komplexität. Erst regulieren, dann leisten.',
      badge: 'Überreizung wahrscheinlich',
    };
  }

  if (modeKey === 'start') {
    return {
      title: 'Du brauchst vermutlich Aktivierung statt mehr Willenskraft.',
      text: 'Das passt gut zu einem ADHS-Muster: Nicht zu wenig Können, sondern zu wenig Anlaufenergie. Nutze bewusst Stimulation, aber dosiert.',
      badge: 'Unterstimulation wahrscheinlich',
    };
  }

  if (modeKey === 'deepWork') {
    return {
      title: 'Guter Zustand für präzises Denken.',
      text: 'Deine Werte sprechen eher für Klarheit und Mitte. Jetzt lohnt es sich, Reize zu reduzieren und eine anspruchsvolle Aufgabe gezielt anzugehen.',
      badge: 'Deep-Work-Fenster',
    };
  }

  return {
    title: 'Solider Arbeitsmodus.',
    text: 'Nicht perfekt, aber funktionsfähig. Eher auf Routine, Struktur und Verlässlichkeit setzen als auf Inspiration.',
    badge: 'Arbeitsmodus stabil',
  };
}
