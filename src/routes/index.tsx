import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, FileText, Map, MapPin, Search, X } from "lucide-react";
import portariaEntrada from "@/assets/photos/portaria-entrada.jpg.asset.json";
import { AppShell } from "@/components/AppShell";
import { PlacePhoto } from "@/components/PlacePhoto";
import { Button } from "@/components/ui/button";
import { Welcome } from "@/components/Welcome";
import { findCampusPlaces } from "@/data/exploration";
import { campusSectors, levelLabel, nodes, placeById, type Place } from "@/data/school";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tour ETEC Parque Belém — Guia do Campus" },
      {
        name: "description",
        content:
          "Guia oficial de navegação do campus da ETEC Parque Belém. Encontre ambientes, consulte o mapa e planeje rotas.",
      },
      { property: "og:title", content: "Tour ETEC Parque Belém" },
      {
        property: "og:description",
        content: "Guia oficial de navegação do campus da ETEC Parque Belém.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  const [welcomeOpen, setWelcomeOpen] = useState(true);

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
      {welcomeOpen && <Welcome onDone={() => setWelcomeOpen(false)} />}

      <section
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-[260px] overflow-hidden rounded-3xl bg-slate-950 shadow-sm sm:min-h-[320px]"
      >
        <img
          src={portariaEntrada.url}
          alt="Entrada principal da ETEC Parque Belém"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <div className="mt-auto flex w-full flex-col items-start gap-5 p-5 text-white sm:flex-row sm:items-end sm:justify-between sm:p-8">
          <div className="max-w-xl">
            <p className="eyebrow text-white/75">Guia oficial de navegação</p>
            <h1
              id="hero-title"
              className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            >
              Tour ETEC Parque Belém
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
              Explore ambientes, serviços e caminhos do campus.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setWelcomeOpen(true)}
            className="shrink-0 border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
          >
            Abrir Introdução
          </Button>
        </div>
      </section>

      <section className="mt-7" aria-label="Buscar e filtrar ambientes">
        <label className="flex min-h-14 items-center gap-3 rounded-2xl border border-border/50 bg-card px-4 shadow-sm transition-colors focus-within:border-primary">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            aria-label="Buscar ambientes por nome ou setor"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar salas, laboratórios, quadras..."
            className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              aria-label="Limpar busca"
              onClick={() => setQuery("")}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary"
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
              className={`tap shrink-0 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all active:scale-[0.98] ${
                filter === item.label
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/50 bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-7" aria-labelledby="quick-access-heading">
        <div className="mb-3">
          <h2 id="quick-access-heading" className="font-display text-lg font-semibold">
            Acesso rápido
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            to="/rota"
            search={{ de: "portaria", para: "secretaria" }}
            className="tap flex min-h-24 items-center gap-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <FileText className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">Secretaria &amp; Matrícula</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                Subsolo do Bloco Anexo
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </Link>
          <Link
            to="/mapa"
            className="tap flex min-h-24 items-center gap-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <Map className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">Planta &amp; Mapa Interativo</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                Explore os pontos de interesse
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="catalog-heading">
        <div className="mb-4">
          <h2 id="catalog-heading" className="font-display text-xl font-semibold">
            Ambientes do campus
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {query.trim() || filter !== "Todos"
              ? "Resultados conforme sua busca e filtros."
              : "Encontre cada local organizado por setor."}
          </p>
        </div>
        {sections.length ? (
          <div className="space-y-8">
            {sections.map((group) => (
              <section key={group.id} aria-labelledby={`${group.id}-heading`}>
                <div className="mb-3 flex items-center gap-2 border-b border-border/50 pb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <h3 id={`${group.id}-heading`} className="text-sm font-semibold">
                    {group.title}
                  </h3>
                </div>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {group.environments.map((place) => (
                    <EnvironmentCard key={place.id} place={place} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-border/50 bg-card p-5 text-sm text-muted-foreground">
            Nenhum ambiente encontrado. Ajuste a busca ou selecione outro filtro.
          </p>
        )}
      </section>
    </AppShell>
  );
}

function EnvironmentCard({ place }: { place: Place }) {
  const location = nodes[place.node];

  return (
    <li
      id={place.id}
      className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm"
    >
      <Link
        to="/ambientes/$id"
        params={{ id: place.id }}
        aria-label={`Detalhes: ${place.name}`}
        className="group relative block overflow-hidden"
      >
        <PlacePhoto place={place} loading="lazy" compact className="aspect-[16/9] w-full" />
        <span className="absolute bottom-3 left-3 rounded-lg border border-white/20 bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {levelLabel[location.level]}
        </span>
      </Link>
      <div className="p-4">
        <h4 className="font-display text-base font-semibold leading-snug">{place.name}</h4>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
          {place.description}
        </p>
        <Button asChild variant="outline" size="sm" className="mt-3 w-full justify-between">
          <Link to="/rota" search={{ de: "portaria", para: place.id }}>
            Como chegar
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </li>
  );
}
