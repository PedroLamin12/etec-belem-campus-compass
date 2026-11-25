import { createFileRoute } from "@tanstack/react-router";
import { Compass, MapPin } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { team } from "@/data/school";

export const Route = createFileRoute("/creditos")({
  head: () => ({
    meta: [
      { title: "Equipe — Tour ETEC Belém" },
      {
        name: "description",
        content: "Conheça Pedro, Luigi, Odira e Kauan e suas atribuições no Tour ETEC Belém.",
      },
      { property: "og:title", content: "Equipe do Tour ETEC Belém" },
      {
        property: "og:description",
        content:
          "Concepção, desenvolvimento, design e mapeamento pelos alunos da ETEC Parque Belém.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Creditos,
});

const tones = [
  "bg-primary-soft text-primary",
  "bg-secondary text-foreground",
  "bg-success-soft text-success-shade",
  "bg-brand-sky-soft text-brand-sky-shade",
];

function Creditos() {
  return (
    <AppShell>
      <PageHeader
        title="Equipe"
        subtitle="Técnico em Desenvolvimento de Sistemas · ETEC Parque Belém"
      />
      <ul className="stagger grid gap-3">
        {team.map((m, i) => (
          <li
            key={m.name}
            className={`flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-4 shadow-sm ${m.lead ? "border-primary/60" : ""}`}
          >
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-xl font-semibold ${tones[i] ?? tones[1]}`}
            >
              {m.initials}
            </span>
            <div className="min-w-0">
              {m.lead && <p className="eyebrow text-primary">Líder da equipe</p>}
              <h2 className="text-base font-semibold leading-snug">{m.name}</h2>
              <p className="text-sm text-muted-foreground">
                {m.lead ? m.desc : `${m.role} · ${m.desc}`}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <section className="mt-8 rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
        <p className="eyebrow text-muted-foreground">Orientação</p>
        <p className="mt-1 font-semibold">Prof. Juliano Ratusznei · Programação Mobile</p>
        <blockquote className="mt-3 font-display text-xl font-medium leading-snug">
          “Se uma pessoa quer saber onde fazer a matrícula, como ela vai saber onde é a secretaria?”
        </blockquote>
      </section>
      <section className="mt-4 rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
        <p className="eyebrow text-muted-foreground">Sobre o guia</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Um guia digital da ETEC Parque Belém para consultar ambientes, rotas e informações de
          acesso.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-primary" />
            Exploração do campus
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" />
            Rotas a partir da Portaria
          </span>
        </div>
      </section>
    </AppShell>
  );
}
