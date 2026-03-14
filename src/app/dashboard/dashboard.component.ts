import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from '../components/progress-bar.component';
import { MetricCardComponent } from '../components/metric-card.component';
import { DashboardConfig } from '../models/dashboard-config';
import { ModeDefinition, RegulationModel, SliderItem } from '../models/types';
import { getDashboardConfig, getAllDashboardConfigs } from '../configs/dashboard-registry';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, ProgressBarComponent, MetricCardComponent, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly config: DashboardConfig;
  readonly values: WritableSignal<Record<string, number>>;
  readonly currentTask: WritableSignal<string>;
  readonly microCommitment: WritableSignal<string>;
  readonly focusMessage = signal('');

  readonly model: Signal<RegulationModel>;
  readonly activeMode: Signal<ModeDefinition>;
  readonly systemFeedback: Signal<{ title: string; text: string; badge: string }>;
  readonly idealStateDistance: Signal<number>;
  readonly sliderItems: Signal<SliderItem[]>;

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
    this.currentTask = signal(this.config.defaultTask);
    this.microCommitment = signal(this.config.defaultMicroCommitment);

    this.model = computed(() => this.config.calculate(this.values()));
    this.activeMode = computed(() => this.config.modes[this.model().modeKey]);
    this.systemFeedback = computed(() => this.config.getSystemFeedback(this.model().modeKey));
    this.idealStateDistance = computed(() => this.config.calculateIdealDistance(this.values()));
    this.sliderItems = computed(() =>
      this.config.sliders.map((s) => ({
        ...s,
        value: this.values()[s.key] ?? 50,
      }))
    );
  }

  onSliderChange(key: string, value: number): void {
    this.values.update((v) => ({ ...v, [key]: value }));
  }

  resetToBalanced(): void {
    this.values.set({ ...this.config.resetValues });
    this.microCommitment.set(this.config.resetMicroCommitment);
    this.focusMessage.set('');
  }

  startFocusBlock(): void {
    this.focusMessage.set(
      `Aktiver Modus: ${this.activeMode().label}\n\nAktuelle Aufgabe: ${this.currentTask()}\n\nNächster Schritt: ${this.microCommitment()}`
    );
  }
}
