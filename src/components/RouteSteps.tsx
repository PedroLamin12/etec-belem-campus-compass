import { floorTransition, nodeLocation, nodes, type NodeId } from "@/data/school";
import { Flag, MoveDown, MoveUp } from "lucide-react";

export function RouteSteps({ route }: { route: NodeId[] }) {
  if (route.length < 2) return <p className="rounded-2xl bg-secondary p-4 text-sm">Você já está aqui! 🎉</p>;
  return (
    <ol className="space-y-0">
      {route.map((id, i) => {
        const prevId = i > 0 ? route[i - 1] : undefined;
        const transition = prevId ? floorTransition(prevId, id) : null;
        const last = i === route.length - 1;
        return (
          <li key={id + i} className="relative flex gap-3 pb-5 last:pb-0">
            {!last && <span className="absolute left-[15px] top-8 h-[calc(100%-28px)] w-0.5 bg-border" aria-hidden="true" />}
            <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${last ? "bg-primary text-primary-foreground" : i === 0 ? "bg-brand-yellow text-brand-yellow-foreground" : "border-2 bg-card"}`}>{last ? <Flag className="h-4 w-4" /> : i + 1}</span>
            <div className="min-w-0 pt-1">
              <p className="text-sm font-extrabold">{nodes[id].label}</p>
              <p className="text-xs text-muted-foreground">{nodeLocation(id)}{transition && <span className="ml-1 inline-flex items-center gap-0.5 font-extrabold text-foreground">· {transition === "up" ? <><MoveUp className="h-3 w-3" />suba</> : <><MoveDown className="h-3 w-3" />desça</>}</span>}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
