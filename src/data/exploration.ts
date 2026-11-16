import { missions, placeById, places, type Place } from "@/data/school";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function findCampusPlaces(query: string): Place[] {
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return places.filter((place) => {
    const text = normalize([place.name, place.description, place.category, ...place.keywords, ...place.services].join(" "));
    return words.every((word) => text.includes(word));
  });
}

export function discoveryDestination(visited: string[], random = Math.random): Place | undefined {
  const ids = ["lab1", "convivencia", "quadra1", "nutricao", "auditorio", "biblioteca", "refeitorio", "corredor"];
  const pool = ids.filter((id) => !visited.includes(id));
  const candidates = pool.length ? pool : ids;
  const index = Math.min(candidates.length - 1, Math.max(0, Math.floor(random() * candidates.length)));
  const id = candidates[index];
  return id ? placeById(id) : undefined;
}

export function nextCampusMission(visited: string[]) {
  return missions.find((mission) => !visited.includes(mission.place));
}