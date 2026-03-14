import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from '../components/progress-bar.component';
import { MetricCardComponent } from '../components/metric-card.component';
import { RadarChartComponent } from '../components/radar-chart.component';
import { DashboardConfig, ModeDefinition, SystemFeedback, ComputedMetric, SliderItem } from '../models/dashboard-config';
import { getDashboardConfig, getAllDashboardConfigs } from '../configs/dashboard-registry';
import { computeAllMetrics, resolveMode, calculateIdealDistance, collectSliderFeedbacks, ActiveSliderFeedback } from '../models/engine';
import { Snapshot, getSnapshots, addSnapshot, deleteSnapshot, snapshotScore } from '../models/snapshot';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, ProgressBarComponent, MetricCardComponent, RadarChartComponent, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly config: DashboardConfig;
  readonly values: WritableSignal<Record<string, number>>;
  readonly intention: WritableSignal<string>;

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
  readonly snapshots: WritableSignal<Snapshot[]>;
  readonly showHistory: WritableSignal<boolean> = signal(false);

  constructor() {
    const key = this.route.snapshot.paramMap.get('key') ?? '';
    const config = getDashboardConfig(key);
    if (!config) {
      this.config = getAllDashboardConfigs()[0];
      this.router.navigate(['/']);
    } else {
      this.config = config;
    }

    this.values = signal({ ...this.config.defaultValues });
    this.intention = signal(this.config.defaultIntention ?? '');

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

    this.snapshots = signal(getSnapshots(this.config.key));
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
  }

  restoreSnapshot(snap: Snapshot): void {
    this.values.set({ ...snap.values });
    this.intention.set(snap.intention);
  }

  snapshotScore = snapshotScore;

  scoreColor(score: number): string {
    if (score >= 70) return 'bg-emerald-400';
    if (score >= 45) return 'bg-amber-400';
    return 'bg-red-400';
  }

  formatTime(ts: number): string {
    return new Date(ts).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  }
}
