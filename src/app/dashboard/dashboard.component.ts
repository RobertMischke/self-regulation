import { Component, computed, effect, inject, OnDestroy, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormsModule, } from '@angular/forms';
import { KeyValuePipe } from '@angular/common';
import { ProgressBarComponent } from '../components/progress-bar.component';
import { MetricCardComponent } from '../components/metric-card.component';
import { RadarChartComponent } from '../components/radar-chart.component';
import { InfoTooltipComponent } from '../components/info-tooltip.component';
import { DashboardConfig, ModeDefinition, SystemFeedback, ComputedMetric, SliderItem } from '../models/dashboard-config';
import { getDashboardConfig, getAllDashboardConfigs } from '../configs/dashboard-registry';
import { computeAllMetrics, resolveMode, calculateIdealDistance, collectSliderFeedbacks, ActiveSliderFeedback } from '../models/engine';
import { Snapshot, getSnapshots, addSnapshot, deleteSnapshot, clearSnapshots, snapshotScore } from '../models/snapshot';

function severityRank(s: 'mild' | 'moderate' | 'severe'): number {
  return s === 'severe' ? 0 : s === 'moderate' ? 1 : 2;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, KeyValuePipe, ProgressBarComponent, MetricCardComponent, RadarChartComponent, InfoTooltipComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  host: { class: 'bg-slate-50' },
})
export class DashboardComponent implements OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private titleService = inject(Title);
  private autosaveTimer: ReturnType<typeof setTimeout> | null = null;

  readonly config: DashboardConfig;
  readonly values: WritableSignal<Record<string, number>>;
  readonly intention: WritableSignal<string>;
  readonly autosaveEnabled: WritableSignal<boolean>;
  readonly autosaveSeconds: WritableSignal<number>;
  readonly showAutosaveInfo: WritableSignal<boolean> = signal(false);

  readonly computedMetrics: Signal<Record<string, number>>;
  readonly regulationValue: Signal<number>;
  readonly frictionValue: Signal<number>;
  readonly activeModeKey: Signal<string>;
  readonly activeMode: Signal<ModeDefinition>;
  readonly systemFeedback: Signal<SystemFeedback>;
  readonly idealStateDistance: Signal<number>;
  readonly sliderItems: Signal<SliderItem[]>;
  readonly displayMetrics: Signal<{ metric: ComputedMetric; value: number }[]>;
  readonly sliderFeedbacks: Signal<ActiveSliderFeedback[]>;
  readonly sliderHints: Signal<Record<string, { severity: 'mild' | 'moderate' | 'severe'; microLabel: string }>>;
  readonly activeInterventionIndex: WritableSignal<number> = signal(0);
  readonly snapshots: WritableSignal<Snapshot[]>;
  readonly showHistory: WritableSignal<boolean> = signal(false);
  readonly showDetails: WritableSignal<boolean> = signal(false);
  readonly selectedSnapshot: WritableSignal<Snapshot | null> = signal(null);
  readonly expandedSnapshotId: WritableSignal<string | null> = signal(null);
  readonly disclaimerDismissed: WritableSignal<boolean>;

  constructor() {
    const key = this.route.snapshot.paramMap.get('key') ?? '';
    this.disclaimerDismissed = signal(localStorage.getItem('disclaimer_dismissed') === '1');
    const config = getDashboardConfig(key);
    if (!config) {
      this.config = getAllDashboardConfigs()[0];
      this.router.navigate(['/']);
    } else {
      this.config = config;
    }

    this.values = signal({ ...this.config.defaultValues });
    this.intention = signal(this.config.defaultIntention ?? '');
    this.titleService.setTitle(`${this.config.title} \u2013 Regulate`);

    this.computedMetrics = computed(() => computeAllMetrics(this.config, this.values()));

    this.regulationValue = computed(() => this.computedMetrics()[this.config.primaryMetrics.regulationKey] ?? 0);
    this.frictionValue = computed(() => this.computedMetrics()[this.config.primaryMetrics.frictionKey] ?? 0);

    this.activeModeKey = computed(() => resolveMode(this.config, this.values(), this.computedMetrics()));
    this.activeMode = computed(() => this.config.modes[this.activeModeKey()]);
    this.systemFeedback = computed(() => this.config.feedbacks[this.activeModeKey()] ?? {
      title: '', text: '', badge: this.activeModeKey(),
    });
    this.idealStateDistance = computed(() => calculateIdealDistance(this.config, this.values()));

    this.sliderItems = computed(() =>
      this.config.sliders.map((s) => ({ ...s, value: this.values()[s.key] ?? 50 }))
    );

    this.displayMetrics = computed(() => {
      const cm = this.computedMetrics();
      return this.config.computedMetrics
        .filter((m) => m.key !== this.config.primaryMetrics.regulationKey && m.key !== this.config.primaryMetrics.frictionKey)
        .map((m) => ({ metric: m, value: cm[m.key] ?? 0 }));
    });

    this.sliderFeedbacks = computed(() => collectSliderFeedbacks(this.config, this.values()));

    this.sliderHints = computed(() => {
      const hints: Record<string, { severity: 'mild' | 'moderate' | 'severe'; microLabel: string }> = {};
      for (const fb of this.sliderFeedbacks()) {
        if (fb.microLabel && (!hints[fb.sliderKey] || severityRank(fb.severity) < severityRank(hints[fb.sliderKey].severity))) {
          hints[fb.sliderKey] = { severity: fb.severity, microLabel: fb.microLabel };
        }
      }
      return hints;
    });

    this.snapshots = signal(getSnapshots(this.config.key));

    // Autosave config from localStorage
    const savedEnabled = localStorage.getItem(`autosave_enabled_${this.config.key}`);
    this.autosaveEnabled = signal(savedEnabled !== '0');
    const savedSeconds = parseInt(localStorage.getItem(`autosave_seconds_${this.config.key}`) ?? '', 10);
    this.autosaveSeconds = signal(isNaN(savedSeconds) || savedSeconds < 5 ? 30 : savedSeconds);

    // Reset index when feedbacks change
    effect(() => {
      this.sliderFeedbacks();
      this.activeInterventionIndex.set(0);
    });

    // Autosave debounce: restart timer on every value/intention change
    let autosaveInitialized = false;
    effect(() => {
      this.values();
      this.intention();
      const enabled = this.autosaveEnabled();
      if (!autosaveInitialized) {
        autosaveInitialized = true;
        return;
      }
      if (enabled) {
        this.resetAutosaveTimer();
      }
    });
  }

  private resetAutosaveTimer(): void {
    if (this.autosaveTimer) clearTimeout(this.autosaveTimer);
    this.autosaveTimer = setTimeout(() => {
      this.takeSnapshot();
    }, this.autosaveSeconds() * 1000);
  }

  ngOnDestroy(): void {
    if (this.autosaveTimer) clearTimeout(this.autosaveTimer);
  }

  toggleAutosave(): void {
    const next = !this.autosaveEnabled();
    this.autosaveEnabled.set(next);
    localStorage.setItem(`autosave_enabled_${this.config.key}`, next ? '1' : '0');
    if (!next && this.autosaveTimer) {
      clearTimeout(this.autosaveTimer);
      this.autosaveTimer = null;
    }
  }

  setAutosaveSeconds(value: number): void {
    const clamped = Math.max(5, Math.min(300, Math.round(value)));
    this.autosaveSeconds.set(clamped);
    localStorage.setItem(`autosave_seconds_${this.config.key}`, String(clamped));
    if (this.autosaveEnabled()) this.resetAutosaveTimer();
  }

  showIntervention(index: number): void {
    const max = this.sliderFeedbacks().length - 1;
    this.activeInterventionIndex.set(Math.max(0, Math.min(index, max)));
  }

  navigateToSliderIntervention(sliderKey: string): void {
    const idx = this.sliderFeedbacks().findIndex(fb => fb.sliderKey === sliderKey);
    if (idx >= 0) this.showIntervention(idx);
  }

  onSliderChange(key: string, value: number): void {
    this.values.update((v) => ({ ...v, [key]: value }));
  }

  resetToBalanced(): void {
    this.values.set({ ...this.config.resetValues });
    this.intention.set(this.config.defaultIntention ?? '');
  }

  takeSnapshot(): void {
    const snap = addSnapshot({
      timestamp: Date.now(),
      dashboardKey: this.config.key,
      values: { ...this.values() },
      regulation: this.regulationValue(),
      friction: this.frictionValue(),
      modeKey: this.activeModeKey(),
      modeLabel: this.activeMode().label,
      intention: this.intention(),
    });
    this.snapshots.update(list => [...list, snap]);
  }

  removeSnapshot(id: string): void {
    deleteSnapshot(id);
    this.snapshots.update(list => list.filter(s => s.id !== id));
    if (this.expandedSnapshotId() === id) this.expandedSnapshotId.set(null);
    if (this.selectedSnapshot()?.id === id) this.selectedSnapshot.set(null);
  }

  clearAllSnapshots(): void {
    clearSnapshots(this.config.key);
    this.snapshots.set([]);
    this.expandedSnapshotId.set(null);
    this.selectedSnapshot.set(null);
  }

  toggleSnapshotDetail(id: string): void {
    this.expandedSnapshotId.set(this.expandedSnapshotId() === id ? null : id);
  }

  sliderLabel(key: string): string {
    return this.config.sliders.find(s => s.key === key)?.label ?? key;
  }

  miniRadarPoints(values: Record<string, number>, cx: number, cy: number, r: number): string {
    const keys = this.config.sliders.map(s => s.key);
    const n = keys.length;
    return keys.map((key, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const v = (values[key] ?? 50) / 100;
      const x = cx + r * v * Math.cos(angle);
      const y = cy + r * v * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  }

  miniRadarRing(cx: number, cy: number, r: number, fraction: number): string {
    const n = this.config.sliders.length;
    return Array.from({ length: n }, (_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return `${cx + r * fraction * Math.cos(angle)},${cy + r * fraction * Math.sin(angle)}`;
    }).join(' ');
  }

  metricDescription(key: string): string | undefined {
    return this.config.computedMetrics.find(m => m.key === key)?.description;
  }

  restoreSnapshot(snap: Snapshot): void {
    this.values.set({ ...snap.values });
    this.intention.set(snap.intention);
    this.selectedSnapshot.set(null);
    this.showHistory.set(false);
  }

  openSnapshot(snap: Snapshot): void {
    this.selectedSnapshot.set(this.selectedSnapshot()?.id === snap.id ? null : snap);
  }

  dismissDisclaimer(): void {
    localStorage.setItem('disclaimer_dismissed', '1');
    this.disclaimerDismissed.set(true);
  }

  snapshotScore = snapshotScore;

  scoreColor(score: number): string {
    if (score >= 70) return 'bg-emerald-400';
    if (score >= 45) return 'bg-amber-500';
    return 'bg-red-500';
  }

  snapshotSeverityColor(snap: Snapshot): string {
    const feedbacks = collectSliderFeedbacks(this.config, snap.values);
    if (feedbacks.length === 0) return 'bg-emerald-400';
    const hasSevere = feedbacks.some(f => f.severity === 'severe');
    if (hasSevere) return 'bg-red-500';
    const hasModerate = feedbacks.some(f => f.severity === 'moderate');
    if (hasModerate) return 'bg-amber-500';
    return 'bg-slate-400';
  }

  formatTime(ts: number): string {
    return new Date(ts).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  }

  formatDateTime(ts: number): string {
    const d = new Date(ts);
    const date = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
    const time = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
  }

  scoreToY(score: number, snaps: Snapshot[], height: number): number {
    const scores = snaps.map(s => snapshotScore(s));
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const spread = max - min;
    if (spread < 5) {
      // Almost no variation — center the line
      return height * 0.5;
    }
    const pad = spread * 0.15;
    const lo = min - pad;
    const hi = max + pad;
    const norm = (score - lo) / (hi - lo);
    return height - Math.max(0, Math.min(1, norm)) * height;
  }

  wavePath(snaps: Snapshot[], width: number, height: number): string {
    if (snaps.length === 0) return '';
    if (snaps.length === 1) {
      return `M0,${height * 0.5} L${width},${height * 0.5}`;
    }
    const step = width / (snaps.length - 1);
    const points = snaps.map((s, i) => ({
      x: i * step,
      y: this.scoreToY(snapshotScore(s), snaps, height),
    }));
    let d = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const cp = step * 0.4;
      d += ` C${points[i - 1].x + cp},${points[i - 1].y} ${points[i].x - cp},${points[i].y} ${points[i].x},${points[i].y}`;
    }
    return d;
  }

  waveAreaPath(snaps: Snapshot[], width: number, height: number): string {
    const line = this.wavePath(snaps, width, height);
    if (!line) return '';
    return line + ` L${width},${height} L0,${height} Z`;
  }

  snapshotStrokeColor(snap: Snapshot): string {
    const feedbacks = collectSliderFeedbacks(this.config, snap.values);
    if (feedbacks.length === 0) return '#34d399';
    if (feedbacks.some(f => f.severity === 'severe')) return '#ef4444';
    if (feedbacks.some(f => f.severity === 'moderate')) return '#f59e0b';
    return '#94a3b8';
  }

  snapshotSeverityTextColor(snap: Snapshot): string {
    const feedbacks = collectSliderFeedbacks(this.config, snap.values);
    if (feedbacks.length === 0) return 'text-emerald-500';
    if (feedbacks.some(f => f.severity === 'severe')) return 'text-red-500';
    if (feedbacks.some(f => f.severity === 'moderate')) return 'text-amber-500';
    return 'text-slate-400';
  }

  snapshotIdealDistance(snap: Snapshot): number {
    return Math.round(calculateIdealDistance(this.config, snap.values));
  }
}
