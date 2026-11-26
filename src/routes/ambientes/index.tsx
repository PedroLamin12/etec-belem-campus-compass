import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { places, type Category } from "@/data/school";
import { PlaceFeed } from "@/components/PlaceFeed";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ambientes/")({
  head: () => ({
    meta: [
      { title: "Lugares — Tour ETEC Belém" },
      {
        name: "description",
        content:
          "Os 15 lugares reais da ETEC Parque Belém, com fotos, localização por prédio e andar e rota a partir da Portaria.",
      },
      { property: "og:title", content: "Lugares da ETEC Parque Belém — Tour ETEC Belém" },
      {
        property: "og:description",
        content: "Fotos, serviços e localização de cada ambiente da escola.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Lista,
});

const cats: (Category | "Todos")[] = [
  "Todos",
  "Acesso",
  "Administração",
  "Ensino",
  "Laboratórios",
  "Convivência",
  "Esportes",
  "Eventos",
];

function Lista() {
  const [c, setC] = useState<(typeof cats)[number]>("Todos");
  const list = places.filter((p) => c === "Todos" || p.category === c);
  return (
    <AppShell>
      <PageHeader title="Lugares" subtitle={`${places.length} lugares reais da escola`} />
      <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {cats.map((x) => (
          <button
            type="button"
            key={x}
            aria-pressed={c === x}
            onClick={() => setC(x)}
            className={cn(
              "h-9 shrink-0 rounded-xl border px-4 text-xs font-semibold transition-all active:scale-[0.98]",
              c === x
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/50 bg-card text-muted-foreground",
            )}
          >
            {x}
          </button>
        ))}
      </div>
      <PlaceFeed items={list} />
    </AppShell>
  );
}
