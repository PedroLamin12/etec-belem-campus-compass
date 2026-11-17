import { PlacePhoto } from "@/components/PlacePhoto";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Flag, Footprints, MoveDown, MoveUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CampusMascot } from "@/components/CampusMascot";
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
  return <>
    <Button className="h-12 w-full" onClick={() => { setStep(0); setOpen(true); }}><Footprints className="h-5 w-5" />Ir com Bê<ArrowRight /></Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="walk-dialog w-[calc(100%-32px)] max-w-md overflow-hidden rounded-lg border-border bg-card p-0">
        <div className="px-5 pb-3 pt-5"><p className="eyebrow text-primary">{last ? "CHEGAMOS AO DESTINO" : "BÊ TÁ COM VOCÊ"} · {step + 1}/{route.length}</p><DialogTitle className="mt-2 pr-5 font-display text-xl leading-snug">{nodes[id].label}</DialogTitle><DialogDescription className="mt-1 text-xs">{nodeLocation(id)}</DialogDescription><div className="walk-progress mt-4" aria-label={`Etapa ${step + 1} de ${route.length}`}>{route.map((node, index) => <span key={`${node}-${index}`} className={index <= step ? "completed" : ""} />)}</div></div>
        {currentPlace && <figure><PlacePhoto place={currentPlace} className="h-[190px] w-full" />{currentPlace.photoCaption && <figcaption className="px-5 pt-2 text-[10px] text-muted-foreground">{currentPlace.photoCaption}</figcaption>}</figure>}
        <div key={id} className="page-enter px-5 pb-5"><div className="flex items-center gap-2 border-b pb-3"><CampusMascot className="h-24 w-20 shrink-0" /><div>{transition && <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-brand-yellow">{transition === "down" ? <><MoveDown className="h-4 w-4" />Desça a escada</> : <><MoveUp className="h-4 w-4" />Suba a escada</>}</p>}<p className="text-xs leading-relaxed">{nodes[id].landmark}</p></div></div>
          <div className="mt-4 flex items-center gap-3"><Button variant="outline" size="icon" aria-label="Etapa anterior" title="Etapa anterior" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}><ArrowLeft /></Button>{last ? <Button className="h-11 flex-1 whitespace-normal" onClick={() => { setOpen(false); if (!done) checkIn(destination.id); }}>{done ? <><Flag />Destino já descoberto</> : <><CheckCircle2 />Cheguei — fazer check-in</>}</Button> : <Button className="h-11 flex-1" onClick={() => setStep((value) => Math.min(route.length - 1, value + 1))}>{step === 0 ? "Vamos nessa" : "Próxima etapa"}<ArrowRight /></Button>}</div>
        </div>
      </DialogContent>
    </Dialog>
  </>;
}