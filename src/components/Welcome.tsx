import { Link } from "@tanstack/react-router";
import { Compass, FileText, Map, Moon, Sun } from "lucide-react";
import logo from "@/assets/branding/campus-mark.svg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useTheme } from "@/lib/theme";

const actions = [
  {
    title: "Fazer Matrícula",
    description: "Ir à Secretaria Acadêmica, no subsolo do Bloco Anexo.",
    icon: FileText,
    to: "/rota" as const,
    search: { de: "portaria", para: "secretaria" },
  },
  {
    title: "Ver Mapa do Campus",
    description: "Consulte a planta interativa e os pontos de interesse.",
    icon: Map,
    to: "/mapa" as const,
  },
];

export function Welcome({ onDone }: { onDone: () => void }) {
  const { dark, toggle } = useTheme();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onDone();
      }}
    >
      <DialogContent className="fixed inset-0 left-0 top-0 z-[60] flex h-[100dvh] w-full max-w-none translate-x-0 translate-y-0 flex-col justify-center overflow-y-auto rounded-none border-0 bg-background p-5 shadow-none sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)] sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:border sm:border-border/50 sm:p-8 sm:shadow-2xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
          className="absolute right-14 top-4"
        >
          {dark ? <Sun /> : <Moon />}
        </Button>

        <div className="mx-auto w-full max-w-sm">
          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft p-2.5">
            <img src={logo} alt="Marca ETEC Parque Belém" className="h-full w-full" />
          </div>
          <p className="eyebrow text-primary">Guia oficial do campus</p>
          <DialogTitle className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight">
            Tour ETEC Parque Belém
          </DialogTitle>
          <DialogDescription className="mt-3 max-w-sm text-base leading-relaxed">
            Seu guia oficial para explorar salas, laboratórios e serviços do campus.
          </DialogDescription>

          <div className="mt-8 grid gap-3">
            {actions.map((action) => (
              <Button
                asChild
                key={action.title}
                size="lg"
                onClick={onDone}
                className="h-auto min-h-[76px] justify-start gap-4 whitespace-normal px-4 py-3 text-left"
              >
                <Link
                  to={action.to}
                  search={"search" in action ? action.search : undefined}
                  className="tap"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <action.icon className="!h-5 !w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{action.title}</span>
                    <span className="mt-1 block text-xs font-normal leading-relaxed opacity-80">
                      {action.description}
                    </span>
                  </span>
                </Link>
              </Button>
            ))}
            <Button
              variant="outline"
              size="lg"
              onClick={onDone}
              className="h-14 justify-start gap-4 px-4"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Compass className="h-5 w-5" />
              </span>
              Explorar o Campus
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
