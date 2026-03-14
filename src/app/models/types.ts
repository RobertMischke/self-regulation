export type ModeKey = 'start' | 'routine' | 'deepWork' | 'reset';

export type ModeDefinition = {
  label: string;
  description: string;
  interventions: string[];
};

export type DashboardDefinition = {
  key: string;
  title: string;
  goal: string;
  audience: string;
  metrics: string[];
};

export type RegulationModel = {
  underStimulation: number;
  overStimulation: number;
  regulation: number;
  friction: number;
  modeKey: ModeKey;
  reflectiveQuestion: string;
};

export type SliderItem = {
  key: string;
  label: string;
  value: number;
  left: string;
  right: string;
};

export type CalculationInput = {
  arousal: number;
  mood: number;
  centeredness: number;
  clarity: number;
  bodyEnergy: number;
  emotionalPressure: number;
  stimulationNeed: number;
};
