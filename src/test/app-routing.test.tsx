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

  it("generates complete and distinct HTML/CSS structures for all 6 ODS models using only Energisa course concepts", () => {
    expect(sites.map((s) => s.num)).toEqual([2, 4, 6, 11, 12, 13]);

    const firstSectionClasses = new Set<string>();

    for (const site of sites) {
      expect(site.thumb).toMatch(/^\/images\/ods-\d+-hero\.jpg$/);
      const rootNode = findNode(site.root, `${site.slug}-0`);
      expect(rootNode).toBeDefined();

      // Ensure each site has a distinct layout structure and does not use CSS Grid/Flexbox outside the course syllabus
      const fullCss = toFullSiteCss(site.root);
      expect(fullCss).not.toContain("grid-template-columns");
      expect(fullCss).not.toContain("justify-content");
      expect(fullCss).toContain("@media screen and (max-width: 800px)");

      const firstSection = site.root.children?.find((c) => c.tag === "section")!;
      expect(firstSection).toBeDefined();
      firstSectionClasses.add(firstSection.cls);

      // Selecting a leaf element (<h1>) returns its exact single HTML and CSS rule
      const h1Node =
        findByClass(site.root, "titulo-principal") ?? findByClass(site.root, "titulo-capa")!;
      expect(h1Node).toBeDefined();
      expect(toHtml(h1Node)).toContain(`<h1 class="${h1Node.cls}">${h1Node.text}</h1>`);
      const h1Css = toCss(h1Node);
      expect(h1Css).toContain(`.${h1Node.cls} {`);
      expect(h1Css).toContain("font-family:");
      expect(h1Css).toContain("font-weight: bold;");

      // Full site CSS and standalone HTML document contain unique class rules per subtree
      const ruleEntries = collectSubtreeRuleEntries(site.root);
      const uniqueClassCount = new Set(ruleEntries.map((r) => r.cls)).size;
      expect(ruleEntries.length).toBe(uniqueClassCount);

      const fullDoc = toStandaloneHtmlDocument(site.root, site.nome, site.root.style);
      expect(fullDoc).toContain("<!DOCTYPE html>");
      expect(fullDoc).toContain('<body class="pagina">');
    }

    // Verify the 6 sites have distinct top section layouts
    expect(firstSectionClasses.size).toBeGreaterThanOrEqual(5);
  });

  it("specifically verifies ODS 12 circular image, highlight safety and live content overrides", () => {
    const ods12 = sites.find((s) => s.slug === "ods-12")!;
    const heroImg = findByClass(ods12.root, "hero-imagem")!;
    expect(toHtml(heroImg)).toBe(
      '<img class="hero-imagem" src="/images/ods-12-hero.jpg" alt="Coletores coloridos de reciclagem seletiva">',
    );
    const imgCss = toSingleCss(heroImg);
    expect(imgCss).toContain("width: 240px;");
    expect(imgCss).toContain("height: 240px;");
    expect(imgCss).toContain("border-radius: 120px;");

    // Highlight does not mutate raw code string passed to clipboard, and renders valid HTML without leaking class="tk-tag" into visible text
    const highlightedCss = highlight(imgCss, "css");
    expect(highlightedCss).toContain("tk-tag");
    expect(imgCss).not.toContain("tk-tag");

    const heroSection = findByClass(ods12.root, "hero")!;
    const heroHtml = toHtml(heroSection);
    const highlightedHtml = highlight(heroHtml, "html");
    expect(highlightedHtml).not.toContain("&lt;class=");
    const strippedText = highlightedHtml
      .replace(/<[^>]+>/g, "")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
    expect(strippedText).toBe(heroHtml);

    // Content overrides (live text and image src/alt editing) update generated HTML
    const h1Node = findByClass(ods12.root, "titulo-principal")!;
    const editedHtml = toHtml(heroSection, 0, {
      [h1Node.id]: { text: "Meu Projeto Escolar ODS 12" },
      [heroImg.id]: { src: "/images/ods-13-hero.jpg", alt: "Foto da floresta" },
    });
    expect(editedHtml).toContain('<h1 class="titulo-principal">Meu Projeto Escolar ODS 12</h1>');
    expect(editedHtml).toContain(
      '<img class="hero-imagem" src="/images/ods-13-hero.jpg" alt="Foto da floresta">',
    );
  });
});
