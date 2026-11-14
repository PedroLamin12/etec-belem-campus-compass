import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { places, levelLabel, nodes, type Category } from "@/data/school";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ambientes/")({
  head: () => ({
    meta: [
      { title: "Ambientes — Tour ETEC Belém" },
      { name: "description", content: "Catálogo com os 15 ambientes da ETEC Parque Belém: fotos, serviços e localização." },
      { property: "og:title", content: "Os 15 ambientes da ETEC Parque Belém" },
      { property: "og:description", content: "Secretaria, laboratórios, refeitório, quadras e mais." },
    ],
  }),
  component: Lista,
});

const cats: (Category | "Todos")[] = ["Todos", "Administração", "Ensino", "Laboratórios", "Convivência", "Esportes", "Eventos", "Acesso"];

function Lista() {
  const [c, setC] = useState<(typeof cats)[number]>("Todos");
  const list = places.filter((p) => c === "Todos" || p.category === c);
  return (
    <AppShell>
      <PageHeader title="Ambientes" subtitle={`${places.length} lugares reais da escola`} />
      <div className="flex gap-2 overflow-x-auto px-5 pb-3">
        {cats.map((x) => (
          <button key={x} onClick={() => setC(x)} className={cn("whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold", c === x ? "bg-foreground text-background" : "bg-secondary")}>{x}</button>
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-3 px-5">
        {list.map((p) => (
          <li key={p.id}>
            <Link to="/ambientes/$id" params={{ id: p.id }} className="block overflow-hidden rounded-2xl border bg-card">
              <img src={p.photo} alt={p.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-primary">{p.category}</p>
                <p className="text-sm font-bold leading-tight">{p.name}</p>
                <p className="text-[11px] text-muted-foreground">{levelLabel[nodes[p.node].level]}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
