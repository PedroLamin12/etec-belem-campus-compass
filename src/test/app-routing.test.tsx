import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import manifest from "../../public/manifest.webmanifest?raw";
import nativeConfig from "../../capacitor.config";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).toBe("/");
  });
  it("a fresh launch resolves to Início, not Equipe", () => {
    const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: ["/"] }), context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(router.history.location.pathname).at(-1)?.routeId).toBe("/");
  });
  it("installed app launches from the home URL", () => {
    const appManifest = JSON.parse(manifest) as {
      start_url: string;
      display: string;
      icons: { sizes: string }[];
    };
    expect(appManifest.start_url).toBe("/");
    expect(appManifest.display).toBe("standalone");
    expect(appManifest.icons.map((icon) => icon.sizes)).toEqual(expect.arrayContaining(["192x192", "512x512"]));
  });
  it("the Android wrapper opens the published home by default", () => {
    expect(nativeConfig.server.url).toBe("https://etec-belem-campus-compass.lovable.app/");
  });
});
