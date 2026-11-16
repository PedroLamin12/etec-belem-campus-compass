import { Link, useLocation } from "@tanstack/react-router";
import { Home, Map, Navigation, Trophy, LayoutGrid, Users, Compass, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import logo from "@/assets/branding/tour-etec-logo.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/data/progress";

const tabs = [
  { to: "/", label: "Início", icon: Home },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/rota", label: "Rota", icon: Navigation },
  { to: "/ambientes", label: "Ambientes", icon: LayoutGrid },
  { to: "/missoes", label: "Missões", icon: Trophy },
  { to: "/creditos", label: "Equipe", icon: Users },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { xp } = useProgress();
  return (
    <div className="min-h-screen bg-background">
      <header className="app-header sticky top-0 z-40 border-b bg-card/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-3 px-5 md:px-8">
          <Link to="/" aria-label="Tour ETEC Belém — início" className="flex shrink-0 items-center gap-2.5">
            <img src={logo} width={1063} height={277} alt="Tour ETEC Belém" className="h-auto w-[198px] md:w-[226px]" />
          </Link>
          <nav aria-label="Navegação principal" className="hidden md:block"><ul className="flex gap-1">
            {tabs.map((t) => <li key={t.to}><Button asChild variant="ghost" className="nav-tab px-3 text-xs"><Link to={t.to} aria-current={(t.to === "/" ? pathname === "/" : pathname.startsWith(t.to)) ? "page" : undefined}><t.icon className="h-4 w-4" />{t.label}</Link></Button></li>)}
          </ul></nav>
          <Button asChild variant="ghost" className="border border-border bg-secondary/50 px-3 text-primary"><Link to="/missoes"><Compass className="h-4 w-4" /><span className="text-xs font-semibold">{xp} XP</span></Link></Button>
        </div>
      </header>
      <main key={pathname} className="page-enter mx-auto max-w-7xl pb-28 md:pb-16">{children}</main>
      <nav aria-label="Navegação mobile" className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
        <ul className="grid grid-cols-6">
          {tabs.map((t) => {
            const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
            return (
              <li key={t.to}>
                <Link to={t.to} aria-current={active ? "page" : undefined} className={cn("nav-tab relative flex h-[72px] flex-col items-center justify-center gap-0.5 text-[10px] font-medium", active ? "text-primary" : "text-muted-foreground")}>
                  <span className="mobile-tab-icon flex h-8 w-10 items-center justify-center rounded-lg"><t.icon className="h-[18px] w-[18px]" strokeWidth={active ? 2 : 1.6} /></span>
                  {t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <header className="px-5 pb-6 pt-8 md:px-8 md:pt-10">
      <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">Parque Belém<ChevronRight className="h-3 w-3" /><span className="text-primary">Campus</span></p>
      <h1 className="font-display text-3xl font-semibold leading-tight md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}
      {children}
    </header>
  );
}
