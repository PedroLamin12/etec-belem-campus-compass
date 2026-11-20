import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, CalendarDays, Compass, FileText, GraduationCap, Map, Navigation, Trophy } from "lucide-react";
import logo from "@/assets/branding/campus-mark.svg";
import { Button } from "@/components/ui/button";
import { Titia, GUIDE_NAME } from "@/components/Titia";
import { ThemeToggle } from "@/components/AppShell";

export const WELCOME_KEY = "tour-etec-welcome-done";

const goals = [
  { id: "matricula", label: "Fazer matrícula", icon: FileText, place: "secretaria" },
  { id: "conhecer", label: "Conhecer a escola", icon: Compass },
  { id: "calouro", label: "Sou aluno novo", icon: GraduationCap },
  { id: "evento", label: "Vim para um evento", icon: CalendarDays, place: "auditorio" },
] as const;

export function Welcome({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<(typeof goals)[number]>();
  const finish = () => { try { localStorage.setItem(WELCOME_KEY, "1"); } catch { /* storage unavailable */ } onDone(); };
  const target = goal && "place" in goal ? goal.place : undefined;
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); const prev = document.body.style.overflow; document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = prev; }; }, []);
  if (!mounted) return null;
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Boas-vindas ao Tour ETEC Belém" className="fixed inset-0 z-[60] flex flex-col bg-background">
      {step > 0 && <div className="mx-auto flex w-full max-w-md items-center gap-3 px-4 pt-5">
        <Button variant="ghost" size="icon" aria-label="Voltar" onClick={() => setStep((s) => s - 1)}><ArrowLeft className="!h-5 !w-5" /></Button>
        <div className="progress-track flex-1"><div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }} /></div>
      </div>}
      <div key={step} className="welcome-step mx-auto flex w-full max-w-md flex-1 flex-col overflow-y-auto px-6 py-6">
        {step === 0 && <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="absolute right-4 top-4"><ThemeToggle /></div>
          <img src={logo} alt="" width={72} height={72} className="h-[72px] w-[72px]" />
          <h1 className="mt-4 font-display text-4xl font-semibold">Tour <span className="text-primary">ETEC</span> Belém</h1>
          <p className="mt-2 max-w-xs text-muted-foreground">O jeito mais fácil de conhecer a ETEC Parque Belém.</p>
          <Titia mood="wave" bubble className="mt-6 h-56 w-56" />
        </div>}
        {step === 1 && <div className="flex flex-1 flex-col justify-center">
          <div className="speech type-in self-start text-lg">Oi! Eu sou a <span className="text-primary">{GUIDE_NAME}</span>. Vou te levar por cada cantinho da escola, passo a passo.</div>
          <Titia mood="talk" bubble className="mx-auto mt-6 h-60 w-60" />
        </div>}
        {step === 2 && <div>
          <div className="flex items-center gap-3"><Titia mood="think" className="h-20 w-16 shrink-0" /><h2 className="font-display text-2xl font-semibold leading-tight">O que te traz à ETEC hoje?</h2></div>
          <div className="mt-6 grid gap-3">{goals.map((g) => <button type="button" key={g.id} aria-pressed={goal?.id === g.id} onClick={() => setGoal(g)} className="choice-card flex items-center gap-4 p-4 text-left font-extrabold"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary"><g.icon className="h-5 w-5" /></span>{g.label}</button>)}</div>
        </div>}
        {step === 3 && <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Titia mood="cheer" bubble className="h-48 w-48" />
          <h2 className="mt-4 font-display text-3xl font-semibold">Tudo pronto!</h2>
          <ul className="mt-6 grid w-full gap-3 text-left text-sm">
            {[{ icon: Map, t: "Mapa com os dois prédios e as quadras" }, { icon: Navigation, t: "Rotas passo a passo a partir da Portaria" }, { icon: Trophy, t: "Check-ins valem XP e o selo de Conhecedor" }].map((r) => <li key={r.t} className="flex items-center gap-3 rounded-2xl border-2 bg-card p-3"><r.icon className="h-5 w-5 shrink-0 text-primary" />{r.t}</li>)}
          </ul>
        </div>}
      </div>
      <div className="mx-auto grid w-full max-w-md gap-2 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        {step === 0 && <><Button size="lg" onClick={() => setStep(1)}>Começar</Button><Button variant="ghost" onClick={finish}>Já conheço, pular</Button></>}
        {step === 1 && <Button size="lg" onClick={() => setStep(2)}>Continuar</Button>}
        {step === 2 && <Button size="lg" disabled={!goal} onClick={() => setStep(3)}>Continuar</Button>}
        {step === 3 && (target
          ? <Button asChild size="lg" onClick={finish}><Link to="/rota" search={{ de: "portaria", para: target }}>{target === "secretaria" ? "Me leva até a Secretaria" : "Me leva até o Auditório"}</Link></Button>
          : <Button size="lg" onClick={finish}>Começar a trilha</Button>)}
      </div>
    </div>,
    document.body,
  );
}
