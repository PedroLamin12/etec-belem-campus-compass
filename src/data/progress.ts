import { useEffect, useState } from "react";
import { missions, placeById } from "./school";

const KEY = "tour-etec-checkins";
const EVT = "tour-etec-progress";
export const CHECKIN_EVENT = "tour-etec-celebration";
export type CheckInReward = { placeId: string; xp: number; badge: boolean };

function read(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : [];
  } catch { return []; }
}

export function checkIn(placeId: string) {
  const s = new Set(read());
  if (s.has(placeId) || !placeById(placeId)) return false;
  s.add(placeId);
  try { localStorage.setItem(KEY, JSON.stringify([...s])); } catch { return false; }
  window.dispatchEvent(new Event(EVT));
  const reward: CheckInReward = {
    placeId,
    xp: missions.find((m) => m.place === placeId)?.xp ?? 0,
    badge: missions.every((m) => s.has(m.place)),
  };
  window.dispatchEvent(new CustomEvent<CheckInReward>(CHECKIN_EVENT, { detail: reward }));
  return true;
}

export function resetProgress() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVT));
}

export function useProgress() {
  const [visited, setVisited] = useState<string[]>([]);
  useEffect(() => {
    const u = () => setVisited(read());
    u();
    window.addEventListener(EVT, u);
    return () => window.removeEventListener(EVT, u);
  }, []);
  const done = missions.filter((m) => visited.includes(m.place));
  const xp = done.reduce((a, m) => a + m.xp, 0);
  return { visited, done, xp, total: missions.length, badge: done.length === missions.length };
}
