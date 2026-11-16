import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { SchoolMap } from "@/components/SchoolMap";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, MapPin, Navigation, Layers } from "lucide-react";
import { aerialPhoto, levelLabel, nodeLocation, nodes, placeByNode, type Level, type NodeId } from "@/data/school";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa interativo — Tour ETEC Belém" },
      { name: "description", content: "Mapa da ETEC Parque Belém: área externa, subsolo, térreo, 1º e 2º andar; Prédio Principal e Bloco Anexo independente." },
      { property: "og:title", content: "Mapa interativo da ETEC Parque Belém" },
      { property: "og:description", content: "Explore a escola por andar e toque nos ambientes." },
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
      <PageHeader title="Mapa do campus" subtitle="Prédio Principal · Bloco Anexo · Área Externa" />
      <div className="mb-4 flex flex-wrap gap-2 px-5 md:px-8">
        {levels.map((l) => (
          <Button key={l} variant="secondary" aria-pressed={level === l} onClick={() => { setLevel(l); setSel(undefined); }} className={cn("h-8 rounded-md border border-border bg-card px-3 text-xs font-semibold", level === l && "border-primary bg-primary text-primary-foreground hover:bg-primary/90")}>
            {l === "all" ? "Tudo" : levelLabel[l]}
          </Button>
        ))}
      </div>
      <div className="grid gap-8 px-5 md:grid-cols-[minmax(0,1fr)_360px] md:px-8">
        <SchoolMap level={level} selected={sel} onSelect={setSel} />
        <aside className="min-w-0">
          {sel ? <section className="mb-7 border-b pb-6">
            {place && <img src={place.photo} alt={place.photoCaption ?? place.name} className="mb-3 aspect-video w-full rounded-lg object-cover" />}
            <p className="mb-1 flex items-center gap-1.5 text-[10px] font-medium text-primary"><MapPin className="h-3 w-3" />Local selecionado</p>
            <h2 className="font-display text-xl font-semibold">{place?.name ?? nodes[sel].label}</h2>
            <p className="mt-2 text-xs font-bold text-brand-yellow">{nodeLocation(sel)}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{nodes[sel].landmark}</p>
            {place?.photoCaption && <p className="mt-2 text-[10px] text-muted-foreground">{place.photoCaption}</p>}
            {place && <div className="mt-4 flex gap-2"><Button asChild size="sm"><Link to="/rota" search={{ de: "portaria", para: place.id }}><Navigation />Traçar rota</Link></Button><Button asChild size="sm" variant="secondary"><Link to="/ambientes/$id" params={{ id: place.id }}>Ver ambiente<ArrowUpRight /></Link></Button></div>}
          </section> : null}
          <section>
            <p className="mb-1 flex items-center gap-2 text-[10px] font-medium text-primary"><Layers className="h-3 w-3" />Um campus, dois blocos</p>
            <h2 className="mb-4 font-display text-xl font-semibold">Os dois prédios</h2>
            <figure>
              <img src={aerialPhoto} alt="Vista aérea dos dois blocos paralelos: Bloco Anexo menor à esquerda e Prédio Principal mais longo à direita" className="aspect-[767/732] w-full rounded-lg object-contain" />
              <figcaption className="mt-2 text-[10px] text-muted-foreground">Foto aérea fornecida · Google Earth.</figcaption>
            </figure>
            <div className="mt-4 grid grid-cols-2 gap-4 border-y py-4">
              <div><p className="text-[10px] font-medium text-brand-yellow">À esquerda</p><p className="mt-1 font-display text-xl font-bold">Bloco Anexo</p><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Menor e independente. Secretaria no subsolo; acesso pelo pátio.</p></div>
              <div><p className="text-[10px] font-medium text-primary">À direita</p><p className="mt-1 font-display text-xl font-bold">Prédio Principal</p><p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Mais longo. Pilotis, labs no 1º e salas no 2º andar.</p></div>
            </div>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
