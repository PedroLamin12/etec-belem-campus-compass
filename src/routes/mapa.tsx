import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { SchoolMap } from "@/components/SchoolMap";
import { PlacePhoto } from "@/components/PlacePhoto";
import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";
import { levelLabel, nodeLocation, nodes, placeByNode, type Level, type NodeId } from "@/data/school";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa — Tour ETEC Belém" },
      { name: "description", content: "Mapa da ETEC Parque Belém por andar, com vista esquemática e de satélite do Prédio Principal e do Bloco Anexo." },
      { property: "og:title", content: "Mapa interativo da ETEC Parque Belém" },
      { property: "og:description", content: "Explore a escola por andar e toque nos lugares." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MapaPage,
});

const levels: (Level | "all")[] = ["all", "externa", "subsolo", "terreo", "andar1", "andar2"];

function MapaPage() {
  const [level, setLevel] = useState<Level | "all">("all");
  const [sel, setSel] = useState<NodeId | undefined>();
  const place = sel ? placeByNode(sel) : undefined;
  return (
    <AppShell>
      <PageHeader title="Mapa" subtitle="Bloco Anexo à esquerda, Prédio Principal à direita." />
      <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {levels.map((l) => <button type="button" key={l} aria-pressed={level === l} onClick={() => { setLevel(l); setSel(undefined); }} className={cn("h-9 shrink-0 rounded-full border-2 px-4 text-xs font-extrabold transition-colors", level === l ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground")}>{l === "all" ? "Tudo" : levelLabel[l]}</button>)}
      </div>
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_340px]">
        <SchoolMap level={level} selected={sel} onSelect={setSel} />
        <aside className="md:sticky md:top-24 md:self-start">
          {sel ? <section className="surface overflow-hidden">
            {place && <PlacePhoto place={place} compact className="aspect-video w-full" />}
            <div className="p-4">
              <h2 className="font-display text-xl font-semibold">{place?.name ?? nodes[sel].label}</h2>
              <p className="mt-1 text-xs font-extrabold text-primary">{nodeLocation(sel)}</p>
              <p className="mt-2 text-sm text-muted-foreground">{nodes[sel].landmark}</p>
              {place && <div className="mt-4 grid grid-cols-2 gap-2"><Button asChild size="sm"><Link to="/rota" search={{ de: "portaria", para: place.id }}><Navigation />Rota</Link></Button><Button asChild size="sm" variant="outline"><Link to="/ambientes/$id" params={{ id: place.id }}>Ver lugar</Link></Button></div>}
            </div>
          </section> : <p className="rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">Toque num número do mapa para ver o lugar.</p>}
        </aside>
      </div>
    </AppShell>
  );
}
