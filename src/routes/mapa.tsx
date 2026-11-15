import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { SchoolMap } from "@/components/SchoolMap";
import { Button } from "@/components/ui/button";
import { annexPhoto, mainBuildingPhoto, levelLabel, nodeLocation, nodes, placeByNode, type Level, type NodeId } from "@/data/school";
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
      <PageHeader title="Mapa da escola" subtitle="Prédio Principal · Bloco Anexo · Área Externa" />
      <div className="flex flex-wrap gap-2 px-5 pb-3">
        {levels.map((l) => (
          <Button key={l} variant="secondary" aria-pressed={level === l} onClick={() => { setLevel(l); setSel(undefined); }} className={cn("h-8 rounded-full px-3 text-xs font-semibold", level === l && "bg-foreground text-background hover:bg-foreground/90")}>
            {l === "all" ? "Tudo" : levelLabel[l]}
          </Button>
        ))}
      </div>
      <div className="px-5">
        <SchoolMap level={level} selected={sel} onSelect={setSel} />
        {sel && (
          <div className="mt-3 flex items-center gap-3 rounded-2xl border bg-card p-3">
            {place && <img src={place.photo} alt="" className="h-14 w-14 rounded-xl object-cover" />}
            <div className="flex-1">
              <p className="font-bold">{place?.name ?? nodes[sel].label}</p>
              <p className="text-xs text-muted-foreground">{nodeLocation(sel)} · {nodes[sel].landmark}</p>
            </div>
            {place && <Button asChild size="sm"><Link to="/ambientes/$id" params={{ id: place.id }}>Abrir</Link></Button>}
          </div>
        )}
        <h2 className="mt-6 font-display text-lg font-bold">Os dois prédios</h2>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <figure><img src={mainBuildingPhoto} alt="Prédio Principal elevado sobre pilotis" className="aspect-[4/3] w-full rounded-lg object-cover" /><figcaption className="mt-1 text-xs font-semibold">Prédio Principal</figcaption></figure>
          <figure><img src={annexPhoto} alt="Bloco Anexo independente ao lado do Prédio Principal" className="aspect-[4/3] w-full rounded-lg object-cover" /><figcaption className="mt-1 text-xs font-semibold">Bloco Anexo · acesso pelo pátio</figcaption></figure>
        </div>
      </div>
    </AppShell>
  );
}
