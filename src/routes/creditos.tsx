import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { team } from "@/data/school";

export const Route = createFileRoute("/creditos")({
  head: () => ({
    meta: [
      { title: "Equipe — Tour ETEC Belém" },
      { name: "description", content: "Conheça os alunos de Desenvolvimento de Sistemas que criaram o Tour ETEC Belém." },
      { property: "og:title", content: "Equipe do Tour ETEC Belém" },
      { property: "og:description", content: "Projeto de Programação Mobile da ETEC Parque Belém." },
    ],
  }),
  component: Creditos,
});

function Creditos() {
  return (
    <AppShell>
      <PageHeader title="Equipe" subtitle="Técnico em Desenvolvimento de Sistemas · Programação Mobile" />
      <ul className="space-y-3 px-5">
        {team.map((t, i) => (
          <li key={t.role} className="flex gap-4 rounded-2xl border bg-card p-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary font-display text-2xl font-extrabold text-primary-foreground">{i + 1}</div>
            <div>
              <p className="font-bold">{t.name}</p>
              <p className="text-sm font-semibold text-primary">{t.role}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mx-5 mt-6 rounded-2xl bg-secondary p-4 text-sm">
        <p><b>Orientação:</b> Prof. Juliano Ratusznei</p>
        <p className="mt-1 text-muted-foreground">Desafio: “Se uma pessoa quer saber onde fazer a matrícula, como ela vai saber onde é a secretaria?” — este app responde em 3 toques.</p>
      </div>
    </AppShell>
  );
}
