import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Footprints,
  MapPin,
  MoveDown,
  MoveUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PlacePhoto } from "@/components/PlacePhoto";
import {
  floorTransition,
  nodeLocation,
  nodes,
  placeByNode,
  type NodeId,
  type Place,
} from "@/data/school";
import { checkIn, useProgress } from "@/data/progress";

export function GuidedWalk({ route, destination }: { route: NodeId[]; destination: Place }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const { visited } = useProgress();
  const id = route[step];
  if (!id) return null;
  const previous = route[step - 1];
  const transition = previous ? floorTransition(previous, id) : null;
  const currentPlace = placeByNode(id);
  const last = step === route.length - 1;
  const done = visited.includes(destination.id);
  const pct = ((step + 1) / route.length) * 100;
  return (
    <>
      <Button
        size="lg"
        className="w-full"
        onClick={() => {
          setStep(0);
          setOpen(true);
        }}
      >
        <Footprints className="!h-5 !w-5" />
        Iniciar percurso
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[100dvh] w-full max-w-none flex-col gap-0 rounded-none border-0 bg-background p-0 sm:h-auto sm:max-h-[90dvh] sm:max-w-md sm:rounded-2xl sm:border">
          <div className="flex items-center gap-3 px-4 pb-3 pr-14 pt-5">
            <div
              className="progress-track flex-1"
              role="progressbar"
              aria-label={`Etapa ${step + 1} de ${route.length}`}
              aria-valuenow={step + 1}
              aria-valuemin={1}
              aria-valuemax={route.length}
            >
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs font-extrabold text-muted-foreground">
              {step + 1}/{route.length}
            </span>
          </div>
          <div key={id} className="welcome-step flex-1 overflow-y-auto px-4 pb-4">
            {currentPlace && (
              <PlacePhoto place={currentPlace} className="mb-4 aspect-video w-full rounded-2xl" />
            )}
            {transition && (
              <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-yellow-soft px-3 py-1.5 text-xs font-extrabold text-foreground">
                {transition === "down" ? (
                  <>
                    <MoveDown className="h-4 w-4" />
                    Desça a escada
                  </>
                ) : (
                  <>
                    <MoveUp className="h-4 w-4" />
                    Suba a escada
                  </>
                )}
              </p>
            )}
            <DialogTitle className="font-display text-2xl font-semibold leading-tight">
              {nodes[id].label}
            </DialogTitle>
            <DialogDescription className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {nodeLocation(id)}
            </DialogDescription>
            <div className="mt-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Compass className="h-4 w-4 text-primary" />
                Como chegar
              </p>
              <p className="mt-2 text-sm leading-relaxed">{nodes[id].landmark}</p>
            </div>
          </div>
          <div className="border-t border-border/50 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            {last && (
              <p className="mb-3 flex items-center gap-2 font-display text-lg font-semibold">
                <CheckCircle2 className="h-5 w-5 text-success-shade" />
                Você chegou ao destino
              </p>
            )}
            {last ? (
              <Button
                variant="success"
                size="lg"
                className="w-full"
                onClick={() => {
                  setOpen(false);
                  if (!done) checkIn(destination.id);
                }}
              >
                <CheckCircle2 className="!h-5 !w-5" />
                {done ? "Check-in concluído · fechar" : "Fazer check-in"}
              </Button>
            ) : (
              <div className="flex gap-3">
                {step > 0 && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setStep((v) => Math.max(0, v - 1))}
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() => setStep((v) => Math.min(route.length - 1, v + 1))}
                >
                  {step === 0 ? "Próxima etapa" : "Continuar"}
                  <ArrowRight />
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
