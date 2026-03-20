import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlowDefinition, FlowStep } from '../flows/flow.model';

@Component({
  selector: 'app-flow-modal',
  standalone: true,
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm"
      (click)="close()"
    >
      <!-- Modal Card -->
      <div
        class="relative mx-4 flex w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div class="border-b border-slate-100 px-6 pb-4 pt-5">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-lg font-bold text-slate-900">{{ flow.title }}</h2>
              <p class="mt-0.5 text-xs text-slate-400">
                {{ flow.duration }} &middot; {{ flow.style }}
                @if (step.type !== 'end') {
                  &middot; Schritt {{ currentStep + 1 }} von {{ flow.steps.length }}
                }
              </p>
            </div>
            <button
              (click)="close()"
              class="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <span class="text-lg leading-none">&times;</span>
            </button>
          </div>

          <!-- Progress bar -->
          <div class="mt-3 flex gap-1">
            @for (s of flow.steps; track $index) {
              <div
                class="h-1 flex-1 rounded-full transition-colors"
                [class]="$index <= currentStep ? 'bg-violet-500' : 'bg-slate-200'"
              ></div>
            }
          </div>
        </div>

        <!-- Body -->
        <div class="min-h-[260px] px-6 py-6">
          <!-- Prompt -->
          <p class="text-base font-semibold text-slate-800">{{ step.prompt }}</p>

          <!-- Choice / Recheck options -->
          @if (step.type === 'choice' || step.type === 'recheck') {
            <div class="mt-5 flex flex-col gap-2">
              @for (opt of step.options; track opt) {
                <button
                  (click)="selectOption(opt)"
                  class="rounded-xl border px-4 py-3 text-left text-sm font-medium transition"
                  [class]="selectedOption === opt
                    ? 'border-violet-300 bg-violet-50 text-violet-700 ring-1 ring-violet-200'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'"
                >
                  {{ opt }}
                </button>
              }
            </div>
          }

          <!-- Action content -->
          @if (step.type === 'action') {
            @if (step.body) {
              <p class="mt-3 text-sm leading-relaxed text-slate-500">{{ step.body }}</p>
            }
            @if (step.items) {
              <ol class="mt-4 space-y-2.5">
                @for (item of step.items; track item) {
                  <li class="flex gap-3 text-sm leading-relaxed text-slate-600">
                    <span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet-100 text-[11px] font-bold text-violet-600">
                      {{ $index + 1 }}
                    </span>
                    {{ item }}
                  </li>
                }
              </ol>
            }
            @if (step.duration) {
              <p class="mt-4 text-xs font-medium text-slate-400">
                Nimm dir daf&uuml;r ungef&auml;hr {{ step.duration }}.
              </p>
            }
          }

          <!-- End content -->
          @if (step.type === 'end') {
            @if (step.body) {
              <p class="mt-3 text-sm leading-relaxed text-slate-500">{{ step.body }}</p>
            }
          }
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          @if (step.type === 'end') {
            <div></div>
            <button
              (click)="close()"
              class="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500"
            >
              Flow beenden
            </button>
          } @else {
            @if (currentStep > 0) {
              <button
                (click)="back()"
                class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                {{ step.backLabel || 'Zur&uuml;ck' }}
              </button>
            } @else {
              <div></div>
            }

            <button
              (click)="next()"
              [disabled]="!canAdvance"
              class="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500 disabled:opacity-40 disabled:pointer-events-none"
            >
              {{ step.nextLabel || 'Weiter' }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class FlowModalComponent {
  @Input() flow!: FlowDefinition;
  @Output() closed = new EventEmitter<void>();

  currentStep = 0;
  selectedOption: string | null = null;

  get step(): FlowStep {
    return this.flow.steps[this.currentStep];
  }

  get canAdvance(): boolean {
    if (this.step.type === 'choice' || this.step.type === 'recheck') {
      return this.selectedOption !== null;
    }
    return true;
  }

  selectOption(opt: string): void {
    this.selectedOption = opt;
  }

  next(): void {
    if (!this.canAdvance) return;
    if (this.currentStep < this.flow.steps.length - 1) {
      this.currentStep++;
      this.selectedOption = null;
    }
  }

  back(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.selectedOption = null;
    }
  }

  close(): void {
    this.closed.emit();
  }
}
