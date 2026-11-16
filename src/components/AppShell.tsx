import { Link, useLocation } from "@tanstack/react-router";
import { Home, Map, Navigation, Trophy, LayoutGrid, Users, Zap, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import logo from "@/assets/branding/campus-mark.svg";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/data/progress";
import { CampusGuide } from "@/components/CampusGuide";
import { CheckInCelebration } from "@/components/CheckInCelebration";

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
    <div className="app-shell min-h-screen bg-background">
      <header className="app-header sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-5 md:h-[88px] md:px-8">
          <Link to="/" aria-label="Tour ETEC Belém — início" className="flex shrink-0 items-center gap-2.5">
            <img src={logo} width={96} height={96} alt="" className="h-10 w-10 md:h-12 md:w-12" />
            <span className="brand-wordmark"><span>TOUR <b>ETEC</b></span><span>Belém<span className="brand-wordmark-dot">.</span></span></span>
          </Link>
          <nav aria-label="Navegação principal" className="hidden md:block"><ul className="flex gap-1">
            {tabs.map((t) => <li key={t.to}><Button asChild variant="ghost" className="nav-tab px-3 text-xs"><Link to={t.to} aria-current={(t.to === "/" ? pathname === "/" : pathname.startsWith(t.to)) ? "page" : undefined}><t.icon className="h-4 w-4" />{t.label}</Link></Button></li>)}
          </ul></nav>
          <Button asChild variant="ghost" className="h-10 border border-border bg-card px-3 text-primary"><Link to="/missoes"><Zap className="h-4 w-4" /><span className="text-xs font-semibold">{xp} XP</span></Link></Button>
        </div>
      </header>
      <main key={pathname} className="page-enter mx-auto max-w-7xl pb-36 md:pb-20">{children}</main>
      <CampusGuide />
      <CheckInCelebration />
      <nav aria-label="Navegação mobile" className="mobile-nav fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden">
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
    <header className="section-header px-5 pb-6 pt-8 md:px-8 md:pt-10">
      <p className="eyebrow mb-3 flex items-center gap-2 text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-primary" />ETEC PARQUE BELÉM<ArrowUpRight className="h-3 w-3" /></p>
      <h1 className="font-display text-3xl font-semibold leading-tight md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}
      {children}
    </header>
  );
}
