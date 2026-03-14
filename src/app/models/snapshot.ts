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

function readAll(): Snapshot[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(snapshots: Snapshot[]): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
}

export function getSnapshots(dashboardKey: string): Snapshot[] {
  return readAll().filter(s => s.dashboardKey === dashboardKey);
}

export function addSnapshot(snapshot: Omit<Snapshot, 'id'>): Snapshot {
  const all = readAll();
  const entry: Snapshot = { ...snapshot, id: crypto.randomUUID() };
  all.push(entry);
  writeAll(all);
  return entry;
}

export function deleteSnapshot(id: string): void {
  writeAll(readAll().filter(s => s.id !== id));
}

/** 0–100 score: high regulation + low friction = good */
export function snapshotScore(s: Snapshot): number {
  return Math.round((s.regulation + (100 - s.friction)) / 2);
}