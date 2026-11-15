import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nodeLocation, places, type Place } from "@/data/school";

export function PlaceFeed({ items }: { items: Place[] }) {
  return <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((p) => <li key={p.id} className="feed-item overflow-hidden rounded-lg border bg-card">
      <Link to="/ambientes/$id" params={{ id: p.id }} className="group relative block overflow-hidden">
        <img src={p.photo} alt={p.photoCaption ?? p.name} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-md border border-on-image/20 bg-image-scrim/85 px-2 py-1 text-[10px] font-extrabold text-on-image">{String(places.indexOf(p) + 1).padStart(2, "0")} / {p.category.toUpperCase()}</span>
        <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"><ArrowUpRight className="h-4 w-4" /></span>
      </Link>
      <div className="p-4">
        <h3 className="font-display text-2xl font-bold">{p.name}</h3>
        <p className="mt-1 flex items-start gap-1.5 text-[11px] text-muted-foreground"><MapPin className="mt-0.5 h-3 w-3 shrink-0" />{nodeLocation(p.node)}</p>
        {p.photoCaption && <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">{p.photoCaption}</p>}
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <span className="text-[10px] font-bold text-muted-foreground">ETEC PARQUE BELÉM</span>
          <Button asChild variant="ghost" size="sm" className="h-7 px-0 text-xs text-primary"><Link to="/rota" search={{ de: "portaria", para: p.id }}>Traçar rota<ArrowUpRight /></Link></Button>
        </div>
      </div>
    </li>)}
  </ul>;
}