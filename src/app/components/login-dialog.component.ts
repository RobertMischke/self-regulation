import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  template: `
    @if (open) {
      <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm" (click)="closed.emit()">
        <div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl" (click)="$event.stopPropagation()">
          <h3 class="text-lg font-bold text-slate-900">Anmelden</h3>
          <p class="mt-1 text-sm text-slate-500">{{ reason || 'Damit deine Favoriten gespeichert bleiben.' }}</p>
          <div class="mt-4 space-y-3">
            <input
              #loginName
              type="text"
              placeholder="Name"
              value="Lumi"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            />
            <input
              #loginEmail
              type="email"
              placeholder="E-Mail"
              value="lumi@zenya.app"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div class="mt-5 flex gap-2">
            <button
              (click)="closed.emit()"
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
  `,
})
export class LoginDialogComponent {
  @Input() open = false;
  @Input() reason = '';
  @Output() closed = new EventEmitter<void>();
  @Output() loggedIn = new EventEmitter<{ name: string; email: string }>();

  doLogin(name: string, email: string): void {
    if (!name.trim() || !email.trim()) return;
    this.loggedIn.emit({ name, email });
  }
}
