import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Welcome, WELCOME_KEY, shouldShowWelcome } from "@/components/Welcome";

describe("Welcome screen", () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it("shows concise campus entry options without character illustrations", () => {
    render(<Welcome onDone={vi.fn()} />);

    expect(
      screen.getByRole("dialog", { name: "Boas-vindas ao Tour ETEC Belém" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fazer matrícula" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Conhecer a escola" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sou aluno novo" })).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getByRole("img")).toHaveAccessibleName("ETEC Parque Belém");
  });

  it("stores the welcome acknowledgement only for the current browser session", () => {
    const onDone = vi.fn();
    render(<Welcome onDone={onDone} />);

    fireEvent.click(screen.getByRole("button", { name: "Acessar o guia" }));

    expect(onDone).toHaveBeenCalledOnce();
    expect(sessionStorage.getItem(WELCOME_KEY)).toBe("1");
    expect(localStorage.getItem(WELCOME_KEY)).toBeNull();
    expect(shouldShowWelcome()).toBe(false);

    sessionStorage.clear();
    expect(shouldShowWelcome()).toBe(true);
  });

  it("does not suppress the welcome screen based on a previous local-storage value", () => {
    localStorage.setItem(WELCOME_KEY, "1");

    expect(shouldShowWelcome()).toBe(true);
  });
});
