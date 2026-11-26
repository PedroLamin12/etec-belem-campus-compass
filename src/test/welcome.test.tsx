import { fireEvent, render, screen, within } from "@testing-library/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { describe, expect, it, vi } from "vitest";
import { Welcome } from "@/components/Welcome";

describe("Welcome screen", () => {
  async function renderWelcome(onDone = vi.fn()) {
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
    render(<RouterProvider router={router} />);
    return onDone;
  }

  it("shows the welcome title, subtitle, and three direct campus actions", async () => {
    await renderWelcome();

    const dialog = screen.getByRole("dialog", {
      name: "Tour ETEC Parque Belém",
    });
    expect(
      within(dialog).getByText(
        "Seu guia oficial para explorar salas, laboratórios e serviços do campus.",
      ),
    ).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /Fazer Matrícula/ })).toHaveAttribute(
      "href",
      "/rota?de=portaria&para=secretaria",
    );
    expect(within(dialog).getByRole("link", { name: /Ver Mapa do Campus/ })).toHaveAttribute(
      "href",
      "/mapa",
    );
    expect(within(dialog).getByRole("button", { name: "Explorar o Campus" })).toBeInTheDocument();
    expect(dialog.querySelector("img")).toHaveAttribute("alt", "Marca ETEC Parque Belém");
  });

  it("closes when the user chooses to explore the campus", async () => {
    const onDone = await renderWelcome();

    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: "Explorar o Campus" }),
    );

    expect(onDone).toHaveBeenCalledOnce();
  });
});
