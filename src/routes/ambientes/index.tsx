import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { places, type Category } from "@/data/school";
import { PlaceFeed } from "@/components/PlaceFeed";
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
      <PageHeader title="Muito além da sala." subtitle={`${places.length} lugares reais. Qual você vai descobrir hoje?`} />
      <div className="mb-5 flex gap-2 overflow-x-auto px-5 pb-3 md:px-8">
        {cats.map((x) => (
          <Button key={x} variant="secondary" aria-pressed={c === x} onClick={() => setC(x)} className={cn("shrink-0 rounded-md border border-border bg-card px-3.5 text-xs font-semibold", c === x && "border-primary bg-primary text-primary-foreground hover:bg-primary/90")}>{x}</Button>
        ))}
      </div>
      <div className="px-5 md:px-8"><PlaceFeed items={list} /></div>
    </AppShell>
  );
}
