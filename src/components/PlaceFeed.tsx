import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nodeLocation, places, type Place } from "@/data/school";

export function PlaceFeed({ items }: { items: Place[] }) {
  return <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((p) => <li key={p.id} className="feed-item flex flex-col overflow-hidden rounded-lg border bg-card">
      <Link to="/ambientes/$id" params={{ id: p.id }} className="group relative block overflow-hidden">
        <img src={p.photo} alt={p.photoCaption ?? p.name} loading="lazy" className="feed-photo aspect-[16/10] w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-md bg-card/95 px-2.5 py-1.5 text-[10px] font-medium text-foreground backdrop-blur-sm">{p.category}</span>
        <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/95 text-primary"><ArrowUpRight className="h-4 w-4" /></span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold leading-snug">{p.name}</h3>
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