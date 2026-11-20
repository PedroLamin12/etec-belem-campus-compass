import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

export function InstallAppPrompt() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
      setDismissed(false);
    };
    const onInstalled = () => setInstallPrompt(null);

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    const prompt = installPrompt;
    setInstallPrompt(null);
    setError(null);
    try {
      await prompt.prompt();
    } catch (reason) {
      console.error("Não foi possível iniciar a instalação do app.", reason);
      setError("Não foi possível abrir a instalação. Tente novamente pelo menu do Chrome.");
    }
  };

  if (!installPrompt || dismissed) {
    return error ? (
      <p role="alert" className="mx-auto mt-3 max-w-5xl px-4 text-sm font-bold text-destructive">
        {error}
      </p>
    ) : null;
  }

  return (
    <aside
      aria-label="Instalar aplicativo"
      aria-live="polite"
      className="mx-auto mt-3 flex max-w-5xl items-center gap-3 rounded-2xl border-2 border-primary/20 bg-card px-4 py-3 shadow-sm"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Download className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-extrabold">Leve o Tour ETEC com você</p>
        <p className="text-xs text-muted-foreground">
          Instale o app para abrir direto da tela inicial.
        </p>
      </div>
      <Button size="sm" onClick={() => void install()}>
        Instalar
      </Button>
      <button
        type="button"
        aria-label="Dispensar convite de instalação"
        onClick={() => setDismissed(true)}
        className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </aside>
  );
}
