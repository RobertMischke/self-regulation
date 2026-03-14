import { ModeDefinition, RegulationModel } from './types';

export interface SliderDefinition {
  key: string;
  label: string;
  left: string;
  right: string;
}

export interface QuestionGroup {
  title: string;
  questions: string[];
}

export interface DashboardConfig {
  key: string;
  title: string;
  icon: string;
  subtitle: string;
  goal: string;
  audience: string;
  disclaimer: string;
  metricLabels: string[];
  sliders: SliderDefinition[];
  modes: Record<string, ModeDefinition>;
  questionGroups: QuestionGroup[];
  defaultValues: Record<string, number>;
  resetValues: Record<string, number>;
  defaultTask: string;
  defaultMicroCommitment: string;
  resetMicroCommitment: string;
  calculate: (inputs: Record<string, number>) => RegulationModel;
  calculateIdealDistance: (inputs: Record<string, number>) => number;
  getSystemFeedback: (modeKey: string) => { title: string; text: string; badge: string };
}
