import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import {
  Search,
  X,
  Check,
  Trophy,
  FileText,
  GraduationCap,
  Monitor,
  Utensils,
  Dribbble,
  Mic,
  ChevronRight,
  DoorOpen,
  Building2,
  Users,
  Car,
  Toilet,
  ChefHat,
  Coffee,
  Briefcase,
  Compass,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Welcome, shouldShowWelcome } from "@/components/Welcome";
import { placeById, places, quickActions, units, nodeLocation } from "@/data/school";
import { useProgress } from "@/data/progress";
import { findCampusPlaces, nextCampusMission } from "@/data/exploration";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tour ETEC Belém — Conheça a escola passo a passo" },
      {
        name: "description",
        content:
          "Guia oficial da ETEC Parque Belém com mapa, rotas passo a passo e informações dos ambientes do campus.",
      },
      { property: "og:title", content: "Tour ETEC Belém" },
      {
        property: "og:description",
        content: "O jeito mais fácil de conhecer a ETEC Parque Belém.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const quickIcons = [FileText, GraduationCap, Monitor, Utensils, Dribbble, Mic];
const placeIcons: Record<string, typeof DoorOpen> = {
  portaria: DoorOpen,
  rampa: DoorOpen,
  estacionamento: Car,
  convivencia: Utensils,
  auditorio: Mic,
  banheiros: Toilet,
  secretaria: FileText,
  cantina: Coffee,
  nutricao: ChefHat,
  lab1: Monitor,
  lab2: Monitor,
  salas: GraduationCap,
  coordenacao: Briefcase,
  quadra1: Dribbble,
  quadra2: Dribbble,
};
const offsets = [0, 52, 72, 52, 0, -52, -72, -52];

function Index() {
  const [q, setQ] = useState("");
  const [welcome, setWelcome] = useState(false);
  const { done, total, xp, visited, badge } = useProgress();
  useEffect(() => {
    if (shouldShowWelcome()) setWelcome(true);
  }, []);
  const results = findCampusPlaces(q);
  const next = nextCampusMission(visited);
  const nextPlace = next ? placeById(next.place) : undefined;
  let k = 0;
  return (
    <AppShell>
      {welcome && <Welcome onDone={() => setWelcome(false)} />}
      <section className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
            <Compass className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="eyebrow text-primary">Painel de boas-vindas</p>
            <h1 className="mt-1 font-display text-xl font-semibold leading-snug">
              ETEC Parque Belém
            </h1>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {done.length} de {total} ambientes explorados
        </p>
        <div className="progress-track mt-2 h-2">
          <div className="progress-fill" style={{ width: `${(done.length / total) * 100}%` }} />
        </div>
        <div className="mt-4 flex items-start gap-3 border-t border-border/50 pt-4">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {nextPlace ? "Próxima parada recomendada" : "Exploração concluída"}
            </p>
            <p className="mt-1 font-semibold">
              {nextPlace?.name ?? "Você já explorou todos os ambientes."}
            </p>
          </div>
        </div>
      </section>
      {nextPlace && (
        <Button asChild size="lg" className="mt-3 w-full">
          <Link to="/ambientes/$id" params={{ id: nextPlace.id }}>
            Continuar tour
            <ArrowRight />
          </Link>
        </Button>
      )}

      <label className="mt-5 flex h-12 items-center gap-2 rounded-2xl border border-border/50 bg-card px-4 focus-within:border-primary">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          aria-label="Buscar lugar"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Procurar um lugar…"
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-muted-foreground"
        />
        {q && (
          <button
            type="button"
            aria-label="Limpar busca"
            onClick={() => setQ("")}
            className="text-muted-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </label>

      {q.trim() ? (
        <ul aria-live="polite" className="mt-3 space-y-2">
          {results.length ? (
            results.map((p) => (
              <li key={p.id}>
                <Link
                  to="/ambientes/$id"
                  params={{ id: p.id }}
                  className="tap flex items-center justify-between gap-3 rounded-2xl border border-border/50 bg-card px-4 py-3"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{p.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {nodeLocation(p.node)}
                    </span>
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                </Link>
              </li>
            ))
          ) : (
            <li className="p-3 text-sm text-muted-foreground">Nada encontrado para “{q}”.</li>
          )}
        </ul>
      ) : (
        <>
          <h2 className="mb-3 mt-7 font-display text-lg font-semibold">Acesso rápido</h2>
          <div className="grid grid-cols-3 gap-2.5">
            {quickActions.map((a, i) => {
              const Icon = quickIcons[i] ?? FileText;
              return (
                <Link
                  key={a.place}
                  to="/rota"
                  search={{ de: "portaria", para: a.place }}
                  className="tap flex flex-col items-center gap-2 rounded-2xl border border-border/50 bg-card px-1 py-3.5 text-center shadow-sm"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${i % 3 === 0 ? "bg-primary-soft text-primary" : i % 3 === 1 ? "bg-brand-sky-soft text-brand-sky-shade" : "bg-success-soft text-success-shade"}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-extrabold leading-tight">{a.label}</span>
                </Link>
              );
            })}
          </div>

          <h2 className="mb-1 mt-9 font-display text-lg font-semibold">Explorar ambientes</h2>
          <p className="text-sm text-muted-foreground">
            Na ordem do caminho real, a partir da Portaria.
          </p>
          {units.map((u, ui) => {
            return (
              <section key={u.id} className="mt-6">
                <div className="rounded-2xl border border-border/50 bg-card px-5 py-4 shadow-sm">
                  <p className="eyebrow text-muted-foreground">Etapa {ui + 1}</p>
                  <h3 className="font-display text-xl font-semibold">{u.title}</h3>
                  <p className="text-sm text-muted-foreground">{u.subtitle}</p>
                </div>
                <ol className="flex flex-col items-center gap-7 pb-2 pt-9">
                  {u.places.map((id) => {
                    const p = placeById(id);
                    if (!p) return null;
                    const isDone = visited.includes(id);
                    const isNext = next?.place === id;
                    const Icon = isDone ? Check : (placeIcons[id] ?? Building2);
                    const style = (
                      isDone
                        ? {
                            "--node": "var(--success-soft)",
                            "--node-shade": "var(--success)",
                            "--node-fg": "var(--success-shade)",
                          }
                        : isNext
                          ? {
                              "--node": "var(--primary-soft)",
                              "--node-shade": "var(--primary)",
                              "--node-fg": "var(--primary)",
                            }
                          : {}
                    ) as CSSProperties;
                    const x = offsets[k++ % offsets.length] ?? 0;
                    return (
                      <li
                        key={id}
                        className="flex flex-col items-center"
                        style={{ transform: `translateX(${x}px)` }}
                      >
                        <Link
                          to="/ambientes/$id"
                          params={{ id }}
                          aria-label={`${p.name}${isDone ? ", visitado" : ""}`}
                          className={`trail-node ${isNext ? "is-next" : ""}`}
                          style={style}
                        >
                          {isNext && <span className="start-bubble">PRÓXIMO</span>}
                          <Icon className="h-7 w-7" strokeWidth={2.4} />
                        </Link>
                        <span className="mt-3 max-w-28 text-center text-xs font-extrabold leading-tight">
                          {p.name}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
          <div className="mt-8 flex flex-col items-center text-center">
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${badge ? "border-primary/20 bg-primary-soft text-primary" : "border-border/50 bg-secondary text-muted-foreground"}`}
            >
              <Trophy className="h-7 w-7" />
            </span>
            <p className="mt-3 font-display text-lg font-semibold">Selo ETEC Conhecedor</p>
            <p className="text-sm text-muted-foreground">
              {badge
                ? "Conquistado!"
                : `Faltam ${total - done.length} lugares · ${xp} XP até agora`}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3">
            <Link
              to="/creditos"
              className="tap flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-4 shadow-sm"
            >
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">Quem fez</span>
            </Link>
            <button
              type="button"
              onClick={() => setWelcome(true)}
              className="tap flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-4 text-left shadow-sm"
            >
              <Compass className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold">Rever apresentação</span>
            </button>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            {places.length} lugares reais · feito por alunos da ETEC Parque Belém
          </p>
        </>
      )}
    </AppShell>
  );
}
