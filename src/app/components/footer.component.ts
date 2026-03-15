import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-slate-200 bg-slate-50">
      <div class="mx-auto max-w-7xl px-6 py-10">
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
  `,
})
export class FooterComponent {}
