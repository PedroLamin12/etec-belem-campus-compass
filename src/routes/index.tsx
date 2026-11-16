import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ArrowUpRight, Navigation, GraduationCap, Monitor, Utensils, Dribbble, Mic, BookOpen, Compass, ArrowRight, X, Shuffle, Zap } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PlaceFeed } from "@/components/PlaceFeed";
import { Button } from "@/components/ui/button";
import { heroPhoto, places, quickActions, placeById, missions } from "@/data/school";
import { useProgress } from "@/data/progress";
import { CampusMascot } from "@/components/CampusMascot";
import { discoveryDestination, findCampusPlaces, nextCampusMission } from "@/data/exploration";

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

function Index() {
  const [q, setQ] = useState("");
  const [surprise, setSurprise] = useState<ReturnType<typeof discoveryDestination>>();
  const { done, total, xp, visited } = useProgress();
  const results = findCampusPlaces(q);
  const icons = [Navigation, GraduationCap, Monitor, Utensils, Dribbble, Mic, BookOpen];
  const featured = ["lab1", "convivencia", "quadra1", "nutricao", "portaria"].flatMap((id) => { const p = placeById(id); return p ? [p] : []; });
  const nextMission = nextCampusMission(visited);

  return (
    <AppShell>
      <section className="campus-hero relative overflow-hidden md:mx-8 md:mt-6 md:rounded-lg">
        <img src={heroPhoto} alt="Prédio Principal da ETEC Parque Belém, com corredores e pátio sob pilotis" className="hero-photo absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <div className="hero-content relative flex h-full flex-col justify-between px-5 pb-10 pt-7 text-on-image md:px-10 md:pb-12 md:pt-10">
          <div className="flex items-start justify-between gap-3"><div><p className="eyebrow mb-3 text-on-image/90">SÃO PAULO · PARQUE BELÉM</p><h1 className="home-title font-display">Tour ETEC<br /><em>Belém.</em></h1></div><span className="hero-label mt-4 shrink-0">O CAMPUS<br />É SEU ↗</span></div>
          <div><p className="mb-5 text-base font-medium leading-relaxed md:text-xl">Seu campus. Sua aventura.<br /><span className="text-xs font-normal text-on-image/80 md:text-sm">Da primeira matrícula à última descoberta.</span></p><div className="flex items-center justify-between gap-3"><Button asChild className="h-12 rounded-lg px-5 font-semibold"><Link to="/mapa">Bora explorar<ArrowUpRight className="h-4 w-4" /></Link></Button><div className="hero-metric"><b>{places.length}</b><span>lugares reais</span></div></div></div>
        </div>
      </section>
      <div className="relative -mt-5 px-5 md:px-10">
        <label className="hero-search flex h-[60px] items-center gap-3 rounded-lg border border-border bg-card px-4 md:px-5">
          <Search className="h-5 w-5 shrink-0 text-primary" />
          <input aria-label="Buscar ambiente" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Qual vai ser a próxima parada?" className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground md:text-sm" />
          {q ? <Button variant="ghost" size="icon" aria-label="Limpar busca" onClick={() => setQ("")}><X /></Button> : <span className="hidden text-xs text-muted-foreground sm:block">{places.length} ambientes</span>}
        </label>
      </div>
      {q.trim() ? <section aria-live="polite" className="px-5 pt-8 md:px-8"><h2 className="mb-5 section-title">{results.length} destinos encontrados</h2>{results.length ? <PlaceFeed items={results} /> : <p className="text-sm text-muted-foreground">Nenhum ambiente encontrado para “{q}”.</p>}</section> : <>
        <section className="mx-5 mb-8 mt-7 md:mx-8"><div className="guide-strip py-2"><CampusMascot className="h-28 w-full" /><div className="min-w-0"><p className="eyebrow text-primary">BÊ, SEU PARCEIRO DE CAMPUS</p><h2 className="mt-1 font-display text-xl font-medium">Chegou agora? Tamo junto.</h2><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">O primeiro dia não precisa ser um labirinto.</p><Button asChild variant="ghost" className="mt-1 h-8 px-0 text-xs text-primary"><Link to="/ambientes/$id" params={{ id: nextMission?.place ?? "portaria" }}>{nextMission ? "Começar minha jornada" : "Revisitar a Portaria"}<ArrowRight /></Link></Button></div></div></section>
        <section className="px-5 md:px-8"><div className="mb-4 flex items-end justify-between"><div><p className="eyebrow mb-2 text-muted-foreground">MENOS PERDIDO. MAIS PRESENTE.</p><h2 className="section-title">Pra onde vamos?</h2></div><Compass className="h-5 w-5 text-primary" /></div>
          <Button asChild variant="secondary" className="quest-feature mb-3 h-auto w-full justify-between whitespace-normal p-4 text-left"><Link to="/rota" search={{ de: "portaria", para: "secretaria" }}><span className="flex items-center gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-yellow text-brand-yellow-foreground"><Navigation className="!h-5 !w-5" /></span><span><span className="block text-sm font-semibold">Fazer matrícula</span><span className="mt-1 block text-[10px] font-normal text-muted-foreground">Secretaria · Subsolo do Bloco Anexo</span></span></span><ArrowUpRight className="text-brand-yellow" /></Link></Button>
          <div className="action-track">{quickActions.slice(1).map((action, i) => { const Icon = icons[i + 1] ?? BookOpen; return <Button asChild variant="ghost" key={action.place} className="action-tile quick-action border border-border bg-card text-center whitespace-normal"><Link to="/rota" search={{ de: "portaria", para: action.place }}><Icon className={i % 3 === 0 ? "text-brand-teal" : i % 3 === 1 ? "text-primary" : "text-brand-yellow"} /><span>{action.label}</span></Link></Button>; })}</div>
        </section>
        <section className="px-5 pt-9 md:px-8 md:pt-12">
          <div className="mb-5 flex items-end justify-between gap-3"><div><p className="eyebrow mb-2 text-muted-foreground">NÃO É SÓ SALA DE AULA</p><h2 className="section-title">Por dentro da ETEC.</h2></div><Button asChild variant="ghost" className="h-8 px-0 text-xs text-primary"><Link to="/ambientes">Todos<ArrowUpRight /></Link></Button></div>
          <PlaceFeed items={featured} layout="rail" />
        </section>
        <section className="mt-7 grid gap-7 px-5 md:grid-cols-2 md:px-8"><div className="passport-stat py-5"><div className="flex items-center justify-between"><div><p className="eyebrow text-primary">SEU PASSAPORTE ETEC</p><h2 className="mt-2 section-title">Cada lugar, um carimbo.</h2></div><Zap className="h-6 w-6 text-primary" /></div><div className="mt-5 flex items-end justify-between"><p className="font-display text-4xl font-medium">{xp}<span className="ml-2 text-xs text-muted-foreground">XP</span></p><p className="text-xs text-muted-foreground">{done.length}/{total} missões</p></div><progress aria-label="Progresso das missões" value={done.length} max={total} className="mt-4 h-1.5 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-primary" /><Button asChild variant="ghost" className="mt-3 px-0 text-xs text-primary"><Link to="/missoes">Abrir meu passaporte<ArrowRight /></Link></Button></div>
          <div className="border-y border-border py-5"><div className="flex items-center justify-between"><p className="eyebrow text-brand-yellow">SAIA DO ÓBVIO</p><Shuffle className="h-5 w-5 text-brand-yellow" /></div><h2 className="mt-2 section-title">O próximo lugar? Surpresa.</h2><div aria-live="polite" className="mt-3 min-h-10"><p className="text-xs leading-relaxed text-muted-foreground">{surprise ? surprise.name : "Às vezes, o melhor caminho é o que você ainda não fez."}</p></div>{surprise && <Button asChild variant="ghost" className="mb-2 w-full justify-between px-0 text-primary"><Link to="/ambientes/$id" params={{ id: surprise.id }}>Conhecer esse lugar<ArrowUpRight /></Link></Button>}<Button variant="outline" className="h-11 w-full" onClick={() => setSurprise(discoveryDestination(visited))}><Shuffle />{surprise ? "Outro destino" : "Me surpreenda"}</Button></div>
        </section>
        <footer className="mx-5 mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-6 md:mx-8"><p className="text-[10px] text-muted-foreground">Da ETEC. Por alunos. Pra você.</p><Button asChild variant="ghost" className="h-8 px-0 text-xs text-primary"><Link to="/creditos">Quem fez<ArrowUpRight /></Link></Button></footer>
      </>}
    </AppShell>
  );
}
