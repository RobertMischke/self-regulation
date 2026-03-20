import { Injectable, signal, computed } from '@angular/core';

export interface UserProfile {
  name: string;
  email: string;
}

const STORAGE_KEY = 'adhs_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<UserProfile | null>(this.load());

  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);
  readonly initials = computed(() => {
    const u = this._user();
    if (!u) return '?';
    return u.name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });

  login(name: string, email: string): void {
    const profile: UserProfile = { name: name.trim(), email: email.trim().toLowerCase() };
    this._user.set(profile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }

  logout(): void {
    this._user.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  private load(): UserProfile | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
