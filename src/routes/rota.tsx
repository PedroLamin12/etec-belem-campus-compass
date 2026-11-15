import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { SchoolMap } from "@/components/SchoolMap";
import { RouteSteps } from "@/components/RouteSteps";
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";
import { places, placeById, routeBetween } from "@/data/school";

type S = { de?: string | undefined; para?: string | undefined };

export const Route = createFileRoute("/rota")({
  validateSearch: (s: Record<string, unknown>): S => ({
    de: typeof s["de"] === "string" ? s["de"] : undefined,
    para: typeof s["para"] === "string" ? s["para"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Como chegar — Tour ETEC Belém" },
      { name: "description", content: "Escolha onde você está e para onde quer ir: o app mostra o caminho passo a passo dentro da ETEC Parque Belém." },
      { property: "og:title", content: "Rota passo a passo na ETEC Parque Belém" },
      { property: "og:description", content: "Da Portaria à Secretaria no subsolo do Bloco Anexo e aos andares do Prédio Principal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RotaPage,
});

function RotaPage() {
  const { de = "portaria", para = "secretaria" } = Route.useSearch();
  const nav = useNavigate({ from: "/rota" });
  const from = placeById(de) ?? placeById("portaria");
  const to = placeById(para) ?? placeById("secretaria");
  if (!from || !to) return null;
  const route = routeBetween(from.node, to.node);
  const set = (k: keyof S, v: string) => nav({ search: (s: S) => ({ ...s, [k]: v }), replace: true });
  const sel = "w-full rounded-xl border bg-card px-3 py-3 font-semibold";
  return (
    <AppShell>
      <PageHeader title="Como chegar" subtitle="Rota a pé com marcos visuais." />
      <div className="space-y-2 px-5">
        <label className="block text-xs font-semibold text-muted-foreground">Estou em
          <select className={sel} value={from.id} onChange={(e) => set("de", e.target.value)}>
            {places.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </label>
        <div className="flex justify-center"><Button size="icon" variant="ghost" aria-label="Inverter origem e destino" title="Inverter origem e destino" onClick={() => nav({ search: { de: to.id, para: from.id }, replace: true })}><ArrowDownUp /></Button></div>
        <label className="block text-xs font-semibold text-muted-foreground">Quero ir para
          <select className={sel} value={to.id} onChange={(e) => set("para", e.target.value)}>
            {places.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </label>
      </div>
      <div className="px-5 pt-4">
        <SchoolMap level="all" route={route} />
        <p className="mt-3 text-sm"><b>{route.length - 1} etapas</b></p>
        <div className="mt-4"><RouteSteps route={route} /></div>
        <img src={to.photo} alt={to.name} className="mt-5 aspect-video w-full rounded-2xl object-cover" />
        <p className="mt-2 text-center text-sm text-muted-foreground">{to.photoCaption ?? `Destino: ${to.name}`}</p>
      </div>
    </AppShell>
  );
}
