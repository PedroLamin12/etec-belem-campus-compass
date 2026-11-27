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
      setError("Não foi possível abrir a instalação. Tente pelo menu do navegador.");
    }
  };

  if (!installPrompt || dismissed) {
    return error ? (
      <p role="alert" className="my-2 text-xs font-bold text-destructive">
        {error}
      </p>
    ) : null;
  }

  return (
    <aside
      aria-label="Instalar aplicativo"
      aria-live="polite"
      className="my-3 flex w-full items-center gap-2.5 rounded-2xl border border-primary/20 bg-card p-3 shadow-sm"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <Download className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold">Leve o Tour com você</p>
        <p className="truncate text-[11px] text-muted-foreground">
          Instale o app direto na tela inicial.
        </p>
      </div>
      <Button size="sm" className="h-8 shrink-0 px-3 text-xs" onClick={() => void install()}>
        Instalar
      </Button>
      <button
        type="button"
        aria-label="Dispensar convite de instalação"
        onClick={() => setDismissed(true)}
        className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </aside>
  );
}
