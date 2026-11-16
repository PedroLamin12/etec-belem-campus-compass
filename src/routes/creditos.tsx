import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/AppShell";
import { team } from "@/data/school";
import { Code2, Compass, GraduationCap, MapPin, Palette, ArrowUpRight } from "lucide-react";

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

function Creditos() {
  const icons = [Compass, Code2, Palette, MapPin];
  return <AppShell>
    <PageHeader title="Feito aqui. Por nós." subtitle="Quatro alunos. A vontade de fazer diferente." />
    <div className="px-5 md:px-8">
      <section className="grid gap-8 border-t pt-8 md:grid-cols-[240px_1fr] md:gap-14">
        <div><p className="text-xs font-medium text-primary">Nossa equipe</p><h2 className="mt-3 font-display text-xl font-semibold leading-relaxed">Desenvolvimento<br />de Sistemas</h2><p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">ETEC Parque Belém<br />Projeto de Programação Mobile</p></div>
        <ul>
          {team.map((member, index) => {
            const Icon = icons[index] ?? Compass;
            return <li key={member.name} className="flex gap-4 border-b py-6 first:pt-0 md:gap-5">
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg font-display text-xl font-medium ${member.lead ? "bg-primary text-primary-foreground" : index === 1 ? "bg-brand-teal text-background" : index === 2 ? "bg-brand-red text-on-image" : "bg-brand-yellow text-background"}`}>{member.initials}</span>
              <div className="min-w-0 flex-1"><h2 className="font-display text-lg font-semibold leading-relaxed">{member.name}</h2><p className="mt-2 flex items-start gap-2 text-xs font-medium text-primary"><Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" />{member.role}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.desc}</p></div>
            </li>;
          })}
        </ul>
      </section>
      <section className="mt-12 grid gap-5 border-t pt-7 md:grid-cols-[240px_1fr] md:gap-14">
        <p className="flex items-start gap-2 text-xs font-medium text-primary"><GraduationCap className="h-4 w-4" />Orientação</p>
        <div><p className="flex items-center gap-2 text-sm font-medium">Prof. Juliano Ratusznei<ArrowUpRight className="h-4 w-4 text-primary" /></p><blockquote className="mt-4 max-w-xl font-display text-2xl font-medium leading-relaxed text-foreground">“Se uma pessoa quer saber onde fazer a matrícula, como ela vai saber onde é a secretaria?”</blockquote><p className="mt-5 text-xs text-muted-foreground">Programação Mobile · Opção 3: Explorer do campus</p></div>
      </section>
    </div>
  </AppShell>;
}
