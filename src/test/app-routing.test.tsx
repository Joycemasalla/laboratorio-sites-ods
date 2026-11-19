import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import {
  collectSubtreeRuleEntries,
  findExternalAnchorsInSubtree,
  findNode,
  highlight,
  kindInfo,
  propInfo,
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

function collectAllNodes(node: N, list: N[] = []): N[] {
  list.push(node);
  for (const child of node.children ?? []) {
    collectAllNodes(child, list);
  }
  return list;
}

function collectAnchorsAndIds(node: N, hrefs: string[] = [], ids: Set<string> = new Set()) {
  if (node.htmlId) ids.add(node.htmlId);
  if (node.href?.startsWith("#")) hrefs.push(node.href.slice(1));
  for (const child of node.children ?? []) {
    collectAnchorsAndIds(child, hrefs, ids);
  }
  return { hrefs, ids };
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

  it("audits all 6 ODS models for HTML5 validity, CSS class consistency, explanations, images and anchors", () => {
    expect(sites.map((s) => s.num)).toEqual([2, 4, 6, 11, 12, 13]);

    const firstSectionClasses = new Set<string>();

    for (const site of sites) {
      expect(site.thumb).toMatch(/^\/images\/ods-\d+-hero\.jpg$/);
      const thumbDiskPath = resolve(process.cwd(), "public", site.thumb.replace(/^\//, ""));
      expect(existsSync(thumbDiskPath)).toBe(true);

      const rootNode = findNode(site.root, `${site.slug}-0`);
      expect(rootNode).toBeDefined();

      // Ensure each site has a distinct layout structure and does not use CSS Grid/Flexbox outside the course syllabus
      const fullCss = toFullSiteCss(site.root);
      expect(fullCss).not.toContain("grid-template-columns");
      expect(fullCss).not.toContain("justify-content");
      expect(fullCss).toContain("@media screen and (max-width: 800px)");

      const firstSection = site.root.children?.find((c) => c.tag === "section");
      expect(firstSection).toBeDefined();
      firstSectionClasses.add(firstSection!.cls);

      // Walk every selectable node in this ODS model
      const allNodes = collectAllNodes(site.root);
      const classStyles = new Map<string, string>();
      const h1Nodes = allNodes.filter((n) => n.tag === "h1");
      expect(h1Nodes.length).toBe(1);

      for (const n of allNodes) {
        // Every node kind must have an educational explanation
        expect(kindInfo[n.kind]).toBeDefined();
        expect(kindInfo[n.kind].explica.length).toBeGreaterThan(20);

        // Every CSS property used in any node must be documented in propInfo
        for (const propName of Object.keys(n.style)) {
          expect(propInfo[propName]).toBeDefined();
        }

        // Every node with the same class name in the same site must have identical CSS rules (no conflicting duplicate classes)
        const serializedStyle = JSON.stringify(n.style);
        const existingStyle = classStyles.get(n.cls);
        if (existingStyle) {
          expect(serializedStyle).toBe(existingStyle);
        } else {
          classStyles.set(n.cls, serializedStyle);
        }

        // Images must exist on disk, have non-empty alt, and include object-fit: cover when both width and height are set
        if (n.tag === "img") {
          expect(n.src).toBeTruthy();
          expect(n.alt && n.alt.trim().length > 5).toBe(true);
          const imgDiskPath = resolve(process.cwd(), "public", n.src!.replace(/^\//, ""));
          expect(existsSync(imgDiskPath)).toBe(true);
          if (n.style["width"] && n.style["height"]) {
            expect(n.style["object-fit"]).toBe("cover");
          }
        }

        // Background url('/images/...') must also exist on disk
        if (n.style["background"]?.includes("url(")) {
          const match = n.style["background"].match(/url\(['"]?([^'")]+)['"]?\)/);
          expect(match?.[1]).toBeTruthy();
          const bgDiskPath = resolve(process.cwd(), "public", match![1]!.replace(/^\//, ""));
          expect(existsSync(bgDiskPath)).toBe(true);
        }

        // Verify copied HTML and CSS for every single selectable element
        const nodeHtml = toHtml(n);
        const nodeCss = toCss(n);
        expect(nodeHtml).toContain(`class="${n.cls}"`);
        expect(nodeCss).toContain(`.${n.cls} {`);

        // Verify every class used in the HTML snippet has a corresponding rule in the CSS snippet
        const htmlClassMatches = [...nodeHtml.matchAll(/class="([^"]+)"/g)].map((m) => m[1]!);
        for (const usedCls of htmlClassMatches) {
          expect(nodeCss).toContain(`.${usedCls} {`);
        }

        // Verify standalone HTML5 document for every node
        const standaloneDoc = toStandaloneHtmlDocument(n, site.nome, site.root.style);
        expect(standaloneDoc).toContain("<!DOCTYPE html>");
        expect(standaloneDoc).toContain('<html lang="pt-BR">');
        expect(standaloneDoc).toContain('<meta charset="UTF-8">');
        expect(standaloneDoc).toContain(
          '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        );
        expect(standaloneDoc).toContain('<body class="pagina">');
        expect(standaloneDoc).toContain(".pagina {");
        expect(standaloneDoc).toContain("</html>");
      }

      // Full site CSS and standalone HTML document contain unique class rules per subtree
      const ruleEntries = collectSubtreeRuleEntries(site.root);
      const uniqueClassCount = new Set(ruleEntries.map((r) => r.cls)).size;
      expect(ruleEntries.length).toBe(uniqueClassCount);
      expect(uniqueClassCount).toBe(classStyles.size);

      const fullDoc = toStandaloneHtmlDocument(site.root, site.nome, site.root.style);

      // Every internal anchor link (href="#...") must match an element with id="..." in the same site
      const { hrefs, ids } = collectAnchorsAndIds(site.root);
      expect(hrefs.length).toBeGreaterThan(0);
      for (const targetId of hrefs) {
        expect(ids.has(targetId)).toBe(true);
        expect(fullDoc).toContain(`id="${targetId}"`);
      }

      // When selecting only the <header>, external anchor targets are accurately detected and explained
      const headerNode = site.root.children?.find((c) => c.tag === "header");
      if (headerNode) {
        const extAnchors = findExternalAnchorsInSubtree(headerNode, site.root);
        expect(extAnchors.length).toBeGreaterThan(0);
        for (const ext of extAnchors) {
          expect(ext.targetTag).toBeDefined();
          expect(ext.targetCls).toBeDefined();
        }
      }
    }

    // Verify the 6 sites have distinct top section layouts
    expect(firstSectionClasses.size).toBeGreaterThanOrEqual(5);
  });

  it("specifically verifies ODS 12 circular image, clearfix explanation, highlight safety and live content overrides", () => {
    const ods12 = sites.find((s) => s.slug === "ods-12")!;
    const heroImg = findByClass(ods12.root, "hero-imagem")!;
    expect(toHtml(heroImg)).toBe(
      '<img class="hero-imagem" src="/images/ods-12-hero.jpg" alt="Coletores coloridos de reciclagem seletiva">',
    );
    const imgCss = toSingleCss(heroImg);
    expect(imgCss).toContain("width: 240px;");
    expect(imgCss).toContain("height: 240px;");
    expect(imgCss).toContain("object-fit: cover;");
    expect(imgCss).toContain("border-radius: 120px;");

    // Verify .limpar-flutuacao has the dedicated 'clearfix' kind and clear educational explanation
    const ods13 = sites.find((s) => s.slug === "ods-13")!;
    const clearfixNode = findByClass(ods13.root, "limpar-flutuacao")!;
    expect(clearfixNode.kind).toBe("clearfix");
    expect(kindInfo[clearfixNode.kind].nome).toContain("clear: both");
    expect(kindInfo[clearfixNode.kind].explica).toContain("limpar-flutuacao");

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
