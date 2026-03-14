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
      <div class="mx-auto max-w-5xl">
        <header class="mb-8">
          <h1 class="text-3xl font-semibold tracking-tight">Dashboards</h1>
          <p class="mt-2 text-slate-600">Wähle ein Dashboard, um es zu öffnen.</p>
        </header>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          @for (config of dashboards; track config.key) {
            <a
              [routerLink]="['/dashboard', config.key]"
              class="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-400 hover:shadow-md"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ config.icon }}</span>
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
            </a>
          }
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {
  readonly dashboards: DashboardConfig[] = getAllDashboardConfigs();
}
