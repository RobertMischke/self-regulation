import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardConfig } from '../models/dashboard-config';
import { Snapshot, snapshotScore } from '../models/snapshot';

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

      @if (recentSnapshots.length > 0) {
        <div class="mt-3 border-t border-slate-100 pt-3">
          <div class="mb-1.5 flex items-center justify-between">
            <span class="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Verlauf</span>
            <span class="text-[10px] text-slate-400">{{ recentSnapshots.length }} Eintr{{ recentSnapshots.length === 1 ? 'ag' : 'äge' }}</span>
          </div>
          <div class="rounded-xl bg-slate-50/50 p-1.5">
            <svg viewBox="0 0 300 48" class="h-12 w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient [attr.id]="'waveFill-' + config.key" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="#a78bfa" stop-opacity="0.02"/>
                </linearGradient>
              </defs>
              <path [attr.d]="waveAreaPath(recentSnapshots, 300, 48)" [attr.fill]="'url(#waveFill-' + config.key + ')'"/>
              <path [attr.d]="wavePath(recentSnapshots, 300, 48)" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round"/>
              @for (s of recentSnapshots; track s.id; let i = $index) {
                <circle
                  [attr.cx]="recentSnapshots.length === 1 ? 150 : i * 300 / (recentSnapshots.length - 1)"
                  [attr.cy]="scoreToY(scoreOf(s), recentSnapshots, 48)"
                  r="3"
                  [attr.fill]="dotColor(scoreOf(s))"
                  class="opacity-70"
                />
              }
            </svg>
          </div>
          <div class="mt-1.5 flex items-center gap-1.5">
            <span
              class="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold"
              [class]="latestScore >= 65 ? 'bg-emerald-50 text-emerald-700' : latestScore >= 40 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'"
            >{{ latestScore }}</span>
            <span class="text-[10px] text-slate-400">Letzter Score · {{ lastLabel }}</span>
          </div>
        </div>
      }
    </a>
  `,
})
export class DashboardCardComponent {
  @Input({ required: true }) config!: DashboardConfig;
  @Input() isFavorite = false;
  @Input() highlighted = false;
  @Input() snapshots: Snapshot[] = [];
  @Output() toggleFavorite = new EventEmitter<void>();

  readonly Math = Math;

  get recentSnapshots(): Snapshot[] {
    return [...this.snapshots]
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(-30);
  }

  scoreOf(s: Snapshot): number {
    return snapshotScore(s);
  }

  scoreToY(score: number, snaps: Snapshot[], height: number): number {
    const scores = snaps.map(s => snapshotScore(s));
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const spread = max - min;
    if (spread < 5) return height * 0.5;
    const pad = spread * 0.15;
    const lo = min - pad;
    const hi = max + pad;
    const norm = (score - lo) / (hi - lo);
    return height - Math.max(0, Math.min(1, norm)) * height;
  }

  wavePath(snaps: Snapshot[], width: number, height: number): string {
    if (snaps.length === 0) return '';
    if (snaps.length === 1) return `M0,${height * 0.5} L${width},${height * 0.5}`;
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

  dotColor(score: number): string {
    if (score >= 65) return '#34d399';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  }

  get latestScore(): number {
    const last = this.recentSnapshots.at(-1);
    return last ? snapshotScore(last) : 0;
  }

  get lastLabel(): string {
    const last = this.recentSnapshots.at(-1);
    return last ? this.formatDate(last.timestamp) : '';
  }

  formatDate(ts: number): string {
    const d = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffH = diffMs / 3_600_000;
    if (diffH < 1) return 'Gerade eben';
    if (diffH < 24) return `vor ${Math.round(diffH)} Std.`;
    if (diffH < 48) return 'Gestern';
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
  }
}
