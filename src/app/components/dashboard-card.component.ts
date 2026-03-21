import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardConfig } from '../models/dashboard-config';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="['/dashboard', config.key]"
      class="group relative flex cursor-pointer flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-transparent transition hover:shadow-lg"
      [class]="highlighted
        ? 'border border-amber-200 hover:border-amber-300 hover:ring-amber-100'
        : 'border border-slate-200 hover:border-indigo-200 hover:ring-indigo-100'"
    >
      <button
        (click)="$event.preventDefault(); $event.stopPropagation(); toggleFavorite.emit()"
        class="absolute right-2.5 top-2.5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xl transition hover:scale-110"
        [class]="isFavorite
          ? 'text-amber-400 hover:text-amber-500 drop-shadow-sm'
          : 'text-slate-300/60 opacity-0 group-hover:opacity-100 hover:text-amber-400'"
      >
        ★
      </button>
      <div class="mb-3 flex items-center gap-3">
        <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg text-white shadow shadow-indigo-500/25">
          {{ config.icon }}
        </div>
        <span class="text-base font-bold leading-snug">
          {{ config.title }}
          <span class="ml-1 inline-block text-indigo-400 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100">&rarr;</span>
        </span>
      </div>
      <p class="text-[13px] leading-relaxed text-slate-500">{{ config.goal }}</p>
      <div class="mt-auto flex flex-wrap gap-1.5 pt-4">
        @for (metric of config.metricLabels; track metric) {
          <span class="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            {{ metric }}
          </span>
        }
      </div>
    </a>
  `,
})
export class DashboardCardComponent {
  @Input({ required: true }) config!: DashboardConfig;
  @Input() isFavorite = false;
  @Input() highlighted = false;
  @Output() toggleFavorite = new EventEmitter<void>();
}
