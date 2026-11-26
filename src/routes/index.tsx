import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Computer, Dribbble, FileText, Map, MapPin, Search, X } from "lucide-react";
import logo from "@/assets/branding/campus-mark.svg";
import { AppShell, ThemeToggle } from "@/components/AppShell";
import { PlacePhoto } from "@/components/PlacePhoto";
import { Button } from "@/components/ui/button";
import { Welcome, shouldShowWelcome } from "@/components/Welcome";
import { findCampusPlaces } from "@/data/exploration";
import { campusSectors, placeById, type Place } from "@/data/school";

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
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [welcome, setWelcome] = useState(false);
  useEffect(() => {
    if (shouldShowWelcome()) setWelcome(true);
  }, []);

  const matchingIds = useMemo(() => {
    const trimmed = query.trim();
    return trimmed ? new Set(findCampusPlaces(trimmed).map((place) => place.id)) : undefined;
  }, [query]);

  const sections = campusSectors
    .map((sector) => ({
      ...sector,
      environments: sector.places
        .map((id) => placeById(id))
        .filter(
          (place): place is Place => Boolean(place) && (!matchingIds || matchingIds.has(place.id)),
        ),
    }))
    .filter((sector) => sector.environments.length > 0);

  const accessCards = [
    {
      label: "Secretaria & Matrícula",
      description: "Secretaria Acadêmica · Subsolo do Bloco Anexo",
      icon: FileText,
      to: "/rota" as const,
      search: { de: "portaria", para: "secretaria" },
    },
    {
      label: "Planta do Campus",
      description: "Consulte a planta e os pontos de referência",
      icon: Map,
      to: "/mapa" as const,
    },
  ];

  return (
    <AppShell>
      {welcome && <Welcome onDone={() => setWelcome(false)} />}
      <header className="flex items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm sm:p-5">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={logo}
            alt="ETEC Parque Belém"
            width={56}
            height={56}
            className="h-12 w-12 shrink-0 sm:h-14 sm:w-14"
          />
          <div className="min-w-0">
            <h1 className="font-display text-xl font-semibold leading-tight sm:text-2xl">
              Tour ETEC Parque Belém
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Guia oficial de navegação do campus
            </p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <label className="mt-5 flex min-h-14 items-center gap-3 rounded-2xl border border-border/50 bg-card px-4 shadow-sm transition-colors focus-within:border-primary">
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

      {!query.trim() && (
        <section className="mt-7" aria-labelledby="quick-access-heading">
          <div className="mb-3">
            <h2 id="quick-access-heading" className="font-display text-lg font-semibold">
              Acesso rápido
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Serviços e pontos de referência do campus
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {accessCards.map((card) => (
              <Link
                key={card.label}
                to={card.to}
                search={"search" in card ? card.search : undefined}
                className="tap flex min-h-28 items-start gap-3 rounded-2xl border border-border/50 bg-card p-4 shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <card.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold leading-snug">{card.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {card.description}
                  </span>
                </span>
              </Link>
            ))}
            <a
              href="#lab1"
              className="tap flex min-h-28 items-start gap-3 rounded-2xl border border-border/50 bg-card p-4 shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Computer className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-snug">Laboratórios de TI</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  Laboratórios 1 e 2 · 1º andar
                </span>
              </span>
            </a>
            <a
              href="#quadra1"
              className="tap flex min-h-28 items-start gap-3 rounded-2xl border border-border/50 bg-card p-4 shadow-sm"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Dribbble className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-snug">
                  Quadras Poliesportivas
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  Quadras 1 e 2 · Área Externa
                </span>
              </span>
            </a>
          </div>
        </section>
      )}

      <section className="mt-8" aria-labelledby="catalog-heading">
        <div className="mb-4">
          <h2 id="catalog-heading" className="font-display text-xl font-semibold">
            Ambientes do campus
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {query.trim()
              ? `Resultados para “${query.trim()}”`
              : "Consulte os locais organizados por setor."}
          </p>
        </div>
        {sections.length ? (
          <div className="space-y-8">
            {sections.map((sector) => (
              <section key={sector.id} id={sector.id} aria-labelledby={`${sector.id}-heading`}>
                <div className="mb-3 flex items-center gap-2 border-b border-border/50 pb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <h3 id={`${sector.id}-heading`} className="text-sm font-semibold">
                    {sector.title}
                  </h3>
                </div>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {sector.environments.map((place) => (
                    <EnvironmentCard key={place.id} place={place} sector={sector.title} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-border/50 bg-card p-5 text-sm text-muted-foreground">
            Nenhum ambiente encontrado. Tente buscar pelo nome do local, prédio ou andar.
          </p>
        )}
      </section>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        {sections.reduce((count, sector) => count + sector.environments.length, 0)} ambientes · ETEC
        Parque Belém
      </p>
    </AppShell>
  );
}

function EnvironmentCard({ place, sector }: { place: Place; sector: string }) {
  return (
    <li
      id={place.id}
      className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm"
    >
      <Link
        to="/ambientes/$id"
        params={{ id: place.id }}
        aria-label={`Detalhes: ${place.name}`}
        className="group block overflow-hidden"
      >
        <PlacePhoto place={place} loading="lazy" compact className="aspect-[16/9] w-full" />
      </Link>
      <div className="p-4">
        <p className="text-[11px] font-medium text-muted-foreground">{sector}</p>
        <h4 className="mt-1 font-display text-base font-semibold leading-snug">{place.name}</h4>
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
