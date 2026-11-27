import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InstallAppPrompt } from "@/components/InstallAppPrompt";

describe("install app prompt", () => {
  it("shows a native install action when Chrome makes it available", () => {
    const prompt = vi.fn().mockResolvedValue(undefined);
    const event = new Event("beforeinstallprompt", { cancelable: true }) as Event & {
      prompt: () => Promise<void>;
    };
    event.prompt = prompt;
    render(<InstallAppPrompt />);

    act(() => window.dispatchEvent(event));

    expect(event.defaultPrevented).toBe(true);
    expect(screen.getByText("Leve o Tour com você")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Instalar" }));
    expect(prompt).toHaveBeenCalledOnce();
    expect(screen.queryByText("Leve o Tour com você")).not.toBeInTheDocument();
  });

  it("lets visitors dismiss the install invitation", () => {
    const event = new Event("beforeinstallprompt", { cancelable: true }) as Event & {
      prompt: () => Promise<void>;
    };
    event.prompt = vi.fn().mockResolvedValue(undefined);
    render(<InstallAppPrompt />);
    act(() => window.dispatchEvent(event));

    fireEvent.click(screen.getByRole("button", { name: "Dispensar convite de instalação" }));
    expect(screen.queryByText("Leve o Tour com você")).not.toBeInTheDocument();
  });

  it("reports when Chrome cannot open the install dialog", async () => {
    const event = new Event("beforeinstallprompt", { cancelable: true }) as Event & {
      prompt: () => Promise<void>;
    };
    event.prompt = vi.fn().mockRejectedValue(new Error("Prompt unavailable"));
    render(<InstallAppPrompt />);
    act(() => window.dispatchEvent(event));

    fireEvent.click(screen.getByRole("button", { name: "Instalar" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Tente pelo menu do navegador.",
    );
  });
});
