import { cn } from "@/lib/utils";

/** Original hand-drawn capybara: an explorer, not a chatbot or robot. */
export function CampusMascot({ className, mood = "wave" }: { className?: string; mood?: "wave" | "celebrate" | "peek" }) {
  return <svg viewBox="0 0 220 240" role="img" aria-label="Bê, a capivara exploradora do campus" className={cn("campus-mascot", className)}>
    <ellipse cx="108" cy="224" rx="65" ry="8" className="fill-mascot-shadow" />
    <g className={mood === "celebrate" ? "mascot-celebrate" : "mascot-body"}>
      <path d="M63 179 57 211Q57 224 82 220L91 187M123 188 127 216Q144 229 161 215L150 178" className="fill-mascot-fur stroke-mascot-ink" strokeWidth="4" />
      <path d="M57 207q15 6 30 0l-1 13q-29 10-31-3zM129 211q17 6 30-4l5 10q-15 14-37 3z" className="fill-mascot-ink" />
      <path d="M57 115q-23 24-18 65 12 21 28-2l12-47" className="fill-brand-red stroke-mascot-ink" strokeWidth="4" />
      <g className="mascot-wave"><path d="M148 121q19-3 33-28l-4-13q-1-16 11-13l5 9q14-10 18 2 4 17-10 27-17 44-40 43" className="fill-mascot-fur stroke-mascot-ink" strokeWidth="4" strokeLinecap="round" /><path d="m165 139 12-28-20-9-18 29" className="fill-brand-red stroke-mascot-ink" strokeWidth="4" /></g>
      <path d="M59 115Q103 95 149 119l15 64q-10 24-42 21H86q-30-2-36-17z" className="fill-brand-red stroke-mascot-ink" strokeWidth="4" />
      <path d="m93 117 15 12 14-11 10 83H91z" className="fill-mascot-shirt" />
      <path d="m80 121 13 28 15-20-15-12M134 121l-12 26-14-18 14-11" className="fill-mascot-jacket-light" />
      <path d="m139 116-56 80" className="stroke-mascot-ink" strokeWidth="7" />
      <rect x="64" y="166" width="43" height="35" rx="9" className="fill-brand-yellow stroke-mascot-ink" strokeWidth="4" />
      <path d="m85 173 6 11-6 10-6-10z" className="fill-mascot-ink" />
      <path d="M51 69Q27 41 43 28q18-10 27 22M141 51q6-31 24-19 11 15-8 35" className="fill-mascot-fur stroke-mascot-ink" strokeWidth="4" />
      <path d="M43 78Q34 46 74 39q47-10 74 14 26 21 22 56-5 39-64 34-60 3-65-30z" className="fill-mascot-fur stroke-mascot-ink" strokeWidth="4" />
      <path d="M42 93q27-16 61-4 15 6 14 30-3 26-37 24-37-3-38-26z" className="fill-mascot-muzzle" />
      <path d="M53 107q8-6 15 1" fill="none" className="stroke-mascot-ink" strokeWidth="5" strokeLinecap="round" />
      <path d="M54 125q13 9 30-1" fill="none" className="stroke-mascot-ink" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="84" cy="80" rx="5" ry="7" className="fill-mascot-ink" /><ellipse cx="137" cy="79" rx="5" ry="7" className="fill-mascot-ink" />
      <circle cx="86" cy="78" r="1.6" className="fill-mascot-shirt" /><circle cx="139" cy="77" r="1.6" className="fill-mascot-shirt" />
      <path d="m77 65 12-3M132 63l11 3" fill="none" className="stroke-mascot-ink" strokeWidth="3" strokeLinecap="round" />
      <path d="m104 42 8-9 5 10" fill="none" className="stroke-mascot-ink" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="147" cy="103" rx="9" ry="5" className="fill-mascot-blush" />
    </g>
    {mood === "celebrate" && <g className="fill-brand-yellow"><path d="m21 44 4-10 4 10 10 4-10 4-4 10-4-10-10-4zM185 29l3-8 3 8 8 3-8 3-3 8-3-8-8-3z" /></g>}
  </svg>;
}