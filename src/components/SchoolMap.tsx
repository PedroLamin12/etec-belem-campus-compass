import { nodes, levelLabel, places, type Level, type NodeId } from "@/data/school";
import { cn } from "@/lib/utils";

type Props = {
  level: Level | "all";
  route?: NodeId[];
  selected?: NodeId | undefined;
  onSelect?: (n: NodeId) => void;
  className?: string;
};

export function SchoolMap({ level, route = [], selected, onSelect, className }: Props) {
  const on = (l: Level) => level === "all" || level === l;
  const pts = route.map((n) => `${nodes[n].x},${nodes[n].y}`).join(" ");
  return (
    <svg viewBox="0 0 360 520" className={cn("w-full rounded-2xl bg-map", className)} role="img" aria-label="Planta da ETEC Parque Belém">
      <defs>
        <pattern id="grass" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" className="fill-map-grass-dot" />
        </pattern>
      </defs>
      <rect width="360" height="520" fill="url(#grass)" />
      {/* street + portaria */}
      <rect x="0" y="0" width="360" height="22" className="fill-map-road" />
      <text x="10" y="15" className="fill-map-label text-[9px]">Rua · entrada</text>
      <g opacity={on("externa") ? 1 : 0.35}>
        <path d="M222 30 Q236 10 250 30" className="stroke-brand-yellow" strokeWidth="5" fill="none" />
        <rect x="254" y="24" width="12" height="12" className="fill-brand-red" />
        {/* alameda */}
        <rect x="218" y="60" width="40" height="420" rx="4" className="fill-map-road" />
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
      <g opacity={on("terreo") || on("andar1") ? 1 : 0.35}>
        <rect x="150" y="70" width="62" height="345" rx="4" className={cn(level === "andar1" ? "fill-map-floor1" : "fill-map-building", "stroke-map-line")} strokeWidth="1.5" />
        {level !== "andar1" && <rect x="155" y="290" width="52" height="60" className="fill-map-pilotis" />}
        {level !== "andar1" && <rect x="155" y="355" width="52" height="55" className="fill-map-admin" />}
        {/* annex */}
        <rect x="48" y="170" width="70" height="250" rx="4" className={cn(level === "andar1" ? "fill-map-floor1" : "fill-map-building", "stroke-map-line")} strokeWidth="1.5" />
        <rect x="110" y="105" width="44" height="50" rx="4" className="fill-map-pilotis stroke-map-line" />
        {level !== "terreo" && <rect x="118" y="244" width="32" height="12" className="fill-map-floor1 stroke-map-line" />}
      </g>
      <text x="181" y="64" textAnchor="middle" className="fill-map-label text-[9px] font-semibold">PRÉDIO PRINCIPAL</text>
      <text x="83" y="164" textAnchor="middle" className="fill-map-label text-[9px] font-semibold">BLOCO ANEXO</text>
      {route.length > 1 && (
        <polyline points={pts} fill="none" className="stroke-primary route-dash" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {(Object.keys(nodes) as NodeId[]).map((id) => {
        const n = nodes[id];
        const isPlace = places.some((p) => p.node === id) || id === "caixa";
        if (!isPlace && !route.includes(id)) return null;
        const visible = on(n.level);
        const active = selected === id || route[route.length - 1] === id;
        return (
          <g key={id} opacity={visible ? 1 : 0.25} onClick={() => onSelect?.(id)} className={onSelect ? "cursor-pointer" : ""}>
            {active && <circle cx={n.x} cy={n.y} r="13" className="fill-primary/25 animate-ping-slow" />}
            <circle cx={n.x} cy={n.y} r={active ? 8 : 6} className={cn(active ? "fill-primary" : route[0] === id ? "fill-brand-yellow" : "fill-card", "stroke-foreground")} strokeWidth="1.5" />
            <title>{n.label}</title>
          </g>
        );
      })}
      {level !== "all" && (
        <text x="350" y="512" textAnchor="end" className="fill-map-label text-[10px] font-bold">{levelLabel[level]}</text>
      )}
    </svg>
  );
}
