import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, FileText, Map, Search, X } from "lucide-react";
import portariaEntrada from "@/assets/photos/portaria-entrada.jpg.asset.json";
import { AppShell } from "@/components/AppShell";
import { PlacePhoto } from "@/components/PlacePhoto";
import { findCampusPlaces } from "@/data/exploration";
import { campusSectors, levelLabel, nodes, placeById, type Place } from "@/data/school";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tour ETEC Parque Belém — Guia do Campus" },
      {
        name: "description",
        content: "Guia oficial de navegação do campus da ETEC Parque Belém.",
      },
    ],
  }),
  component: HomePage,
});

const filters = [
  { label: "Todos", ids: null },
  { label: "Secretaria", ids: ["secretaria"] },
  { label: "Labs TI", ids: ["lab1", "lab2"] },
  { label: "Quadras", ids: ["quadra1", "quadra2"] },
  { label: "Cantina", ids: ["cantina"] },
  { label: "Auditório", ids: ["auditorio"] },
] as const;

const campusGroups = [
  {
    id: "predio-principal",
    title: "Prédio Principal",
    sectorIds: ["principal-terreo", "laboratorios-ti", "principal-segundo"],
  },
  { id: "bloco-anexo", title: "Bloco Anexo", sectorIds: ["bloco-anexo"] },
  { id: "area-externa", title: "Área Externa", sectorIds: ["area-externa"] },
] as const;

export function HomePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]["label"]>("Todos");

  const matchingIds = useMemo(() => {
    const trimmed = query.trim();
    return trimmed ? new Set(findCampusPlaces(trimmed).map((place) => place.id)) : undefined;
  }, [query]);

  const activeFilter = filters.find((item) => item.label === filter);
  const filterIds = activeFilter?.ids ? new Set(activeFilter.ids) : undefined;

  const sections = campusGroups
    .map((group) => {
      const sectorIds = new Set<string>(group.sectorIds);
      const sectorPlaces = campusSectors
        .filter((sector) => sectorIds.has(sector.id))
        .flatMap((sector) => sector.places);
      return {
        ...group,
        environments: sectorPlaces
          .map((id) => placeById(id))
          .filter(
            (place): place is Place =>
              Boolean(place) &&
              (!matchingIds || matchingIds.has(place.id)) &&
              (!filterIds || filterIds.has(place.id)),
          ),
      };
    })
    .filter((group) => group.environments.length > 0);

  return (
    <AppShell>
      <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-zinc-950 shadow-lg">
        <img
          src={portariaEntrada.url}
          alt="Entrada ETEC Parque Belém"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        <div className="relative flex flex-col justify-end p-6 pt-24 text-white sm:p-8">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            15 ambientes mapeados
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Explore a ETEC Parque Belém
          </h1>
          <p className="mt-1 max-w-md text-sm text-zinc-300">
            Navegue pelos blocos, descubra salas e trace rotas pelo campus.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              to="/rota"
              search={{ de: "portaria", para: "secretaria" }}
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md">
                <FileText className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold leading-tight">Secretaria</span>
                <span className="text-[11px] text-zinc-300">Fazer matrícula</span>
              </span>
            </Link>

            <Link
              to="/mapa"
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-zinc-900 shadow-md">
                <Map className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold leading-tight text-white">Mapa Geral</span>
                <span className="text-[11px] text-zinc-300">Ver planta</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-6" aria-label="Buscar ambientes">
        <label className="flex min-h-14 items-center gap-3 rounded-2xl border border-border/50 bg-card px-4 shadow-sm transition-all focus-within:border-primary">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            aria-label="Buscar ambientes por nome ou setor"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar salas, laboratórios, quadras..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              aria-label="Limpar busca"
              onClick={() => setQuery("")}
              className="rounded-full p-1 text-muted-foreground hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>

        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {filters.map((item) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={filter === item.label}
              onClick={() => setFilter(item.label)}
              className={`tap shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                filter === item.label
                  ? "bg-foreground text-background shadow-sm"
                  : "border border-border/50 bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 space-y-8" aria-label="Catálogo de ambientes por prédio">
        {sections.length ? (
          sections.map((group) => (
            <section key={group.id} aria-labelledby={`${group.id}-heading`}>
              <div className="mb-3 flex items-center justify-between">
                <h2
                  id={`${group.id}-heading`}
                  className="font-display text-lg font-bold tracking-tight text-foreground"
                >
                  {group.title}
                </h2>
                <span className="text-xs font-medium text-muted-foreground">
                  {group.environments.length} {group.environments.length === 1 ? "local" : "locais"}
                </span>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {group.environments.map((place) => {
                  const node = nodes[place.node];
                  const level = levelLabel[node.level];
                  return (
                    <li key={place.id}>
                      <Link
                        to="/ambientes/$id"
                        params={{ id: place.id }}
                        className="tap group flex gap-3.5 rounded-2xl border border-border/40 bg-card p-3 shadow-sm transition-all hover:border-border active:scale-[0.99]"
                      >
                        <PlacePhoto
                          place={place}
                          compact
                          className="h-20 w-20 shrink-0 rounded-xl object-cover shadow-inner"
                        />
                        <span className="flex min-w-0 flex-1 flex-col justify-center">
                          <span className="flex items-center gap-1.5">
                            <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                              {level}
                            </span>
                          </span>
                          <span className="mt-1 truncate font-display text-sm font-bold leading-snug text-foreground">
                            {place.name}
                          </span>
                          <span className="mt-0.5 truncate text-xs text-muted-foreground">
                            {place.description}
                          </span>
                          <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                            Ver detalhes e rota <ArrowUpRight className="h-3 w-3" />
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        ) : (
          <p className="rounded-2xl border border-border/50 bg-card p-5 text-sm text-muted-foreground">
            Nenhum ambiente encontrado. Ajuste a busca ou selecione outro filtro.
          </p>
        )}
      </section>
    </AppShell>
  );
}
