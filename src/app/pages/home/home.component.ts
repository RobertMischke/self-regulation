import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardConfig } from '../../models/dashboard-config';
import { getAllDashboardConfigs } from '../../configs/dashboard-registry';

interface PlaceholderCard {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  comingSoon: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-white text-slate-900">

      <!-- Hero -->
      <section class="relative overflow-hidden">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white"></div>
        <div class="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-400/8 blur-3xl"></div>

        <div class="relative mx-auto max-w-4xl px-6 pb-16 pt-28 text-center sm:pb-20 sm:pt-32">
          <h1 class="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Finde den passenden Modus<br/>
            <span class="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              f&uuml;r deinen Kopf.
            </span>
          </h1>

          <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
            Interaktive Dashboards f&uuml;r Selbstregulation, Fokus, Erholung und emotionale Stabilisierung.
          </p>

          <p class="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-400">
            Keine Diagnose. Kein Druck. Kein Produktivit&auml;ts-Theater.
            Sondern ein einfacher Weg, deinen aktuellen Zustand einzusch&auml;tzen
            und direkt passende n&auml;chste Schritte zu finden.
          </p>

          <div class="mt-8">
            <a
              href="#dashboards"
              class="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 hover:shadow-slate-900/20"
            >
              Direkt loslegen
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- Dashboards (directly after hero) -->
      <section id="dashboards" class="scroll-mt-6">
        <div class="mx-auto max-w-5xl px-6 pb-24 pt-8">
          <div class="mb-10 text-center">
            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Dashboards</h2>
            <p class="mt-2 text-slate-500">W&auml;hle ein Profil und leg los.</p>
          </div>

          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <!-- Live dashboards -->
            @for (config of dashboards; track config.key) {
              <a
                [routerLink]="['/dashboard', config.key]"
                class="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <div class="mb-4 flex items-center gap-3">
                  <div class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl text-white shadow-lg shadow-indigo-500/20">
                    {{ config.icon }}
                  </div>
                  <span class="text-lg font-semibold">{{ config.title }}</span>
                </div>

                <p class="text-sm leading-6 text-slate-500">{{ config.goal }}</p>

                <div class="mt-auto flex flex-wrap gap-2 pt-5">
                  @for (metric of config.metricLabels; track metric) {
                    <span class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {{ metric }}
                    </span>
                  }
                </div>

                <div class="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 transition group-hover:opacity-100"></div>
              </a>
            }

            <!-- Placeholder cards (coming soon) -->
            @for (card of placeholderCards; track card.title) {
              <div class="relative flex flex-col rounded-3xl border border-dashed border-slate-200 bg-slate-50/50 p-6">
                <div class="mb-4 flex items-center gap-3">
                  <div class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-200 text-xl">
                    {{ card.icon }}
                  </div>
                  <div>
                    <span class="text-lg font-semibold text-slate-400">{{ card.title }}</span>
                  </div>
                </div>

                <p class="text-sm leading-6 text-slate-400">{{ card.description }}</p>

                <div class="mt-auto flex flex-wrap gap-2 pt-5">
                  @for (tag of card.tags; track tag) {
                    <span class="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-400">
                      {{ tag }}
                    </span>
                  }
                </div>

                <span class="absolute right-5 top-5 rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500">
                  Bald verf&uuml;gbar
                </span>
              </div>
            }

            <!-- Create your own -->
            <div class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center">
              <div class="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-2xl text-slate-400">+</div>
              <span class="mt-4 text-base font-semibold text-slate-400">Eigenes Dashboard</span>
              <p class="mt-2 text-sm text-slate-400">Konfiguriere eigene Skalen, Regeln und&nbsp;Interventionen.</p>
              <span class="mt-4 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">In Planung</span>
            </div>

          </div>
        </div>
      </section>

      <!-- Explainer (below dashboards) -->
      <section class="border-t border-slate-100 bg-slate-50/60">
        <div class="mx-auto max-w-4xl px-6 py-20">
          <div class="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <h2 class="text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                Von innerem Zustand zu konkreter
                <span class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Orientierung.</span>
              </h2>
            </div>
            <div class="text-base leading-7 text-slate-500">
              <p>
                Das Produkt hilft dir, Signale wie Aktivierung, Klarheit, Druck, Energie
                oder Stimulation sichtbar zu machen &mdash; und daraus konkrete Hinweise,
                Modi und kleine Interventionen abzuleiten.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  `,
})
export class HomeComponent {
  readonly dashboards: DashboardConfig[] = getAllDashboardConfigs();

  readonly placeholderCards: PlaceholderCard[] = [
    {
      icon: '\u{1F9ED}',
      title: 'Orientierungs-Check',
      description: 'Klarheit gewinnen, wenn sich alles diffus anf\u00FChlt \u2014 Priorit\u00E4ten sp\u00FCren statt planen.',
      tags: ['Klarheit', 'Richtung', 'Entscheidung'],
      comingSoon: true,
    },
    {
      icon: '\u{1F91D}',
      title: 'Soziale Regulation',
      description: 'Beziehungsdynamiken einordnen, Grenzen sp\u00FCren und Sicherheit wiederfinden.',
      tags: ['Bindung', 'Grenzen', 'Sicherheit'],
      comingSoon: true,
    },
    {
      icon: '\u{1F319}',
      title: 'Abend-Check-in',
      description: 'Den Tag einordnen, loslassen und den \u00DCbergang in den Abend bewusst gestalten.',
      tags: ['Reflexion', 'Loslassen', 'Schlaf'],
      comingSoon: true,
    },
  ];

  configModeCount(config: DashboardConfig): number {
    return Object.keys(config.modes).length;
  }
}
