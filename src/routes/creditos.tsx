import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { team } from "@/data/school";
import { Crown, Code2, ArrowUpRight, GraduationCap, MapPin, Palette, Database } from "lucide-react";

export const Route = createFileRoute("/creditos")({
  head: () => ({
    meta: [
      { title: "Equipe — Tour ETEC Belém" },
      { name: "description", content: "Conheça os alunos de Desenvolvimento de Sistemas que criaram o Tour ETEC Belém." },
      { property: "og:title", content: "Equipe do Tour ETEC Belém" },
      { property: "og:description", content: "Projeto de Programação Mobile da ETEC Parque Belém." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Creditos,
});

function Creditos() {
  const lead = team[0];
  if (!lead) return null;
  const roles = [{ icon: MapPin, title: "Mapeamento" }, { icon: Palette, title: "Modelagem e conteúdo visual" }, { icon: Code2, title: "Programação mobile" }, { icon: Database, title: "Dados e testes" }];
  return (
    <AppShell>
      <PageHeader title="Quem fez acontecer" subtitle="Equipe · Técnico em Desenvolvimento de Sistemas" />
      <div className="px-5 md:px-8">
        <section className="relative border-y border-primary/40 py-8 md:py-10">
          <p className="mb-5 flex items-center gap-2 text-[10px] font-extrabold text-brand-yellow"><Crown className="h-4 w-4" />DESTAQUE DE HONRA · LIDERANÇA DO PROJETO</p>
          <div className="flex items-start gap-5 md:gap-7">
            <div className="explorer-shield flex h-24 w-20 shrink-0 items-center justify-center bg-primary font-display text-3xl font-extrabold text-primary-foreground md:h-36 md:w-28">{lead.initials}<span className="text-brand-yellow">.</span></div>
            <div className="min-w-0"><h2 className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-5xl">{lead.name}</h2><p className="mt-3 text-sm font-bold text-brand-yellow">{lead.role}</p><p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">{lead.desc}</p></div>
          </div>
        </section>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {team.slice(1).map((t, i) => <li key={t.name} className="rounded-lg border bg-card p-5"><div className="mb-4 flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary font-display text-xl font-extrabold">{t.initials}</span><span className="text-[10px] font-bold text-muted-foreground">0{i + 2}<ArrowUpRight className="mt-1 h-4 w-4 text-primary" /></span></div><h2 className="font-display text-2xl font-bold">{t.name}</h2><p className="mt-2 text-xs text-muted-foreground">Desenvolvimento de Sistemas</p></li>)}
        </ul>
        <section className="mt-9 border-t pt-6"><h2 className="mb-4 font-display text-2xl font-bold uppercase">Construção coletiva</h2><ul className="grid grid-cols-2 gap-4 md:grid-cols-4">{roles.map((r) => <li key={r.title} className="flex items-center gap-2 text-xs text-muted-foreground"><r.icon className="h-4 w-4 shrink-0 text-primary" />{r.title}</li>)}</ul></section>
        <section className="mt-9 border-y py-6"><p className="flex items-center gap-2 text-xs font-bold text-brand-yellow"><GraduationCap className="h-4 w-4" />ORIENTAÇÃO · PROF. JULIANO RATUSZNEI</p><blockquote className="my-4 max-w-3xl font-display text-2xl font-semibold md:text-3xl">“Se uma pessoa quer saber onde fazer a matrícula, como ela vai saber onde é a secretaria?”</blockquote><p className="text-xs text-muted-foreground">Programação Mobile · Opção 3: Explorer do campus · Tour ETEC Belém</p></section>
      </div>
    </AppShell>
  );
}
