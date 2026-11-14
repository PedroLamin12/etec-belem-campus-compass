import { useEffect, useState } from "react";
import { missions } from "./school";

const KEY = "tour-etec-checkins";
const EVT = "tour-etec-progress";

function read(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function checkIn(placeId: string) {
  const s = new Set(read());
  s.add(placeId);
  localStorage.setItem(KEY, JSON.stringify([...s]));
  window.dispatchEvent(new Event(EVT));
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
