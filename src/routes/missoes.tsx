import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { missions, placeById } from "@/data/school";
import { resetProgress, useProgress } from "@/data/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Compass, Check, ArrowUpRight, LockKeyhole, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/missoes")({
  head: () => ({
    meta: [
      { title: "Missões de Calouro — Tour ETEC Belém" },
      { name: "description", content: "Modo Explorador: cumpra missões pela escola e ganhe o selo Calouro ETEC Conhecedor." },
      { property: "og:title", content: "Missões de Calouro · ETEC Parque Belém" },
      { property: "og:description", content: "Explore a escola, ganhe XP e conquiste seu selo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Missoes,
});

function Missoes() {
  const { visited, done, xp, total, badge } = useProgress();
  const pct = Math.round((done.length / total) * 100);
  return (
    <AppShell>
      <PageHeader title="Sua jornada, seu campus" subtitle="Missões de calouro · Modo Explorador" />
      <div className="grid gap-8 px-5 md:grid-cols-[320px_1fr] md:px-8">
      <section className="border-y border-brand-yellow/30 py-6">
        <div className="flex items-center gap-4">
          <div className={`explorer-shield flex h-24 w-20 shrink-0 items-center justify-center ${badge ? "bg-brand-yellow text-brand-yellow-foreground" : "bg-secondary text-brand-yellow"}`}><Trophy className="h-10 w-10" /></div>
          <div>
            <p className="mb-1 flex items-center gap-1 text-[10px] font-extrabold uppercase text-brand-yellow">{badge ? <Check className="h-3 w-3" /> : <LockKeyhole className="h-3 w-3" />}{badge ? "Selo conquistado!" : "Selo bloqueado"}</p>
            <p className="font-display text-2xl font-extrabold leading-tight">Calouro ETEC Conhecedor</p>
          </div>
        </div>
        <div className="mt-6 flex items-end justify-between"><p className="font-display text-5xl font-bold">{xp}<span className="ml-1 text-xl text-brand-yellow">XP</span></p><p className="text-xs text-muted-foreground">{done.length}/{total} missões · {pct}%</p></div>
        <progress aria-label="Progresso das missões" value={done.length} max={total} className="mt-4 h-2 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-brand-yellow" />
        {done.length > 0 && <Button variant="ghost" onClick={resetProgress} className="mt-4 h-8 px-0 text-xs text-muted-foreground"><RotateCcw />Reiniciar progresso</Button>}
      </section>
      <ul className="grid gap-3 lg:grid-cols-2">
        {missions.map((m, i) => {
          const ok = visited.includes(m.place);
          const p = placeById(m.place);
          if (!p) return null;
          return (
            <li key={m.id} className="feed-item">
              <Link to="/ambientes/$id" params={{ id: p.id }} className={`block h-full overflow-hidden rounded-lg border ${ok ? "border-success/40 bg-success/5" : "bg-card"}`}>
                <div className="relative"><img src={p.photo} alt={p.photoCaption ?? p.name} className="aspect-[16/7] w-full object-cover" /><span className="absolute left-3 top-3 bg-image-scrim/90 px-2 py-1 text-[10px] font-bold text-on-image">MISSÃO {String(i + 1).padStart(2, "0")}</span><span className={`absolute right-3 top-3 flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-extrabold ${ok ? "bg-success text-brand-yellow-foreground" : "bg-brand-yellow text-brand-yellow-foreground"}`}>{ok ? <><Check className="h-3 w-3" />CONCLUÍDA</> : `+${m.xp} XP`}</span></div>
                <div className="p-4"><p className="font-display text-2xl font-bold">{m.title}</p><p className="mt-1 min-h-8 text-xs leading-relaxed text-muted-foreground">{m.goal}</p><span className={`mt-4 flex items-center justify-between text-xs font-bold ${ok ? "text-success" : "text-primary"}`}><span className="flex items-center gap-1.5">{ok ? <Check className="h-3.5 w-3.5" /> : <Compass className="h-3.5 w-3.5" />}{ok ? "Lugar descoberto" : "Explorar ambiente"}</span><ArrowUpRight className="h-4 w-4" /></span></div>
              </Link>
            </li>
          );
        })}
      </ul>
      </div>
    </AppShell>
  );
}
