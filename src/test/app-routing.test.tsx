import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { findNode, toCss, toHtml } from "@/lab/model";
import { sites } from "@/lab/sites";
import { routeTree } from "@/routeTree.gen";

describe("App routing & ODS sites model", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches dynamic route /site/$slug for all 6 ODS models", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const site of sites) {
      const matches = router.matchRoutes(`/site/${site.slug}`);
      expect(matches.at(-1)?.routeId).toBe("/site/$slug");
    }
  });

  it("includes all 6 required ODS models with valid HTML and CSS generation", () => {
    expect(sites.map((s) => s.num)).toEqual([2, 4, 6, 11, 12, 13]);
    for (const site of sites) {
      expect(site.thumb).toMatch(/^\/images\/ods-\d+-hero\.jpg$/);
      const rootNode = findNode(site.root, `${site.slug}-0`);
      expect(rootNode).toBeDefined();
      expect(toHtml(site.root)).toContain('class="pagina"');
      expect(toCss(site.root)).toContain(".pagina {");
    }
  });
});
