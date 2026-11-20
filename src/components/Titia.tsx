import { cn } from "@/lib/utils";

export type GuideMood = "happy" | "talk" | "wink" | "wow" | "think" | "cheer" | "wave";

export const GUIDE_NAME = "Titia";

/** Original illustrated guide with swept-back hair, round glasses, and a shearling jacket. */
export function Titia({ mood = "happy", className, bubble = false, label }: { mood?: GuideMood; className?: string | undefined; bubble?: boolean; label?: string }) {
  const closedEyes = mood === "cheer";
  return (
    <svg viewBox="0 0 240 260" role="img" aria-label={label ?? `${GUIDE_NAME}, sua guia no campus`} className={cn("prof-guide", `prof-${mood}`, className)}>
      {bubble && <circle cx="120" cy="140" r="112" className="fill-guide-halo" />}
      <g className="prof-body">
        {/* back hair */}
        <path d="M64 130Q52 78 82 54Q120 28 158 54Q188 78 176 130Q170 136 164 130L162 108H78L76 130Q70 136 64 130Z" className="fill-guide-hair-shade" />
        {/* body */}
        <path d="M20 262Q22 204 80 188L102 182Q120 198 138 182L160 188Q218 204 220 262Z" className="fill-guide-jacket" />
        <path d="M44 262Q48 222 70 204M196 262Q192 222 170 204" fill="none" className="stroke-guide-jacket-shade" strokeWidth="3" strokeLinecap="round" />
        <path d="M96 186Q120 216 144 186L152 262H88Z" className="fill-guide-top" />
        <path d="M100 188Q120 210 140 188" fill="none" className="stroke-guide-top-shade" strokeWidth="3" />
        {/* neck */}
        <path d="M105 160V188Q120 198 135 188V160Z" className="fill-guide-skin-shade" />
        {/* shearling collar */}
        <g className="fill-guide-collar stroke-guide-collar" strokeWidth="7" strokeLinecap="round" strokeDasharray="0.1 7.5" strokeLinejoin="round">
          <path d="M100 182Q78 186 56 198Q64 226 92 252Q96 226 108 208Q102 196 100 182Z" />
          <path d="M140 182Q162 186 184 198Q176 226 148 252Q144 226 132 208Q138 196 140 182Z" />
        </g>
        <path d="M70 206Q80 222 92 236M170 206Q160 222 148 236" fill="none" className="stroke-guide-collar-shade" strokeWidth="2" strokeLinecap="round" />
        {/* ears */}
        <ellipse cx="72" cy="122" rx="8" ry="12" className="fill-guide-skin-shade" />
        <ellipse cx="168" cy="122" rx="8" ry="12" className="fill-guide-skin-shade" />
        {/* face */}
        <path d="M74 104Q72 162 120 174Q168 162 166 104Q164 56 120 54Q76 56 74 104Z" className="fill-guide-skin" />
        {/* Smooth crown and sides frame the face; separated locks leave the forehead visible. */}
        <path d="M64 128Q56 62 120 46Q184 62 176 128Q171 133 165 129L162 105Q157 86 144 77Q133 69 120 68Q106 69 95 77Q82 87 78 105L75 129Q69 133 64 128Z" className="fill-guide-hair" />
        <path d="M97 76Q104 70 112 68Q106 79 102 91Q99 97 96 92Q94 85 100 77Z" className="fill-guide-hair" />
        <path d="M113 68Q120 66 127 68Q122 78 121 92Q120 99 116 95Q113 89 117 78Z" className="fill-guide-hair" />
        <path d="M130 69Q138 71 145 77Q138 84 136 96Q134 101 131 96Q128 90 134 80Z" className="fill-guide-hair" />
        <path d="M86 66Q104 54 124 54M140 56Q156 60 166 74M99 77Q97 83 96 88M117 76Q115 83 115 88M136 78Q133 84 133 89" fill="none" className="stroke-guide-hair-light" strokeWidth="3.4" strokeLinecap="round" />
        {/* brows */}
        <g className={cn("prof-brows", (mood === "wow" || mood === "cheer") && "prof-brows-up")} fill="none" strokeWidth="2.6" strokeLinecap="round">
          <path d={mood === "think" ? "M91 101Q100 95 109 101" : "M91 104Q100 101 109 103"} className="stroke-guide-hair-shade" />
          <path d={mood === "wink" ? "M131 99Q140 97 149 102" : "M131 103Q140 101 149 104"} className="stroke-guide-hair-shade" />
        </g>
        {/* eyes */}
        {closedEyes ? (
          <g fill="none" className="stroke-guide-ink" strokeWidth="3.5" strokeLinecap="round">
            <path d="M90 120Q100 108 110 120" /><path d="M130 120Q140 108 150 120" />
          </g>
        ) : (
          <g className="prof-eyes">
            <Eye cx={100} look={mood === "think" ? 2 : 0} />
            {mood === "wink" ? (
              <path d="M130 118Q140 124 150 118" fill="none" className="stroke-guide-ink" strokeWidth="3.5" strokeLinecap="round" />
            ) : (
              <Eye cx={140} look={mood === "think" ? 2 : 0} />
            )}
          </g>
        )}
        {/* glasses */}
        <g fill="none" className="stroke-guide-frame" strokeWidth="2.6">
          <rect x="83" y="101" width="34" height="32" rx="14" className="fill-guide-lens" />
          <rect x="123" y="101" width="34" height="32" rx="14" className="fill-guide-lens" />
          <path d="M117 112Q120 108 123 112M83 113L74 110M157 113L166 110" strokeLinecap="round" />
        </g>
        {/* nose */}
        <path d="M121 130Q125 138 119 140" fill="none" className="stroke-guide-skin-line" strokeWidth="2.2" strokeLinecap="round" />
        {/* mouth */}
        <Mouth mood={mood} />
      </g>
      {(mood === "cheer" || mood === "wave") && (
        <g className="prof-sparkles fill-guide-spark">
          <path d="M30 70l4-11 4 11 11 4-11 4-4 11-4-11-11-4z" />
          <path d="M196 40l3-8 3 8 8 3-8 3-3 8-3-8-8-3z" />
          {mood === "cheer" && <path d="M40 160l2.5-6 2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5z" />}
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

function Eye({ cx, look }: { cx: number; look: number }) {
  return (
    <g>
      <ellipse cx={cx} cy="118" rx="10.5" ry="11.5" className="fill-guide-white" />
      <ellipse cx={cx + 1 + look} cy="119.5" rx="8.6" ry="10" className="fill-guide-eye" />
      <ellipse cx={cx + 1 + look} cy="120.5" rx="4.6" ry="5.6" className="fill-guide-ink" />
      <circle cx={cx - 2.5 + look} cy="114.5" r="3.2" className="fill-guide-white" />
      <circle cx={cx + 4 + look} cy="124" r="1.5" className="fill-guide-white" />
      <path d={`M${cx - 12} 113Q${cx} 102 ${cx + 12} 112L${cx + 15} 108`} fill="none" className="stroke-guide-ink" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Mouth({ mood }: { mood: GuideMood }) {
  if (mood === "wow") return <ellipse cx="120" cy="154" rx="6" ry="7.5" className="fill-guide-mouth" />;
  if (mood === "think") return <path d="M111 154Q118 151 128 155" fill="none" className="stroke-guide-lip" strokeWidth="3" strokeLinecap="round" />;
  if (mood === "cheer") return <g><path d="M104 148Q120 172 136 148Q120 154 104 148Z" className="fill-guide-mouth" /><path d="M112 160Q120 166 128 160Q120 156 112 160Z" className="fill-guide-tongue" /></g>;
  if (mood === "talk") return <g><path d="M108 150Q120 164 132 150Q120 154 108 150Z" className="fill-guide-mouth prof-mouth-open" /><path d="M108 151Q120 160 132 150" fill="none" className="stroke-guide-lip prof-mouth-closed" strokeWidth="3" strokeLinecap="round" /></g>;
  return <path d="M107 149Q120 162 133 149" fill="none" className="stroke-guide-lip" strokeWidth="3.2" strokeLinecap="round" />;
}
