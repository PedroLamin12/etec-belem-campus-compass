import { useState } from "react";
import { ArrowRight, CheckCircle2, Footprints, MoveDown, MoveUp, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Titia, GUIDE_NAME } from "@/components/Titia";
import { PlacePhoto } from "@/components/PlacePhoto";
import { floorTransition, nodeLocation, nodes, placeByNode, type NodeId, type Place } from "@/data/school";
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
  return <>
    <Button size="lg" className="w-full" onClick={() => { setStep(0); setOpen(true); }}><Footprints className="!h-5 !w-5" />Ir com a {GUIDE_NAME}</Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex h-[100dvh] w-full max-w-none flex-col gap-0 rounded-none border-0 bg-background p-0 sm:h-auto sm:max-h-[90dvh] sm:max-w-md sm:rounded-3xl sm:border-2">
        <div className="flex items-center gap-3 px-4 pb-3 pr-14 pt-5">
          <div className="progress-track flex-1" role="progressbar" aria-label={`Etapa ${step + 1} de ${route.length}`} aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={route.length}><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
          <span className="text-xs font-extrabold text-muted-foreground">{step + 1}/{route.length}</span>
        </div>
        <div key={id} className="welcome-step flex-1 overflow-y-auto px-4 pb-4">
          {currentPlace && <PlacePhoto place={currentPlace} className="mb-4 aspect-video w-full rounded-2xl" />}
          {transition && <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-brand-yellow-soft px-3 py-1.5 text-xs font-extrabold text-foreground">{transition === "down" ? <><MoveDown className="h-4 w-4" />Desça a escada</> : <><MoveUp className="h-4 w-4" />Suba a escada</>}</p>}
          <DialogTitle className="font-display text-2xl font-semibold leading-tight">{nodes[id].label}</DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted-foreground">{nodeLocation(id)}</DialogDescription>
          <div className="mt-4 flex items-start gap-2"><Titia mood={last ? "cheer" : "talk"} className="h-20 w-16 shrink-0" /><p className="speech ml-2 flex-1 text-sm">{nodes[id].landmark}</p></div>
        </div>
        <div className={`border-t-2 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] ${last ? "bg-success-soft" : ""}`}>
          {last && <p className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-success-shade"><PartyPopper className="h-5 w-5" />Você chegou!</p>}
          {last
            ? <Button variant="success" size="lg" className="w-full" onClick={() => { setOpen(false); if (!done) checkIn(destination.id); }}><CheckCircle2 className="!h-5 !w-5" />{done ? "Já descoberto — fechar" : "Fazer check-in"}</Button>
            : <div className="flex gap-3">{step > 0 && <Button variant="outline" size="lg" onClick={() => setStep((v) => Math.max(0, v - 1))}>Voltar</Button>}<Button size="lg" className="flex-1" onClick={() => setStep((v) => Math.min(route.length - 1, v + 1))}>{step === 0 ? "Vamos lá" : "Continuar"}<ArrowRight /></Button></div>}
        </div>
      </DialogContent>
    </Dialog>
  </>;
}
