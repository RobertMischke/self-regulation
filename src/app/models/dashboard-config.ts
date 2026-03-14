export interface SliderFeedbackZone {
  direction: 'low' | 'high';
  threshold: number;
  severity: 'mild' | 'moderate' | 'severe';
  message: string;
  interventions: string[];
}

export interface SliderDefinition {
  key: string;
  label: string;
  left: string;
  right: string;
  feedbackZones?: SliderFeedbackZone[];
}

export type SliderItem = SliderDefinition & { value: number };

export interface QuestionGroup {
  title: string;
  questions: string[];
}

export interface MetricWeight {
  sliderKey: string;
  weight: number;
  invert?: boolean;
  offset?: number;
}

export interface ModeRule {
  modeKey: string;
  priority: number;
  conditions: ModeCondition[];
}

export interface ModeCondition {
  type: 'slider' | 'computed';
  key: string;
  operator: '>' | '<' | '>=' | '<=';
  value: number;
}

export interface IdealValue {
  sliderKey: string;
  target: number;
}

export interface ModeDefinition {
  label: string;
  description: string;
  interventions: string[];
  reflectiveQuestion: string;
}

export interface SystemFeedback {
  title: string;
  text: string;
  badge: string;
}

export interface ComputedMetric {
  key: string;
  label: string;
  weights: MetricWeight[];
  danger?: boolean;
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
  defaultValues: Record<string, number>;
  resetValues: Record<string, number>;

  computedMetrics: ComputedMetric[];
  primaryMetrics: { regulationKey: string; frictionKey: string };
  modeRules: ModeRule[];
  defaultModeKey: string;
  modes: Record<string, ModeDefinition>;
  feedbacks: Record<string, SystemFeedback>;
  idealValues: IdealValue[];

  questionGroups: QuestionGroup[];
  defaultTask: string;
  defaultMicroCommitment: string;
  resetMicroCommitment: string;
}
