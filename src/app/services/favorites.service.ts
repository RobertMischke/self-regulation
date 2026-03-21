import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';

export type FavoriteItem = { type: 'dashboard' | 'flow'; id: string };

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storage = inject(StorageService);
  private readonly auth = inject(AuthService);
  private readonly _items = signal<FavoriteItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().length);

  constructor() {
    effect(() => {
      const user = this.auth.user();
      if (user) {
        this._items.set(this.storage.get<FavoriteItem[]>(`zenya_fav_${user.email}`, []));
      } else {
        this._items.set([]);
      }
    });
  }

  isFavorite(type: 'dashboard' | 'flow', id: string): boolean {
    return this._items().some(f => f.type === type && f.id === id);
  }

  toggle(type: 'dashboard' | 'flow', id: string): void {
    const user = this.auth.user();
    if (!user) return;
    const current = this._items();
    const idx = current.findIndex(f => f.type === type && f.id === id);
    if (idx >= 0) {
      const next = current.filter((_, i) => i !== idx);
      this._items.set(next);
    } else {
      this._items.set([...current, { type, id }]);
    }
    this.storage.set(`zenya_fav_${user.email}`, this._items());
  }
}
