import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState, type MouseEvent } from "react";
import { sites } from "@/lab/sites";
import { findNode, highlight, kindInfo, propInfo, toCss, toHtml, toReact, type N, type Style } from "@/lab/model";

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
          { name: "description", content: `Explore o site-modelo da ODS ${loaderData.num}: ${loaderData.resumo}` },
          { property: "og:title", content: `ODS ${loaderData.num} — ${loaderData.nome}` },
          { property: "og:description", content: loaderData.resumo },
        ]
      : [{ title: "Indisponível" }, { name: "robots", content: "noindex" }],
  }),
  component: SitePage,
});

type Overrides = Record<string, Style>;

function Render({ n, sel, ov, onSel }: { n: N; sel: string | undefined; ov: Overrides; onSel: (id: string) => void }) {
  const Tag = (n.tag === "body" ? "div" : n.tag) as any;
  const isSel = sel === n.id;
  const props = {
    className: `lab-el ${isSel ? "lab-sel" : ""}`,
    style: toReact({ ...n.style, ...ov[n.id] }),
    onClick: (e: MouseEvent) => { e.preventDefault(); e.stopPropagation(); onSel(n.id); },
  };
  const badge = isSel ? <span className="lab-badge">{`<${n.tag === "body" ? "body" : n.tag}> ${kindInfo[n.kind].nome}`}</span> : null;
  if (n.tag === "img")
    return (
      <span style={{ position: "relative", display: "block" }}>
        {badge}
        <img {...props} src={n.src} alt={n.alt} />
      </span>
    );
  return (
    <Tag {...props} href={n.href}>
      {badge}
      {n.text}
      {n.children?.map((c) => <Render key={c.id} n={c} sel={sel} ov={ov} onSel={onSel} />)}
    </Tag>
  );
}

function CodeBox({ code, lang }: { code: string; lang: "html" | "css" }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => { navigator.clipboard.writeText(code); setOk(true); setTimeout(() => setOk(false), 1500); }}
        className="absolute right-2 top-2 rounded-md bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground"
      >{ok ? "Copiado!" : "Copiar código"}</button>
      <pre className="code-block max-h-80 overflow-auto rounded-lg p-4 pt-10 text-xs leading-relaxed"><code dangerouslySetInnerHTML={{ __html: highlight(code, lang) }} /></pre>
    </div>
  );
}

const px = (v?: string) => (v ? parseInt(v) || 0 : 0);
const hex = (v?: string) => (v && /^#[0-9a-f]{6}$/i.test(v) ? v : "#ffffff");
const swatches = ["#ffffff", "#1a1f36", "#3f7e44", "#1b9bc4", "#c5192d", "#e08a1e", "#ffd36b", "#a07a17"];

function Lab({ n, ov, set, reset }: { n: N; ov: Style; set: (k: string, v: string) => void; reset: () => void }) {
  const cur = { ...n.style, ...ov };
  const bg = cur["background-color"] ?? (cur["background"]?.startsWith("#") ? cur["background"] : undefined);
  const slider = (label: string, prop: string, max: number, unit = "px", fallback = 0) => (
    <label className="block text-sm">
      <span className="flex justify-between text-foreground"><span>{label} <code className="text-xs text-muted-foreground">{prop}</code></span><b>{cur[prop] ?? `${fallback}${unit}`}</b></span>
      <input type="range" min={0} max={max} value={cur[prop] ? px(cur[prop]) : fallback} onChange={(e) => set(prop, e.target.value + unit)} className="w-full accent-primary" />
    </label>
  );
  const color = (label: string, prop: string, val?: string) => (
    <div className="text-sm">
      <span className="text-foreground">{label} <code className="text-xs text-muted-foreground">{prop}</code></span>
      <div className="mt-1 flex flex-wrap items-center gap-1.5">
        <input type="color" value={hex(val)} onChange={(e) => set(prop, e.target.value)} className="h-8 w-10 cursor-pointer rounded border" />
        {swatches.map((c) => (
          <button key={c} onClick={() => set(prop, c)} aria-label={c} className="h-6 w-6 rounded-full border" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Mude os valores e veja o site mudar na hora.</p>
      {color("Cor de fundo", n.style["background"] && !n.style["background-color"] ? "background" : "background-color", bg)}
      {color("Cor do texto", "color", cur["color"])}
      {slider("Tamanho da fonte", "font-size", 80, "px", 16)}
      {slider("Espaçamento interno", "padding", 120)}
      {slider("Espaçamento externo", "margin", 80)}
      {slider("Arredondamento", "border-radius", 60)}
      {slider("Largura", "width", 100, "%", 100)}
      {Object.keys(ov).length > 0 && <CodeBox code={toCss(n, ov)} lang="css" />}
      <button onClick={reset} className="w-full rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary">Restaurar original</button>
    </div>
  );
}

function SitePage() {
  const { slug } = Route.useLoaderData();
  const site = sites.find((s) => s.slug === slug)!;
  const navigate = useNavigate();
  const [sel, setSel] = useState<string>();
  const [tab, setTab] = useState<"entenda" | "html" | "css" | "lab">("entenda");
  const [ov, setOv] = useState<Overrides>({});
  const node = sel ? findNode(site.root, sel) : undefined;
  const tabs = [["entenda", "Entenda"], ["html", "HTML"], ["css", "CSS"], ["lab", "Experimente"]] as const;

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="flex flex-wrap items-center gap-3 border-b bg-card px-4 py-2.5">
        <Link to="/" className="font-display font-bold text-primary">← Lab ODS</Link>
        <select
          value={slug}
          onChange={(e) => { setSel(undefined); setOv({}); navigate({ to: "/site/$slug", params: { slug: e.target.value } }); }}
          className="rounded-md border bg-background px-2 py-1 text-sm text-foreground"
          aria-label="Trocar de ODS"
        >
          {sites.map((s) => <option key={s.slug} value={s.slug}>ODS {s.num} — {s.nome}</option>)}
        </select>
        <span className="ml-auto hidden text-sm text-muted-foreground sm:inline">Clique em qualquer parte do site para aprender 👆</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <main className="lab-site min-h-0 flex-1 overflow-auto">
          <Render key={slug} n={site.root} sel={sel} ov={ov} onSel={(id) => { setSel(id); }} />
        </main>
        {node && (
          <aside className="flex max-h-[55vh] w-full flex-col border-t bg-card md:max-h-none md:w-[400px] md:border-l md:border-t-0">
            <div className="flex items-start justify-between gap-2 p-4 pb-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Elemento selecionado</p>
                <h2 className="font-display text-xl font-bold text-foreground">{kindInfo[node.kind].nome} <code className="text-sm text-primary">&lt;{node.tag === "body" ? "body" : node.tag}&gt;</code></h2>
              </div>
              <button onClick={() => setSel(undefined)} aria-label="Fechar painel" className="rounded-md px-2 text-xl text-muted-foreground hover:bg-muted">×</button>
            </div>
            <div className="flex gap-1 border-b px-4">
              {tabs.map(([k, l]) => (
                <button key={k} onClick={() => setTab(k)} className={`border-b-2 px-3 py-2 text-sm font-semibold ${tab === k ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>{l}</button>
              ))}
            </div>
            <div className="flex-1 overflow-auto p-4">
              {tab === "entenda" && (
                <div className="space-y-3 text-sm leading-relaxed text-foreground">
                  <p>{kindInfo[node.kind].explica}</p>
                  <p className="rounded-lg bg-secondary p-3 text-secondary-foreground">Classe CSS usada: <code>.{node.cls}</code>. É por ela que o CSS encontra e estiliza este elemento.</p>
                  {node.children && <p className="text-muted-foreground">Este elemento contém {node.children.length} elemento(s) dentro dele — clique neles para explorar.</p>}
                </div>
              )}
              {tab === "html" && <CodeBox code={toHtml(node)} lang="html" />}
              {tab === "css" && (
                <div className="space-y-4">
                  <CodeBox code={toCss(node)} lang="css" />
                  <ul className="space-y-2">
                    {Object.entries(node.style).map(([k, v]) => (
                      <li key={k} className="rounded-lg border p-3 text-sm">
                        <code className="font-semibold text-primary">{k}: {v}</code>
                        <p className="mt-1 text-muted-foreground">{propInfo[k] ?? "Propriedade de estilo do elemento."}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tab === "lab" && (
                <Lab n={node} ov={ov[node.id] ?? {}}
                  set={(k, v) => setOv((o) => ({ ...o, [node.id]: { ...o[node.id], [k]: v } }))}
                  reset={() => setOv((o) => { const c = { ...o }; delete c[node.id]; return c; })} />
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
