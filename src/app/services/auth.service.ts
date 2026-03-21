import { Injectable, inject, signal, computed } from '@angular/core';
import { StorageService } from './storage.service';

export interface UserProfile {
  name: string;
  email: string;
}

const STORAGE_KEY = 'adhs_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storage = inject(StorageService);
  private readonly _user = signal<UserProfile | null>(this.storage.get<UserProfile | null>(STORAGE_KEY, null));

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
    this.storage.set(STORAGE_KEY, profile);
  }

  logout(): void {
    this._user.set(null);
    this.storage.remove(STORAGE_KEY);
  }
}
