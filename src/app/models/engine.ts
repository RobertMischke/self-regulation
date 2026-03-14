import { ComputedMetric, DashboardConfig, ModeCondition, SliderFeedbackZone } from './dashboard-config';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

const SEVERITY_ORDER: Record<SliderFeedbackZone['severity'], number> = { severe: 0, moderate: 1, mild: 2 };

export interface ActiveSliderFeedback {
  sliderKey: string;
  sliderLabel: string;
  direction: 'low' | 'high';
  severity: SliderFeedbackZone['severity'];
  message: string;
  interventions: string[];
  microLabel?: string;
  value: number;
}

/**
 * Evaluate all slider feedback zones and return the most severe active zone
 * per slider per direction. Results are sorted by severity (severe first).
 */
export function collectSliderFeedbacks(config: DashboardConfig, inputs: Record<string, number>): ActiveSliderFeedback[] {
  const result: ActiveSliderFeedback[] = [];

  for (const slider of config.sliders) {
    if (!slider.feedbackZones?.length) continue;
    const value = inputs[slider.key] ?? 50;

    const activeByDirection = new Map<string, { zone: SliderFeedbackZone; severity: number }>();

    for (const zone of slider.feedbackZones) {
      const triggered = zone.direction === 'low' ? value < zone.threshold : value > zone.threshold;
      if (!triggered) continue;

      const existing = activeByDirection.get(zone.direction);
      const zoneOrder = SEVERITY_ORDER[zone.severity];
      if (!existing || zoneOrder < existing.severity) {
        activeByDirection.set(zone.direction, { zone, severity: zoneOrder });
      }
    }

    for (const { zone } of activeByDirection.values()) {
      result.push({
        sliderKey: slider.key,
        sliderLabel: slider.label,
        direction: zone.direction,
        severity: zone.severity,
        message: zone.message,
        interventions: zone.interventions,
        microLabel: zone.microLabel,
        value,
      });
    }
  }

  result.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
  return result;
}

export function computeMetric(metric: ComputedMetric, inputs: Record<string, number>): number {
  let sum = 0;
  for (const w of metric.weights) {
    const raw = inputs[w.sliderKey] ?? 50;
    const offset = w.offset ?? 0;
    const val = w.invert ? (offset - raw) : (raw + offset);
    sum += val * w.weight;
  }
  return Math.round(clamp(sum, 0, 100));
}

export function computeAllMetrics(config: DashboardConfig, inputs: Record<string, number>): Record<string, number> {
  const result: Record<string, number> = {};
  for (const metric of config.computedMetrics) {
    result[metric.key] = computeMetric(metric, inputs);
  }
  return result;
}

function evaluateCondition(
  cond: ModeCondition,
  inputs: Record<string, number>,
  computed: Record<string, number>,
): boolean {
  const val = cond.type === 'slider' ? (inputs[cond.key] ?? 50) : (computed[cond.key] ?? 0);
  switch (cond.operator) {
    case '>': return val > cond.value;
    case '<': return val < cond.value;
    case '>=': return val >= cond.value;
    case '<=': return val <= cond.value;
  }
}

export function resolveMode(config: DashboardConfig, inputs: Record<string, number>, computed: Record<string, number>): string {
  const sorted = [...config.modeRules].sort((a, b) => b.priority - a.priority);
  for (const rule of sorted) {
    if (rule.conditions.every((c) => evaluateCondition(c, inputs, computed))) {
      return rule.modeKey;
    }
  }
  return config.defaultModeKey;
}

export function calculateIdealDistance(config: DashboardConfig, inputs: Record<string, number>): number {
  if (config.idealValues.length === 0) return 0;
  let sum = 0;
  for (const iv of config.idealValues) {
    sum += Math.abs((inputs[iv.sliderKey] ?? 50) - iv.target);
  }
  return clamp(Math.round(sum / config.idealValues.length), 0, 100);
}
