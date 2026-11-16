import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CampusMascot } from "@/components/CampusMascot";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CHECKIN_EVENT, type CheckInReward, useProgress } from "@/data/progress";
import { nextCampusMission } from "@/data/exploration";
import { placeById } from "@/data/school";

export function CheckInCelebration() {
  const [reward, setReward] = useState<CheckInReward>();
  const { visited } = useProgress();
  const next = nextCampusMission(visited);
  useEffect(() => {
    const celebrate = (event: Event) => {
      const detail = (event as CustomEvent<CheckInReward>).detail;
      if (!detail) return;
      setReward(detail);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && typeof navigator.vibrate === "function") navigator.vibrate([45, 35, 70]);
    };
    window.addEventListener(CHECKIN_EVENT, celebrate);
    return () => window.removeEventListener(CHECKIN_EVENT, celebrate);
  }, []);
  return <Dialog open={Boolean(reward)} onOpenChange={(open) => { if (!open) setReward(undefined); }}>
    <DialogContent className="celebration-dialog w-[calc(100%-32px)] max-w-sm overflow-hidden rounded-lg border-border bg-card px-6 py-8 text-center">
      <div className="confetti-field" aria-hidden="true">{Array.from({ length: 20 }, (_, i) => <i key={i} className={`confetti confetti-${i % 10}`} />)}</div>
      <div className="relative"><p className="eyebrow text-primary">{reward?.badge ? "PASSAPORTE COMPLETO" : "NOVO CARIMBO NO PASSAPORTE"}</p><CampusMascot mood="celebrate" className="mx-auto my-2 h-48 w-44" /><DialogTitle className="font-display text-3xl">{reward?.badge ? "Você conhece a ETEC!" : "Aí sim, explorador!"}</DialogTitle><DialogDescription className="mt-3 leading-relaxed">{placeById(reward?.placeId ?? "")?.name}<br />{reward?.badge ? "Selo Calouro ETEC Conhecedor conquistado." : "Mais um lugar. Mais uma história pra contar."}</DialogDescription>
      <div className="my-5 flex items-center justify-center gap-2 text-primary">{reward?.badge ? <Trophy className="h-6 w-6" /> : <Check className="h-5 w-5" />}<span className="font-display text-3xl font-bold">{reward?.xp ? `+${reward.xp} XP` : "Lugar descoberto"}</span></div>
      {next && <Button asChild className="h-12 w-full" onClick={() => setReward(undefined)}><Link to="/ambientes/$id" params={{ id: next.place }}>Próxima missão<ArrowRight /></Link></Button>}
      <Button variant="ghost" className="mt-2 w-full text-muted-foreground" onClick={() => setReward(undefined)}>Continuar por aqui</Button></div>
    </DialogContent>
  </Dialog>;
}