import { Link, useLocation } from "@tanstack/react-router";
import { Home, Map, Navigation, Trophy, LayoutGrid } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Início", icon: Home },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/rota", label: "Rota", icon: Navigation },
  { to: "/ambientes", label: "Ambientes", icon: LayoutGrid },
  { to: "/missoes", label: "Missões", icon: Trophy },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background shadow-[var(--shadow-shell)]">
      <main className="flex-1 pb-24">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t bg-card/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
        <ul className="grid grid-cols-5">
          {tabs.map((t) => {
            const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
            return (
              <li key={t.to}>
                <Link to={t.to} className={cn("flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium", active ? "text-primary" : "text-muted-foreground")}>
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
    <header className="px-5 pt-8 pb-4">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      {children}
    </header>
  );
}
