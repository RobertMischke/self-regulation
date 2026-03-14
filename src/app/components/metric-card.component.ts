import { Component, Input } from '@angular/core';
import { ProgressBarComponent } from './progress-bar.component';
import { InfoTooltipComponent } from './info-tooltip.component';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [ProgressBarComponent, InfoTooltipComponent],
  template: `
    <div class="rounded-2xl border border-slate-200 bg-white p-4">
      <div class="flex items-center justify-between gap-3 text-sm">
        <span class="flex items-center gap-1">
          <span>{{ label }}</span>
          <app-info-tooltip [text]="description" />
        </span>
        <strong class="text-lg text-slate-900">{{ value }}</strong>
      </div>
      <app-progress-bar [value]="value" [danger]="danger" />
    </div>
  `,
})
export class MetricCardComponent {
  @Input() label = '';
  @Input() value = 0;
  @Input() danger = false;
  @Input() description?: string;
}
