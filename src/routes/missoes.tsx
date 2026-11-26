import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { missions, placeById } from "@/data/school";
import { resetProgress, useProgress } from "@/data/progress";
import { nextCampusMission } from "@/data/exploration";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, Compass, RotateCcw, Trophy } from "lucide-react";

export const Route = createFileRoute("/missoes")({
  head: () => ({
    meta: [
      { title: "Passaporte — Tour ETEC Belém" },
      {
        name: "description",
        content:
          "Registre sua visita aos 15 ambientes da ETEC Parque Belém e acompanhe seu progresso de exploração.",
      },
      { property: "og:title", content: "Passaporte do Campus · Tour ETEC Belém" },
      {
        property: "og:description",
        content: "Registre sua visita aos ambientes da ETEC Parque Belém.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Missoes,
});

function Missoes() {
  const { visited, done, total, badge } = useProgress();
  const [resetOpen, setResetOpen] = useState(false);
  const next = nextCampusMission(visited);
  return (
    <AppShell>
      <PageHeader
        title="Passaporte do Campus"
        subtitle="Registre sua presença nos 15 ambientes reais da escola."
      />
      <section className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
            <Compass className="h-7 w-7" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="eyebrow text-muted-foreground">Registro de visita</p>
            <p className="mt-1 font-display text-2xl font-semibold">
              {done.length} de {total}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">ambientes registrados</p>
          </div>
        </div>
      </section>

      <h2 className="mb-3 mt-8 font-display text-lg font-semibold">Passaporte</h2>
      <ul className="grid grid-cols-5 gap-2.5 sm:gap-4">
        {missions.map((m, i) => {
          const ok = visited.includes(m.place);
          return (
            <li key={m.id}>
              <Link
                to="/ambientes/$id"
                params={{ id: m.place }}
                aria-label={`${m.title}${ok ? ", concluída" : ""}`}
                className={`stamp ${ok ? "is-complete" : ""}`}
              >
                {ok ? (
                  <Check className="h-5 w-5" strokeWidth={3} />
                ) : (
                  <span className="text-sm font-semibold">{i + 1}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
        <Trophy
          className={`h-8 w-8 shrink-0 ${badge ? "text-primary" : "text-muted-foreground"}`}
        />
        <div>
          <p className="text-sm font-semibold">Conhecimento integral do campus</p>
          <p className="text-xs text-muted-foreground">
            {badge ? "Conquistado" : "Faça check-in em todos os lugares."}
          </p>
        </div>
      </div>

      <h2 className="mb-3 mt-8 font-display text-lg font-semibold">Exploração</h2>
      <ul className="stagger grid grid-cols-1 gap-2 md:grid-cols-2">
        {missions.map((m) => {
          const ok = visited.includes(m.place);
          const p = placeById(m.place);
          if (!p) return null;
          return (
            <li key={m.id} className="min-w-0">
              <Link
                to="/ambientes/$id"
                params={{ id: p.id }}
                className="tap flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-3 shadow-sm"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ok ? "bg-success-soft text-success-shade" : "bg-secondary text-muted-foreground"}`}
                >
                  {ok ? (
                    <Check className="h-5 w-5" strokeWidth={3} />
                  ) : (
                    <Compass className="h-4 w-4" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{m.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {ok ? "Registrado no passaporte" : m.goal}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {next && (
        <Button asChild size="lg" className="mt-6 w-full">
          <Link to="/ambientes/$id" params={{ id: next.place }}>
            Continuar tour
          </Link>
        </Button>
      )}
      {done.length > 0 && (
        <Button
          variant="ghost"
          onClick={() => setResetOpen(true)}
          className="mt-3 w-full text-muted-foreground"
        >
          <RotateCcw />
          Recomeçar do zero
        </Button>
      )}
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="w-[calc(100%-24px)] max-w-sm rounded-2xl border border-border/50">
          <DialogTitle className="font-display text-xl">Recomeçar do zero?</DialogTitle>
          <DialogDescription>
            Seus registros de visita serão apagados deste aparelho.
          </DialogDescription>
          <Button
            variant="destructive"
            onClick={() => {
              resetProgress();
              setResetOpen(false);
            }}
          >
            Apagar progresso
          </Button>
          <Button variant="outline" onClick={() => setResetOpen(false)}>
            Cancelar
          </Button>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
