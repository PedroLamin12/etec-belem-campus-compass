import { describe, expect, it } from "vitest";
import { floorTransition, missions, nodes, pathFromPortaria, placeById, places, rearRooms, routeBetween, team, type NodeId } from "@/data/school";
import portaria from "@/assets/photos/portaria-arco-real.jpg.asset.json";
import labs from "@/assets/photos/informatica-primeiro-andar-real.jpg.asset.json";
import refeitorio from "@/assets/photos/refeitorio-mesas-azuis-real.jpg.asset.json";
import frontal from "@/assets/photos/portaria-entrada.jpg.asset.json";

describe("confirmed school layout", () => {
  it.each(["lab1", "lab2"] as const)("%s is on the first floor of the main building", (id) => {
    expect(nodes[id].building).toBe("principal");
    expect(nodes[id].level).toBe("andar1");
  });
  it("the Secretaria is in the annex basement", () => {
    expect(nodes.secretaria.building).toBe("anexo");
    expect(nodes.secretaria.level).toBe("subsolo");
  });
  it.each(["refeitorio", "nutricao", "biblioteca"] as const)("%s is in the independent annex, with only the ground-floor access confirmed", (id) => {
    expect(nodes[id].building).toBe("anexo");
    expect(nodes[id].accessOnly).toBe(true);
    expect(pathFromPortaria[id]).toEqual(["portaria", "rampa", "alameda", "patio", "acessoAnexo", id]);
  });
  it("the annex entry is reached via the ground-floor courtyard, not a suspended walkway", () => {
    expect(nodes.acessoAnexo.level).toBe("terreo");
    expect(nodes.patio.level).toBe("terreo");
    expect(nodes).not.toHaveProperty("passarela");
    expect(pathFromPortaria.acessoAnexo).toEqual(["portaria", "rampa", "alameda", "patio", "acessoAnexo"]);
  });
  it("parking is nearer the entrance than the courtyard", () => {
    const distance = (id: NodeId) => Math.hypot(nodes[id].x - nodes.portaria.x, nodes[id].y - nodes.portaria.y);
    expect(distance("alameda")).toBeLessThan(distance("patio"));
  });
  it("pilotis and main stairs are at ground level in the main building", () => {
    for (const id of ["patio", "escada"] as const) {
      expect(nodes[id].building).toBe("principal");
      expect(nodes[id].level).toBe("terreo");
    }
  });
  it("the auditorium is at the rear right of the main ground floor", () => {
    expect(nodes.auditorio.building).toBe("principal");
    expect(nodes.auditorio.level).toBe("terreo");
    expect(nodes.auditorio.x).toBeGreaterThan(nodes.finalPrincipal.x);
    expect(nodes.auditorio.y).toBeGreaterThan(nodes.finalPrincipal.y);
  });
  it("bathrooms are catalogued at the rear left of the main ground floor", () => {
    expect(placeById("banheiros")?.node).toBe("banheiros");
    expect(nodes.banheiros.building).toBe("principal");
    expect(nodes.banheiros.level).toBe("terreo");
    expect(nodes.banheiros.x).toBeLessThan(nodes.finalPrincipal.x);
    expect(nodes.banheiros.y).toBeGreaterThan(nodes.finalPrincipal.y);
  });
  it("Coordenação is at the rear of the main building second floor", () => {
    expect(nodes.coordenacao.building).toBe("principal");
    expect(nodes.coordenacao.level).toBe("andar2");
    expect(nodes.coordenacao.y).toBeGreaterThan(nodes.finalPrincipal.y);
  });
  it("the library is included in the catalogue and map", () => {
    expect(placeById("biblioteca")?.node).toBe("biblioteca");
    expect(nodes.biblioteca.building).toBe("anexo");
  });
  it("the auditorium is only slightly wider than the bathrooms", () => {
    const a = rearRooms.auditorium.right - rearRooms.auditorium.left;
    const b = rearRooms.bathrooms.right - rearRooms.bathrooms.left;
    expect(a).toBeGreaterThan(b);
    expect(a / b).toBeLessThan(1.15);
  });
  it("number 9 is the ground-floor pilotis dining area, not classrooms", () => {
    expect(places[8]?.id).toBe("convivencia");
    expect(nodes.convivencia.level).toBe("terreo");
    expect(nodes.convivencia.building).toBe("principal");
    expect(routeBetween("portaria", "convivencia")).toEqual(["portaria", "rampa", "alameda", "patio", "convivencia"]);
  });
  it("classrooms are reached on the second floor through both flights", () => {
    expect(nodes.salas.level).toBe("andar2");
    expect(nodes.salas.building).toBe("principal");
    expect(routeBetween("portaria", "salas")).toEqual(["portaria", "rampa", "alameda", "patio", "escada", "corredor", "escada2", "corredor2", "salas"]);
  });
  it("the explorer catalog contains at least 15 real environments", () => expect(places.length).toBeGreaterThanOrEqual(15));
  it("honours Pedro as lead before the three named teammates", () => {
    expect(team.map((t) => t.name)).toEqual(["Pedro Henrique Lamin Barbosa Ciriaco", "Luigi Paulo", "Odira", "Kauan Ribeiro"]);
    expect(team[0]?.lead).toBe(true);
  });
});

describe("verified real photo associations", () => {
  it("Portaria uses the actual yellow-arch photo", () => expect(placeById("portaria")?.photo).toBe(portaria.url));
  it.each(["lab1", "lab2"])("%s uses the supplied first-floor photo", (id) => expect(placeById(id)?.photo).toBe(labs.url));
  it("the refectory uses the real blue-table photo", () => expect(placeById("refeitorio")?.photo).toBe(refeitorio.url));
  it("the access ramp uses the real front entrance photo", () => expect(placeById("rampa")?.photo).toBe(frontal.url));
});

describe("walking routes in both directions", () => {
  it("enrolment passes through the courtyard, ground-floor annex entry and basement stairs", () => {
    expect(routeBetween("portaria", "secretaria")).toEqual(["portaria", "rampa", "alameda", "patio", "acessoAnexo", "escadaAnexo", "secretaria"]);
    expect(floorTransition("escadaAnexo", "secretaria")).toBe("down");
    expect(floorTransition("secretaria", "escadaAnexo")).toBe("up");
  });
  it("Lab 1 to Refeitório descends main stairs before crossing the ground-floor courtyard", () => {
    expect(routeBetween("lab1", "refeitorio")).toEqual(["lab1", "corredor", "escada", "patio", "acessoAnexo", "refeitorio"]);
    expect(floorTransition("corredor", "escada")).toBe("down");
  });
  it("Coordenação climbs to both upper floors instead of passing through the Secretaria", () => {
    expect(routeBetween("portaria", "coordenacao")).toEqual(["portaria", "rampa", "alameda", "patio", "escada", "corredor", "escada2", "corredor2", "coordenacao"]);
    expect(floorTransition("escada", "corredor")).toBe("up");
    expect(floorTransition("escada2", "corredor2")).toBe("up");
    expect(floorTransition("corredor2", "escada2")).toBe("down");
  });
  it("the auditorium is reached without climbing stairs", () => {
    const route = routeBetween("portaria", "auditorio");
    expect(route).toEqual(["portaria", "rampa", "alameda", "patio", "finalPrincipal", "auditorio"]);
    expect(route.every((id) => ["externa", "terreo"].includes(nodes[id].level))).toBe(true);
  });
  it("all paths have consistent prefixes and only cross between buildings at ground level", () => {
    for (const [id, path] of Object.entries(pathFromPortaria)) {
      expect(path[0]).toBe("portaria");
      expect(path.at(-1)).toBe(id);
      for (let i = 0; i < path.length; i++) {
        const current = path[i];
        if (!current) throw new Error("Missing path node");
        expect(pathFromPortaria[current]).toEqual(path.slice(0, i + 1));
        const previous = path[i - 1];
        if (previous && nodes[current].building !== nodes[previous].building && nodes[previous].building !== "externa") {
          expect(nodes[current].level).toBe("terreo");
          expect(nodes[previous].level).toBe("terreo");
        }
      }
    }
  });
  it("every pair has a reversible path and a same-place route stays put", () => {
    for (const a of Object.keys(nodes) as NodeId[]) {
      expect(routeBetween(a, a)).toEqual([a]);
      for (const b of Object.keys(nodes) as NodeId[]) {
        const route = routeBetween(a, b);
        expect(route[0]).toBe(a);
        expect(route.at(-1)).toBe(b);
        expect(route).toEqual(routeBetween(b, a).reverse());
      }
    }
  });
});

describe("missions follow the corrected destinations", () => {
  it("enrolment and IT missions resolve to the confirmed buildings and floors", () => {
    const secretary = placeById(missions.find((m) => m.id === "m-secretaria")?.place ?? "");
    const itLab = placeById(missions.find((m) => m.id === "m-lab1")?.place ?? "");
    expect(secretary?.node).toBe("secretaria");
    expect(itLab?.node).toBe("lab1");
  });
  it("includes a library exploration mission", () => {
    expect(missions.find((m) => m.place === "biblioteca")?.id).toBe("m-biblioteca");
  });
  it("every mission has a real, reachable destination", () => {
    for (const mission of missions) {
      const place = placeById(mission.place);
      expect(place).toBeDefined();
      if (!place) throw new Error("Missing mission place");
      expect(routeBetween("portaria", place.node).at(-1)).toBe(place.node);
    }
  });
});
