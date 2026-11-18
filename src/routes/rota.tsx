import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { SchoolMap } from "@/components/SchoolMap";
import { RouteSteps } from "@/components/RouteSteps";
import { GuidedWalk } from "@/components/GuidedWalk";
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
  const sel = "mt-1 h-12 w-full appearance-none rounded-xl border-2 bg-background px-3 text-sm font-extrabold text-foreground outline-none focus:border-brand-sky";
  return (
    <AppShell>
      <PageHeader title="Como chegar" subtitle={`${route.length - 1} etapas · a pé`} />
      <div className="surface relative grid gap-3 p-4">
        <label className="block pr-12 text-xs font-extrabold text-muted-foreground">Estou em
          <select className={sel} value={from.id} onChange={(e) => set("de", e.target.value)}>{places.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
        </label>
        <label className="block pr-12 text-xs font-extrabold text-muted-foreground">Quero ir para
          <select className={sel} value={to.id} onChange={(e) => set("para", e.target.value)}>{places.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
        </label>
        <Button variant="outline" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full" aria-label="Inverter origem e destino" title="Inverter" onClick={() => nav({ search: { de: to.id, para: from.id }, replace: true })}><ArrowDownUp /></Button>
      </div>
      <div className="mt-4"><GuidedWalk key={`${from.id}-${to.id}`} route={route} destination={to} /></div>
      <div className="mt-7 grid gap-7 md:grid-cols-2">
        <section><h2 className="mb-4 font-display text-lg font-semibold">Passo a passo</h2><RouteSteps route={route} /></section>
        <section><h2 className="mb-3 font-display text-lg font-semibold">No mapa</h2><SchoolMap level="all" route={route} /></section>
      </div>
    </AppShell>
  );
}
