import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { SchoolMap } from "@/components/SchoolMap";
import { RouteSteps } from "@/components/RouteSteps";
import { Button } from "@/components/ui/button";
import { ArrowDownUp, Navigation, MapPin, Flag } from "lucide-react";
import { places, placeById, routeBetween, nodeLocation } from "@/data/school";

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
  const sel = "mt-1 w-full rounded-lg border bg-card px-3 py-3 text-sm font-semibold text-foreground";
  return (
    <AppShell>
      <PageHeader title="Seu caminho pela ETEC" subtitle="Como chegar · A pé, a partir da Portaria ou de outro ambiente" />
      <div className="grid items-end gap-2 px-5 md:grid-cols-[1fr_48px_1fr] md:px-8">
        <label className="block min-w-0 text-[11px] font-semibold text-muted-foreground">Estou em
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
      <div className="grid gap-8 px-5 pt-7 md:grid-cols-2 md:px-8">
        <div>
        <SchoolMap level="all" route={route} />
        <figure className="mt-5"><img src={to.photo} alt={to.photoCaption ?? to.name} className="aspect-video w-full rounded-lg object-cover" /><figcaption className="mt-2 text-[11px] text-muted-foreground">{to.photoCaption ?? `Destino: ${to.name}`}</figcaption></figure>
        </div>
        <section>
          <div className="mb-6 flex items-center justify-between border-b pb-4"><div><p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold text-primary"><Flag className="h-3 w-3" />SEU DESTINO</p><h2 className="font-display text-3xl font-bold">{to.name}</h2><p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground"><MapPin className="h-3 w-3" />{nodeLocation(to.node)}</p></div><span className="flex shrink-0 items-center gap-1 rounded-md bg-brand-yellow/10 px-2 py-2 text-[10px] font-bold text-brand-yellow"><Navigation className="h-3 w-3" />{route.length - 1} etapas</span></div>
          <RouteSteps route={route} />
        </section>
      </div>
    </AppShell>
  );
}
