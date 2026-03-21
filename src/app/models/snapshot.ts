import { inject, Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';

export interface Snapshot {
  id: string;
  timestamp: number;
  dashboardKey: string;
  values: Record<string, number>;
  regulation: number;
  friction: number;
  modeKey: string;
  modeLabel: string;
  intention: string;
}

const STORAGE_KEY = 'snapshots';

@Injectable({ providedIn: 'root' })
export class SnapshotService {
  private storage = inject(StorageService);

  private readAll(): Snapshot[] {
    return this.storage.get<Snapshot[]>(STORAGE_KEY, []);
  }

  private writeAll(snapshots: Snapshot[]): void {
    this.storage.set(STORAGE_KEY, snapshots);
  }

  getSnapshots(dashboardKey: string): Snapshot[] {
    return this.readAll().filter(s => s.dashboardKey === dashboardKey);
  }

  addSnapshot(snapshot: Omit<Snapshot, 'id'>): Snapshot {
    const all = this.readAll();
    const entry: Snapshot = { ...snapshot, id: crypto.randomUUID() };
    all.push(entry);
    this.writeAll(all);
    return entry;
  }

  deleteSnapshot(id: string): void {
    this.writeAll(this.readAll().filter(s => s.id !== id));
  }

  clearSnapshots(dashboardKey: string): void {
    this.writeAll(this.readAll().filter(s => s.dashboardKey !== dashboardKey));
  }
}

/** 0–100 score: high regulation + low friction = good */
export function snapshotScore(s: Snapshot): number {
  return Math.round((s.regulation + (100 - s.friction)) / 2);
}