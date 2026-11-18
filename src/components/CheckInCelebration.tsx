import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Titia } from "@/components/Titia";
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
  const close = () => setReward(undefined);
  return <Dialog open={Boolean(reward)} onOpenChange={(open) => { if (!open) close(); }}>
    <DialogContent className="w-[calc(100%-24px)] max-w-sm overflow-hidden rounded-3xl border-2 bg-card px-6 pb-6 pt-8 text-center">
      <div className="confetti-field" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <i key={i} className={`confetti confetti-${i % 11}`} />)}</div>
      <div className="relative">
        <Titia mood="cheer" bubble className="mx-auto h-40 w-40" />
        <DialogTitle className="mt-3 font-display text-3xl font-semibold">{reward?.badge ? "Você conhece a ETEC!" : "Mandou bem!"}</DialogTitle>
        <DialogDescription className="mt-1 text-sm">{placeById(reward?.placeId ?? "")?.name} descoberto{reward?.badge ? " · Selo Calouro ETEC Conhecedor" : ""}</DialogDescription>
        <p className="xp-burst mx-auto mt-5 flex w-fit items-center gap-2 rounded-2xl border-2 border-brand-yellow-shade bg-brand-yellow-soft px-5 py-2 font-display text-2xl font-bold"><Zap className="h-6 w-6 fill-brand-yellow text-brand-yellow-shade" />+{reward?.xp ?? 0} XP</p>
        <div className="mt-6 grid gap-2">
          {next ? <Button asChild size="lg" onClick={close}><Link to="/ambientes/$id" params={{ id: next.place }}>Próxima parada<ArrowRight /></Link></Button> : <Button size="lg" onClick={close}>Continuar</Button>}
          {next && <Button variant="ghost" onClick={close}>Ficar por aqui</Button>}
        </div>
      </div>
    </DialogContent>
  </Dialog>;
}
