import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardConfig } from '../../models/dashboard-config';
import { getAllDashboardConfigs } from '../../configs/dashboard-registry';
import {
  FlowDefinition,
  FlowCategory,
  FlowCategoryMeta,
  FLOW_CATEGORIES,
  ALL_FLOWS,
} from '../../flows/flow-registry';
import { FlowModalComponent } from '../../components/flow-modal.component';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FlowModalComponent],
  template: `
    <div class="min-h-screen bg-white text-slate-900">

      <!-- Top Bar -->
      <div class="fixed right-4 top-4 z-50 flex items-center gap-2">
        <!-- Tool-Mode Toggle (iOS switch) -->
        <button
          (click)="toolMode = !toolMode"
          class="group flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur transition hover:bg-slate-50"
        >
          <div class="relative h-5 w-9 rounded-full transition-colors duration-200"
               [class]="toolMode ? 'bg-indigo-600' : 'bg-slate-300'">
            <div class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-200"
                 [style.left]="toolMode ? '18px' : '2px'"></div>
          </div>
          <span class="text-xs font-semibold text-slate-600">{{ toolMode ? '\u26a1 Tool-Modus' : '\ud83d\udc4b Willkommen' }}</span>
        </button>

        <!-- Auth Button -->
        @if (auth.isLoggedIn()) {
          <button
            (click)="showUserMenu = !showUserMenu"
            class="flex h-8 items-center gap-1.5 rounded-full bg-indigo-100 px-2.5 text-xs font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-200"
            [title]="auth.user()?.name || ''"
          >
            <span>\ud83d\udc64</span>
            {{ auth.initials() }}
          </button>
          @if (showUserMenu) {
            <div class="absolute right-0 top-12 w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
              <p class="text-sm font-semibold text-slate-800">{{ auth.user()?.name }}</p>
              <p class="text-xs text-slate-400">{{ auth.user()?.email }}</p>
              <button
                (click)="auth.logout(); showUserMenu = false"
                class="mt-3 w-full rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
              >
                Abmelden
              </button>
            </div>
          }
        } @else {
          <button
            (click)="loginReason = ''; showLoginDialog = true"
            class="flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur transition hover:bg-slate-100"
          >
            👤 Anmelden
          </button>
        }
      </div>

      <!-- Login Dialog -->
      @if (showLoginDialog) {
        <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm" (click)="showLoginDialog = false; loginReason = ''">
          <div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl" (click)="$event.stopPropagation()">
            <h3 class="text-lg font-bold text-slate-900">Anmelden</h3>
            <p class="mt-1 text-sm text-slate-500">{{ loginReason || 'Damit deine Favoriten gespeichert bleiben.' }}</p>
            <div class="mt-4 space-y-3">
              <input
                #loginName
                type="text"
                placeholder="Name"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              />
              <input
                #loginEmail
                type="email"
                placeholder="E-Mail"
                class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div class="mt-5 flex gap-2">
              <button
                (click)="showLoginDialog = false; loginReason = ''"
                class="flex-1 rounded-xl border border-slate-200 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Abbrechen
              </button>
              <button
                (click)="doLogin(loginName.value, loginEmail.value)"
                class="flex-1 rounded-xl bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
              >
                Anmelden
              </button>
            </div>
          </div>
        </div>
      }

      <!-- Hero (compact) -->
      @if (!toolMode) {
      <section class="relative overflow-hidden">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white"></div>

        <div class="relative mx-auto max-w-4xl px-6 pb-8 pt-20 text-center sm:pt-24">
          <h1 class="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Finde heraus, was
             dein Kopf<span class="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            jetzt braucht.
            </span>
          </h1>

          <p class="mx-auto mt-5 max-w-2xl text-lg leading-7 text-slate-500">
            Dashboards und Flows f&uuml;r Selbstregulation, Fokus, Erholung und konkrete n&auml;chste Schritte.
          </p>

          <!-- Anchor CTAs -->
          <div class="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#dashboards"
               class="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
              Zu den Dashboards
            </a>
            <a href="#flows"
               class="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">
              Zu den Flows
            </a>

          </div>
        </div>
      </section>
      }

      <!-- Dashboards -->
      <section id="dashboards">
        <div [class]="toolMode ? 'mx-auto max-w-6xl px-6 pb-10 pt-14' : 'mx-auto max-w-6xl px-6 pb-24 pt-10'">
          @if (!toolMode) {
          <div class="mb-10 text-center">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Dashboards</h2>
            <p class="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-500">
              Deinen Zustand einordnen und Muster sichtbar machen.
            </p>
          </div>
          } @else {
          <div class="mb-4 flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Dashboards</span>
          </div>
          }

          @if (toolMode && favDashboards.length > 0) {
          <div class="mb-6">
            <span class="mb-2 block text-[11px] font-bold uppercase tracking-widest text-amber-500">★ Favoriten</span>
            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              @for (config of favDashboards; track config.key) {
                <a
                  [routerLink]="['/dashboard', config.key]"
                  class="group relative flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-3 transition hover:border-amber-300 hover:shadow-md"
                >
                  <div class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-sm text-white shadow shadow-indigo-500/25">
                    {{ config.icon }}
                  </div>
                  <span class="text-sm font-bold leading-snug">{{ config.title }}</span>
                </a>
              }
            </div>
          </div>
          }

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            @for (config of dashboards; track config.key) {
              <a
                [routerLink]="['/dashboard', config.key]"
                class="group relative flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-transparent transition hover:border-indigo-200 hover:shadow-lg hover:ring-indigo-100"
              >
                <!-- Favorite Star -->
                <button
                  (click)="$event.preventDefault(); $event.stopPropagation(); toggleFav('dashboard', config.key)"
                  class="absolute right-2.5 top-2.5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xl transition hover:scale-110"
                  [class]="favs.isFavorite('dashboard', config.key)
                    ? 'text-amber-400 hover:text-amber-500 drop-shadow-sm'
                    : 'text-slate-300/60 opacity-0 group-hover:opacity-100 hover:text-amber-400'"
                >
                  ★
                </button>
                <div class="mb-3 flex items-center gap-3">
                  <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg text-white shadow shadow-indigo-500/25">
                    {{ config.icon }}
                  </div>
                  <span class="text-base font-bold leading-snug">{{ config.title }}<span class="ml-1 inline-block text-indigo-400 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100">&rarr;</span></span>
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
            }

            <!-- Create your own -->
            @if (!toolMode) {
            <div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-5 text-center">
              <div class="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-xl font-bold text-slate-400">+</div>
              <span class="mt-3 text-sm font-bold text-slate-400">Eigenes Dashboard</span>
              <p class="mt-1 text-xs leading-relaxed text-slate-400">Eigene Skalen, Regeln und&nbsp;Interventionen konfigurieren.</p>
              <span class="mt-3 rounded-full bg-slate-200/70 px-2.5 py-0.5 text-[11px] font-bold text-slate-500">In&nbsp;Planung</span>
            </div>
            }
          </div>
        </div>
      </section>

      <!-- Flows -->
      <section id="flows" [class]="toolMode ? 'border-t border-slate-200 bg-white' : 'border-t border-slate-100 bg-white'">
        <div [class]="toolMode ? 'mx-auto max-w-6xl px-6 pb-10 pt-8' : 'mx-auto max-w-6xl px-6 pb-24 pt-14'">
          @if (!toolMode) {
          <div class="mb-10 text-center">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Flows</h2>
            <p class="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-500">
              Kleine gef&uuml;hrte Schritte f&uuml;r konkrete Situationen.
              Weniger analysieren, direkt ins Tun kommen.
            </p>
          </div>
          } @else {
          <div class="mb-4 flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Flows</span>
          </div>
          }

          @if (toolMode && favFlows.length > 0) {
          <div class="mb-6">
            <span class="mb-2 block text-[11px] font-bold uppercase tracking-widest text-amber-500">★ Favoriten</span>
            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              @for (flow of favFlows; track flow.id) {
                <button
                  (click)="openFlow(flow)"
                  class="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-left transition hover:border-amber-300 hover:shadow-md"
                >
                  <span class="text-sm font-bold leading-snug">{{ flow.title }}</span>
                  <span class="ml-auto shrink-0 rounded-md bg-violet-100 px-2 py-0.5 text-[11px] font-semibold text-violet-600">{{ flow.duration }}</span>
                </button>
              }
            </div>
          </div>
          }

          <!-- Search -->
          <div class="mx-auto mb-6 max-w-md">
            <input
              type="text"
              [value]="flowSearch"
              (input)="onFlowSearch($event)"
              placeholder="Flow suchen &hellip;"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <!-- Category Chips -->
          <div class="mb-8 flex flex-wrap justify-center gap-2">
            <button
              (click)="selectCategory(null)"
              [class]="activeCategory === null
                ? 'rounded-full px-4 py-1.5 text-sm font-semibold transition bg-indigo-600 text-white shadow-sm'
                : 'rounded-full px-4 py-1.5 text-sm font-semibold transition bg-slate-100 text-slate-600 hover:bg-slate-200'"
            >
              Alle
            </button>
            @for (cat of categories; track cat.key) {
              <button
                (click)="selectCategory(cat.key)"
                [class]="activeCategory === cat.key
                  ? 'rounded-full px-4 py-1.5 text-sm font-semibold transition bg-indigo-600 text-white shadow-sm'
                  : 'rounded-full px-4 py-1.5 text-sm font-semibold transition bg-slate-100 text-slate-600 hover:bg-slate-200'"
              >
                {{ cat.label }}
              </button>
            }
          </div>

          <!-- Flow Cards -->
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            @for (flow of visibleFlows; track flow.title) {
              <div class="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-transparent transition hover:border-violet-200 hover:shadow-lg hover:ring-violet-100">
                <!-- Favorite Star -->
                <button
                  (click)="toggleFav('flow', flow.id)"
                  class="absolute right-2.5 top-2.5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xl transition hover:scale-110"
                  [class]="favs.isFavorite('flow', flow.id)
                    ? 'text-amber-400 hover:text-amber-500 drop-shadow-sm'
                    : 'text-slate-300/60 opacity-0 group-hover:opacity-100 hover:text-amber-400'"
                >
                  ★
                </button>
                <span class="text-base font-bold leading-snug">{{ flow.title }}</span>
                <p class="mt-1.5 text-[13px] leading-relaxed text-slate-500">{{ flow.description }}</p>

                <!-- Meta: Duration & Style -->
                <div class="mt-3 flex items-center gap-2 text-[12px] font-medium text-slate-400">
                  <span class="rounded-md bg-violet-50 px-2 py-0.5 text-violet-600">{{ flow.duration }}</span>
                  <span class="rounded-md bg-slate-100 px-2 py-0.5 text-slate-500">{{ flow.style }}</span>
                </div>

                <!-- Tags -->
                <div class="mt-auto flex flex-wrap gap-1.5 pt-4">
                  @for (tag of flow.tags; track tag) {
                    <span class="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                      {{ tag }}
                    </span>
                  }
                </div>

                <!-- CTA -->
                <button
                  (click)="openFlow(flow)"
                  class="mt-4 w-full rounded-xl bg-violet-600 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500">
                  Starten
                </button>
              </div>
            }
          </div>

          @if (filteredFlows.length === 0) {
            <p class="mt-6 text-center text-sm text-slate-400">Kein Flow gefunden.</p>
          }

          @if (totalPages > 1) {
            <div class="mt-8 flex items-center justify-center gap-3">
              <button
                (click)="prevPage()"
                [disabled]="flowPage === 0"
                class="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none"
              >
                &larr; Zur&uuml;ck
              </button>
              <span class="text-sm text-slate-400">{{ flowPage + 1 }} / {{ totalPages }}</span>
              <button
                (click)="nextPage()"
                [disabled]="flowPage >= totalPages - 1"
                class="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none"
              >
                Weiter &rarr;
              </button>
            </div>
          }
        </div>
      </section>

      @if (!toolMode) {
      <!-- Explainer (compact, supporting) -->
      <section class="border-t border-slate-100 bg-slate-50/60">
        <div class="mx-auto max-w-4xl px-6 py-16">
          <div class="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <h2 class="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
              Von innerem Zustand zu Orientierung und konkreten
              <span class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">n&auml;chsten Schritten.</span>
            </h2>
            <p class="text-[15px] leading-7 text-slate-500">
              Dashboards helfen dir, Signale wie Aktivierung, Klarheit oder Druck einzuordnen.
              Flows bringen dich mit kleinen konkreten Handlungen direkt ins Tun.
            </p>
          </div>
        </div>
      </section>
      }

      @if (!toolMode) {
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
      }

    </div>

    <!-- Flow Modal -->
    @if (activeFlow) {
      <app-flow-modal [flow]="activeFlow" (closed)="closeFlow()" />
    }
  `,
})
export class HomeComponent {
  readonly favs = inject(FavoritesService);
  readonly auth = inject(AuthService);

  readonly dashboards: DashboardConfig[] = getAllDashboardConfigs();
  readonly categories: FlowCategoryMeta[] = FLOW_CATEGORIES;
  private readonly allFlows: FlowDefinition[] = ALL_FLOWS;

  activeCategory: FlowCategory | null = null;
  flowSearch = '';
  flowPage = 0;
  toolMode = false;
  activeFlow: FlowDefinition | null = null;
  showLoginDialog = false;
  showUserMenu = false;
  loginReason = '';

  private readonly PAGE_SIZE = 9;

  get filteredFlows(): FlowDefinition[] {
    const query = this.flowSearch.trim().toLowerCase();
    if (query) {
      return this.allFlows.filter(f =>
        f.title.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query) ||
        f.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    if (this.activeCategory === null) {
      return this.allFlows;
    }
    return this.allFlows.filter(f => f.category === this.activeCategory);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredFlows.length / this.PAGE_SIZE);
  }

  get visibleFlows(): FlowDefinition[] {
    const start = this.flowPage * this.PAGE_SIZE;
    return this.filteredFlows.slice(start, start + this.PAGE_SIZE);
  }

  selectCategory(key: FlowCategory | null): void {
    this.activeCategory = key;
    this.flowSearch = '';
    this.flowPage = 0;
  }

  prevPage(): void {
    if (this.flowPage > 0) this.flowPage--;
  }

  nextPage(): void {
    if (this.flowPage < this.totalPages - 1) this.flowPage++;
  }

  onFlowSearch(event: Event): void {
    this.flowSearch = (event.target as HTMLInputElement).value;
    this.flowPage = 0;
  }

  openFlow(flow: FlowDefinition): void {
    this.activeFlow = flow;
  }

  closeFlow(): void {
    this.activeFlow = null;
  }

  configModeCount(config: DashboardConfig): number {
    return Object.keys(config.modes).length;
  }

  get favDashboards(): DashboardConfig[] {
    return this.dashboards.filter(d => this.favs.isFavorite('dashboard', d.key));
  }

  get favFlows(): FlowDefinition[] {
    return this.allFlows.filter(f => this.favs.isFavorite('flow', f.id));
  }

  toggleFav(type: 'dashboard' | 'flow', id: string): void {
    if (!this.auth.isLoggedIn()) {
      this.loginReason = 'Um Favoriten zu speichern, bitte erst anmelden.';
      this.showLoginDialog = true;
      return;
    }
    this.favs.toggle(type, id);
  }

  doLogin(name: string, email: string): void {
    if (!name.trim() || !email.trim()) return;
    this.auth.login(name, email);
    this.showLoginDialog = false;
  }
}
