import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardConfig } from '../../models/dashboard-config';
import { getAllDashboardConfigs } from '../../configs/dashboard-registry';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-white text-slate-900">

      <!-- Hero (compact) -->
      <section class="relative overflow-hidden">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white"></div>

        <div class="relative mx-auto max-w-4xl px-6 pb-8 pt-20 text-center sm:pt-24">
          <h1 class="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Finde heraus, was
             dein Kopf<span class="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            jetzt braucht.
            </span>
          </h1>

          <p class="mx-auto mt-4 max-w-2xl text-lg leading-7 text-slate-500">
            Interaktive Dashboards f&uuml;r Selbstregulation, Fokus, Erholung und emotionale Stabilisierung.
            Keine Diagnose. Kein Druck. Kein Produktivit&auml;ts-Theater.
          </p>
        </div>
      </section>

      <!-- Dashboards (hero flows directly into this) -->
      <section id="dashboards">
        <div class="mx-auto max-w-6xl px-6 pb-20 pt-6">
          <div class="mb-8 text-center">
            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Dashboards</h2>
            <p class="mt-1.5 text-slate-500">W&auml;hle das Dashboard, das dich jetzt am besten unterstützt..</p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            @for (config of dashboards; track config.key) {
              <a
                [routerLink]="['/dashboard', config.key]"
                class="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-transparent transition hover:border-indigo-200 hover:shadow-lg hover:ring-indigo-100"
              >
                <div class="mb-3 flex items-center gap-3">
                  <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg text-white shadow shadow-indigo-500/25">
                    {{ config.icon }}
                  </div>
                  <span class="text-base font-bold leading-snug">{{ config.title }}</span>
                </div>

                <p class="text-[13px] leading-relaxed text-slate-500">{{ config.goal }}</p>

                <div class="mt-auto flex flex-wrap gap-1.5 pt-4">
                  @for (metric of config.metricLabels; track metric) {
                    <span class="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                      {{ metric }}
                    </span>
                  }
                </div>

                <span class="absolute right-4 top-4 text-xs font-semibold text-indigo-500 opacity-0 transition group-hover:opacity-100">
                  &ouml;ffnen &rarr;
                </span>
              </a>
            }

            <!-- Create your own -->
            <div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-5 text-center">
              <div class="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-xl font-bold text-slate-400">+</div>
              <span class="mt-3 text-sm font-bold text-slate-400">Eigenes Dashboard</span>
              <p class="mt-1 text-xs leading-relaxed text-slate-400">Eigene Skalen, Regeln und&nbsp;Interventionen konfigurieren.</p>
              <span class="mt-3 rounded-full bg-slate-200/70 px-2.5 py-0.5 text-[11px] font-bold text-slate-500">In&nbsp;Planung</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Explainer (compact, supporting) -->
      <section class="border-t border-slate-100 bg-slate-50/60">
        <div class="mx-auto max-w-4xl px-6 py-14">
          <div class="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <h2 class="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
              Von innerem Zustand zu konkreter
              <span class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Orientierung.</span>
            </h2>
            <p class="text-sm leading-7 text-slate-500">
              Die Dashboards &uuml;bersetzen Signale wie Aktivierung, Klarheit, Druck oder Energie
              in passende Modi und konkrete n&auml;chste Schritte.
            </p>
          </div>
        </div>
      </section>

      <!-- Mitstreiter Banner -->
      <section class="border-t border-indigo-100 bg-indigo-50/50">
        <div class="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div class="flex items-center gap-3">
            <span class="shrink-0 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">Offen</span>
            <p class="text-sm font-medium text-slate-700">
              <strong>Mitstreiter gesucht</strong> &mdash; f&uuml;r Produkt, Positionierung, Vermarktung und Go-to-Market.
            </p>
          </div>
          <a routerLink="/cofounder" class="shrink-0 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            Mehr erfahren &rarr;
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-slate-200 bg-slate-50">
        <div class="mx-auto max-w-4xl px-6 py-10">
          <div class="grid gap-8 sm:grid-cols-[1fr_auto]">
            <div>
              <p class="text-sm font-bold text-slate-700">Interaktiver Prototyp</p>
              <p class="mt-1.5 max-w-md text-xs leading-relaxed text-slate-500">
                Fr&uuml;he Version eines Systems f&uuml;r Selbstregulation, Orientierung und konkrete n&auml;chste Schritte.
                Kein Medizinprodukt. Keine Diagnose. Kein Therapieersatz.
              </p>
            </div>
            <div class="text-xs leading-relaxed text-slate-400 sm:text-right">
              <div class="flex flex-wrap gap-3 sm:justify-end">
                <a routerLink="/validierung" class="font-bold text-slate-500 hover:text-indigo-600 transition">Wissenschaftliche Einordnung</a>
                <span class="text-slate-300">|</span>
                <a routerLink="/impressum" class="font-bold text-slate-500 hover:text-indigo-600 transition">Impressum</a>
                <span class="text-slate-300">|</span>
                <a routerLink="/datenschutz" class="font-bold text-slate-500 hover:text-indigo-600 transition">Datenschutz</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  `,
})
export class HomeComponent {
  readonly dashboards: DashboardConfig[] = getAllDashboardConfigs();

  configModeCount(config: DashboardConfig): number {
    return Object.keys(config.modes).length;
  }
}
