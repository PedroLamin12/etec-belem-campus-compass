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
      <PageHeader title="Sua jornada" subtitle="Cada novo lugar, uma descoberta." />
      <div className="grid gap-8 px-5 md:grid-cols-[320px_1fr] md:px-8">
      <section className="self-start border-y py-6">
        <div className="flex items-center gap-4">
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${badge ? "bg-primary text-primary-foreground" : "bg-accent text-primary"}`}><Trophy className="h-7 w-7" /></div>
          <div>
            <p className="mb-2 flex items-center gap-1 text-[11px] font-medium text-muted-foreground">{badge ? <Check className="h-3 w-3" /> : <LockKeyhole className="h-3 w-3" />}{badge ? "Selo conquistado" : "Seu próximo selo"}</p>
            <p className="font-display text-base font-semibold leading-relaxed">Calouro ETEC Conhecedor</p>
          </div>
        </div>
        <div className="mt-7 flex items-end justify-between"><p className="font-display text-3xl font-semibold">{xp}<span className="ml-2 text-xs text-muted-foreground">XP</span></p><p className="text-xs text-muted-foreground">{done.length}/{total} missões · {pct}%</p></div>
        <progress aria-label="Progresso das missões" value={done.length} max={total} className="mt-4 h-1.5 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-primary" />
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
                <div className="relative"><img src={p.photo} alt={p.photoCaption ?? p.name} loading="lazy" className="feed-photo aspect-[16/8] w-full object-cover" /><span className="absolute left-3 top-3 rounded-md bg-card/95 px-2 py-1.5 text-[10px] font-medium text-foreground">Missão {String(i + 1).padStart(2, "0")}</span><span className={`absolute right-3 top-3 flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-medium ${ok ? "bg-success text-primary-foreground" : "bg-card/95 text-primary"}`}>{ok ? <><Check className="h-3 w-3" />Concluída</> : `+${m.xp} XP`}</span></div>
                <div className="p-5"><p className="font-display text-base font-semibold">{m.title}</p><p className="mt-2 min-h-9 text-xs leading-relaxed text-muted-foreground">{m.goal}</p><span className={`mt-5 flex items-center justify-between text-xs font-medium ${ok ? "text-success" : "text-primary"}`}><span className="flex items-center gap-1.5">{ok ? <Check className="h-3.5 w-3.5" /> : <Compass className="h-3.5 w-3.5" />}{ok ? "Lugar descoberto" : "Explorar ambiente"}</span><ArrowUpRight className="h-4 w-4" /></span></div>
              </Link>
            </li>
          );
        })}
      </ul>
      </div>
    </AppShell>
  );
}
