import { fireEvent, render, screen } from "@testing-library/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { HomePage } from "@/routes/index";

async function renderHome() {
  const rootRoute = createRootRoute({ component: HomePage });
  const routeTree = rootRoute.addChildren([
    createRoute({ getParentRoute: () => rootRoute, path: "/rota", component: () => null }),
    createRoute({ getParentRoute: () => rootRoute, path: "/mapa", component: () => null }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: "/ambientes/$id",
      component: () => null,
    }),
    createRoute({ getParentRoute: () => rootRoute, path: "/ambientes", component: () => null }),
    createRoute({ getParentRoute: () => rootRoute, path: "/missoes", component: () => null }),
    createRoute({ getParentRoute: () => rootRoute, path: "/creditos", component: () => null }),
  ]);
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  await router.load();
  render(<RouterProvider router={router} />);
}

describe("Campus home", () => {
  it("shows the campus hero, quick actions, search filters, and grouped catalog without an overlay", async () => {
    sessionStorage.setItem("tour-etec-welcome-done", "1");
    await renderHome();

    expect(
      screen.getByRole("heading", { name: "Explore a ETEC Parque Belém" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Entrada ETEC Parque Belém" })).toBeInTheDocument();
    for (const label of ["Todos", "Secretaria", "Labs TI", "Quadras", "Cantina", "Auditório"]) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: /Secretaria.*Fazer matrícula/ })).toHaveAttribute(
      "href",
      "/rota?de=portaria&para=secretaria",
    );
    expect(screen.getByRole("link", { name: /Mapa Geral.*Ver planta/ })).toHaveAttribute(
      "href",
      "/mapa",
    );
    for (const heading of ["Prédio Principal", "Bloco Anexo", "Área Externa"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
  });

  it("filters catalog environments by quick chip and text search", async () => {
    await renderHome();

    fireEvent.click(screen.getByRole("button", { name: "Labs TI" }));
    expect(screen.getByText("Laboratório de Informática 1")).toBeInTheDocument();
    expect(screen.getByText("Laboratório de Informática 2")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Cantina/ })).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox", { name: "Buscar ambientes por nome ou setor" }), {
      target: { value: "Informática 2" },
    });
    expect(screen.getByText("Laboratório de Informática 2")).toBeInTheDocument();
    expect(screen.queryByText("Laboratório de Informática 1")).not.toBeInTheDocument();
  });
});
