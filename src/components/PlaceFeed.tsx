import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nodeLocation, places, type Place } from "@/data/school";
import { useProgress } from "@/data/progress";

export function PlaceFeed({ items, layout = "grid" }: { items: Place[]; layout?: "grid" | "rail" }) {
  const { visited } = useProgress();
  return <ul className={layout === "rail" ? "discovery-track" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
    {items.map((p) => <li key={p.id} className="feed-item flex flex-col overflow-hidden rounded-lg border bg-card">
      <Link to="/ambientes/$id" params={{ id: p.id }} className="group relative block overflow-hidden">
        <img src={p.photo} alt={p.photoCaption ?? p.name} loading="lazy" className={`feed-photo aspect-[16/10] w-full object-cover ${p.id === "lab1" ? "photo-contained" : ""}`} />
        <span className="absolute inset-x-0 bottom-0 h-16 bg-[image:var(--gradient-hero)]" />
        <span className="absolute left-3 top-3 rounded-md bg-background/90 px-2.5 py-1.5 text-[9px] font-medium text-foreground backdrop-blur-sm">{visited.includes(p.id) ? <span className="flex items-center gap-1 text-primary"><Check className="h-3 w-3" />Descoberto</span> : p.category}</span>
        <span className="feed-number absolute bottom-2 left-3">{String(places.indexOf(p) + 1).padStart(2, "0")}</span>
        <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/95 text-primary"><ArrowUpRight className="h-4 w-4" /></span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-medium leading-snug"><Link to="/ambientes/$id" params={{ id: p.id }}>{p.name}</Link></h3>
        <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />{nodeLocation(p.node)}</p>
        {p.photoCaption && <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">{p.photoCaption}</p>}
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-[11px] text-muted-foreground">Local {String(places.indexOf(p) + 1).padStart(2, "0")}</span>
          <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs text-primary"><Link to="/rota" search={{ de: "portaria", para: p.id }}>Como chegar<ArrowUpRight /></Link></Button>
        </div>
      </div>
    </li>)}
  </ul>;
}