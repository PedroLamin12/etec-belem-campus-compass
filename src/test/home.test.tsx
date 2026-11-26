import { fireEvent, render, screen, within } from "@testing-library/react";
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
  it("opens the introduction on each Home visit, regardless of a legacy session flag", async () => {
    sessionStorage.setItem("tour-etec-welcome-done", "1");
    await renderHome();

    expect(await screen.findByRole("dialog", { name: "Tour ETEC Parque Belém" })).toBeVisible();
  });

  it("shows the campus hero, search filters, quick actions, and grouped catalog", async () => {
    await renderHome();

    const dialog = await screen.findByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Explorar o Campus" }));

    expect(screen.getByRole("heading", { name: "Tour ETEC Parque Belém" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abrir Introdução" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Entrada principal da ETEC Parque Belém" }),
    ).toBeInTheDocument();
    for (const label of ["Todos", "Secretaria", "Labs TI", "Quadras", "Cantina", "Auditório"]) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: /Secretaria & Matrícula/ })).toHaveAttribute(
      "href",
      "/rota?de=portaria&para=secretaria",
    );
    expect(screen.getByRole("link", { name: /Planta & Mapa Interativo/ })).toHaveAttribute(
      "href",
      "/mapa",
    );
    for (const heading of ["Prédio Principal", "Bloco Anexo", "Área Externa"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
  });

  it("filters catalog environments by quick chip and text search", async () => {
    await renderHome();
    fireEvent.click(
      within(await screen.findByRole("dialog")).getByRole("button", {
        name: "Explorar o Campus",
      }),
    );

    fireEvent.click(screen.getByRole("button", { name: "Labs TI" }));
    expect(
      screen.getByRole("heading", { name: "Laboratório de Informática 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Laboratório de Informática 2" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Cantina" })).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox", { name: "Buscar ambientes por nome ou setor" }), {
      target: { value: "Informática 2" },
    });
    expect(
      screen.getByRole("heading", { name: "Laboratório de Informática 2" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Laboratório de Informática 1" }),
    ).not.toBeInTheDocument();
  });
});
