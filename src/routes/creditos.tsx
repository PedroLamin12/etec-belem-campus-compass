import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Belinho, GUIDE_NAME } from "@/components/Titia";
import { team } from "@/data/school";

export const Route = createFileRoute("/creditos")({
  head: () => ({ meta: [
    { title: "Equipe — Tour ETEC Belém" },
    { name: "description", content: "Conheça Pedro, Luigi, Odira e Kauan e suas atribuições no Tour ETEC Belém." },
    { property: "og:title", content: "Equipe do Tour ETEC Belém" },
    { property: "og:description", content: "Concepção, desenvolvimento, design e mapeamento pelos alunos da ETEC Parque Belém." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Creditos,
});

const tones = ["bg-primary text-primary-foreground", "bg-brand-sky-soft text-brand-sky-shade", "bg-success-soft text-success-shade", "bg-brand-yellow-soft text-foreground"];

function Creditos() {
  return <AppShell>
    <PageHeader title="Equipe" subtitle="Técnico em Desenvolvimento de Sistemas · ETEC Parque Belém" />
    <ul className="stagger grid gap-3">
      {team.map((m, i) => <li key={m.name} className={`flex items-center gap-4 rounded-2xl border-2 bg-card p-4 ${m.lead ? "border-primary" : ""}`}>
        <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-xl font-semibold ${tones[i] ?? tones[1]}`}>{m.initials}</span>
        <div className="min-w-0">
          {m.lead && <p className="eyebrow text-primary">Líder da equipe</p>}
          <h2 className="text-base font-extrabold leading-snug">{m.name}</h2>
          <p className="text-sm text-muted-foreground">{m.lead ? m.desc : `${m.role} · ${m.desc}`}</p>
        </div>
      </li>)}
    </ul>
    <section className="mt-8 surface p-5">
      <p className="eyebrow text-muted-foreground">Orientação</p>
      <p className="mt-1 font-extrabold">Prof. Juliano Ratusznei · Programação Mobile</p>
      <blockquote className="mt-3 font-display text-xl font-medium leading-snug">“Se uma pessoa quer saber onde fazer a matrícula, como ela vai saber onde é a secretaria?”</blockquote>
    </section>
    <section className="mt-4 flex items-center gap-3 rounded-2xl bg-secondary p-4">
      <Belinho mood="wink" className="h-16 w-14 shrink-0" />
      <p className="text-sm text-muted-foreground">{GUIDE_NAME} é a corujinha guia do Tour ETEC Belém.</p>
    </section>
  </AppShell>;
}
