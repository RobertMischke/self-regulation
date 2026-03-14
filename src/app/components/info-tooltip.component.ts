import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-info-tooltip',
  standalone: true,
  template: `
    @if (text) {
      <span class="relative"
        (mouseenter)="open.set(true)"
        (mouseleave)="open.set(false)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"
          class="inline h-4 w-4 align-[-0.2em] text-slate-400 transition hover:text-slate-600">
          <circle cx="10" cy="10" r="7.5" />
          <path stroke-linecap="round" d="M8.5 8a1.5 1.5 0 0 1 2.87-.6c.3.63-.13 1.35-.82 1.55A1 1 0 0 0 10 9.9v.6M10 13h.01" />
        </svg>
        @if (open()) {
          <div class="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-slate-200 bg-white p-3 text-xs leading-5 text-slate-600 shadow-lg">
            {{ text }}
          </div>
        }
      </span>
    }
  `,
})
export class InfoTooltipComponent {
  @Input() text?: string;
  readonly open = signal(false);
}
