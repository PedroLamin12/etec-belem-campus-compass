import { cn } from "@/lib/utils";

export type GuideMood = "happy" | "talk" | "wink" | "wow" | "think" | "cheer" | "wave";

export const GUIDE_NAME = "Belinho";

export function Belinho({ mood = "happy", className, bubble = false, label }: { mood?: GuideMood; className?: string | undefined; bubble?: boolean; label?: string }) {
  const eyesClosed = mood === "cheer";
  return (
    <svg viewBox="0 0 240 260" role="img" aria-label={label ?? `${GUIDE_NAME}, seu guia no campus`} className={cn("prof-guide", `prof-${mood}`, className)}>
      {bubble && <circle cx="120" cy="142" r="112" className="fill-guide-halo" />}
      <g className="prof-body">
        <path d="M56 114Q39 76 48 48Q71 58 86 76Q119 54 154 76Q169 58 192 48Q201 82 182 119L177 191Q165 230 120 237Q75 230 63 191Z" className="fill-guide-feather-shade" />
        <path d="M60 115Q45 80 53 56Q75 64 91 84Q120 66 149 84Q165 64 187 56Q195 83 180 119L174 190Q162 224 120 230Q78 224 66 190Z" className="fill-guide-feather" />
        <path d="M72 154Q74 112 120 105Q166 112 168 154Q168 207 120 216Q72 207 72 154Z" className="fill-guide-belly" />
        <path d="M68 118Q73 83 101 85Q116 87 120 105Q124 87 139 85Q167 83 172 118Q169 147 145 151Q131 153 120 141Q109 153 95 151Q71 147 68 118Z" className="fill-guide-face" />

        <g className="prof-wing prof-wing-left">
          <path d="M69 137Q43 128 29 151Q34 177 68 189Q79 169 78 148Z" className="fill-guide-wing" />
          <path d="M65 151Q50 154 41 163M67 162Q54 167 49 175" fill="none" className="stroke-guide-wing-shade" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className="prof-wing prof-wing-right">
          <path d="M171 137Q197 128 211 151Q206 177 172 189Q161 169 162 148Z" className="fill-guide-wing" />
          <path d="M175 151Q190 154 199 163M173 162Q186 167 191 175" fill="none" className="stroke-guide-wing-shade" strokeWidth="3" strokeLinecap="round" />
        </g>

        {eyesClosed ? (
          <g fill="none" className="stroke-guide-ink" strokeWidth="4" strokeLinecap="round">
            <path d="M83 119Q97 105 111 119" />
            <path d="M129 119Q143 105 157 119" />
          </g>
        ) : (
          <g className="prof-eyes">
            <Eye cx={97} lookY={mood === "think" ? -5 : 0} />
            {mood === "wink" ? (
              <path d="M130 118Q143 128 156 118" fill="none" className="stroke-guide-ink" strokeWidth="4" strokeLinecap="round" />
            ) : (
              <Eye cx={143} lookY={mood === "think" ? -5 : 0} />
            )}
          </g>
        )}

        <path d="M112 132L120 145L128 132Q120 136 112 132Z" className="fill-guide-beak" />
        <path d="M116 145Q120 149 124 145" fill="none" className="stroke-guide-beak-shade" strokeWidth="2" strokeLinecap="round" />
        {mood === "wow" && <ellipse cx="120" cy="160" rx="5" ry="6" className="fill-guide-mouth" />}
        {mood === "talk" && <path d="M114 159Q120 167 126 159" fill="none" className="stroke-guide-mouth" strokeWidth="3" strokeLinecap="round" />}
        {mood === "cheer" && <path d="M110 158Q120 170 130 158" fill="none" className="stroke-guide-mouth" strokeWidth="3" strokeLinecap="round" />}
        {mood !== "wow" && mood !== "talk" && mood !== "cheer" && <path d="M114 159Q120 164 126 159" fill="none" className="stroke-guide-mouth" strokeWidth="2.5" strokeLinecap="round" />}

        <path d="M97 226L92 234M143 226L148 234" fill="none" className="stroke-guide-beak" strokeWidth="4" strokeLinecap="round" />
        <path d="M88 235H99M141 235H152" fill="none" className="stroke-guide-beak" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      {(mood === "cheer" || mood === "wave") && (
        <g className="prof-sparkles fill-guide-spark">
          <path d="M28 86l3-8 3 8 8 3-8 3-3 8-3-8-8-3z" />
          <path d="M196 60l3-8 3 8 8 3-8 3-3 8-3-8-8-3z" />
          {mood === "cheer" && <path d="M35 184l2-6 2 6 6 2-6 2-2 6-2-6-6-2z" />}
        </g>
      )}
      {mood === "think" && (
        <g className="fill-guide-halo-strong">
          <circle cx="190" cy="62" r="5" /><circle cx="202" cy="44" r="8" /><circle cx="218" cy="22" r="12" />
        </g>
      )}
    </svg>
  );
}

export { Belinho as Titia };

function Eye({ cx, lookY }: { cx: number; lookY: number }) {
  return (
    <g>
      <ellipse cx={cx} cy="115" rx="15" ry="17" className="fill-guide-white" />
      <ellipse cx={cx + 1} cy={116 + lookY} rx="10" ry="12" className="fill-guide-eye" />
      <ellipse cx={cx + 2} cy={117 + lookY} rx="5.5" ry="7" className="fill-guide-ink" />
      <circle cx={cx - 2} cy={111 + lookY} r="3.5" className="fill-guide-white" />
      <circle cx={cx + 5} cy={121 + lookY} r="1.8" className="fill-guide-white" />
    </g>
  );
}
