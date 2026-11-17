import { CameraOff } from "lucide-react";
import { NO_PHOTO_NOTE, type Place } from "@/data/school";
import { cn } from "@/lib/utils";

/** Shows only the place's own real photo; otherwise says plainly that no photo exists yet. */
export function PlacePhoto({ place, className, loading }: { place: Place; className?: string; loading?: "lazy" | "eager" }) {
  if (!place.photo) return <div role="img" aria-label={`${place.name}: ${NO_PHOTO_NOTE}`} className={cn("no-photo p-4", className)}><CameraOff className="h-7 w-7" /><span className="max-w-60 text-xs font-bold">{NO_PHOTO_NOTE}</span></div>;
  return <img src={place.photo} alt={place.photoCaption ?? place.name} loading={loading} className={cn("object-cover", place.id === "lab1" && "bg-secondary object-contain", className)} />;
}
