import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Compass, Search, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { discoveryDestination, findCampusPlaces } from "@/data/exploration";
import { nodeLocation, type Place } from "@/data/school";
import { useProgress } from "@/data/progress";

export function CampusGuide() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [surprise, setSurprise] = useState<Place>();
  const { visited } = useProgress();
  const results = findCampusPlaces(query);
  return (
    <>
      <button
        type="button"
        aria-label="Abrir guia rápido"
        title="Guia rápido"
        onClick={() => setOpen(true)}
        className="ui-control flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        <Compass className="h-5 w-5" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onClick={(e) => {
            if (e.target instanceof Element && e.target.closest("a")) setOpen(false);
          }}
          className="max-h-[88dvh] w-[calc(100%-24px)] max-w-md gap-4 overflow-y-auto rounded-2xl border border-border/50 bg-card p-5 shadow-sm"
        >
          <div className="flex items-start gap-3 pr-6">
            <Compass className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <DialogTitle className="font-display text-lg">Guia rápido</DialogTitle>
              <DialogDescription className="mt-1 text-sm text-muted-foreground">
                Pesquise ambientes e encontre informações de acesso no campus.
              </DialogDescription>
            </div>
          </div>
          <label className="flex h-12 items-center gap-2 rounded-2xl border border-border/50 bg-background px-3 focus-within:border-primary">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              aria-label="Buscar ambientes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Matrícula, lanche, informática…"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
            />
          </label>
          {query.trim() ? (
            <ul aria-live="polite" className="space-y-2">
              {results.length ? (
                results.slice(0, 5).map((place) => (
                  <li key={place.id}>
                    <Link
                      to="/rota"
                      search={{ de: "portaria", para: place.id }}
                      className="tap flex items-center justify-between gap-2 rounded-2xl border border-border/50 bg-card px-4 py-3"
                    >
                      <span>
                        <span className="block text-sm font-semibold">{place.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {nodeLocation(place.node)}
                        </span>
                      </span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </li>
                ))
              ) : (
                <li className="py-2 text-sm text-muted-foreground">
                  Não encontrei. Tente “secretaria”, “lanche” ou “laboratório”.
                </li>
              )}
            </ul>
          ) : (
            <div className="grid gap-2">
              <Button asChild size="lg">
                <Link to="/rota" search={{ de: "portaria", para: "secretaria" }}>
                  Quero fazer matrícula
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/rota" search={{ de: "portaria", para: "convivencia" }}>
                  Ver área de convivência
                </Link>
              </Button>
              <Button variant="ghost" onClick={() => setSurprise(discoveryDestination(visited))}>
                <Shuffle />
                Sugerir ambiente
              </Button>
              {surprise && (
                <Link
                  to="/ambientes/$id"
                  params={{ id: surprise.id }}
                  className="tap flex items-center justify-between rounded-2xl border border-border/50 bg-secondary px-4 py-3"
                >
                  <span className="text-sm font-semibold">{surprise.name}</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
