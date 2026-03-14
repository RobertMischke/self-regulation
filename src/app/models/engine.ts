import { ComputedMetric, DashboardConfig, ModeCondition } from './dashboard-config';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
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
