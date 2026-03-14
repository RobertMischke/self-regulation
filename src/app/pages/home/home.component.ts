import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardConfig } from '../../models/dashboard-config';
import { getAllDashboardConfigs } from '../../configs/dashboard-registry';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div class="mx-auto grid max-w-7xl gap-6">

        <!-- System Header -->
        <section class="rounded-3xl bg-white p-6 shadow-sm">
          <div class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div class="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                Regulation Profiles
              </div>
              <h1 class="text-3xl font-semibold tracking-tight">
                Ein Dashboard-System f&uuml;r unterschiedliche Ziele und Profile
              </h1>
              <p class="mt-3 max-w-3xl leading-7 text-slate-600">
                Statt f&uuml;r jeden Anwendungsfall ein komplett neues Tool zu bauen, kann dieselbe Dashboard-Logik
                parametrisiert werden. Das System bleibt gleich: Zust&auml;nde erfassen, Muster erkennen, Modus ableiten
                und passende Interventionen anbieten. Unterschiede entstehen &uuml;ber Konfigurationen f&uuml;r Metriken,
                Texte, Zielzust&auml;nde, Fragen, Regeln und Profile.
              </p>
              <div class="mt-4 rounded-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-700">
                Pro Dashboard wird definiert: welche Skalen gezeigt werden, welche Schwellwerte Modi ausl&ouml;sen,
                welche Reflexionsfragen erscheinen, welche Interventionen empfohlen werden und welches Zielbild
                das jeweilige Profil hat.
              </div>
            </div>

            <div class="rounded-3xl border border-slate-200 p-5">
              <h2 class="text-xl font-semibold">Konfigurierbares System</h2>
              <div class="mt-4 grid gap-3 text-sm text-slate-700">
                <div class="rounded-2xl bg-slate-50 p-3">
                  <strong>Metriken:</strong> frei definierbare Slider, Scores und Labels
                </div>
                <div class="rounded-2xl bg-slate-50 p-3">
                  <strong>Regeln:</strong> Schwellwerte und Moduslogik pro Dashboard
                </div>
                <div class="rounded-2xl bg-slate-50 p-3">
                  <strong>Content:</strong> Fragen, Feedbacktexte und Interventionen pro Profil
                </div>
                <div class="rounded-2xl bg-slate-50 p-3">
                  <strong>Zielbild:</strong> eigener Idealzustand je Zielgruppe oder Use Case
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Dashboard Selection -->
        <section class="rounded-3xl bg-white p-6 shadow-sm">
          <h2 class="text-2xl font-semibold">Dashboards</h2>
          <p class="mt-2 text-slate-600">
            Alle auf derselben Engine, aber mit unterschiedlichen Zielen, Metriken und Interventionen.
          </p>

          <div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            @for (config of dashboards; track config.key) {
              <a
                [routerLink]="['/dashboard', config.key]"
                class="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-900 hover:shadow-md"
              >
                <div class="flex items-center gap-3">
                  <div class="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-xl text-white">
                    {{ config.icon }}
                  </div>
                  <span class="text-lg font-semibold">{{ config.title }}</span>
                </div>
                <p class="mt-3 text-sm leading-6 text-slate-600">{{ config.goal }}</p>
                <p class="mt-2 text-sm text-slate-500">{{ config.audience }}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                  @for (metric of config.metricLabels; track metric) {
                    <span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {{ metric }}
                    </span>
                  }
                </div>
                <div class="mt-4 text-xs text-slate-400">
                  {{ config.sliders.length }} Slider &middot;
                  {{ configModeCount(config) }} Modi &middot;
                  {{ config.questionGroups.length }} Fragegruppen
                </div>
              </a>
            }
          </div>
        </section>

      </div>
    </div>
  `,
})
export class HomeComponent {
  readonly dashboards: DashboardConfig[] = getAllDashboardConfigs();

  configModeCount(config: DashboardConfig): number {
    return Object.keys(config.modes).length;
  }
}
