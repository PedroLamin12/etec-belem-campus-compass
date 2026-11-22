import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PlacePhoto } from "@/components/PlacePhoto";
import { nodeLocation, placeNumber, type Place } from "@/data/school";
import { useProgress } from "@/data/progress";

export function PlaceFeed({ items }: { items: Place[] }) {
  const { visited } = useProgress();
  return <ul className="stagger grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
    {items.map((p) => <li key={p.id}>
      <Link to="/ambientes/$id" params={{ id: p.id }} className="tap group block h-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm hover:shadow-md">
        <div className="relative overflow-hidden">
          <PlacePhoto place={p} loading="lazy" compact className="card-photo aspect-[4/3] w-full" />
          <span className="absolute left-2 top-2 rounded-full bg-card px-2 py-0.5 text-[11px] font-extrabold">{String(placeNumber(p)).padStart(2, "0")}</span>
          {visited.includes(p.id) && <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-success text-success-foreground" aria-label="Descoberto"><Check className="h-4 w-4" strokeWidth={3} /></span>}
        </div>
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-extrabold leading-snug">{p.name}</h3>
          <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">{nodeLocation(p.node)}</p>
        </div>
      </Link>
    </li>)}
  </ul>;
}
