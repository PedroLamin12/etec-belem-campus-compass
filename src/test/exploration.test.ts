import { describe, expect, it } from "vitest";
import { discoveryDestination, findCampusPlaces, nextCampusMission } from "@/data/exploration";

describe("campus companion destinations", () => {
  it("finds the real enrolment destination from matrícula", () => {
    expect(findCampusPlaces("matrícula").map((place) => place.id)).toContain("secretaria");
  });
  it("finds lab 1 using accented multi-word queries", () => {
    expect(findCampusPlaces("Informática 1").map((place) => place.id)).toContain("lab1");
  });
  it("does not return a fabricated destination for unknown input", () => {
    expect(findCampusPlaces("piscina olímpica")).toEqual([]);
  });
  it("surprise exploration excludes already visited destinations", () => {
    expect(discoveryDestination(["lab1", "convivencia"], () => 0)?.id).toBe("quadra1");
  });
  it("next mission skips completed check-ins", () => {
    expect(nextCampusMission(["portaria"])?.place).toBe("rampa");
  });
});