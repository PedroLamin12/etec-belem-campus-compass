import { PlacePhoto } from "@/components/PlacePhoto";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { missions, placeById } from "@/data/school";
import { resetProgress, useProgress } from "@/data/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Compass, Check, ArrowUpRight, RotateCcw, Flag, Navigation, Utensils, GraduationCap, Monitor, ChefHat, Mic, Dribbble, BookOpen, Zap } from "lucide-react";
import { CampusMascot } from "@/components/CampusMascot";
import { nextCampusMission } from "@/data/exploration";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

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
  const [resetOpen, setResetOpen] = useState(false);
  const pct = Math.round((done.length / total) * 100);
  const icons = [Flag, Navigation, Utensils, GraduationCap, Monitor, ChefHat, Mic, Dribbble, BookOpen];
  const next = nextCampusMission(visited);
  return (
    <AppShell>
      <PageHeader title="Seu passaporte." subtitle="A escola é maior do que a sua sala. Bora descobrir?" />
      <div className="grid gap-8 px-5 md:grid-cols-[320px_1fr] md:px-8">
      <section className="self-start border-y py-5 md:sticky md:top-28">
        <div className="flex items-center gap-4"><CampusMascot mood={badge ? "celebrate" : "wave"} className="h-36 w-32 shrink-0" /><div><p className="eyebrow text-primary">{badge ? "VOCÊ CHEGOU LÁ" : "O COMEÇO DE UMA HISTÓRIA"}</p><p className="mt-3 font-display text-2xl font-medium leading-tight">{badge ? "Campus conquistado." : "De calouro a conhecedor."}</p></div></div>
        <div className="flex items-end justify-between"><p className="font-display text-4xl font-medium">{xp}<span className="ml-2 text-xs text-muted-foreground">XP</span></p><p className="text-xs text-muted-foreground">{done.length}/{total} carimbos · {pct}%</p></div>
        <progress aria-label="Progresso das missões" value={done.length} max={total} className="mt-4 h-1.5 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-primary" />
        <div className="mt-6 grid grid-cols-3 justify-items-center gap-y-4" aria-label="Carimbos do passaporte">{missions.map((mission, i) => { const Icon = icons[i] ?? Compass; const complete = visited.includes(mission.place); return <Link key={mission.id} to="/ambientes/$id" params={{ id: mission.place }} aria-label={`${mission.title}${complete ? ", concluída" : ", a descobrir"}`} className={`passport-stamp ${complete ? "is-complete" : ""}`}><Icon /><span>{String(i + 1).padStart(2, "0")}{complete ? " · OK" : " · ETEC"}</span></Link>; })}</div>
        <div className="mt-6 flex items-center gap-3 border-t pt-4"><Trophy className={`h-6 w-6 shrink-0 ${badge ? "text-primary" : "text-muted-foreground"}`} /><div><p className="eyebrow text-muted-foreground">{badge ? "SELO CONQUISTADO" : "SEU PRÓXIMO SELO"}</p><p className="mt-1 text-xs font-medium">Calouro ETEC Conhecedor</p></div></div>
        {next && <Button asChild className="mt-5 h-11 w-full"><Link to="/ambientes/$id" params={{ id: next.place }}>Continuar aventura<ArrowUpRight /></Link></Button>}
        {done.length > 0 && <Button variant="ghost" onClick={() => setResetOpen(true)} className="mt-3 h-8 px-0 text-xs text-muted-foreground"><RotateCcw />Reiniciar progresso</Button>}
      </section>
      <ul className="grid gap-3 lg:grid-cols-2">
        {missions.map((m, i) => {
          const ok = visited.includes(m.place);
          const p = placeById(m.place);
          if (!p) return null;
          return (
            <li key={m.id} className="feed-item">
              <Link to="/ambientes/$id" params={{ id: p.id }} className={`block h-full overflow-hidden rounded-lg border ${ok ? "border-success/40 bg-success/5" : "bg-card"}`}>
                <div className="relative"><PlacePhoto place={p} loading="lazy" className="feed-photo aspect-[16/8] w-full" /><span className="absolute left-3 top-3 rounded-md bg-background/95 px-2 py-1.5 text-[10px] font-medium text-foreground">Missão {String(i + 1).padStart(2, "0")}</span><span className={`absolute right-3 top-3 flex items-center gap-1 rounded-md px-2 py-1.5 text-[10px] font-medium ${ok ? "bg-primary text-primary-foreground" : "bg-background/95 text-primary"}`}>{ok ? <><Check className="h-3 w-3" />Concluída</> : <><Zap className="h-3 w-3" />+{m.xp} XP</>}</span></div>
                <div className="p-5"><p className="font-display text-base font-semibold">{m.title}</p><p className="mt-2 min-h-9 text-xs leading-relaxed text-muted-foreground">{m.goal}</p><span className={`mt-5 flex items-center justify-between text-xs font-medium ${ok ? "text-success" : "text-primary"}`}><span className="flex items-center gap-1.5">{ok ? <Check className="h-3.5 w-3.5" /> : <Compass className="h-3.5 w-3.5" />}{ok ? "Lugar descoberto" : "Explorar ambiente"}</span><ArrowUpRight className="h-4 w-4" /></span></div>
              </Link>
            </li>
          );
        })}
      </ul>
      </div>
      <Dialog open={resetOpen} onOpenChange={setResetOpen}><DialogContent className="w-[calc(100%-32px)] rounded-lg"><DialogTitle>Começar uma nova aventura?</DialogTitle><DialogDescription>Seus check-ins, carimbos e XP serão apagados deste dispositivo.</DialogDescription><Button variant="destructive" onClick={() => { resetProgress(); setResetOpen(false); }}><RotateCcw />Reiniciar progresso</Button><Button variant="outline" onClick={() => setResetOpen(false)}>Manter meu passaporte</Button></DialogContent></Dialog>
    </AppShell>
  );
}
