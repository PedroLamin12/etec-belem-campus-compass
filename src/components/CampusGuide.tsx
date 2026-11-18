import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Search, Shuffle } from "lucide-react";
import { Titia, GUIDE_NAME } from "@/components/Titia";
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
  return <>
    <button type="button" aria-label={`Falar com a ${GUIDE_NAME}, sua guia`} onClick={() => setOpen(true)} className="ui-control relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary bg-guide-halo">
      <Titia mood="happy" className="absolute -bottom-1 left-1/2 h-12 w-12 -translate-x-1/2" />
    </button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onClick={(e) => { if (e.target instanceof Element && e.target.closest("a")) setOpen(false); }} className="max-h-[88dvh] w-[calc(100%-24px)] max-w-md gap-4 overflow-y-auto rounded-3xl border-2 bg-card p-5">
        <div className="flex items-end gap-3 pr-6">
          <Titia mood="talk" className="h-24 w-20 shrink-0" />
          <div className="speech mb-2 flex-1"><DialogTitle className="font-display text-lg">Oi, eu sou a {GUIDE_NAME}!</DialogTitle><DialogDescription className="mt-1 text-sm text-muted-foreground">Me diga o que você procura.</DialogDescription></div>
        </div>
        <label className="flex h-12 items-center gap-2 rounded-2xl border-2 bg-background px-3 focus-within:border-brand-sky"><Search className="h-5 w-5 text-muted-foreground" /><input aria-label={`Perguntar à ${GUIDE_NAME}`} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="matrícula, lanche, informática…" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-muted-foreground" /></label>
        {query.trim() ? (
          <ul aria-live="polite" className="space-y-2">
            {results.length ? results.slice(0, 5).map((place) => <li key={place.id}><Link to="/rota" search={{ de: "portaria", para: place.id }} className="tap flex items-center justify-between gap-2 rounded-2xl border-2 bg-card px-4 py-3"><span><span className="block text-sm font-extrabold">{place.name}</span><span className="block text-xs text-muted-foreground">{nodeLocation(place.node)}</span></span><ChevronRight className="h-5 w-5 text-muted-foreground" /></Link></li>)
              : <li className="py-2 text-sm text-muted-foreground">Não encontrei. Tente “secretaria”, “lanche” ou “laboratório”.</li>}
          </ul>
        ) : (
          <div className="grid gap-2">
            <Button asChild size="lg"><Link to="/rota" search={{ de: "portaria", para: "secretaria" }}>Quero fazer matrícula</Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/rota" search={{ de: "portaria", para: "convivencia" }}>Onde eu como?</Link></Button>
            <Button variant="ghost" onClick={() => setSurprise(discoveryDestination(visited))}><Shuffle />Me surpreenda</Button>
            {surprise && <Link to="/ambientes/$id" params={{ id: surprise.id }} className="tap flex items-center justify-between rounded-2xl border-2 bg-brand-sky-soft px-4 py-3"><span className="text-sm font-extrabold">{surprise.name}</span><ChevronRight className="h-5 w-5" /></Link>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  </>;
}
