import { Link, useLocation } from "@tanstack/react-router";
import { Home, Map, Navigation, Trophy, LayoutGrid, Users, Zap, Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";
import logo from "@/assets/branding/campus-mark.svg";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/data/progress";
import { useTheme } from "@/lib/theme";
import { CampusGuide } from "@/components/CampusGuide";
import { CheckInCelebration } from "@/components/CheckInCelebration";
import { InstallAppPrompt } from "@/components/InstallAppPrompt";

const tabs = [
  { to: "/", label: "Início", icon: Home },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/rota", label: "Rota", icon: Navigation },
  { to: "/ambientes", label: "Lugares", icon: LayoutGrid },
  { to: "/missoes", label: "Conquistas", icon: Trophy },
] as const;

const isActive = (pathname: string, to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

export function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return <Button variant="ghost" size="icon" onClick={toggle} aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"} title={dark ? "Modo claro" : "Modo escuro"}>{dark ? <Sun className="!h-5 !w-5" /> : <Moon className="!h-5 !w-5" />}</Button>;
}

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { xp } = useProgress();
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 px-4 md:px-8">
          <Link to="/" aria-label="Tour ETEC Belém — início" className="flex shrink-0 items-center gap-2">
            <img src={logo} width={36} height={36} alt="" className="h-9 w-9" />
            <span className="brand-wordmark">Tour <b>ETEC</b></span>
          </Link>
          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex gap-1">
              {[...tabs, { to: "/creditos", label: "Equipe", icon: Users } as const].map((t) => (
                <li key={t.to}><Link to={t.to} aria-current={isActive(pathname, t.to) ? "page" : undefined} className="side-link h-10 px-3 text-[13px]"><t.icon className="h-4 w-4" />{t.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1">
            <span className="hidden text-right text-xs font-bold text-muted-foreground sm:block">Oi! Vamos explorar?</span>
            <Link to="/missoes" className="flex h-10 items-center gap-1 rounded-xl px-2 text-sm font-extrabold text-brand-yellow-shade hover:bg-secondary" aria-label={`${xp} XP — ver conquistas`}><Zap className="h-5 w-5 fill-brand-yellow text-brand-yellow-shade" />{xp}</Link>
            <ThemeToggle />
            <CampusGuide />
          </div>
        </div>
      </header>
      <InstallAppPrompt />
      <main key={pathname} className="page-enter mx-auto max-w-5xl px-4 pb-28 pt-5 md:px-8 lg:pb-16">{children}</main>
      <CheckInCelebration />
      <nav aria-label="Navegação" className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {tabs.map((t) => {
            const active = isActive(pathname, t.to);
            return <li key={t.to}><Link to={t.to} aria-current={active ? "page" : undefined} className="tab-link"><span className="tab-icon"><t.icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} /></span>{t.label}</Link></li>;
          })}
        </ul>
      </nav>
    </div>
  );
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <header className="mb-5">
      <h1 className="font-display text-[28px] font-semibold leading-tight md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      {children}
    </header>
  );
}
