import { describe, expect, it } from "vitest";
import { routeBetween, places } from "@/data/school";

describe("routes", () => {
  it("Portaria to Secretaria goes through the rampa, alameda and pátio", () => {
    expect(routeBetween("portaria", "secretaria")).toEqual(["portaria", "rampa", "alameda", "patio", "secretaria"]);
  });
  it("Lab 1 to Refeitório walks back down via the escada", () => {
    expect(routeBetween("lab1", "refeitorio")).toEqual(["lab1", "passarela", "corredor", "escada", "patio", "refeitorio"]);
  });
  it("catalog has 15 places", () => expect(places).toHaveLength(15));
});
