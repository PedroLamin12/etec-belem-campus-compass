import { fireEvent, render, screen, within } from "@testing-library/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { beforeEach, describe, expect, it } from "vitest";
import { WELCOME_KEY, shouldShowWelcome, Welcome } from "@/components/Welcome";

describe("Welcome screen", () => {
  async function renderWelcome(onDone = () => {}) {
    const rootRoute = createRootRoute({
      component: () => <Welcome onDone={onDone} />,
    });
    const routeTree = rootRoute.addChildren([
      createRoute({ getParentRoute: () => rootRoute, path: "/rota", component: () => null }),
      createRoute({ getParentRoute: () => rootRoute, path: "/mapa", component: () => null }),
    ]);
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ["/"] }),
    });

    await router.load();
    return render(<RouterProvider router={router} />);
  }

  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it("shows direct campus actions without character illustrations", async () => {
    await renderWelcome();

    const dialog = screen.getByRole("dialog", {
      name: "Boas-vindas ao Tour ETEC Parque Belém",
    });
    expect(within(dialog).getByRole("link", { name: "Fazer Matrícula" })).toHaveAttribute(
      "href",
      "/rota?de=portaria&para=secretaria",
    );
    expect(within(dialog).getByRole("link", { name: "Ver Mapa do Campus" })).toHaveAttribute(
      "href",
      "/mapa",
    );
    expect(within(dialog).getByRole("button", { name: "Explorar Ambientes" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Acessar início" })).toBeInTheDocument();
    expect(dialog.querySelectorAll("img")).toHaveLength(1);
    expect(dialog.querySelector("img")).toHaveAttribute("alt", "ETEC Parque Belém");
  });

  it("stores the welcome acknowledgement only for the current browser session", async () => {
    await renderWelcome();

    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: "Acessar início" }),
    );

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
