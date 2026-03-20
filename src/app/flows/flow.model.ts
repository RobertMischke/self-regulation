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

export type FlowStepType = 'choice' | 'action' | 'recheck' | 'end';

export interface FlowStep {
  type: FlowStepType;
  prompt: string;
  options?: string[];
  body?: string;
  items?: string[];
  duration?: string;
  nextLabel?: string;
  backLabel?: string;
}

export interface FlowDefinition {
  id: string;
  title: string;
  description: string;
  duration: string;
  style: string;
  tags: string[];
  category: FlowCategory;
  steps: FlowStep[];
}
