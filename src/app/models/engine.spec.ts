import { DashboardConfig, ComputedMetric, ModeRule, SliderFeedbackZone } from './dashboard-config';
import { computeMetric, computeAllMetrics, resolveMode, calculateIdealDistance, collectSliderFeedbacks } from './engine';

// ---------------------------------------------------------------------------
// Helpers: Minimal config factory — only the fields the engine actually reads.
// ---------------------------------------------------------------------------

function makeConfig(overrides: Partial<DashboardConfig> = {}): DashboardConfig {
  return {
    key: 'test',
    title: '',
    icon: '',
    subtitle: '',
    goal: '',
    audience: '',
    disclaimer: '',
    metricLabels: [],
    sliders: [],
    defaultValues: {},
    resetValues: {},
    computedMetrics: [],
    primaryMetrics: { regulationKey: 'regulation', frictionKey: 'friction' },
    modeRules: [],
    defaultModeKey: 'routine',
    modes: {},
    feedbacks: {},
    idealValues: [],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// ADHS-Regulations-Dashboard mode rules (extracted for readable tests)
// ---------------------------------------------------------------------------

const adhsModeRules: ModeRule[] = [
  // Prio 30: Überstimulation > 60 → reset
  { modeKey: 'reset', priority: 30, conditions: [{ type: 'computed', key: 'overStimulation', operator: '>', value: 60 }] },
  // Prio 29: emotionalPressure slider > 70 → reset
  { modeKey: 'reset', priority: 29, conditions: [{ type: 'slider', key: 'emotionalPressure', operator: '>', value: 70 }] },
  // Prio 20: Unterstimulation > 60 → start
  { modeKey: 'start', priority: 20, conditions: [{ type: 'computed', key: 'underStimulation', operator: '>', value: 60 }] },
  // Prio 10: clarity > 65 AND centeredness > 60 AND emotionalPressure < 45 → deepWork
  {
    modeKey: 'deepWork',
    priority: 10,
    conditions: [
      { type: 'slider', key: 'clarity', operator: '>', value: 65 },
      { type: 'slider', key: 'centeredness', operator: '>', value: 60 },
      { type: 'slider', key: 'emotionalPressure', operator: '<', value: 45 },
    ],
  },
];

// ===================================================================
//  computeMetric
// ===================================================================

describe('computeMetric', () => {
  it('should compute a simple weighted sum', () => {
    const metric: ComputedMetric = {
      key: 'test',
      label: 'Test',
      weights: [
        { sliderKey: 'a', weight: 0.6 },
        { sliderKey: 'b', weight: 0.4 },
      ],
    };
    // 80 * 0.6 + 40 * 0.4 = 48 + 16 = 64
    expect(computeMetric(metric, { a: 80, b: 40 })).toBe(64);
  });

  it('should apply invert with offset (offset − value)', () => {
    const metric: ComputedMetric = {
      key: 'inv',
      label: 'Inverted',
      weights: [{ sliderKey: 'x', weight: 1.0, invert: true, offset: 100 }],
    };
    // invert: (100 - 30) * 1.0 = 70
    expect(computeMetric(metric, { x: 30 })).toBe(70);
    // invert: (100 - 90) * 1.0 = 10
    expect(computeMetric(metric, { x: 90 })).toBe(10);
  });

  it('should apply offset without invert (value + offset)', () => {
    const metric: ComputedMetric = {
      key: 'off',
      label: 'Offset',
      weights: [{ sliderKey: 'x', weight: 1.0, offset: -50 }],
    };
    // non-invert: (80 + (-50)) * 1.0 = 30
    expect(computeMetric(metric, { x: 80 })).toBe(30);
    // (40 - 50) * 1.0 = -10 → clamped to 0
    expect(computeMetric(metric, { x: 40 })).toBe(0);
  });

  it('should clamp to 0–100', () => {
    const high: ComputedMetric = {
      key: 'h',
      label: '',
      weights: [{ sliderKey: 'a', weight: 2.0 }],
    };
    // 80 * 2.0 = 160 → clamped to 100
    expect(computeMetric(high, { a: 80 })).toBe(100);

    const low: ComputedMetric = {
      key: 'l',
      label: '',
      weights: [{ sliderKey: 'a', weight: 1.0, offset: -200 }],
    };
    // (50 - 200) * 1.0 = -150 → clamped to 0
    expect(computeMetric(low, { a: 50 })).toBe(0);
  });

  it('should default missing slider values to 50', () => {
    const metric: ComputedMetric = {
      key: 'm',
      label: '',
      weights: [{ sliderKey: 'missing', weight: 1.0 }],
    };
    expect(computeMetric(metric, {})).toBe(50);
  });
});

// ===================================================================
//  computeAllMetrics
// ===================================================================

describe('computeAllMetrics', () => {
  it('should compute all metrics defined in the config', () => {
    const config = makeConfig({
      computedMetrics: [
        { key: 'alpha', label: 'A', weights: [{ sliderKey: 'x', weight: 1.0 }] },
        { key: 'beta', label: 'B', weights: [{ sliderKey: 'y', weight: 0.5 }] },
      ],
    });
    const result = computeAllMetrics(config, { x: 80, y: 60 });
    expect(result['alpha']).toBe(80);
    expect(result['beta']).toBe(30);
  });
});

// ===================================================================
//  resolveMode — core logic
// ===================================================================

describe('resolveMode', () => {

  describe('Grundlogik: Priorität, Bedingungen, Default', () => {

    it('should return defaultModeKey when no rule matches', () => {
      const config = makeConfig({
        modeRules: [
          { modeKey: 'special', priority: 10, conditions: [{ type: 'slider', key: 'x', operator: '>', value: 90 }] },
        ],
        defaultModeKey: 'fallback',
      });
      expect(resolveMode(config, { x: 50 }, {})).toBe('fallback');
    });

    it('should return defaultModeKey when there are no rules at all', () => {
      const config = makeConfig({ modeRules: [], defaultModeKey: 'idle' });
      expect(resolveMode(config, {}, {})).toBe('idle');
    });

    it('should pick the matching rule with the HIGHEST priority', () => {
      const config = makeConfig({
        modeRules: [
          { modeKey: 'low', priority: 1, conditions: [{ type: 'slider', key: 'x', operator: '>', value: 0 }] },
          { modeKey: 'high', priority: 99, conditions: [{ type: 'slider', key: 'x', operator: '>', value: 0 }] },
          { modeKey: 'mid', priority: 50, conditions: [{ type: 'slider', key: 'x', operator: '>', value: 0 }] },
        ],
        defaultModeKey: 'none',
      });
      // All three match (x=10 > 0), but 'high' has priority 99
      expect(resolveMode(config, { x: 10 }, {})).toBe('high');
    });

    it('should require ALL conditions to match (AND-logic)', () => {
      const config = makeConfig({
        modeRules: [
          {
            modeKey: 'both',
            priority: 10,
            conditions: [
              { type: 'slider', key: 'a', operator: '>', value: 50 },
              { type: 'slider', key: 'b', operator: '<', value: 30 },
            ],
          },
        ],
        defaultModeKey: 'default',
      });
      // Only first condition met → no match
      expect(resolveMode(config, { a: 60, b: 50 }, {})).toBe('default');
      // Only second condition met → no match
      expect(resolveMode(config, { a: 40, b: 20 }, {})).toBe('default');
      // Both met → match
      expect(resolveMode(config, { a: 60, b: 20 }, {})).toBe('both');
    });

    it('should support all four operators: >, <, >=, <=', () => {
      const rules: ModeRule[] = [
        { modeKey: 'gt', priority: 1, conditions: [{ type: 'slider', key: 'v', operator: '>', value: 50 }] },
        { modeKey: 'lt', priority: 2, conditions: [{ type: 'slider', key: 'v', operator: '<', value: 50 }] },
        { modeKey: 'gte', priority: 3, conditions: [{ type: 'slider', key: 'v', operator: '>=', value: 50 }] },
        { modeKey: 'lte', priority: 4, conditions: [{ type: 'slider', key: 'v', operator: '<=', value: 50 }] },
      ];

      // v = 50: gt fails, lt fails, gte matches, lte matches → lte wins (priority 4)
      expect(resolveMode(makeConfig({ modeRules: rules }), { v: 50 }, {})).toBe('lte');

      // v = 51: gt matches (prio 1), gte matches (prio 3), lte fails, lt fails → gte wins
      expect(resolveMode(makeConfig({ modeRules: rules }), { v: 51 }, {})).toBe('gte');

      // v = 49: lt matches (prio 2), lte matches (prio 4), gt fails, gte fails → lte wins
      expect(resolveMode(makeConfig({ modeRules: rules }), { v: 49 }, {})).toBe('lte');
    });

    it('should evaluate conditions against computed metrics when type is "computed"', () => {
      const config = makeConfig({
        modeRules: [
          { modeKey: 'alert', priority: 10, conditions: [{ type: 'computed', key: 'stress', operator: '>', value: 70 }] },
        ],
        defaultModeKey: 'calm',
      });
      expect(resolveMode(config, {}, { stress: 80 })).toBe('alert');
      expect(resolveMode(config, {}, { stress: 50 })).toBe('calm');
    });

    it('should default missing computed values to 0 and missing slider values to 50', () => {
      const config = makeConfig({
        modeRules: [
          { modeKey: 'a', priority: 2, conditions: [{ type: 'computed', key: 'unknown', operator: '>', value: 10 }] },
          { modeKey: 'b', priority: 1, conditions: [{ type: 'slider', key: 'unknown', operator: '>', value: 40 }] },
        ],
        defaultModeKey: 'default',
      });
      // computed 'unknown' defaults to 0 → 0 > 10 is false
      // slider 'unknown' defaults to 50 → 50 > 40 is true
      expect(resolveMode(config, {}, {})).toBe('b');
    });
  });

  // =================================================================
  //  ADHS-Regulations-Dashboard: konkrete Szenarien
  // =================================================================

  describe('ADHS-Dashboard: Modus-Auflösung', () => {

    const adhsConfig = makeConfig({ modeRules: adhsModeRules, defaultModeKey: 'routine' });

    it('routine — wenn nichts Besonderes vorliegt (alle Schwellen unterschritten)', () => {
      // Moderate Werte, keine Schwelle überschritten
      const inputs = { clarity: 50, centeredness: 50, emotionalPressure: 40 };
      const computed = { overStimulation: 30, underStimulation: 30 };
      expect(resolveMode(adhsConfig, inputs, computed)).toBe('routine');
    });

    it('reset — Überstimulation > 60 hat höchste Priorität (30)', () => {
      const inputs = { clarity: 80, centeredness: 70, emotionalPressure: 20 };
      const computed = { overStimulation: 65, underStimulation: 10 };
      // deepWork-Bedingungen wären erfüllt, aber reset (prio 30) schlägt deepWork (prio 10)
      expect(resolveMode(adhsConfig, inputs, computed)).toBe('reset');
    });

    it('reset — emotionalPressure > 70 löst ebenfalls reset aus (Prio 29)', () => {
      const inputs = { emotionalPressure: 75 };
      const computed = { overStimulation: 40, underStimulation: 40 };
      expect(resolveMode(adhsConfig, inputs, computed)).toBe('reset');
    });

    it('reset — beide reset-Regeln gleichzeitig erfüllt → immer noch reset (höchste gewinnt)', () => {
      const inputs = { emotionalPressure: 80 };
      const computed = { overStimulation: 70, underStimulation: 10 };
      expect(resolveMode(adhsConfig, inputs, computed)).toBe('reset');
    });

    it('start — Unterstimulation > 60 und keine reset-Bedingung', () => {
      const inputs = { emotionalPressure: 30 };
      const computed = { overStimulation: 20, underStimulation: 65 };
      expect(resolveMode(adhsConfig, inputs, computed)).toBe('start');
    });

    it('reset schlägt start — wenn overStimulation UND underStimulation beide > 60', () => {
      const inputs = { emotionalPressure: 30 };
      const computed = { overStimulation: 65, underStimulation: 65 };
      // Beide reset (prio 30) und start (prio 20) matchen → reset gewinnt
      expect(resolveMode(adhsConfig, inputs, computed)).toBe('reset');
    });

    it('deepWork — clarity > 65, centeredness > 60, emotionalPressure < 45', () => {
      const inputs = { clarity: 70, centeredness: 65, emotionalPressure: 30 };
      const computed = { overStimulation: 20, underStimulation: 20 };
      expect(resolveMode(adhsConfig, inputs, computed)).toBe('deepWork');
    });

    it('deepWork braucht ALLE drei Bedingungen — clarity allein reicht nicht', () => {
      const inputs = { clarity: 70, centeredness: 50, emotionalPressure: 30 };
      const computed = { overStimulation: 20, underStimulation: 20 };
      // centeredness 50 ist nicht > 60 → deepWork matcht nicht → routine
      expect(resolveMode(adhsConfig, inputs, computed)).toBe('routine');
    });

    it('deepWork scheitert bei zu hohem emotionalPressure', () => {
      const inputs = { clarity: 70, centeredness: 65, emotionalPressure: 50 };
      const computed = { overStimulation: 20, underStimulation: 20 };
      // emotionalPressure 50 ist nicht < 45 → deepWork matcht nicht
      expect(resolveMode(adhsConfig, inputs, computed)).toBe('routine');
    });

    it('start schlägt deepWork — Unterstimulation hat höhere Priorität', () => {
      const inputs = { clarity: 70, centeredness: 65, emotionalPressure: 30 };
      const computed = { overStimulation: 20, underStimulation: 65 };
      // deepWork (prio 10) und start (prio 20) matchen → start gewinnt
      expect(resolveMode(adhsConfig, inputs, computed)).toBe('start');
    });

    it('Grenzwerte: exakt auf der Schwelle zählt NICHT (strict operators)', () => {
      // overStimulation === 60 → nicht > 60 → kein reset
      expect(resolveMode(adhsConfig, {}, { overStimulation: 60, underStimulation: 0 })).toBe('routine');
      // underStimulation === 60 → nicht > 60 → kein start
      expect(resolveMode(adhsConfig, {}, { overStimulation: 0, underStimulation: 60 })).toBe('routine');
      // emotionalPressure === 70 → nicht > 70 → kein reset
      expect(resolveMode(adhsConfig, { emotionalPressure: 70 }, { overStimulation: 0, underStimulation: 0 })).toBe('routine');
      // clarity === 65 → nicht > 65 → kein deepWork
      expect(resolveMode(adhsConfig, { clarity: 65, centeredness: 65, emotionalPressure: 30 }, { overStimulation: 0, underStimulation: 0 })).toBe('routine');
    });

    it('Prioritätskette vollständig: reset > start > deepWork > routine', () => {
      // Alle Bedingungen gleichzeitig erfüllt
      const inputs = { clarity: 70, centeredness: 65, emotionalPressure: 80 };
      const computed = { overStimulation: 70, underStimulation: 70 };
      // reset(30), reset(29), start(20), deepWork scheitert (emotionalPressure > 45)
      expect(resolveMode(adhsConfig, inputs, computed)).toBe('reset');
    });
  });
});

// ===================================================================
//  calculateIdealDistance
// ===================================================================

describe('calculateIdealDistance', () => {
  it('should return 0 when all sliders are at their ideal values', () => {
    const config = makeConfig({
      idealValues: [
        { sliderKey: 'a', target: 60 },
        { sliderKey: 'b', target: 40 },
      ],
    });
    expect(calculateIdealDistance(config, { a: 60, b: 40 })).toBe(0);
  });

  it('should compute the average absolute distance to ideal', () => {
    const config = makeConfig({
      idealValues: [
        { sliderKey: 'a', target: 60 },
        { sliderKey: 'b', target: 40 },
      ],
    });
    // |70 - 60| = 10, |50 - 40| = 10  → average = 10
    expect(calculateIdealDistance(config, { a: 70, b: 50 })).toBe(10);
  });

  it('should return 0 when there are no ideal values defined', () => {
    const config = makeConfig({ idealValues: [] });
    expect(calculateIdealDistance(config, { a: 99 })).toBe(0);
  });

  it('should clamp the result to 0–100', () => {
    const config = makeConfig({
      idealValues: [{ sliderKey: 'a', target: 0 }],
    });
    // |100 - 0| = 100 → exactly 100, not more
    expect(calculateIdealDistance(config, { a: 100 })).toBe(100);
  });
});

// ===================================================================
//  collectSliderFeedbacks
// ===================================================================

describe('collectSliderFeedbacks', () => {

  const moodZones: SliderFeedbackZone[] = [
    { direction: 'low', threshold: 20, severity: 'severe', message: 'Stimmung sehr niedrig', interventions: ['Pause machen'] },
    { direction: 'low', threshold: 35, severity: 'moderate', message: 'Stimmung gedrückt', interventions: ['Leichte Aufgabe wählen'] },
    { direction: 'high', threshold: 90, severity: 'mild', message: 'Stimmung auffällig hoch', interventions: ['Euphoriecheck'] },
  ];

  const pressureZones: SliderFeedbackZone[] = [
    { direction: 'high', threshold: 80, severity: 'severe', message: 'Druck extrem hoch', interventions: ['Alles pausieren'] },
    { direction: 'high', threshold: 60, severity: 'moderate', message: 'Druck erhöht', interventions: ['Druck benennen'] },
  ];

  function feedbackConfig(sliders: { key: string; label: string; zones: SliderFeedbackZone[] }[]): DashboardConfig {
    return makeConfig({
      sliders: sliders.map((s) => ({
        key: s.key, label: s.label, left: '', right: '',
        feedbackZones: s.zones,
      })),
    });
  }

  it('should return empty array when no slider has feedback zones', () => {
    const config = makeConfig({ sliders: [{ key: 'x', label: 'X', left: '', right: '' }] });
    expect(collectSliderFeedbacks(config, { x: 10 })).toEqual([]);
  });

  it('should return empty array when no zone is triggered', () => {
    const config = feedbackConfig([{ key: 'mood', label: 'Mood', zones: moodZones }]);
    // mood=50: nicht < 35, nicht < 20, nicht > 90
    expect(collectSliderFeedbacks(config, { mood: 50 })).toEqual([]);
  });

  it('should trigger a low zone when value is below threshold', () => {
    const config = feedbackConfig([{ key: 'mood', label: 'Mood', zones: moodZones }]);
    const result = collectSliderFeedbacks(config, { mood: 30 });
    expect(result.length).toBe(1);
    expect(result[0].severity).toBe('moderate');
    expect(result[0].message).toBe('Stimmung gedrückt');
    expect(result[0].direction).toBe('low');
  });

  it('should trigger a high zone when value is above threshold', () => {
    const config = feedbackConfig([{ key: 'mood', label: 'Mood', zones: moodZones }]);
    const result = collectSliderFeedbacks(config, { mood: 95 });
    expect(result.length).toBe(1);
    expect(result[0].severity).toBe('mild');
    expect(result[0].direction).toBe('high');
  });

  it('should pick the most SEVERE zone per slider per direction when multiple match', () => {
    const config = feedbackConfig([{ key: 'mood', label: 'Mood', zones: moodZones }]);
    // mood=15: triggers both low zones (< 20 severe AND < 35 moderate)
    // → only severe should be returned
    const result = collectSliderFeedbacks(config, { mood: 15 });
    expect(result.length).toBe(1);
    expect(result[0].severity).toBe('severe');
    expect(result[0].message).toBe('Stimmung sehr niedrig');
  });

  it('should allow separate feedbacks for low AND high on the same slider', () => {
    // Hypothetical: a slider with both low and high zones active
    const bothZones: SliderFeedbackZone[] = [
      { direction: 'low', threshold: 999, severity: 'mild', message: 'always low', interventions: [] },
      { direction: 'high', threshold: 0, severity: 'mild', message: 'always high', interventions: [] },
    ];
    const config = feedbackConfig([{ key: 'x', label: 'X', zones: bothZones }]);
    const result = collectSliderFeedbacks(config, { x: 50 });
    // 50 < 999 → low triggers, 50 > 0 → high triggers
    expect(result.length).toBe(2);
    expect(result.map((r) => r.direction).sort()).toEqual(['high', 'low']);
  });

  it('should collect feedbacks from MULTIPLE sliders', () => {
    const config = feedbackConfig([
      { key: 'mood', label: 'Mood', zones: moodZones },
      { key: 'pressure', label: 'Pressure', zones: pressureZones },
    ]);
    // mood=15 → severe low, pressure=85 → severe high
    const result = collectSliderFeedbacks(config, { mood: 15, pressure: 85 });
    expect(result.length).toBe(2);
    expect(result.map((r) => r.sliderKey).sort()).toEqual(['mood', 'pressure']);
  });

  it('should sort results by severity: severe first, then moderate, then mild', () => {
    const config = feedbackConfig([
      { key: 'mood', label: 'Mood', zones: moodZones },
      { key: 'pressure', label: 'Pressure', zones: pressureZones },
    ]);
    // mood=30 → moderate, pressure=85 → severe
    const result = collectSliderFeedbacks(config, { mood: 30, pressure: 85 });
    expect(result.length).toBe(2);
    expect(result[0].severity).toBe('severe');   // pressure
    expect(result[1].severity).toBe('moderate');  // mood
  });

  it('should include slider label, value and interventions in the result', () => {
    const config = feedbackConfig([{ key: 'mood', label: 'Gefühlslage', zones: moodZones }]);
    const result = collectSliderFeedbacks(config, { mood: 10 });
    expect(result[0].sliderKey).toBe('mood');
    expect(result[0].sliderLabel).toBe('Gefühlslage');
    expect(result[0].value).toBe(10);
    expect(result[0].interventions).toEqual(['Pause machen']);
  });

  it('should NOT trigger when value is exactly at the threshold (strict comparison)', () => {
    const config = feedbackConfig([{ key: 'mood', label: 'Mood', zones: moodZones }]);
    // mood=20 → NOT < 20, so severe should NOT trigger
    // mood=20 → IS < 35, so moderate SHOULD trigger
    const result = collectSliderFeedbacks(config, { mood: 20 });
    expect(result.length).toBe(1);
    expect(result[0].severity).toBe('moderate');
  });

  it('should default missing slider values to 50', () => {
    const config = feedbackConfig([{ key: 'mood', label: 'Mood', zones: moodZones }]);
    // 'mood' not in inputs → defaults to 50 → no zone triggered
    expect(collectSliderFeedbacks(config, {})).toEqual([]);
  });

  describe('ADHS-Szenario: mehrere Slider gleichzeitig im Extrembereich', () => {
    const adhsConfig = feedbackConfig([
      { key: 'mood', label: 'Gefühlslage', zones: moodZones },
      { key: 'pressure', label: 'Emotionaler Druck', zones: pressureZones },
    ]);

    it('Alles normal → keine Hinweise', () => {
      expect(collectSliderFeedbacks(adhsConfig, { mood: 60, pressure: 40 })).toEqual([]);
    });

    it('Stimmung leicht gedrückt → ein moderater Hinweis', () => {
      const result = collectSliderFeedbacks(adhsConfig, { mood: 30, pressure: 40 });
      expect(result.length).toBe(1);
      expect(result[0].sliderKey).toBe('mood');
      expect(result[0].severity).toBe('moderate');
    });

    it('Stimmung am Boden + Druck extrem → zwei kritische Hinweise, severe zuerst', () => {
      const result = collectSliderFeedbacks(adhsConfig, { mood: 10, pressure: 90 });
      expect(result.length).toBe(2);
      expect(result.every((r) => r.severity === 'severe')).toBe(true);
    });

    it('Stimmung moderat + Druck moderat → zwei moderate Hinweise', () => {
      const result = collectSliderFeedbacks(adhsConfig, { mood: 30, pressure: 65 });
      expect(result.length).toBe(2);
      expect(result.every((r) => r.severity === 'moderate')).toBe(true);
    });
  });
});
