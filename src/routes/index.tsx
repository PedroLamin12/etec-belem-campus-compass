import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Trophy, ArrowUpRight, Navigation, GraduationCap, Monitor, Utensils, Dribbble, Mic, BookOpen, Zap, Compass } from "lucide-react";
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
      <section className="campus-hero relative overflow-hidden">
        <img src={heroPhoto} alt="Prédio Principal da ETEC Parque Belém, com corredores e pátio sob pilotis" className="hero-photo absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <div className="relative flex h-full flex-col justify-between p-5 md:px-8 md:py-7 text-on-image">
          <div className="flex justify-between gap-3"><span className="flex items-center gap-2 text-[10px] font-bold"><span className="h-2 w-2 bg-brand-yellow" />SÃO PAULO · PARQUE BELÉM</span><span className="text-[10px] font-bold">FEITO POR ALUNOS. PARA ALUNOS.</span></div>
          <div className="pb-7 md:pb-8">
            <span className="mb-3 inline-flex items-center gap-2 rounded-sm bg-brand-yellow px-2 py-1 text-[10px] font-extrabold text-brand-yellow-foreground"><Compass className="h-3 w-3" />EXPLORER DO CAMPUS</span>
            <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.9] md:text-8xl">Tour ETEC <span className="block md:inline">Belém<span className="text-primary">.</span></span></h1>
            <p className="mt-4 max-w-md text-sm text-on-image/85">Seu próximo capítulo começa aqui.</p>
          </div>
        </div>
      </section>
      <div className="relative -mt-3 px-5 md:-mt-4 md:px-8">
        <label className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-4 shadow-[var(--shadow-card)]">
          <Search className="h-5 w-5 shrink-0 text-primary" />
          <input aria-label="Buscar ambiente" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Onde você quer chegar?" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground md:text-base" />
          <span className="hidden text-[10px] font-extrabold text-muted-foreground sm:block">{places.length} AMBIENTES REAIS</span>
        </label>
      </div>
      {q.trim() ? <section className="px-5 pt-8 md:px-8"><h2 className="mb-4 font-display text-3xl font-bold">{results.length} resultados</h2>{results.length ? <PlaceFeed items={results} /> : <p className="text-sm text-muted-foreground">Nenhum ambiente encontrado para “{q}”.</p>}</section> : <>
        <div className="grid gap-8 px-5 pt-8 md:grid-cols-[1fr_340px] md:px-8">
          <section>
            <h2 className="mb-4 font-display text-3xl font-bold uppercase">O que você precisa fazer hoje?</h2>
            <Button asChild className="mb-4 h-auto w-full justify-between whitespace-normal rounded-lg p-5 text-left"><Link to="/rota" search={{ de: "portaria", para: "secretaria" }}>
              <span className="flex items-center gap-4"><Navigation className="!h-7 !w-7" /><span><span className="block font-display text-2xl font-bold">FAZER MATRÍCULA</span><span className="mt-1 block text-xs font-normal text-primary-foreground/80">Secretaria · Subsolo do Bloco Anexo</span></span></span><ArrowUpRight className="!h-6 !w-6" />
            </Link></Button>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {quickActions.slice(1).map((a, i) => { const Icon = icons[i + 1] ?? BookOpen; return <Button asChild variant="secondary" key={a.place} className="h-auto justify-start whitespace-normal rounded-lg border border-border bg-card px-3 py-3.5 text-left"><Link to="/rota" search={{ de: "portaria", para: a.place }}><Icon className="text-brand-yellow" /><span className="text-xs font-semibold">{a.label}</span></Link></Button>; })}
            </div>
          </section>
          <section className="border-t pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-3xl font-bold uppercase">Sua jornada</h2><Trophy className="h-5 w-5 text-brand-yellow" /></div>
            <div className="flex items-center gap-4"><span className="explorer-shield flex h-16 w-14 shrink-0 items-center justify-center bg-brand-yellow text-brand-yellow-foreground"><Compass className="h-8 w-8" /></span><div><p className="text-[10px] font-extrabold text-muted-foreground">EXPLORADOR ETEC</p><p className="mt-1 font-display text-3xl font-bold">{xp} <span className="text-lg text-brand-yellow">XP</span></p><p className="text-xs text-muted-foreground">{done.length} de {total} missões concluídas</p></div></div>
            <progress aria-label="Progresso das missões" value={done.length} max={total} className="mt-4 h-1.5 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-brand-yellow" />
            <p className="mt-3 text-xs text-muted-foreground">{nextMission ? `Próxima: ${nextMission.title}` : "Calouro ETEC Conhecedor — selo conquistado!"}</p>
            <Button asChild variant="ghost" className="mt-2 px-0 text-xs text-brand-yellow"><Link to="/missoes">Continuar jornada<ArrowUpRight /></Link></Button>
          </section>
        </div>
        <section className="px-5 pt-9 md:px-8 md:pt-10">
          <div className="mb-4 flex items-end justify-between gap-3"><div><p className="mb-1 flex items-center gap-1.5 text-[10px] font-extrabold text-primary"><MapPin className="h-3 w-3" />POR DENTRO DA ETEC</p><h2 className="font-display text-3xl font-bold uppercase">Próxima parada</h2></div><Button asChild variant="ghost" className="h-8 px-0 text-xs text-muted-foreground"><Link to="/ambientes">Ver todos<ArrowUpRight /></Link></Button></div>
          <PlaceFeed items={featured} />
        </section>
        <section className="mx-5 mt-8 flex flex-wrap items-center justify-between gap-3 border-y py-5 md:mx-8"><p className="flex items-center gap-2 text-xs text-muted-foreground"><Zap className="h-4 w-4 text-brand-yellow" />Do primeiro passo à última conquista.</p><Button asChild variant="ghost" className="h-8 px-0 text-xs"><Link to="/mapa">Explorar o campus<ArrowUpRight /></Link></Button></section>
      </>}
    </AppShell>
  );
}
