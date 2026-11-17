import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Compass, Search, Shuffle, Navigation, BookOpen } from "lucide-react";
import { CampusMascot } from "@/components/CampusMascot";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { discoveryDestination, findCampusPlaces, nextCampusMission } from "@/data/exploration";
import { nodeLocation, placeById, type Place } from "@/data/school";
import { useProgress } from "@/data/progress";

export function CampusGuide() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [surprise, setSurprise] = useState<Place>();
  const { visited } = useProgress();
  const next = nextCampusMission(visited);
  const results = findCampusPlaces(query);
  const recommended = surprise ?? placeById(next?.place ?? "lab1");
  return <>
    <Button variant="ghost" className="guide-launcher" aria-label="Conversar com Bê, guia do campus" onClick={() => setOpen(true)}><CampusMascot mood="peek" /><span>Ei, bora?</span></Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onClick={(e) => { if (e.target instanceof Element && e.target.closest("a")) setOpen(false); }} className="guide-dialog max-h-[85dvh] w-[calc(100%-32px)] max-w-md overflow-y-auto rounded-lg border-border bg-card p-6">
        <div className="guide-greeting"><CampusMascot className="h-36 w-32" /><div><p className="eyebrow text-primary">SEU PARCEIRO DE CAMPUS</p><DialogTitle className="mt-2 font-display text-3xl">Opa, eu sou o Bê.</DialogTitle><DialogDescription className="mt-3 text-sm leading-relaxed">Matrícula, lanche ou próxima missão?<br />Vamos encontrar seu caminho.</DialogDescription></div></div>
        <label className="flex h-12 items-center gap-3 rounded-lg border bg-background px-3"><Search className="h-4 w-4 text-primary" /><input aria-label="Perguntar ao Bê" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Busque matrícula, comida, informática..." className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
        {query.trim() ? <div aria-live="polite" className="space-y-2">{results.length ? results.slice(0, 5).map((place) => <Button asChild variant="secondary" key={place.id} className="h-auto w-full justify-between whitespace-normal py-3 text-left"><Link to="/rota" search={{ de: "portaria", para: place.id }}><span><span className="block">{place.name}</span><span className="mt-1 block text-[11px] font-normal text-muted-foreground">{nodeLocation(place.node)}</span></span><Navigation /></Link></Button>) : <p className="py-3 text-sm text-muted-foreground">Não achei esse lugar. Tente “secretaria”, “lanche” ou “laboratório”.</p>}</div> : <>
          <div className="grid grid-cols-2 gap-2"><Button asChild variant="secondary" className="h-12 whitespace-normal px-2 text-xs"><Link to="/rota" search={{ de: "portaria", para: "secretaria" }}><Navigation />Fazer matrícula</Link></Button><Button asChild variant="secondary" className="h-12 whitespace-normal px-2 text-xs"><Link to="/rota" search={{ de: "portaria", para: "convivencia" }}><BookOpen />Hora do lanche</Link></Button></div>
          <div className="border-t pt-4"><div className="flex items-center justify-between"><p className="eyebrow text-muted-foreground">{surprise ? "DESTINO SURPRESA" : "SUA PRÓXIMA DESCOBERTA"}</p><Button variant="ghost" size="icon" title="Sortear um lugar novo" aria-label="Sortear um lugar novo" onClick={() => setSurprise(discoveryDestination(visited))}><Shuffle /></Button></div>{recommended && <div className="mt-2"><p className="font-display text-xl font-semibold">{recommended.name}</p><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{nodeLocation(recommended.node)}</p><Button asChild className="mt-4 w-full"><Link to="/ambientes/$id" params={{ id: recommended.id }}><Compass />Bora conhecer<ArrowUpRight /></Link></Button></div>}</div>
        </>}
      </DialogContent>
    </Dialog>
  </>;
}