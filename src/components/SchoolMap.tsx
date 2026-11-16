import { useId, useState } from "react";
import { Map, Satellite, Compass } from "lucide-react";
import { nodes, levelLabel, nodeLocation, places, rearRooms, type Level, type NodeId } from "@/data/school";
import { Button } from "@/components/ui/button";
import { SatelliteMap } from "@/components/SatelliteMap";
import { cn } from "@/lib/utils";

type Props = {
  level: Level | "all";
  route?: NodeId[];
  selected?: NodeId | undefined;
  onSelect?: (n: NodeId) => void;
  className?: string;
  defaultView?: "schematic" | "satellite";
};

export function SchoolMap({ level, route = [], selected, onSelect, className, defaultView = "schematic" }: Props) {
  const patternId = useId();
  const [view, setView] = useState(defaultView);
  const on = (l: Level) => level === "all" || level === l;
  const pts = route.map((n) => `${nodes[n].x},${nodes[n].y}`).join(" ");
  return (
    <div className={className}>
    <div className="mb-3 flex items-center justify-between gap-2">
      <div className="flex rounded-lg border bg-card p-1 shadow-sm" role="group" aria-label="Tipo de mapa">
        <Button variant={view === "schematic" ? "secondary" : "ghost"} size="sm" aria-pressed={view === "schematic"} onClick={() => setView("schematic")} className="text-xs"><Map />Esquemático</Button>
        <Button variant={view === "satellite" ? "secondary" : "ghost"} size="sm" aria-pressed={view === "satellite"} onClick={() => setView("satellite")} className="text-xs"><Satellite />Satélite</Button>
      </div>
      <Compass className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
    </div>
    {view === "satellite" ? <SatelliteMap level={level} route={route} selected={selected} onSelect={onSelect} /> : <svg key="schematic" viewBox="0 0 360 520" className="page-enter max-h-[620px] w-full rounded-lg border bg-map" role={onSelect ? "group" : "img"} aria-label="Planta da ETEC Parque Belém">
      <defs>
        <pattern id={patternId} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" className="fill-map-grass-dot" />
        </pattern>
      </defs>
      <rect width="360" height="520" fill={`url(#${patternId})`} />
      {/* street + portaria */}
      <rect x="0" y="0" width="360" height="22" className="fill-map-road" />
      <text x="10" y="15" className="fill-map-label text-[9px]">Rua · entrada</text>
      <g opacity={on("externa") ? 1 : 0.35}>
        <path d="M222 30 Q236 10 250 30" className="stroke-brand-yellow" strokeWidth="5" fill="none" />
        <rect x="254" y="24" width="12" height="12" className="fill-brand-red" />
        {/* alameda */}
        <rect x="222" y="60" width="28" height="420" rx="4" className="fill-map-road" />
        <rect x="254" y="78" width="74" height="78" rx="4" className="fill-map-road stroke-map-line" />
        {[88, 110, 132].map((y) => <path key={y} d={`M266 ${y} h20 v14 h-20`} fill="none" className="stroke-brand-yellow" strokeWidth="2" />)}
        {/* caixa d'agua */}
        <circle cx="288" cy="262" r="11" className="fill-map-tower stroke-map-line" />
        {/* quadras */}
        {[318, 404].map((y) => (
          <g key={y}>
            <rect x="272" y={y} width="80" height="70" rx="3" className="fill-map-court stroke-map-court-line" strokeWidth="2" />
            <line x1="272" y1={y + 35} x2="352" y2={y + 35} className="stroke-map-court-line" />
            <circle cx="312" cy={y + 35} r="9" fill="none" className="stroke-map-court-line" />
          </g>
        ))}
      </g>
      {/* main building */}
      <g opacity={on("terreo") || on("andar1") || on("andar2") ? 1 : 0.35}>
        <path d="M150 78 H214 V340 H236 V476 H128 V340 H150 Z" className={cn(level === "andar1" ? "fill-map-floor1" : level === "andar2" ? "fill-map-admin" : "fill-map-building", "stroke-map-line")} strokeWidth="1.5" />
        {on("terreo") && <>
          <rect x="154" y="266" width="56" height="54" className="fill-map-pilotis" />
          <path d={`M128 396 H236 M${rearRooms.bathrooms.right} 396 V474`} className="stroke-map-line" fill="none" />
          <text x="151" y="411" textAnchor="middle" className="fill-map-label text-[8px]">Banheiros</text>
          <text x="212" y="411" textAnchor="middle" className="fill-map-label text-[8px]">Auditório</text>
        </>}
        {level === "andar1" && <text x="160" y="162" className="fill-map-label text-[9px] font-bold">Informática</text>}
        {level === "andar2" && <><text x="182" y="106" textAnchor="middle" className="fill-map-label text-[8px]">Salas · corredores</text><text x="182" y="431" textAnchor="middle" className="fill-map-label text-[9px] font-bold">Coordenação</text></>}
      </g>
      <g opacity={on("terreo") || on("subsolo") ? 1 : 0.3}>
        <rect x="32" y="182" width="78" height="286" rx="4" className={cn(level === "subsolo" ? "fill-map-admin" : "fill-map-building", "stroke-map-line")} strokeWidth="1.5" />
        <path d="M110 276 H150 V296 H110" className="fill-map-road" />
        <text x="123" y="307" textAnchor="middle" className="fill-map-label text-[8px]">pátio · térreo</text>
        {on("subsolo") && <text x="70" y="352" textAnchor="middle" className="fill-map-label text-[8px]">Secretaria · subsolo</text>}
      </g>
         <text x="179" y="66" textAnchor="middle" className="fill-map-label text-[9px] font-semibold">PRÉDIO PRINCIPAL</text>
      <text x="71" y="172" textAnchor="middle" className="fill-map-label text-[9px] font-semibold">BLOCO ANEXO</text>
      <text x="291" y="70" textAnchor="middle" className="fill-map-label text-[8px]">Estacionamento</text>
      {route.length > 1 && (
        <polyline points={pts} fill="none" className="stroke-primary route-dash" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {(Object.keys(nodes) as NodeId[]).map((id) => {
        const n = nodes[id];
        const isPlace = places.some((p) => p.node === id) || id === "caixa" || id === "escada" || id === "escadaAnexo" || id === "escada2";
        if (!isPlace && !route.includes(id)) return null;
        const visible = on(n.level);
        if (!visible) return null;
        const placeIndex = places.findIndex((p) => p.node === id);
        const active = selected === id || route[route.length - 1] === id;
        return (
          <g key={id} onClick={() => onSelect?.(id)} role={onSelect ? "button" : undefined} tabIndex={onSelect ? 0 : undefined} aria-label={`${n.label} · ${nodeLocation(id)}`} aria-pressed={onSelect ? selected === id : undefined} onKeyDown={(e) => { if (onSelect && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); onSelect(id); } }} className={onSelect ? "cursor-pointer outline-none focus:stroke-primary" : ""}>
            {onSelect && <circle cx={n.x} cy={n.y} r="16" fill="transparent" />}
            {active && <circle cx={n.x} cy={n.y} r="13" className="fill-primary/25 animate-ping-slow" />}
             <circle cx={n.x} cy={n.y} r={placeIndex >= 0 || id.startsWith("escada") ? 9 : 5} className={cn(active ? "fill-primary" : route[0] === id ? "fill-brand-yellow" : "fill-card", "stroke-foreground")} strokeWidth="1.5" />
            {id.startsWith("escada") && <text x={n.x} y={n.y + 3} textAnchor="middle" className="fill-foreground text-[9px] font-bold">↕</text>}
             {placeIndex >= 0 && <text x={n.x} y={n.y + 3} textAnchor="middle" className={cn("text-[8px] font-bold", active ? "fill-primary-foreground" : route[0] === id ? "fill-brand-yellow-foreground" : "fill-foreground")}>{placeIndex + 1}</text>}
            <title>{`${n.label} · ${nodeLocation(id)}`}</title>
          </g>
        );
      })}
      {level !== "all" && (
        <text x="350" y="512" textAnchor="end" className="fill-map-label text-[10px] font-bold">{levelLabel[level]}</text>
      )}
     </svg>}
    {onSelect && <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1">
      {places.map((p, i) => on(nodes[p.node].level) && <li key={p.id}>
        <Button variant="ghost" onClick={() => onSelect(p.node)} aria-pressed={selected === p.node} className={cn("h-auto min-h-10 w-full justify-start whitespace-normal px-1 py-1.5 text-left text-xs", selected === p.node && "bg-secondary")}>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border bg-card text-[10px] text-foreground">{i + 1}</span><span>{p.name}</span>
        </Button>
      </li>)}
    </ul>}
    </div>
  );
}
