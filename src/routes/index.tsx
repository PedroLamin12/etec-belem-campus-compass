import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Trophy, Users, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { heroPhoto, places, quickActions } from "@/data/school";
import { useProgress } from "@/data/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tour ETEC Belém — Encontre qualquer lugar da escola" },
      { name: "description", content: "Mapa, rotas passo a passo e missões para conhecer a ETEC Parque Belém. Descubra onde fica a Secretaria, os laboratórios e muito mais." },
      { property: "og:title", content: "Tour ETEC Belém" },
      { property: "og:description", content: "Guia interativo da ETEC Parque Belém para calouros e visitantes." },
    ],
  }),
  component: Index,
});

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function Index() {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const { done, total } = useProgress();
  const results = useMemo(() => {
    const t = norm(q.trim());
    if (!t) return [];
    return places.filter((p) => norm([p.name, p.category, p.description, ...p.services, ...p.keywords].join(" ")).includes(t)).slice(0, 6);
  }, [q]);

  return (
    <AppShell>
      <section className="relative h-72 overflow-hidden">
        <img src={heroPhoto} alt="Arco amarelo da portaria da ETEC Parque Belém" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[image:var(--gradient-hero)]" />
        <div className="relative flex h-full flex-col justify-end p-5 pb-10 text-primary-foreground">
          <span className="w-fit rounded-full bg-brand-yellow px-2.5 py-0.5 text-[11px] font-bold text-foreground">ETEC PARQUE BELÉM</span>
          <h1 className="mt-2 font-display text-4xl font-extrabold leading-none">Tour ETEC<br />Belém</h1>
        </div>
      </section>

      <div className="relative -mt-6 px-5">
        <label className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3.5 shadow-[var(--shadow-card)]">
          <Search className="h-5 w-5 text-primary" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex.: matrícula, lanche, computador…" className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground" />
        </label>
        {results.length > 0 && (
          <ul className="mt-2 overflow-hidden rounded-2xl border bg-card">
            {results.map((p) => (
              <li key={p.id}>
                <button onClick={() => nav({ to: "/ambientes/$id", params: { id: p.id } })} className="flex w-full items-center gap-3 border-b p-3 text-left last:border-0">
                  <img src={p.photo} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <span className="flex-1"><span className="block font-semibold">{p.name}</span><span className="text-xs text-muted-foreground">{p.block}</span></span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {q && results.length === 0 && <p className="mt-2 text-sm text-muted-foreground">Nada encontrado. Tente "secretaria" ou "quadra".</p>}
      </div>

      <section className="px-5 pt-7">
        <h2 className="font-display text-xl font-bold">O que você precisa fazer hoje?</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {quickActions.map((a, i) => (
            <Link key={a.label} to="/rota" search={{ de: "portaria", para: a.place }}
              className={`rounded-2xl p-4 ${i === 0 ? "col-span-2 bg-primary text-primary-foreground" : "border bg-card"}`}>
              <span className="text-2xl">{a.emoji}</span>
              <p className="mt-2 font-bold leading-tight">{a.label}</p>
              <p className={`text-xs ${i === 0 ? "opacity-85" : "text-muted-foreground"}`}>{a.sub}{i === 0 && " · ver rota a partir da Portaria →"}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3 px-5 pt-6">
        <Link to="/mapa" className="rounded-2xl bg-secondary p-3 text-center text-xs font-semibold"><MapPin className="mx-auto mb-1 h-5 w-5 text-primary" />Mapa</Link>
        <Link to="/missoes" className="rounded-2xl bg-secondary p-3 text-center text-xs font-semibold"><Trophy className="mx-auto mb-1 h-5 w-5 text-primary" />{done.length}/{total} missões</Link>
        <Link to="/creditos" className="rounded-2xl bg-secondary p-3 text-center text-xs font-semibold"><Users className="mx-auto mb-1 h-5 w-5 text-primary" />Equipe</Link>
      </section>
    </AppShell>
  );
}
