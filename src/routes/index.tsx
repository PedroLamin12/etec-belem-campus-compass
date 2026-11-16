import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, ArrowUpRight, Navigation, GraduationCap, Monitor, Utensils, Dribbble, Mic, BookOpen, Compass, ArrowRight, X } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PlaceFeed } from "@/components/PlaceFeed";
import { Button } from "@/components/ui/button";
import { heroPhoto, places, quickActions, placeById, missions } from "@/data/school";
import { useProgress } from "@/data/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tour ETEC Belém — Encontre qualquer lugar da escola" },
      { name: "description", content: "Mapa, rotas passo a passo e missões para conhecer a ETEC Parque Belém. Descubra onde fica a Secretaria, os laboratórios e muito mais." },
      { property: "og:title", content: "Tour ETEC Belém" },
      { property: "og:description", content: "Guia interativo da ETEC Parque Belém para calouros e visitantes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function Index() {
  const [q, setQ] = useState("");
  const { done, total, xp } = useProgress();
  const results = useMemo(() => {
    const t = norm(q.trim());
    if (!t) return [];
    return places.filter((p) => norm([p.name, p.category, p.description, ...p.services, ...p.keywords].join(" ")).includes(t));
  }, [q]);
  const icons = [Navigation, GraduationCap, Monitor, Utensils, Dribbble, Mic, BookOpen];
  const featured = ["convivencia", "lab1", "quadra1"].flatMap((id) => { const p = placeById(id); return p ? [p] : []; });
  const nextMission = missions.find((m) => !done.some((d) => d.id === m.id));

  return (
    <AppShell>
      <section className="campus-hero relative overflow-hidden md:mx-8 md:mt-7 md:rounded-lg">
        <img src={heroPhoto} alt="Prédio Principal da ETEC Parque Belém, com corredores e pátio sob pilotis" className="hero-photo absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <div className="hero-content relative flex h-full flex-col justify-center px-6 pb-10 text-on-image md:px-10">
          <div>
            <p className="mb-4 flex items-center gap-2 text-xs font-medium text-on-image/90"><MapPin className="h-3.5 w-3.5" />ETEC Parque Belém · São Paulo</p>
            <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">Tour ETEC Belém</h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-image/90">Um lugar para aprender.<br />Muitos caminhos para descobrir.</p>
            <Button asChild variant="ghost" className="mt-5 h-9 border border-on-image/40 bg-on-image/10 px-3 text-xs text-on-image hover:bg-on-image/20 hover:text-on-image"><Link to="/mapa">Explorar o campus<ArrowUpRight className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </section>
      <div className="relative -mt-7 px-5 md:px-16">
        <label className="hero-search flex h-[60px] items-center gap-3 rounded-lg border border-border bg-card px-4 md:px-5">
          <Search className="h-5 w-5 shrink-0 text-primary" />
          <input aria-label="Buscar ambiente" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Onde você quer chegar?" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground md:text-base" />
          {q ? <Button variant="ghost" size="icon" aria-label="Limpar busca" onClick={() => setQ("")}><X /></Button> : <span className="hidden text-xs text-muted-foreground sm:block">{places.length} ambientes</span>}
        </label>
      </div>
      {q.trim() ? <section className="px-5 pt-8 md:px-8"><h2 className="mb-5 font-display text-xl font-semibold">{results.length} resultados</h2>{results.length ? <PlaceFeed items={results} /> : <p className="text-sm text-muted-foreground">Nenhum ambiente encontrado para “{q}”.</p>}</section> : <>
        <div className="grid gap-8 px-5 pt-9 md:grid-cols-[1fr_300px] md:px-8 md:pt-10">
          <section>
            <h2 className="mb-5 font-display text-xl font-semibold">O que você precisa fazer hoje?</h2>
            <Button asChild className="mb-3 h-auto w-full justify-between whitespace-normal rounded-lg p-4 text-left"><Link to="/rota" search={{ de: "portaria", para: "secretaria" }}>
              <span className="flex items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10"><Navigation className="!h-5 !w-5" /></span><span><span className="block text-sm font-semibold">Fazer matrícula</span><span className="mt-1 block text-[11px] font-normal text-primary-foreground/85">Secretaria · Subsolo do Bloco Anexo</span></span></span><ArrowUpRight className="!h-5 !w-5" />
            </Link></Button>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {quickActions.slice(1).map((a, i) => { const Icon = icons[i + 1] ?? BookOpen; return <Button asChild variant="ghost" key={a.place} className="quick-action h-[72px] justify-start whitespace-normal rounded-lg border border-border bg-card px-3 text-left"><Link to="/rota" search={{ de: "portaria", para: a.place }}><Icon className="text-primary" /><span className="text-xs font-medium">{a.label}</span></Link></Button>; })}
            </div>
          </section>
          <section className="border-t pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div className="mb-5 flex items-center justify-between"><h2 className="font-display text-xl font-semibold">Sua jornada</h2><Compass className="h-5 w-5 text-primary" /></div>
            <div className="flex items-center gap-3"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary"><Compass className="h-6 w-6" /></span><div><p className="font-display text-2xl font-semibold">{xp} <span className="text-xs font-medium text-muted-foreground">XP</span></p><p className="mt-1 text-xs text-muted-foreground">{done.length} de {total} missões concluídas</p></div></div>
            <progress aria-label="Progresso das missões" value={done.length} max={total} className="mt-5 h-1.5 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-primary" />
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{nextMission ? `Próxima: ${nextMission.title}` : "Calouro ETEC Conhecedor — selo conquistado!"}</p>
            <Button asChild variant="ghost" className="mt-3 px-0 text-xs text-primary"><Link to="/missoes">Continuar jornada<ArrowRight /></Link></Button>
          </section>
        </div>
        <section className="px-5 pt-9 md:px-8 md:pt-10">
          <div className="mb-5 flex items-end justify-between gap-3"><div><p className="mb-2 text-xs text-muted-foreground">Por dentro da ETEC</p><h2 className="font-display text-xl font-semibold">Próxima parada</h2></div><Button asChild variant="ghost" className="h-8 px-0 text-xs text-primary"><Link to="/ambientes">Ver todos<ArrowRight /></Link></Button></div>
          <PlaceFeed items={featured} />
        </section>
        <footer className="mx-5 mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-6 md:mx-8"><p className="text-xs text-muted-foreground">Feito por alunos da ETEC Parque Belém.</p><Button asChild variant="ghost" className="h-8 px-0 text-xs text-primary"><Link to="/creditos">Conheça a equipe<ArrowUpRight /></Link></Button></footer>
      </>}
    </AppShell>
  );
}
