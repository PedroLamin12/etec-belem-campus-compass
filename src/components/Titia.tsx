import { cn } from "@/lib/utils";

export type GuideMood = "happy" | "talk" | "wink" | "wow" | "think" | "cheer" | "wave";

export const GUIDE_NAME = "Titia";

/** Original illustrated guide inspired by one of the supporting teachers: short blond bowl cut, round glasses, shearling jacket. */
export function Titia({ mood = "happy", className, bubble = false, label }: { mood?: GuideMood; className?: string | undefined; bubble?: boolean; label?: string }) {
  const closedEyes = mood === "cheer";
  const raisedArm = mood === "wave" || mood === "cheer";
  return (
    <svg viewBox="0 0 240 260" role="img" aria-label={label ?? `${GUIDE_NAME}, sua guia no campus`} className={cn("prof-guide", `prof-${mood}`, className)}>
      {bubble && <circle cx="120" cy="140" r="112" className="fill-guide-halo" />}
      <g className="prof-body">
        {/* back hair: short bowl */}
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
        <ellipse cx="94" cy="144" rx="9" ry="5.5" className="fill-guide-blush prof-blush" />
        <ellipse cx="146" cy="144" rx="9" ry="5.5" className="fill-guide-blush prof-blush" />
        {/* bowl cut: rounded cap, short sides, straight little fringe */}
        <path d="M64 128Q56 62 120 46Q184 62 176 128Q172 134 166 130Q167 108 160 98L152 102L144 95L135 101L126 94L117 101L108 95L99 101L90 96L80 100Q73 108 74 130Q68 134 64 128Z" className="fill-guide-hair" />
        <path d="M86 66Q104 54 124 54M140 56Q156 60 166 74" fill="none" className="stroke-guide-hair-light" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M70 108Q70 120 72 128M170 108Q170 120 168 128" fill="none" className="stroke-guide-hair-shade" strokeWidth="2" strokeLinecap="round" />
        {/* brows */}
        <g className={cn("prof-brows", mood === "wow" && "prof-brows-up")} fill="none" strokeWidth="2.6" strokeLinecap="round">
          <path d="M91 104Q100 101 109 103" className="stroke-guide-hair-shade" />
          <path d="M131 103Q140 101 149 104" className="stroke-guide-hair-shade" />
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
        {/* raised arm */}
        {raisedArm && (
          <g className="prof-arm">
            <path d="M176 214Q204 196 206 152L226 156Q230 204 200 236Z" className="fill-guide-jacket" />
            <path d="M203 156L228 160" className="stroke-guide-collar" strokeWidth="9" strokeLinecap="round" />
            <g className="fill-guide-skin stroke-guide-skin-line" strokeWidth="1.6">
              <rect x="203" y="110" width="8" height="26" rx="4" transform="rotate(-12 207 123)" />
              <rect x="212" y="104" width="8" height="28" rx="4" transform="rotate(-4 216 118)" />
              <rect x="221" y="105" width="8" height="27" rx="4" transform="rotate(5 225 118)" />
              <rect x="229" y="112" width="7.5" height="23" rx="3.75" transform="rotate(14 233 123)" />
              <path d="M202 140Q200 126 212 124H230Q238 126 236 142Q232 158 218 158Q204 156 202 140Z" />
              <path d="M204 142Q194 134 196 126Q200 122 206 130" />
            </g>
            </g>
        )}
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
