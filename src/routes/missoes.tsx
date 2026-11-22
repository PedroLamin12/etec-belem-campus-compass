import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Belinho } from "@/components/Titia";
import { missions, placeById } from "@/data/school";
import { resetProgress, useProgress } from "@/data/progress";
import { nextCampusMission } from "@/data/exploration";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, RotateCcw, Trophy, Zap } from "lucide-react";

export const Route = createFileRoute("/missoes")({
  head: () => ({
    meta: [
      { title: "Conquistas — Tour ETEC Belém" },
      { name: "description", content: "Faça check-in nos 15 lugares da ETEC Parque Belém, ganhe XP e conquiste o selo Calouro ETEC Conhecedor." },
      { property: "og:title", content: "Conquistas · Tour ETEC Belém" },
      { property: "og:description", content: "Explore a escola, ganhe XP e conquiste seu selo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Missoes,
});

const levelName = (n: number) => (n >= 15 ? "Conhecedor" : n >= 10 ? "Explorador" : n >= 4 ? "Calouro" : "Visitante");

function Missoes() {
  const { visited, done, xp, total, badge } = useProgress();
  const [resetOpen, setResetOpen] = useState(false);
  const next = nextCampusMission(visited);
  return (
    <AppShell>
      <PageHeader title="Conquistas" />
      <section className="surface flex items-center gap-4 p-4">
        <Belinho mood={badge ? "cheer" : "happy"} bubble className="h-24 w-24 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-muted-foreground">Seu nível</p>
          <p className="font-display text-2xl font-semibold">{levelName(done.length)}</p>
          <div className="mt-2 flex items-center gap-3 text-sm font-extrabold"><span className="flex items-center gap-1"><Zap className="h-4 w-4 fill-brand-yellow text-brand-yellow-shade" />{xp} XP</span><span className="text-muted-foreground">{done.length}/{total} lugares</span></div>
        </div>
      </section>
      <div className="progress-track mt-4"><div className="progress-fill" style={{ width: `${(done.length / total) * 100}%` }} /></div>

      <h2 className="mb-3 mt-8 font-display text-lg font-semibold">Carimbos</h2>
      <ul className="grid grid-cols-5 gap-2.5 sm:gap-4">
        {missions.map((m, i) => { const ok = visited.includes(m.place); return <li key={m.id}><Link to="/ambientes/$id" params={{ id: m.place }} aria-label={`${m.title}${ok ? ", concluída" : ""}`} className={`stamp ${ok ? "is-complete" : ""}`}>{ok ? <Check className="h-5 w-5" strokeWidth={3} /> : <span className="text-sm font-extrabold">{i + 1}</span>}</Link></li>; })}
      </ul>
      <div className="mt-6 flex items-center gap-3 rounded-2xl border-2 p-4"><Trophy className={`h-8 w-8 shrink-0 ${badge ? "text-brand-yellow-shade" : "text-muted-foreground"}`} /><div><p className="text-sm font-extrabold">Selo Calouro ETEC Conhecedor</p><p className="text-xs text-muted-foreground">{badge ? "Conquistado!" : "Faça check-in em todos os lugares."}</p></div></div>

      <h2 className="mb-3 mt-8 font-display text-lg font-semibold">Missões</h2>
      <ul className="stagger grid grid-cols-1 gap-2 md:grid-cols-2">
        {missions.map((m) => { const ok = visited.includes(m.place); const p = placeById(m.place); if (!p) return null; return (
          <li key={m.id} className="min-w-0"><Link to="/ambientes/$id" params={{ id: p.id }} className="tap flex items-center gap-3 rounded-2xl border-2 bg-card p-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${ok ? "bg-success text-success-foreground" : "bg-secondary text-muted-foreground"}`}>{ok ? <Check className="h-5 w-5" strokeWidth={3} /> : <Zap className="h-4 w-4" />}</span>
            <span className="min-w-0 flex-1"><span className="block truncate text-sm font-extrabold">{m.title}</span><span className="block truncate text-xs text-muted-foreground">{m.goal}</span></span>
            <span className="shrink-0 text-xs font-extrabold text-brand-yellow-shade">+{m.xp}</span>
          </Link></li>); })}
      </ul>
      {next && <Button asChild size="lg" className="mt-6 w-full"><Link to="/ambientes/$id" params={{ id: next.place }}>Continuar a trilha</Link></Button>}
      {done.length > 0 && <Button variant="ghost" onClick={() => setResetOpen(true)} className="mt-3 w-full text-muted-foreground"><RotateCcw />Recomeçar do zero</Button>}
      <Dialog open={resetOpen} onOpenChange={setResetOpen}><DialogContent className="w-[calc(100%-24px)] max-w-sm rounded-3xl border-2"><DialogTitle className="font-display text-xl">Recomeçar do zero?</DialogTitle><DialogDescription>Seus check-ins e XP serão apagados deste aparelho.</DialogDescription><Button variant="destructive" onClick={() => { resetProgress(); setResetOpen(false); }}>Apagar progresso</Button><Button variant="outline" onClick={() => setResetOpen(false)}>Cancelar</Button></DialogContent></Dialog>
    </AppShell>
  );
}
