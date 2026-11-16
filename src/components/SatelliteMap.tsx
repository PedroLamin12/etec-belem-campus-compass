import { aerialPhoto, nodes, places, satellitePoint, nodeLocation, type Level, type NodeId } from "@/data/school";
import { cn } from "@/lib/utils";

type Props = { level: Level | "all"; route: NodeId[]; selected?: NodeId | undefined; onSelect?: ((id: NodeId) => void) | undefined };

export function SatelliteMap({ level, route, selected, onSelect }: Props) {
  return (
    <figure className="page-enter">
      <svg viewBox="0 0 767 732" className="max-h-[620px] w-full rounded-lg bg-map" aria-label="Foto aérea da ETEC: Bloco Anexo menor à esquerda e Prédio Principal mais longo à direita" role={onSelect ? "group" : "img"}>
        <image href={aerialPhoto} width="767" height="732" preserveAspectRatio="xMidYMid meet" />
        <g className="fill-image-scrim/90 stroke-on-image/50" strokeWidth="2">
          <rect x="30" y="245" width="180" height="32" rx="4" />
          <rect x="218" y="78" width="205" height="32" rx="4" />
        </g>
        <text x="120" y="267" textAnchor="middle" className="fill-on-image text-[16px] font-medium">BLOCO ANEXO</text>
        <text x="320" y="100" textAnchor="middle" className="fill-on-image text-[16px] font-medium">PRÉDIO PRINCIPAL</text>
        {route.length > 1 && <><polyline points={route.map((id) => { const p = satellitePoint(id); return `${p.x},${p.y}`; }).join(" ")} fill="none" className="stroke-image-scrim" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" /><polyline points={route.map((id) => { const p = satellitePoint(id); return `${p.x},${p.y}`; }).join(" ")} fill="none" className="stroke-on-image route-dash" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></>}
        {places.map((p, i) => {
          if (level !== "all" && nodes[p.node].level !== level) return null;
          const point = satellitePoint(p.node);
          const active = p.node === selected || p.node === route.at(-1);
          return <g key={p.id} role={onSelect ? "button" : undefined} tabIndex={onSelect ? 0 : undefined} aria-label={`${p.name} · ${nodeLocation(p.node)}`} aria-pressed={onSelect ? selected === p.node : undefined} onClick={() => onSelect?.(p.node)} onKeyDown={(e) => { if (onSelect && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onSelect(p.node); } }} className={cn(onSelect && "cursor-pointer outline-none focus:stroke-on-image/50")}>
            {onSelect && <circle cx={point.x} cy={point.y} r="26" fill="transparent" />}
            <circle cx={point.x} cy={point.y} r="16" strokeWidth="2" className={cn("stroke-on-image", active ? "fill-primary" : "fill-image-scrim")} />
            <text x={point.x} y={point.y + 5} textAnchor="middle" className={cn("text-[14px] font-semibold", active ? "fill-primary-foreground" : "fill-on-image")}>{i + 1}</text>
            <title>{p.name} · {nodeLocation(p.node)}</title>
          </g>;
        })}
      </svg>
      <figcaption className="mt-2 text-[11px] leading-relaxed text-muted-foreground">Foto aérea fornecida · Google Earth. Pontos indicam os blocos de referência, não a posição exata de salas ou andares.</figcaption>
    </figure>
  );
}