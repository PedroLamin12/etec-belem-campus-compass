import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Compass, FileText, Map } from "lucide-react";
import logo from "@/assets/branding/campus-mark.svg";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/AppShell";

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

export function Welcome({ onDone }: { onDone: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!mounted) return null;

  const finish = () => {
    markWelcomeSeen();
    onDone();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Boas-vindas ao Tour ETEC Parque Belém"
      className="fixed inset-0 z-[60] flex flex-col bg-background"
    >
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center overflow-y-auto px-6 py-12">
        <header className="flex items-center gap-4">
          <img
            src={logo}
            alt="ETEC Parque Belém"
            width={64}
            height={64}
            className="h-16 w-16 shrink-0"
          />
          <div>
            <p className="eyebrow text-primary">Guia oficial de navegação</p>
            <h1 className="mt-1 font-display text-2xl font-semibold leading-tight">
              Tour ETEC Parque Belém
            </h1>
          </div>
        </header>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Consulte o mapa, encontre ambientes e planeje seu percurso pelo campus.
        </p>
        <div className="mt-8 grid gap-3">
          <Button asChild size="lg" onClick={finish} className="justify-start">
            <Link to="/rota" search={{ de: "portaria", para: "secretaria" }}>
              <FileText className="!h-5 !w-5" />
              Fazer Matrícula
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" onClick={finish} className="justify-start">
            <Link to="/mapa">
              <Map className="!h-5 !w-5" />
              Ver Mapa do Campus
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={finish} className="justify-start">
            <Compass className="!h-5 !w-5" />
            Explorar Ambientes
          </Button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-md px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <Button variant="ghost" onClick={finish} className="w-full text-muted-foreground">
          Acessar início
        </Button>
      </div>
    </div>,
    document.body,
  );
}
