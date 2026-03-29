import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { FlowDefinition, FlowStep, FlowOption } from '../flows/flow.model';
import { getFlowById } from '../flows/flow-registry';
import { FlowGraphComponent } from './flow-graph.component';

@Component({
  selector: 'app-flow-modal',
  standalone: true,
  imports: [FlowGraphComponent],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm"
      (click)="close()"
    >
      <!-- Modal Card -->
      <div
        class="relative mx-4 flex w-full max-w-xl sm:max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
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
            <div class="flex items-center gap-1">
              <button
                (click)="showGraph = !showGraph"
                class="grid h-8 w-8 shrink-0 place-items-center rounded-lg transition"
                [class]="showGraph ? 'text-violet-500 bg-violet-50' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'"
                title="Flow-Karte"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/>
                  <path d="M6 8v2a4 4 0 004 4h0a4 4 0 004-4V8"/><line x1="12" y1="14" x2="12" y2="16"/>
                </svg>
              </button>
              <button
                (click)="close()"
                class="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <span class="text-lg leading-none">&times;</span>
              </button>
            </div>
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

        <!-- Flow Graph (collapsible) -->
        @if (showGraph) {
          <div class="border-b border-slate-100 bg-slate-50/60 px-4 py-3">
            <app-flow-graph
              [flow]="flow"
              [currentStepId]="currentStepId"
            />
          </div>
        }

        <!-- Body -->
        <div class="min-h-[260px] px-6 py-6">
          <!-- Prompt -->
          <p class="text-base font-semibold text-slate-800">{{ step.prompt }}</p>

          <!-- Choice / Recheck options -->
          @if (step.type === 'choice' || step.type === 'recheck') {
            <div class="mt-5 flex flex-col gap-2">
              @for (opt of step.options; track optLabel(opt)) {
                <button
                  (click)="selectOption(optLabel(opt))"
                  class="rounded-xl border px-4 py-3 text-left text-sm font-medium transition"
                  [class]="selectedOption === optLabel(opt)
                    ? 'border-violet-300 bg-violet-50 text-violet-700 ring-1 ring-violet-200'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'"
                >
                  @if (isCrossFlowOption(opt)) {
                    <span class="mr-1.5 text-slate-400">⇗</span>
                  }
                  {{ optLabel(opt) }}
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

            <!-- Timer -->
            @if (step.duration) {
              <div class="mt-5 flex items-center gap-3">
                @if (!timerRunning && timerRemaining === 0) {
                  <!-- Start timer -->
                  <button
                    (click)="startTimer()"
                    class="flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-600 transition hover:bg-violet-100"
                  >
                    <span class="text-base">&#9654;</span>
                    Timer starten &middot; {{ step.duration }}
                  </button>
                } @else if (timerRunning) {
                  <!-- Running -->
                  <div class="flex items-center gap-3">
                    <div class="relative grid h-12 w-12 place-items-center">
                      <svg class="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" stroke-width="3" />
                        <circle cx="24" cy="24" r="20" fill="none" stroke="#7c3aed" stroke-width="3"
                          stroke-linecap="round"
                          [attr.stroke-dasharray]="timerCircumference"
                          [attr.stroke-dashoffset]="timerDashOffset" />
                      </svg>
                      <span class="relative text-xs font-bold text-violet-600">{{ timerDisplay }}</span>
                    </div>
                    <button
                      (click)="cancelTimer()"
                      class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50"
                    >
                      Abbrechen
                    </button>
                  </div>
                } @else {
                  <!-- Finished -->
                  <div class="flex items-center gap-2 text-sm font-medium text-emerald-600">
                    <span class="text-base">&#10003;</span>
                    Zeit um
                  </div>
                }
              </div>
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
            @if (history.length > 1) {
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
export class FlowModalComponent implements OnDestroy {
  @Input() flow!: FlowDefinition;
  @Output() closed = new EventEmitter<void>();

  currentStep = 0;
  selectedOption: string | null = null;
  showGraph = false;
  history: number[] = [0];

  // Timer state
  timerRunning = false;
  timerRemaining = 0;
  private timerTotal = 0;
  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private audioCtx: AudioContext | null = null;

  readonly timerCircumference = 2 * Math.PI * 20;

  /** True if any step uses FlowOption with routing */
  get hasBranching(): boolean {
    return this.flow.steps.some(s =>
      s.options?.some(o => typeof o !== 'string' && (o.next || o.flowId))
      || !!s.next
    );
  }

  /** Resolved id of current step (for graph highlight) */
  get currentStepId(): string {
    return this.flow.steps[this.currentStep]?.id || `s${this.currentStep}`;
  }

  get timerDashOffset(): number {
    if (this.timerTotal === 0) return 0;
    return this.timerCircumference * (1 - this.timerRemaining / this.timerTotal);
  }

  get timerDisplay(): string {
    const m = Math.floor(this.timerRemaining / 60);
    const s = this.timerRemaining % 60;
    return m > 0 ? `${m}:${s.toString().padStart(2, '0')}` : `${s}s`;
  }

  get step(): FlowStep {
    return this.flow.steps[this.currentStep];
  }

  get canAdvance(): boolean {
    if (this.step.type === 'choice' || this.step.type === 'recheck') {
      return this.selectedOption !== null;
    }
    return true;
  }

  optLabel(opt: string | FlowOption): string {
    return typeof opt === 'string' ? opt : opt.label;
  }

  isCrossFlowOption(opt: string | FlowOption): boolean {
    return typeof opt !== 'string' && !!opt.flowId;
  }

  selectOption(label: string): void {
    this.selectedOption = label;
  }

  next(): void {
    if (!this.canAdvance) return;
    this.cancelTimer();

    // Check if selected option has routing
    if (this.selectedOption && this.step.options) {
      const opt = this.step.options.find(o =>
        typeof o === 'string' ? o === this.selectedOption : o.label === this.selectedOption
      );
      if (opt && typeof opt !== 'string') {
        if (opt.flowId) {
          this.switchToFlow(opt.flowId);
          return;
        }
        if (opt.next) {
          this.goToStepById(opt.next);
          return;
        }
      }
    }

    // Check step-level next override
    if (this.step.next) {
      this.goToStepById(this.step.next);
      return;
    }

    // Default: sequential
    if (this.currentStep < this.flow.steps.length - 1) {
      this.currentStep++;
      this.history.push(this.currentStep);
      this.selectedOption = null;
    }
  }

  back(): void {
    this.cancelTimer();
    if (this.history.length > 1) {
      this.history.pop();
      this.currentStep = this.history[this.history.length - 1];
      this.selectedOption = null;
    }
  }

  close(): void {
    this.cancelTimer();
    this.closed.emit();
  }

  ngOnDestroy(): void {
    this.cancelTimer();
    this.audioCtx?.close();
  }

  private goToStepById(stepId: string): void {
    const idx = this.flow.steps.findIndex(s => s.id === stepId);
    if (idx >= 0) {
      this.currentStep = idx;
      this.history.push(idx);
      this.selectedOption = null;
    }
  }

  private switchToFlow(flowId: string): void {
    const newFlow = getFlowById(flowId);
    if (newFlow) {
      this.flow = newFlow;
      this.currentStep = 0;
      this.history = [0];
      this.selectedOption = null;
      this.cancelTimer();
    }
  }

  // --- Timer ---

  startTimer(): void {
    const seconds = this.parseDuration(this.step.duration);
    if (seconds <= 0) return;

    this.timerTotal = seconds;
    this.timerRemaining = seconds;
    this.timerRunning = true;

    this.timerInterval = setInterval(() => {
      this.timerRemaining--;
      if (this.timerRemaining <= 0) {
        this.timerRemaining = 0;
        this.timerRunning = false;
        this.clearInterval();
        this.playSingingBowl();
      }
    }, 1000);
  }

  cancelTimer(): void {
    this.timerRunning = false;
    this.timerRemaining = 0;
    this.timerTotal = 0;
    this.clearInterval();
  }

  private clearInterval(): void {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private parseDuration(raw?: string): number {
    if (!raw) return 0;
    // Match patterns like "45 Sekunden", "60 Sekunden", "2 Minuten", "3–5 Minuten"
    const secMatch = raw.match(/(\d+)\s*Sekunde/i);
    if (secMatch) return parseInt(secMatch[1], 10);
    const minMatch = raw.match(/(\d+)\s*Minute/i);
    if (minMatch) return parseInt(minMatch[1], 10) * 60;
    return 0;
  }

  private playSingingBowl(): void {
    const ctx = this.audioCtx ?? new AudioContext();
    this.audioCtx = ctx;

    const now = ctx.currentTime;
    const duration = 4;

    // Fundamental tone (~396 Hz, calming singing bowl pitch)
    this.playTone(ctx, 396, now, duration, 0.18);
    // Overtone 1
    this.playTone(ctx, 594, now, duration, 0.08);
    // Overtone 2 (shimmer)
    this.playTone(ctx, 792, now, duration, 0.04);
  }

  private playTone(ctx: AudioContext, freq: number, start: number, dur: number, vol: number): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, start);
    // Slight detuning for warmth
    osc.detune.setValueAtTime(Math.random() * 6 - 3, start);

    gain.gain.setValueAtTime(0, start);
    // Quick attack
    gain.gain.linearRampToValueAtTime(vol, start + 0.05);
    // Long, gentle fade-out
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + dur);
  }
}
