import { Component, HostListener, inject } from '@angular/core';
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
import { DashboardCardComponent } from '../../components/dashboard-card.component';
import { FlowCardComponent } from '../../components/flow-card.component';
import { LoginDialogComponent } from '../../components/login-dialog.component';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../services/auth.service';
import { PwaService } from '../../services/pwa.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FlowModalComponent, DashboardCardComponent, FlowCardComponent, LoginDialogComponent],
  template: `
    <div class="min-h-screen bg-white text-slate-900">

      <!-- Top Bar -->
      <div
        [class]="toolMode
          ? 'fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md' + (hasScrolled ? ' border-b border-slate-200/80' : '')
          : 'fixed right-4 top-4 z-50'"
      >
        <div [class]="toolMode ? 'mx-auto flex max-w-7xl items-center justify-end gap-2 px-4 py-3' : 'flex items-center gap-2'">
        <!-- Tool-Mode Navigation Chips -->
        @if (toolMode) {
          @if (favDashboards.length > 0) {
          <a href="#fav-dashboards" class="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600 shadow-sm backdrop-blur transition hover:bg-amber-100">★ Dashboards</a>
          }
          @if (favFlows.length > 0) {
          <a href="#fav-flows" class="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600 shadow-sm backdrop-blur transition hover:bg-amber-100">★ Flows</a>
          }
          <a href="#dashboards" class="rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur transition hover:bg-slate-50">Dashboards</a>
          <a href="#flows" class="rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur transition hover:bg-slate-50">Flows</a>
        }

        <!-- Tool-Mode Toggle (iOS switch) -->
        <button
          (click)="setToolMode(!toolMode)"
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
                (click)="doLogout()"
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
      </div>

      <!-- Login Dialog -->
      <app-login-dialog
        [open]="showLoginDialog"
        [reason]="loginReason"
        (closed)="showLoginDialog = false; loginReason = ''"
        (loggedIn)="doLogin($event.name, $event.email)"
      />

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

      <!-- Greeting (Tool-Modus) -->
      @if (toolMode && auth.isLoggedIn()) {
      <div class="mx-auto max-w-6xl px-6 pt-14 pb-2">
        <h2 class="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">{{ greeting }}</h2>
        <p class="mt-1 text-sm text-slate-400">Was brauchst du gerade?</p>
      </div>
      }

      <!-- Fav Dashboards (Tool-Modus) -->
      @if (toolMode && favDashboards.length > 0) {
      <section id="fav-dashboards">
        <div [class]="'mx-auto max-w-6xl px-6 pb-6' + (auth.isLoggedIn() ? ' pt-6' : ' pt-14')">
          <div class="mb-4">
            <span class="text-sm font-bold uppercase tracking-widest text-amber-500">★ Favoriten · Dashboards</span>
          </div>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            @for (config of favDashboards; track config.key) {
              <app-dashboard-card [config]="config" [isFavorite]="true" [highlighted]="true" (toggleFavorite)="toggleFav('dashboard', config.key)" />
            }
          </div>
        </div>
      </section>
      }

      <!-- Dashboards -->
      <section id="dashboards">
        <div [class]="toolMode ? 'mx-auto max-w-6xl px-6 pb-10' + (auth.isLoggedIn() || favDashboards.length > 0 ? ' pt-6' : ' pt-14') : 'mx-auto max-w-6xl px-6 pb-24 pt-10'">
          @if (!toolMode) {
          <div class="mb-10 text-center">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Dashboards</h2>
            <p class="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-500">
              Deinen Zustand einordnen und Muster sichtbar machen.
            </p>
          </div>
          } @else {
          <button (click)="dashboardsOpen = !dashboardsOpen" class="mb-4 flex w-full cursor-pointer items-center gap-2 text-left">
            <svg class="h-4 w-4 text-slate-400 transition-transform" [class.rotate-90]="dashboardsOpen" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"/></svg>
            <span class="text-sm font-bold uppercase tracking-widest text-slate-400">Dashboards</span>
            <span class="text-xs text-slate-300">({{ nonFavDashboards.length }})</span>
          </button>
          }

          @if (!toolMode || dashboardsOpen) {
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            @for (config of (toolMode ? nonFavDashboards : dashboards); track config.key) {
              <app-dashboard-card [config]="config" [isFavorite]="favs.isFavorite('dashboard', config.key)" (toggleFavorite)="toggleFav('dashboard', config.key)" />
            }

            @if (!toolMode) {
            <div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-5 text-center">
              <div class="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-xl font-bold text-slate-400">+</div>
              <span class="mt-3 text-sm font-bold text-slate-400">Eigenes Dashboard</span>
              <p class="mt-1 text-xs leading-relaxed text-slate-400">Eigene Skalen, Regeln und&nbsp;Interventionen konfigurieren.</p>
              <span class="mt-3 rounded-full bg-slate-200/70 px-2.5 py-0.5 text-[11px] font-bold text-slate-500">In&nbsp;Planung</span>
            </div>
            }
          </div>
          }
        </div>
      </section>

      <!-- Fav Flows -->
      @if (toolMode && favFlows.length > 0) {
      <section id="fav-flows">
        <div class="mx-auto max-w-6xl px-6 pb-6 pt-6">
          <div class="mb-4">
            <span class="text-sm font-bold uppercase tracking-widest text-amber-500">★ Favoriten · Flows</span>
          </div>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            @for (flow of favFlows; track flow.id) {
              <app-flow-card [flow]="flow" [isFavorite]="true" [highlighted]="true" (toggleFavorite)="toggleFav('flow', flow.id)" (start)="openFlow(flow)" />
            }
          </div>
        </div>
      </section>
      }

      <!-- Flows -->
      <section id="flows" [class]="toolMode ? 'bg-white' : 'border-t border-slate-100 bg-white'">
        <div [class]="toolMode ? 'mx-auto max-w-6xl px-6 pb-10 pt-6' : 'mx-auto max-w-6xl px-6 pb-24 pt-14'">
          @if (!toolMode) {
          <div class="mb-10 text-center">
            <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Flows</h2>
            <p class="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-500">
              Kleine gef&uuml;hrte Schritte f&uuml;r konkrete Situationen.
              Weniger analysieren, direkt ins Tun kommen.
            </p>
          </div>
          } @else {
          <button (click)="flowsOpen = !flowsOpen" class="mb-4 flex w-full cursor-pointer items-center gap-2 text-left">
            <svg class="h-4 w-4 text-slate-400 transition-transform" [class.rotate-90]="flowsOpen" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"/></svg>
            <span class="text-sm font-bold uppercase tracking-widest text-slate-400">Flows</span>
            <span class="text-xs text-slate-300">({{ nonFavFlows.length }})</span>
          </button>
          }

          @if (!toolMode || flowsOpen) {

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
            @for (flow of (toolMode ? visibleNonFavFlows : visibleFlows); track flow.title) {
              <app-flow-card [flow]="flow" [isFavorite]="favs.isFavorite('flow', flow.id)" (toggleFavorite)="toggleFav('flow', flow.id)" (start)="openFlow(flow)" />
            }
          </div>

          @if ((toolMode ? nonFavFlows : filteredFlows).length === 0) {
            <p class="mt-6 text-center text-sm text-slate-400">Kein Flow gefunden.</p>
          }

          @if ((toolMode ? totalNonFavPages : totalPages) > 1) {
            <div class="mt-8 flex items-center justify-center gap-3">
              <button
                (click)="prevPage()"
                [disabled]="flowPage === 0"
                class="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none"
              >
                &larr; Zur&uuml;ck
              </button>
              <span class="text-sm text-slate-400">{{ flowPage + 1 }} / {{ toolMode ? totalNonFavPages : totalPages }}</span>
              <button
                (click)="nextPage()"
                [disabled]="flowPage >= (toolMode ? totalNonFavPages : totalPages) - 1"
                class="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none"
              >
                Weiter &rarr;
              </button>
            </div>
          }
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
      <!-- PWA Install Banner -->
      @if (pwa.canInstall()) {
      <section class="border-t border-emerald-100 bg-emerald-50/50">
        <div class="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div class="flex items-center gap-3">
            <span class="text-xl">📲</span>
            <p class="text-sm font-medium text-slate-700">
              <strong>App installieren</strong> &mdash; Zenya als App auf deinem Ger&auml;t nutzen. Offline verf&uuml;gbar, schneller Zugriff.
            </p>
          </div>
          <button
            (click)="pwa.install()"
            class="shrink-0 cursor-pointer rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
          >
            Installieren
          </button>
        </div>
      </section>
      }

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
  readonly pwa = inject(PwaService);
  private readonly storage = inject(StorageService);

  readonly dashboards: DashboardConfig[] = getAllDashboardConfigs();
  readonly categories: FlowCategoryMeta[] = FLOW_CATEGORIES;
  private readonly allFlows: FlowDefinition[] = ALL_FLOWS;

  activeCategory: FlowCategory | null = null;
  flowSearch = '';
  flowPage = 0;
  toolMode = this.storage.get<boolean>('zenya_tool_mode', false);
  hasScrolled = false;
  dashboardsOpen = true;
  flowsOpen = true;
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
    this.loginReason = '';
    this.setToolMode(true);
  }

  doLogout(): void {
    this.auth.logout();
    this.setToolMode(false);
    this.showUserMenu = false;
  }

  setToolMode(value: boolean): void {
    this.toolMode = value;
    this.storage.set('zenya_tool_mode', value);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.hasScrolled = window.scrollY > 12;
  }

  get nonFavDashboards(): DashboardConfig[] {
    return this.dashboards.filter(d => !this.favs.isFavorite('dashboard', d.key));
  }

  get nonFavFlows(): FlowDefinition[] {
    const query = this.flowSearch.trim().toLowerCase();
    let flows: FlowDefinition[];
    if (query) {
      flows = this.allFlows.filter(f =>
        f.title.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query) ||
        f.tags.some(t => t.toLowerCase().includes(query))
      );
    } else if (this.activeCategory === null) {
      flows = this.allFlows;
    } else {
      flows = this.allFlows.filter(f => f.category === this.activeCategory);
    }
    return flows.filter(f => !this.favs.isFavorite('flow', f.id));
  }

  get visibleNonFavFlows(): FlowDefinition[] {
    const start = this.flowPage * this.PAGE_SIZE;
    return this.nonFavFlows.slice(start, start + this.PAGE_SIZE);
  }

  get totalNonFavPages(): number {
    return Math.ceil(this.nonFavFlows.length / this.PAGE_SIZE);
  }

  get greeting(): string {
    const h = new Date().getHours();
    const name = this.auth.user()?.name.split(' ')[0] ?? '';
    const greetings = [
      `Guten Morgen, ${name} ☀️`,
      `Hallo ${name} 👋`,
      `Schön, dass du da bist, ${name} 💛`,
      `Guten Abend, ${name} 🌙`,
      `Hey ${name}, alles klar? ✨`,
      `Willkommen zurück, ${name} 🫶`,
    ];
    if (h < 6) return greetings[3];
    if (h < 11) return greetings[0];
    if (h < 14) return greetings[1];
    if (h < 17) return greetings[2];
    if (h < 21) return greetings[3];
    return greetings[3];
  }
}
