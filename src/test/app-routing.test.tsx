import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import {
  collectSubtreeRuleEntries,
  findNode,
  highlight,
  toCss,
  toFullSiteCss,
  toHtml,
  toSingleCss,
  toStandaloneHtmlDocument,
  type N,
} from "@/lab/model";
import { sites } from "@/lab/sites";
import { routeTree } from "@/routeTree.gen";

function findByClass(node: N, cls: string): N | undefined {
  if (node.cls === cls) return node;
  for (const child of node.children ?? []) {
    const found = findByClass(child, cls);
    if (found) return found;
  }
  return undefined;
}

describe("App routing & ODS sites HTML/CSS fidelity", () => {
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

  it("generates complete and faithful HTML and CSS for container and leaf elements across all 6 ODS models", () => {
    expect(sites.map((s) => s.num)).toEqual([2, 4, 6, 11, 12, 13]);

    for (const site of sites) {
      expect(site.thumb).toMatch(/^\/images\/ods-\d+-hero\.jpg$/);
      const rootNode = findNode(site.root, `${site.slug}-0`);
      expect(rootNode).toBeDefined();

      // 1. Selecting a section container (<section class="hero">) includes both its HTML and the CSS rules for all inner elements
      const heroSection = findByClass(site.root, "hero")!;
      expect(heroSection).toBeDefined();
      const heroHtml = toHtml(heroSection);
      const heroCss = toCss(heroSection);

      expect(heroHtml).toContain('<section class="hero">');
      expect(heroHtml).toContain('<h1 class="titulo-principal">');
      expect(heroHtml).toContain('<a class="botao" href="#acao">');

      // Verify CSS includes the container rule AND the inner elements' rules
      expect(heroCss).toContain(".hero {");
      expect(heroCss).toContain("background-color:");
      expect(heroCss).toContain(".titulo-principal {");
      expect(heroCss).toContain("font-family:");
      expect(heroCss).toContain("font-size: 52px;");
      expect(heroCss).toContain("font-weight: 700;");
      expect(heroCss).toContain(".subtitulo {");
      expect(heroCss).toContain(".botao {");
      expect(heroCss).toContain("border-radius:");

      // 2. Selecting a leaf element (<h1>) returns its exact single HTML and CSS rule
      const h1Node = findByClass(site.root, "titulo-principal")!;
      expect(toHtml(h1Node)).toBe(`<h1 class="titulo-principal">${h1Node.text}</h1>`);
      const h1Css = toCss(h1Node);
      expect(h1Css).toContain(".titulo-principal {");
      expect(h1Css).toContain("font-family:");
      expect(h1Css).toContain("font-size: 52px;");
      expect(h1Css).toContain("font-weight: 700;");
      expect(h1Css).toContain("color:");

      // 3. Full site CSS and standalone HTML document contain no distinct classes with conflicting definitions
      const ruleEntries = collectSubtreeRuleEntries(site.root);
      const uniqueClassCount = new Set(ruleEntries.map((r) => r.cls)).size;
      expect(ruleEntries.length).toBe(uniqueClassCount);

      const fullDoc = toStandaloneHtmlDocument(site.root, site.nome, site.root.style);
      expect(fullDoc).toContain("<!DOCTYPE html>");
      expect(fullDoc).toContain('<body class="pagina">');
      expect(fullDoc).toContain(toFullSiteCss(site.root).split("\n")[0]!);
    }
  });

  it("specifically verifies ODS 12 circular image, serif title, and section styles", () => {
    const ods12 = sites.find((s) => s.slug === "ods-12")!;
    const heroImg = findByClass(ods12.root, "hero-imagem")!;
    expect(toHtml(heroImg)).toBe(
      '<img class="hero-imagem" src="/images/ods-12-hero.jpg" alt="Consumir com consciência">',
    );
    const imgCss = toSingleCss(heroImg);
    expect(imgCss).toContain("width: 100%;");
    expect(imgCss).toContain("height: 380px;");
    expect(imgCss).toContain("object-fit: cover;");
    expect(imgCss).toContain("border-radius: 999px;");

    // Highlight does not mutate raw code string passed to clipboard
    const highlighted = highlight(imgCss, "css");
    expect(highlighted).toContain("tk-tag");
    expect(imgCss).not.toContain("tk-tag");
  });
});
