import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LearningPanel, type LearningTab } from "@/components/lab/LearningPanel";
import { SiteRenderer } from "@/components/lab/SiteRenderer";
import { findNode, type Overrides } from "@/lab/model";
import { sites } from "@/lab/sites";

export const Route = createFileRoute("/site/$slug")({
  loader: ({ params }) => {
    const s = sites.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return { slug: s.slug, num: s.num, nome: s.nome, resumo: s.resumo };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `ODS ${loaderData.num} — ${loaderData.nome} | Laboratório de Sites ODS` },
          {
            name: "description",
            content: `Explore o site-modelo da ODS ${loaderData.num}: ${loaderData.resumo}`,
          },
          { property: "og:title", content: `ODS ${loaderData.num} — ${loaderData.nome}` },
          { property: "og:description", content: loaderData.resumo },
        ]
      : [{ title: "Indisponível" }, { name: "robots", content: "noindex" }],
  }),
  component: SitePage,
});

function SitePage() {
  const { slug } = Route.useLoaderData();
  const site = sites.find((s) => s.slug === slug)!;
  const navigate = useNavigate();
  const [sel, setSel] = useState<string>();
  const [tab, setTab] = useState<LearningTab>("entenda");
  const [ov, setOv] = useState<Overrides>({});
  const node = sel ? findNode(site.root, sel) : undefined;

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex flex-wrap items-center gap-3 border-b bg-card px-4 py-2.5">
        <Link to="/" className="font-display font-bold text-primary">
          ← Lab ODS
        </Link>
        <select
          value={slug}
          onChange={(e) => {
            setSel(undefined);
            setOv({});
            navigate({ to: "/site/$slug", params: { slug: e.target.value } });
          }}
          className="rounded-md border bg-background px-2 py-1 text-sm text-foreground"
          aria-label="Trocar de ODS"
        >
          {sites.map((s) => (
            <option key={s.slug} value={s.slug}>
              ODS {s.num} — {s.nome}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setSel(site.root.id)}
          className="rounded-md border bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground transition hover:bg-secondary/80"
        >
          Ver código do site completo
        </button>
        <span className="ml-auto hidden text-sm text-muted-foreground sm:inline">
          Clique em qualquer parte do site para aprender 👆
        </span>
      </header>
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <main className="lab-site min-h-0 flex-1 overflow-auto">
          <SiteRenderer
            key={slug}
            n={site.root}
            sel={sel}
            ov={ov}
            onSel={(id) => {
              setSel(id);
            }}
          />
        </main>
        {node && (
          <LearningPanel
            node={node}
            rootNode={site.root}
            siteTitle={`ODS ${site.num} — ${site.nome}`}
            tab={tab}
            onTabChange={setTab}
            onClose={() => setSel(undefined)}
            onSelectNode={(id) => setSel(id)}
            overrides={ov}
            onSetOverride={(nodeId, k, v) =>
              setOv((o) => ({ ...o, [nodeId]: { ...o[nodeId], [k]: v } }))
            }
            onResetOverride={(nodeId) =>
              setOv((o) => {
                const c = { ...o };
                delete c[nodeId];
                return c;
              })
            }
          />
        )}
      </div>
    </div>
  );
}
