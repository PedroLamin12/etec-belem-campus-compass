import { Link, useLocation } from "@tanstack/react-router";
import { Compass, Map, Navigation, Trophy, Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";
import logo from "@/assets/branding/campus-mark.svg";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/data/progress";
import { useTheme } from "@/lib/theme";
import { CheckInCelebration } from "@/components/CheckInCelebration";
import { InstallAppPrompt } from "@/components/InstallAppPrompt";

const tabs = [
  { to: "/", label: "Início", icon: Compass },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/rota", label: "Rotas", icon: Navigation },
  { to: "/missoes", label: "Passaporte", icon: Trophy },
] as const;

const isActive = (pathname: string, to: string) =>
  to === "/" ? pathname === "/" : pathname.startsWith(to);

export function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="h-10 w-10 rounded-full border border-border/40 bg-card/60 backdrop-blur-md"
      aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      {dark ? (
        <Sun className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700" />
      )}
    </Button>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { done, total } = useProgress();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-red-500/20">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <Link
            to="/"
            className="flex items-center gap-3 transition-transform active:scale-95"
            aria-label="ETEC Parque Belém — início"
          >
            <img
              src={logo}
              alt="ETEC"
              width={38}
              height={38}
              className="h-9 w-9 rounded-xl shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-display text-base font-bold leading-none tracking-tight text-foreground">
                ETEC <span className="font-medium text-primary">Parque Belém</span>
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                Campus Oficial
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/missoes"
              aria-label={`${done.length} de ${total} ambientes registrados`}
              className="flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-transform active:scale-95"
            >
              <Trophy className="h-3.5 w-3.5 text-primary" />
              <span>
                {done.length}/{total}
              </span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <InstallAppPrompt />

      <main className="mx-auto max-w-4xl px-4 pb-28 pt-4">{children}</main>

      <CheckInCelebration />

      <nav
        aria-label="Navegação inferior"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
      >
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-border/60 bg-card/90 p-1.5 shadow-2xl backdrop-blur-2xl dark:bg-zinc-900/90">
          {tabs.map((tab) => {
            const active = isActive(pathname, tab.to);
            return (
              <Link
                key={tab.to}
                to={tab.to}
                aria-current={active ? "page" : undefined}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all active:scale-95 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" strokeWidth={active ? 2.5 : 2} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      {children}
    </div>
  );
}
