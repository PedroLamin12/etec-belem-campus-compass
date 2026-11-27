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
      className="h-9 w-9 shrink-0 rounded-full border border-border/40 bg-card/60 backdrop-blur-md"
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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-background text-foreground antialiased selection:bg-red-500/20">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-md items-center justify-between px-3.5">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2.5 transition-transform active:scale-95"
            aria-label="ETEC Parque Belém — início"
          >
            <img
              src={logo}
              alt="ETEC"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-lg shadow-sm"
            />
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-display text-sm font-bold leading-none tracking-tight text-foreground">
                ETEC <span className="text-primary">Parque Belém</span>
              </span>
              <span className="mt-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                Guia do Campus
              </span>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/missoes"
              aria-label={`${done.length} de ${total} ambientes registrados`}
              className="flex items-center gap-1 rounded-full border border-border/50 bg-secondary/70 px-2.5 py-1 text-xs font-semibold text-foreground transition-transform active:scale-95"
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

      <div className="mx-auto w-full max-w-md px-3.5">
        <InstallAppPrompt />
      </div>

      <main className="mx-auto w-full max-w-md px-3.5 pb-24 pt-3">{children}</main>

      <CheckInCelebration />

      <nav
        aria-label="Navegação inferior"
        className="fixed inset-x-0 bottom-0 z-50 w-full border-t border-border/50 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"
      >
        <div className="mx-auto grid h-16 max-w-md grid-cols-4 items-center px-1">
          {tabs.map((tab) => {
            const active = isActive(pathname, tab.to);
            return (
              <Link
                key={tab.to}
                to={tab.to}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-1 py-1 text-[11px] font-medium transition-colors active:scale-95 ${
                  active
                    ? "font-bold text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div
                  className={`flex h-8 w-12 items-center justify-center rounded-full transition-all ${
                    active ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <tab.icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
                </div>
                <span className="leading-none">{tab.label}</span>
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
    <div className="mb-4">
      <h1 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h1>
      {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      {children}
    </div>
  );
}
