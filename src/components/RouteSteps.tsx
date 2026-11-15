import { Link } from "@tanstack/react-router";
import { floorTransition, nodeLocation, nodes, placeByNode, type NodeId } from "@/data/school";

export function RouteSteps({ route }: { route: NodeId[] }) {
  if (route.length < 2) return <p className="rounded-xl bg-muted p-4 text-sm">Você já está aqui! 🎉</p>;
  return (
    <ol className="relative space-y-4 border-l-2 border-dashed border-primary/40 pl-6">
      {route.map((id, i) => {
        const n = nodes[id];
        const prevId = i > 0 ? route[i - 1] : undefined;
        const transition = prevId ? floorTransition(prevId, id) : null;
        const p = placeByNode(id);
        const last = i === route.length - 1;
        return (
          <li key={id + i} className="relative">
            <span className={`absolute -left-[37px] flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${last ? "bg-primary text-primary-foreground" : i === 0 ? "bg-brand-yellow text-foreground" : "bg-card border-2 border-primary text-primary"}`}>
              {last ? "★" : i + 1}
            </span>
            <div className="rounded-xl border bg-card p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {i === 0 ? "Partida" : last ? "Chegada" : `Passo ${i}`} · {nodeLocation(id)}
                {transition === "up" ? " · suba a escada ↑" : transition === "down" ? " · desça a escada ↓" : ""}
              </p>
              <p className="font-semibold">{n.label}</p>
              <p className="text-sm text-muted-foreground">{n.landmark}</p>
              {p && !last && i > 0 && <Link to="/ambientes/$id" params={{ id: p.id }} className="mt-1 inline-block text-xs font-semibold text-primary">Ver foto do marco →</Link>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
