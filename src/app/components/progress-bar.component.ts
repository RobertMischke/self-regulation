import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  template: `
    <div class="mt-2 h-2.5 w-full overflow-hidden rounded-full"
         [class]="danger ? 'bg-red-100' : neutral ? 'bg-sky-100' : 'bg-slate-200'">
      <div class="h-full rounded-full bg-gradient-to-r from-slate-600 to-slate-900 transition-all"
           [style.width.%]="clampedValue">
      </div>
    </div>
  `,
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() danger = false;
  @Input() neutral = false;

  get clampedValue(): number {
    return Math.min(Math.max(this.value, 0), 100);
  }
}
