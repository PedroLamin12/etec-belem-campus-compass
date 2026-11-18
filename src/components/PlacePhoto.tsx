import { CameraOff } from "lucide-react";
import { NO_PHOTO_NOTE, type Place } from "@/data/school";
import { cn } from "@/lib/utils";

/** Shows only the place's own real photo; otherwise says plainly that no photo exists yet. */
export function PlacePhoto({ place, className, loading, compact = false }: { place: Place; className?: string; loading?: "lazy" | "eager"; compact?: boolean }) {
  if (!place.photo) return (
    <div role="img" aria-label={`${place.name}: ${NO_PHOTO_NOTE}`} className={cn("no-photo p-3", className)}>
      <CameraOff className={compact ? "h-5 w-5" : "h-7 w-7"} />
      <span className={cn("max-w-64 font-bold", compact ? "text-[11px]" : "text-xs")}>{compact ? "Sem foto ainda" : NO_PHOTO_NOTE}</span>
    </div>
  );
  return <img src={place.photo} alt={place.photoCaption ?? place.name} loading={loading} className={cn("object-cover", place.id === "lab1" && "bg-secondary", className)} />;
}
