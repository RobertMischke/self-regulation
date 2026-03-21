import { Injectable, inject, signal, computed } from '@angular/core';
import { StorageService } from './storage.service';

export type FavoriteItem = { type: 'dashboard' | 'flow'; id: string };

const STORAGE_KEY = 'adhs_favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storage = inject(StorageService);
  private readonly _items = signal<FavoriteItem[]>(this.storage.get<FavoriteItem[]>(STORAGE_KEY, []));

  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().length);

  isFavorite(type: 'dashboard' | 'flow', id: string): boolean {
    return this._items().some(f => f.type === type && f.id === id);
  }

  toggle(type: 'dashboard' | 'flow', id: string): void {
    const current = this._items();
    const idx = current.findIndex(f => f.type === type && f.id === id);
    if (idx >= 0) {
      const next = current.filter((_, i) => i !== idx);
      this._items.set(next);
    } else {
      this._items.set([...current, { type, id }]);
    }
    this.storage.set(STORAGE_KEY, this._items());
  }
}
