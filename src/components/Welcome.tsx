import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Compass, FileText, GraduationCap, Map, Navigation, Trophy } from "lucide-react";
import logo from "@/assets/branding/campus-mark.svg";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/AppShell";
import { nextCampusMission } from "@/data/exploration";
import { useProgress } from "@/data/progress";
import { placeById } from "@/data/school";

export const WELCOME_KEY = "tour-etec-welcome-done";

export function shouldShowWelcome() {
  try {
    return sessionStorage.getItem(WELCOME_KEY) !== "1";
  } catch {
    return true;
  }
}

function markWelcomeSeen() {
  try {
    sessionStorage.setItem(WELCOME_KEY, "1");
  } catch {
    /* storage unavailable */
  }
}

const goals = [
  { id: "matricula", label: "Fazer matrícula", icon: FileText },
  { id: "conhecer", label: "Conhecer a escola", icon: Compass },
  { id: "calouro", label: "Sou aluno novo", icon: GraduationCap },
] as const;

export function Welcome({ onDone }: { onDone: () => void }) {
  const [goal, setGoal] = useState<(typeof goals)[number]["id"]>();
  const { visited } = useProgress();
  const next = nextCampusMission(visited);
  const target = goal ? (goal === "matricula" ? "secretaria" : next?.place) : undefined;
  const finish = () => {
    markWelcomeSeen();
    onDone();
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  if (!mounted) return null;
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Boas-vindas ao Tour ETEC Belém"
      className="fixed inset-0 z-[60] flex flex-col bg-background"
    >
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="welcome-step mx-auto flex w-full max-w-md flex-1 flex-col overflow-y-auto px-6 pb-6 pt-12">
        <div className="flex items-center gap-4">
          <img src={logo} alt="ETEC Parque Belém" width={64} height={64} className="h-16 w-16" />
          <div>
            <p className="eyebrow text-primary">Guia oficial do campus</p>
            <h1 className="mt-1 font-display text-3xl font-semibold leading-tight">
              ETEC Parque Belém
            </h1>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Encontre ambientes, consulte rotas e conheça a escola no seu próprio ritmo.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold">Como podemos ajudar?</h2>
        <div className="mt-3 grid gap-2.5">
          {goals.map((g) => (
            <button
              type="button"
              key={g.id}
              aria-pressed={goal === g.id}
              onClick={() => setGoal(g.id)}
              className="choice-card flex items-center gap-4 p-4 text-left text-sm font-semibold"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <g.icon className="h-5 w-5" />
              </span>
              {g.label}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-2 text-sm text-muted-foreground">
          {[
            { icon: Map, t: "Mapa dos prédios, áreas externas e quadras" },
            { icon: Navigation, t: "Rotas passo a passo a partir da Portaria" },
            { icon: Trophy, t: "Acompanhe sua exploração e conquistas" },
          ].map((r) => (
            <li
              key={r.t}
              className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card p-3 shadow-sm"
            >
              <r.icon className="h-5 w-5 shrink-0 text-primary" />
              {r.t}
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto grid w-full max-w-md gap-2 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        {target ? (
          <Button asChild size="lg" onClick={finish}>
            <Link to="/rota" search={{ de: "portaria", para: target }}>
              {goal === "matricula"
                ? "Ver rota para a Secretaria"
                : `Continuar tour · ${placeById(target)?.name ?? "próxima parada"}`}
            </Link>
          </Button>
        ) : (
          <Button size="lg" onClick={finish}>
            {goal ? "Começar a explorar" : "Continuar para o início"}
          </Button>
        )}
        <Button variant="ghost" onClick={finish}>
          Acessar o guia
        </Button>
      </div>
    </div>,
    document.body,
  );
}
