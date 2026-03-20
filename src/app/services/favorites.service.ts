import { Injectable, signal, computed } from '@angular/core';

export type FavoriteItem = { type: 'dashboard' | 'flow'; id: string };

const STORAGE_KEY = 'adhs_favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly _items = signal<FavoriteItem[]>(this.load());

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
    this.save();
  }

  private load(): FavoriteItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items()));
  }
}
