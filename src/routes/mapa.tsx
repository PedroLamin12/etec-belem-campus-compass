import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { SchoolMap } from "@/components/SchoolMap";
import { aerialPhoto, levelLabel, nodes, placeByNode, type Level, type NodeId } from "@/data/school";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa interativo — Tour ETEC Belém" },
      { name: "description", content: "Planta interativa da ETEC Parque Belém por nível: área externa, térreo e 1º andar." },
      { property: "og:title", content: "Mapa interativo da ETEC Parque Belém" },
      { property: "og:description", content: "Explore a escola por andar e toque nos ambientes." },
    ],
  }),
  component: MapaPage,
});

const levels: (Level | "all")[] = ["all", "externa", "terreo", "andar1"];

function MapaPage() {
  const [level, setLevel] = useState<Level | "all">("all");
  const [sel, setSel] = useState<NodeId | undefined>();
  const place = sel ? placeByNode(sel) : undefined;
  return (
    <AppShell>
      <PageHeader title="Mapa da escola" subtitle="Toque num ponto para ver o ambiente." />
      <div className="flex gap-2 overflow-x-auto px-5 pb-3">
        {levels.map((l) => (
          <button key={l} onClick={() => setLevel(l)} className={cn("whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold", level === l ? "bg-foreground text-background" : "bg-secondary")}>
            {l === "all" ? "Tudo" : levelLabel[l]}
          </button>
        ))}
      </div>
      <div className="px-5">
        <SchoolMap level={level} selected={sel} onSelect={setSel} />
        {sel && (
          <div className="mt-3 flex items-center gap-3 rounded-2xl border bg-card p-3">
            {place && <img src={place.photo} alt="" className="h-14 w-14 rounded-xl object-cover" />}
            <div className="flex-1">
              <p className="font-bold">{place?.name ?? nodes[sel].label}</p>
              <p className="text-xs text-muted-foreground">{levelLabel[nodes[sel].level]} · {nodes[sel].landmark}</p>
            </div>
            {place && <Link to="/ambientes/$id" params={{ id: place.id }} className="rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">Abrir</Link>}
          </div>
        )}
        <h2 className="mt-6 font-display text-lg font-bold">Vista aérea anotada</h2>
        <img src={aerialPhoto} alt="Foto aérea da escola com anotações" className="mt-2 rounded-2xl" />
      </div>
    </AppShell>
  );
}
