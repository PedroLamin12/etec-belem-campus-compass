import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      if (
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        typeof navigator.vibrate === "function"
      )
        navigator.vibrate([45, 35, 70]);
    };
    window.addEventListener(CHECKIN_EVENT, celebrate);
    return () => window.removeEventListener(CHECKIN_EVENT, celebrate);
  }, []);
  const close = () => setReward(undefined);
  return (
    <Dialog
      open={Boolean(reward)}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent className="w-[calc(100%-24px)] max-w-sm overflow-hidden rounded-2xl border border-border/50 bg-card px-6 pb-6 pt-8 text-center shadow-sm">
        <div className="relative">
          <CheckCircle2 className="mx-auto h-12 w-12 text-success-shade" />
          <DialogTitle className="mt-3 font-display text-2xl font-semibold">
            {reward?.badge ? "Exploração concluída" : "Ambiente registrado"}
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm">
            {placeById(reward?.placeId ?? "")?.name} · check-in confirmado
            {reward?.badge ? " · Passaporte concluído" : ""}
          </DialogDescription>
          <div className="mt-6 grid gap-2">
            {next ? (
              <Button asChild size="lg" onClick={close}>
                <Link to="/ambientes/$id" params={{ id: next.place }}>
                  Próxima parada
                  <ArrowRight />
                </Link>
              </Button>
            ) : (
              <Button size="lg" onClick={close}>
                Continuar
              </Button>
            )}
            {next && (
              <Button variant="ghost" onClick={close}>
                Fechar
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
