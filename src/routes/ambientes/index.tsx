import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { places, nodeLocation, type Category } from "@/data/school";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ambientes/")({
  head: () => ({
    meta: [
      { title: "Ambientes — Tour ETEC Belém" },
      { name: "description", content: "Ambientes da ETEC Parque Belém com fotos reais: Biblioteca, Banheiros, Secretaria no subsolo do anexo e Informática no Prédio Principal." },
      { property: "og:title", content: "Ambientes da ETEC Parque Belém — Tour ETEC Belém" },
      { property: "og:description", content: "Fotos, serviços e localização dos ambientes por prédio e andar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
          <Button key={x} variant="secondary" aria-pressed={c === x} onClick={() => setC(x)} className={cn("rounded-full px-3.5 text-sm font-semibold", c === x && "bg-foreground text-background hover:bg-foreground/90")}>{x}</Button>
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-3 px-5">
        {list.map((p) => (
          <li key={p.id}>
            <Link to="/ambientes/$id" params={{ id: p.id }} className="block overflow-hidden rounded-2xl border bg-card">
              <img src={p.photo} alt={p.photoCaption ?? p.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wide text-primary">{p.category}</p>
                <p className="text-sm font-bold leading-tight">{p.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{nodeLocation(p.node)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
