import { ProfGuide } from "@/components/ProfGuide";

/** Compatibility wrapper: every screen now shows the teacher guide. */
export function CampusMascot({ className, mood = "wave" }: { className?: string; mood?: "wave" | "celebrate" | "peek" }) {
  return <ProfGuide className={className} mood={mood === "celebrate" ? "cheer" : mood === "peek" ? "happy" : "wave"} />;
}
