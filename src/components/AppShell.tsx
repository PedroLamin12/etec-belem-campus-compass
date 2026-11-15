import { Link, useLocation } from "@tanstack/react-router";
import { Home, Map, Navigation, Trophy, LayoutGrid, Users, Zap, MoveUpRight } from "lucide-react";
import type { ReactNode } from "react";
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
      <header className="border-b bg-background">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-5 md:px-8">
          <Link to="/" aria-label="Tour ETEC Belém — início" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center bg-primary font-display text-3xl font-extrabold text-primary-foreground">E<span className="text-brand-yellow">.</span></span>
            <span className="font-display text-xl font-bold leading-none">TOUR ETEC<span className="mt-1 block text-xs font-sans font-semibold text-muted-foreground">PARQUE BELÉM</span></span>
          </Link>
          <nav aria-label="Navegação principal" className="hidden md:block"><ul className="flex gap-1">
            {tabs.map((t) => <li key={t.to}><Button asChild variant="ghost" className={cn("px-3 text-xs", (t.to === "/" ? pathname === "/" : pathname.startsWith(t.to)) && "bg-secondary text-foreground")}><Link to={t.to}><t.icon className="h-4 w-4" />{t.label}</Link></Button></li>)}
          </ul></nav>
          <Button asChild variant="secondary" className="border border-brand-yellow/30 bg-brand-yellow/10 px-3 text-brand-yellow hover:bg-brand-yellow/20"><Link to="/missoes"><Zap className="h-4 w-4" /><span className="text-xs font-extrabold">{xp} XP</span></Link></Button>
        </div>
      </header>
      <main className="page-enter mx-auto max-w-7xl pb-28 md:pb-12">{children}</main>
      <nav aria-label="Navegação mobile" className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <ul className="grid grid-cols-6">
          {tabs.map((t) => {
            const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
            return (
              <li key={t.to}>
                <Link to={t.to} aria-current={active ? "page" : undefined} className={cn("relative flex h-16 flex-col items-center justify-center gap-1 text-[10px] font-semibold", active ? "text-primary" : "text-muted-foreground")}>
                  {active && <span className="absolute top-0 h-0.5 w-6 bg-primary" />}
                  <t.icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
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
      <p className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase text-primary"><span className="h-1.5 w-1.5 bg-primary" />EXPLORER DO CAMPUS<MoveUpRight className="h-3 w-3" /></p>
      <h1 className="font-display text-4xl font-extrabold uppercase md:text-5xl">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      {children}
    </header>
  );
}
