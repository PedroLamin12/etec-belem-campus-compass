import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Map } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { SchoolMap } from "@/components/SchoolMap";
import { PlacePhoto } from "@/components/PlacePhoto";
import { GuidedWalk } from "@/components/GuidedWalk";
import { Titia } from "@/components/Titia";
import { buildingLabel, levelLabel, missions, nodes, placeById, placeNumber, routeBetween } from "@/data/school";
import { Button } from "@/components/ui/button";
import { checkIn, useProgress } from "@/data/progress";

export const Route = createFileRoute("/ambientes/$id")({
  loader: ({ params }) => {
    const p = placeById(params.id);
    if (!p) throw notFound();
    return { name: p.name, description: p.description };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Lugar"} — Tour ETEC Belém` },
      { name: "description", content: loaderData?.description ?? "Lugar da ETEC Parque Belém." },
      { property: "og:title", content: `${loaderData?.name ?? "Lugar"} · ETEC Parque Belém` },
      { property: "og:description", content: loaderData?.description ?? "Lugar da ETEC Parque Belém." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ficha,
});

function Ficha() {
  const { id } = Route.useParams();
  const p = placeById(id);
  const { visited } = useProgress();
  if (!p) return null;
  const n = nodes[p.node];
  const here = visited.includes(p.id);
  const mission = missions.find((m) => m.place === p.id);
  const chips = [buildingLabel[n.building], ...(n.building === "externa" ? [] : [n.accessOnly ? "Acesso pelo térreo" : levelLabel[n.level]]), p.category];
  return (
    <AppShell>
      <div className="relative -mx-4 -mt-5 md:mx-0 md:mt-0">
        <PlacePhoto place={p} className={`aspect-[4/3] w-full md:aspect-[21/9] md:rounded-3xl ${p.id === "portaria" ? "object-top" : ""}`} />
        <Button asChild variant="outline" size="icon" className="absolute left-4 top-4 rounded-full"><Link to="/ambientes" aria-label="Voltar para os lugares"><ArrowLeft className="!h-5 !w-5" /></Link></Button>
        <span className="absolute bottom-3 left-4 rounded-full bg-card px-3 py-1 text-xs font-extrabold">Lugar {String(placeNumber(p)).padStart(2, "0")}{here && " · descoberto ✓"}</span>
      </div>
      {p.photoCaption && <p className="mt-2 text-xs text-muted-foreground">{p.photoCaption}</p>}
      <div className="md:grid md:grid-cols-2 md:gap-8">
        <section>
          <h1 className="mt-5 font-display text-3xl font-semibold leading-tight">{p.name}</h1>
          <ul className="mt-3 flex flex-wrap gap-2">{chips.map((c) => <li key={c} className="rounded-full bg-secondary px-3 py-1 text-xs font-extrabold">{c}</li>)}</ul>
          <div className="mt-5 flex items-start gap-2"><Titia mood="talk" className="h-20 w-16 shrink-0" /><p className="speech ml-2 flex-1 text-sm">{n.landmark}</p></div>
          <div className="mt-5 grid gap-3">
            <GuidedWalk route={routeBetween("portaria", p.node)} destination={p} />
            <Button asChild variant="outline" size="lg"><Link to="/rota" search={{ de: "portaria", para: p.id }}><Map className="!h-5 !w-5" />Ver rota no mapa</Link></Button>
          </div>
          <h2 className="mt-8 font-display text-lg font-semibold">Sobre</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
          <ul className="mt-3 flex flex-wrap gap-2">{p.services.map((s) => <li key={s} className="rounded-xl border-2 px-3 py-1.5 text-xs font-bold">{s}</li>)}</ul>
          {p.gallery && <div className="mt-4 grid grid-cols-2 gap-2">{p.gallery.map((g) => <img key={g} src={g} alt={`Outra foto real: ${p.name}`} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />)}</div>}
          <Button variant={here ? "outline" : "success"} size="lg" onClick={() => checkIn(p.id)} disabled={here} className="mt-6 w-full"><CheckCircle2 className="!h-5 !w-5" />{here ? "Check-in feito" : `Estou aqui${mission ? ` · +${mission.xp} XP` : ""}`}</Button>
        </section>
        <section className="mt-8 md:mt-5">
          <h2 className="mb-3 font-display text-lg font-semibold">No mapa</h2>
          <SchoolMap level={n.level} selected={p.node} />
        </section>
      </div>
    </AppShell>
  );
}
