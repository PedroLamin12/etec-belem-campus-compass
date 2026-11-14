import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { missions, placeById } from "@/data/school";
import { resetProgress, useProgress } from "@/data/progress";

export const Route = createFileRoute("/missoes")({
  head: () => ({
    meta: [
      { title: "Missões de Calouro — Tour ETEC Belém" },
      { name: "description", content: "Modo Explorador: cumpra missões pela escola e ganhe o selo Calouro ETEC Conhecedor." },
      { property: "og:title", content: "Missões de Calouro · ETEC Parque Belém" },
      { property: "og:description", content: "Explore a escola, ganhe XP e conquiste seu selo." },
    ],
  }),
  component: Missoes,
});

function Missoes() {
  const { visited, done, xp, total, badge } = useProgress();
  const pct = Math.round((done.length / total) * 100);
  return (
    <AppShell>
      <PageHeader title="Modo Explorador" subtitle="Vá até cada lugar e faça check-in na ficha do ambiente." />
      <div className="mx-5 rounded-3xl bg-[image:var(--gradient-badge)] p-5 text-primary-foreground">
        <div className="flex items-center gap-4">
          <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-brand-yellow text-4xl ${badge ? "bg-brand-yellow" : "bg-primary-foreground/15 grayscale"}`}>🎓</div>
          <div>
            <p className="text-xs font-semibold uppercase opacity-80">{badge ? "Selo conquistado!" : "Selo bloqueado"}</p>
            <p className="font-display text-xl font-extrabold leading-tight">Calouro ETEC Conhecedor</p>
            <p className="text-sm opacity-90">{xp} XP · {done.length}/{total} missões</p>
          </div>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-primary-foreground/20"><div className="h-full rounded-full bg-brand-yellow transition-all" style={{ width: `${pct}%` }} /></div>
      </div>
      <ul className="space-y-3 px-5 pt-5">
        {missions.map((m) => {
          const ok = visited.includes(m.place);
          const p = placeById(m.place)!;
          return (
            <li key={m.id}>
              <Link to="/ambientes/$id" params={{ id: p.id }} className={`flex items-center gap-3 rounded-2xl border p-3 ${ok ? "bg-primary/10 border-primary/40" : "bg-card"}`}>
                <img src={p.photo} alt="" className={`h-14 w-14 rounded-xl object-cover ${ok ? "" : "opacity-60"}`} />
                <div className="flex-1">
                  <p className="font-bold">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.goal}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${ok ? "bg-primary text-primary-foreground" : "bg-brand-yellow text-foreground"}`}>{ok ? "✓" : `+${m.xp}`}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {done.length > 0 && <button onClick={resetProgress} className="mx-auto mt-6 block text-xs text-muted-foreground underline">Reiniciar progresso</button>}
    </AppShell>
  );
}
