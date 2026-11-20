import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { Search, X, Check, Trophy, FileText, GraduationCap, Monitor, Utensils, Dribbble, Mic, ChevronRight, DoorOpen, Building2, Users, Car, Toilet, ChefHat, Coffee, Briefcase } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Titia, GUIDE_NAME } from "@/components/Titia";
import { Welcome, WELCOME_KEY } from "@/components/Welcome";
import { placeById, places, quickActions, units, nodeLocation } from "@/data/school";
import { useProgress } from "@/data/progress";
import { findCampusPlaces, nextCampusMission } from "@/data/exploration";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tour ETEC Belém — Conheça a escola passo a passo" },
      { name: "description", content: "Trilha, mapa e rotas passo a passo para conhecer a ETEC Parque Belém com a Lúcia. Descubra onde fica a Secretaria, os laboratórios e muito mais." },
      { property: "og:title", content: "Tour ETEC Belém" },
      { property: "og:description", content: "O jeito mais fácil de conhecer a ETEC Parque Belém." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const quickIcons = [FileText, GraduationCap, Monitor, Utensils, Dribbble, Mic];
const placeIcons: Record<string, typeof DoorOpen> = { portaria: DoorOpen, rampa: DoorOpen, estacionamento: Car, convivencia: Utensils, auditorio: Mic, banheiros: Toilet, secretaria: FileText, cantina: Coffee, nutricao: ChefHat, lab1: Monitor, lab2: Monitor, salas: GraduationCap, coordenacao: Briefcase, quadra1: Dribbble, quadra2: Dribbble };
const unitColors = [
  { "--node": "var(--primary)", "--node-shade": "var(--primary-shade)", "--node-fg": "var(--primary-foreground)" },
  { "--node": "var(--brand-sky)", "--node-shade": "var(--brand-sky-shade)", "--node-fg": "var(--primary-foreground)" },
  { "--node": "var(--success)", "--node-shade": "var(--success-shade)", "--node-fg": "var(--success-foreground)" },
];
const offsets = [0, 52, 72, 52, 0, -52, -72, -52];

function Index() {
  const [q, setQ] = useState("");
  const [welcome, setWelcome] = useState(false);
  const { done, total, xp, visited, badge } = useProgress();
  useEffect(() => { try { if (!localStorage.getItem(WELCOME_KEY)) setWelcome(true); } catch { /* storage unavailable */ } }, []);
  const results = findCampusPlaces(q);
  const next = nextCampusMission(visited);
  const nextPlace = next ? placeById(next.place) : undefined;
  let k = 0;
  return (
    <AppShell>
      {welcome && <Welcome onDone={() => setWelcome(false)} />}
      <section className="surface flex items-center gap-3 p-4">
        <Titia mood="wave" bubble className="h-24 w-24 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-primary">{GUIDE_NAME} diz</p>
          <h1 className="mt-1 font-display text-xl font-semibold leading-snug">{nextPlace ? <>Bora pra {nextPlace.name}?</> : "Você já conhece a ETEC inteira!"}</h1>
          <div className="mt-3 flex items-center gap-2"><div className="progress-track h-2.5 flex-1"><div className="progress-fill" style={{ width: `${(done.length / total) * 100}%` }} /></div><span className="text-xs font-extrabold text-muted-foreground">{done.length}/{total}</span></div>
        </div>
      </section>
      {nextPlace && <Button asChild size="lg" className="mt-3 w-full"><Link to="/ambientes/$id" params={{ id: nextPlace.id }}>Continuar a trilha</Link></Button>}

      <label className="mt-5 flex h-12 items-center gap-2 rounded-2xl border-2 bg-card px-4 focus-within:border-brand-sky">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input aria-label="Buscar lugar" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Procurar um lugar…" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-muted-foreground" />
        {q && <button type="button" aria-label="Limpar busca" onClick={() => setQ("")} className="text-muted-foreground"><X className="h-5 w-5" /></button>}
      </label>

      {q.trim() ? (
        <ul aria-live="polite" className="mt-3 space-y-2">
          {results.length ? results.map((p) => <li key={p.id}><Link to="/ambientes/$id" params={{ id: p.id }} className="tap flex items-center justify-between gap-3 rounded-2xl border-2 bg-card px-4 py-3"><span className="min-w-0"><span className="block truncate text-sm font-extrabold">{p.name}</span><span className="block truncate text-xs text-muted-foreground">{nodeLocation(p.node)}</span></span><ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" /></Link></li>)
            : <li className="p-3 text-sm text-muted-foreground">Nada encontrado para “{q}”.</li>}
        </ul>
      ) : <>
        <h2 className="mb-3 mt-7 font-display text-lg font-semibold">Preciso…</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {quickActions.map((a, i) => { const Icon = quickIcons[i] ?? FileText; return (
            <Link key={a.place} to="/rota" search={{ de: "portaria", para: a.place }} className="tap flex flex-col items-center gap-2 rounded-2xl border-2 bg-card px-1 py-3.5 text-center">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${i % 3 === 0 ? "bg-primary-soft text-primary" : i % 3 === 1 ? "bg-brand-sky-soft text-brand-sky-shade" : "bg-success-soft text-success-shade"}`}><Icon className="h-5 w-5" /></span>
              <span className="text-[11px] font-extrabold leading-tight">{a.label}</span>
            </Link>); })}
        </div>

        <h2 className="mb-1 mt-9 font-display text-lg font-semibold">Sua trilha pela escola</h2>
        <p className="text-sm text-muted-foreground">Na ordem do caminho real, a partir da Portaria.</p>
        {units.map((u, ui) => {
          const color = unitColors[ui % unitColors.length] as CSSProperties;
          return (
            <section key={u.id} className="mt-6">
              <div className="rounded-2xl px-5 py-4 text-primary-foreground shadow-[0_4px_0_var(--node-shade)]" style={{ ...color, background: "var(--node)" }}>
                <p className="eyebrow opacity-80">Etapa {ui + 1}</p>
                <h3 className="font-display text-xl font-semibold">{u.title}</h3>
                <p className="text-xs opacity-90">{u.subtitle}</p>
              </div>
              <ol className="flex flex-col items-center gap-7 pb-2 pt-9">
                {u.places.map((id) => {
                  const p = placeById(id); if (!p) return null;
                  const isDone = visited.includes(id); const isNext = next?.place === id;
                  const Icon = isDone ? Check : placeIcons[id] ?? Building2;
                  const style = (isDone ? { "--node": "var(--brand-yellow)", "--node-shade": "var(--brand-yellow-shade)", "--node-fg": "var(--brand-yellow-foreground)" } : isNext ? color : {}) as CSSProperties;
                  const x = offsets[k++ % offsets.length] ?? 0;
                  return (
                    <li key={id} className="flex flex-col items-center" style={{ transform: `translateX(${x}px)` }}>
                      <Link to="/ambientes/$id" params={{ id }} aria-label={`${p.name}${isDone ? ", descoberto" : ""}`} className={`trail-node ${isNext ? "is-next" : ""}`} style={style}>
                        {isNext && <span className="start-bubble">COMEÇAR</span>}
                        <Icon className="h-7 w-7" strokeWidth={2.4} />
                      </Link>
                      <span className="mt-3 max-w-28 text-center text-xs font-extrabold leading-tight">{p.name}</span>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
        <div className="mt-8 flex flex-col items-center text-center">
          <span className={`flex h-20 w-20 items-center justify-center rounded-3xl ${badge ? "bg-brand-yellow text-brand-yellow-foreground shadow-[0_5px_0_var(--brand-yellow-shade)]" : "bg-secondary text-muted-foreground shadow-[0_5px_0_var(--border)]"}`}><Trophy className="h-9 w-9" /></span>
          <p className="mt-3 font-display text-lg font-semibold">Selo Calouro ETEC Conhecedor</p>
          <p className="text-sm text-muted-foreground">{badge ? "Conquistado!" : `Faltam ${total - done.length} lugares · ${xp} XP até agora`}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3">
          <Link to="/creditos" className="tap flex items-center gap-3 rounded-2xl border-2 bg-card p-4"><Users className="h-5 w-5 text-primary" /><span className="text-sm font-extrabold">Quem fez</span></Link>
          <button type="button" onClick={() => setWelcome(true)} className="tap flex items-center gap-3 rounded-2xl border-2 bg-card p-4 text-left"><Titia className="h-8 w-8" /><span className="text-sm font-extrabold">Rever a apresentação</span></button>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">{places.length} lugares reais · feito por alunos da ETEC Parque Belém</p>
      </>}
    </AppShell>
  );
}
