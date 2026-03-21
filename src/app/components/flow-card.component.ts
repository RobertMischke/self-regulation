import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlowDefinition } from '../flows/flow.model';

@Component({
  selector: 'app-flow-card',
  standalone: true,
  template: `
    <div
      class="group relative flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-transparent transition hover:shadow-lg"
      [class]="highlighted
        ? 'border border-amber-200 hover:border-amber-300 hover:ring-amber-100'
        : 'border border-slate-200 hover:border-violet-200 hover:ring-violet-100'"
    >
      <button
        (click)="toggleFavorite.emit()"
        class="absolute right-2.5 top-2.5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xl transition hover:scale-110"
        [class]="isFavorite
          ? 'text-amber-400 hover:text-amber-500 drop-shadow-sm'
          : 'text-slate-300/60 opacity-0 group-hover:opacity-100 hover:text-amber-400'"
      >
        ★
      </button>
      <span class="text-base font-bold leading-snug">{{ flow.title }}</span>
      <p class="mt-1.5 text-[13px] leading-relaxed text-slate-500">{{ flow.description }}</p>
      <div class="mt-3 flex items-center gap-2 text-[12px] font-medium text-slate-400">
        <span class="rounded-md bg-violet-50 px-2 py-0.5 text-violet-600">{{ flow.duration }}</span>
        <span class="rounded-md bg-slate-100 px-2 py-0.5 text-slate-500">{{ flow.style }}</span>
      </div>
      <div class="mt-auto flex flex-wrap gap-1.5 pt-4">
        @for (tag of flow.tags; track tag) {
          <span class="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            {{ tag }}
          </span>
        }
      </div>
      <button
        (click)="start.emit()"
        class="mt-4 w-full rounded-xl bg-violet-600 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500">
        Starten
      </button>
    </div>
  `,
})
export class FlowCardComponent {
  @Input({ required: true }) flow!: FlowDefinition;
  @Input() isFavorite = false;
  @Input() highlighted = false;
  @Output() toggleFavorite = new EventEmitter<void>();
  @Output() start = new EventEmitter<void>();
}
