import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Navigation, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { SchoolMap } from "@/components/SchoolMap";
import { missions, nodeLocation, nodes, placeById } from "@/data/school";
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
      { title: `${loaderData?.name ?? "Ambiente"} — Tour ETEC Belém` },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: `${loaderData?.name} · ETEC Parque Belém` },
      { property: "og:description", content: loaderData?.description ?? "" },
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
  return (
    <AppShell>
      <div className="relative">
        <img src={p.photo} alt={p.photoCaption ?? p.name} className="aspect-[4/3] w-full object-cover" />
        <Button asChild variant="secondary" size="icon" className="absolute left-4 top-4 rounded-full bg-card/90"><Link to="/ambientes" aria-label="Voltar aos ambientes"><ArrowLeft className="h-5 w-5" /></Link></Button>
      </div>
      {p.photoCaption && <p className="px-5 pt-2 text-xs text-muted-foreground">{p.photoCaption}</p>}
      <div className="space-y-5 px-5 pt-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary">{p.category}</p>
          <h1 className="font-display text-3xl font-extrabold leading-tight">{p.name}</h1>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{nodeLocation(p.node)}</p>
          <p className="mt-1 pl-5 text-sm"><b>Referência:</b> {n.landmark}</p>
        </div>
        <Button asChild className="h-auto w-full whitespace-normal rounded-2xl py-4 font-bold"><Link to="/rota" search={{ de: "portaria", para: p.id }}>
          <Navigation className="h-5 w-5" /> Como Chegar
        </Link></Button>
        <p className="leading-relaxed">{p.description}</p>
        <div>
          <h2 className="font-display font-bold">Serviços e usos</h2>
          <ul className="mt-2 flex flex-wrap gap-2">{p.services.map((s) => <li key={s} className="rounded-full bg-secondary px-3 py-1 text-sm">{s}</li>)}</ul>
        </div>
        {p.gallery && (
          <div className="grid grid-cols-2 gap-2">{p.gallery.map((g) => <img key={g} src={g} alt="" loading="lazy" className="aspect-square rounded-xl object-cover" />)}</div>
        )}
        <SchoolMap level={n.level} selected={p.node} />
        <Button variant="outline" onClick={() => checkIn(p.id)} disabled={here}
          className="h-auto w-full whitespace-normal rounded-2xl border-2 border-dashed border-primary py-3.5 font-bold text-primary disabled:border-solid disabled:bg-primary/10">
          <CheckCircle2 className="h-5 w-5" /> {here ? "Check-in feito!" : "Estou aqui — fazer check-in"}{mission && !here && ` (+${mission.xp} XP)`}
        </Button>
      </div>
    </AppShell>
  );
}
