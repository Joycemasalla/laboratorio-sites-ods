import { useState } from "react";
import {
  collectSubtreeRuleEntries,
  kindInfo,
  propInfo,
  toCss,
  toHtml,
  toSingleCss,
  toStandaloneHtmlDocument,
  type ContentOverride,
  type ContentOverrides,
  type N,
  type Overrides,
  type Style,
} from "@/lab/model";
import { BoxModelDiagram } from "./BoxModelDiagram";
import { CodeBox } from "./CodeBox";
import { LabControls } from "./LabControls";

export type LearningTab = "entenda" | "html" | "css" | "lab";

const tabs: readonly [LearningTab, string][] = [
  ["entenda", "Entenda"],
  ["html", "HTML"],
  ["css", "CSS"],
  ["lab", "Experimente"],
] as const;

interface LearningPanelProps {
  node: N;
  rootNode: N;
  siteTitle: string;
  tab: LearningTab;
  onTabChange: (tab: LearningTab) => void;
  onClose: () => void;
  onSelectNode: (id: string) => void;
  overrides: Overrides;
  contentOverrides: ContentOverrides;
  onSetOverride: (nodeId: string, prop: string, value: string) => void;
  onSetContentOverride: (nodeId: string, patch: ContentOverride) => void;
  onResetOverride: (nodeId: string) => void;
}

export function LearningPanel({
  node,
  rootNode,
  siteTitle,
  tab,
  onTabChange,
  onClose,
  onSelectNode,
  overrides,
  contentOverrides,
  onSetOverride,
  onSetContentOverride,
  onResetOverride,
}: LearningPanelProps) {
  const [showFullHtml, setShowFullHtml] = useState(false);
  const [onlyThisRule, setOnlyThisRule] = useState(false);

  const nodeOverrides: Style = overrides[node.id] ?? {};
  const nodeContentOverrides: ContentOverride = contentOverrides[node.id] ?? {};
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const ruleEntries = collectSubtreeRuleEntries(node, overrides);
  const currentMergedStyle: Style = { ...node.style, ...nodeOverrides };

  const htmlCode = showFullHtml
    ? toStandaloneHtmlDocument(node, siteTitle, rootNode.style, overrides, contentOverrides)
    : toHtml(node, 0, contentOverrides);

  const cssCode =
    onlyThisRule || !hasChildren ? toSingleCss(node, currentMergedStyle) : toCss(node, overrides);

  return (
    <aside
      aria-label="Painel de aprendizado"
      className="flex max-h-[55vh] w-full flex-col border-t bg-card md:max-h-none md:w-[440px] md:border-l md:border-t-0"
    >
      <div className="flex items-start justify-between gap-2 p-4 pb-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Elemento selecionado
          </p>
          <h2 className="font-display text-xl font-bold text-foreground">
            {kindInfo[node.kind].nome}{" "}
            <code className="text-sm text-primary">
              &lt;{node.tag === "body" ? "body" : node.tag}&gt;
            </code>
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar painel"
          className="rounded-md px-2 text-xl text-muted-foreground hover:bg-muted"
        >
          ×
        </button>
      </div>
      <div className="flex gap-1 border-b px-4" role="tablist" aria-label="Abas de aprendizado">
        {tabs.map(([k, l]) => (
          <button
            type="button"
            role="tab"
            aria-selected={tab === k}
            key={k}
            onClick={() => onTabChange(k)}
            className={`border-b-2 px-3 py-2 text-sm font-semibold ${
              tab === k ? "border-primary text-primary" : "border-transparent text-muted-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto p-4">
        {tab === "entenda" && (
          <div className="space-y-3 text-sm leading-relaxed text-foreground">
            <p>{kindInfo[node.kind].explica}</p>
            <div className="rounded-lg bg-secondary p-3 text-secondary-foreground">
              <p>
                Tag HTML: <code>&lt;{node.tag === "body" ? "body" : node.tag}&gt;</code> · Classe
                CSS: <code>.{node.cls}</code>
              </p>
              <p className="mt-1 text-xs opacity-90">
                No HTML, o atributo <code>class="{node.cls}"</code> identifica este elemento para
                que o seletor <code>.{node.cls}</code> no CSS aplique suas cores, fontes e
                espaçamentos.
              </p>
            </div>

            {/* Diagrama Visual do Box Model (Margin, Border, Padding e Conteúdo) */}
            <BoxModelDiagram style={currentMergedStyle} tag={node.tag} cls={node.cls} />

            {hasChildren && (
              <div className="rounded-lg border p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Elementos dentro deste bloco ({node.children!.length})
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {node.children!.map((child) => (
                    <button
                      type="button"
                      key={child.id}
                      onClick={() => onSelectNode(child.id)}
                      className="rounded-md border bg-background px-2 py-1 text-xs font-medium text-foreground transition hover:border-primary hover:text-primary"
                    >
                      <code>&lt;{child.tag}&gt;</code> .{child.cls}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "html" && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-muted-foreground">
                {showFullHtml
                  ? "Arquivo index.html completo com HTML + CSS juntos, pronto para salvar e abrir no navegador."
                  : "Estrutura HTML deste elemento e de tudo que está dentro dele."}
              </p>
              <button
                type="button"
                onClick={() => setShowFullHtml((v) => !v)}
                className="rounded-md border bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground transition hover:bg-secondary/80"
              >
                {showFullHtml ? "Ver apenas o trecho HTML" : "Ver página HTML + CSS pronta"}
              </button>
            </div>
            <CodeBox code={htmlCode} lang="html" />
            {!showFullHtml && (
              <p className="rounded-lg border bg-muted/40 p-2.5 text-xs text-muted-foreground">
                Dica: Para reproduzir exatamente este visual no seu computador, copie este HTML e
                combine com o código da aba <b>CSS</b>, ou clique em{" "}
                <b>"Ver página HTML + CSS pronta"</b> acima.
              </p>
            )}
          </div>
        )}

        {tab === "css" && (
          <div className="space-y-4">
            {hasChildren && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground">
                  {onlyThisRule
                    ? `Exibindo apenas a regra de .${node.cls}.`
                    : `Exibindo .${node.cls} e as ${ruleEntries.length - 1} classe(s) internas que compõem este trecho.`}
                </p>
                <button
                  type="button"
                  onClick={() => setOnlyThisRule((v) => !v)}
                  className="rounded-md border bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground transition hover:bg-secondary/80"
                >
                  {onlyThisRule ? "Ver CSS completo do trecho" : `Ver só .${node.cls}`}
                </button>
              </div>
            )}
            <CodeBox code={cssCode} lang="css" />

            {/* Diagrama Visual do Box Model também na aba CSS para referência rápida */}
            <BoxModelDiagram style={currentMergedStyle} tag={node.tag} cls={node.cls} />

            <div className="space-y-4">
              {(onlyThisRule || !hasChildren ? ruleEntries.slice(0, 1) : ruleEntries).map(
                (entry) => (
                  <div key={entry.cls} className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Propriedades de <code className="text-primary">.{entry.cls}</code> (
                      {entry.label})
                    </p>
                    <ul className="space-y-2">
                      {Object.entries(entry.style).map(([k, v]) => (
                        <li key={`${entry.cls}-${k}`} className="rounded-lg border p-3 text-sm">
                          <code className="font-semibold text-primary">
                            {k}: {v};
                          </code>
                          <p className="mt-1 text-muted-foreground">
                            {propInfo[k] ?? "Propriedade de estilo que controla a apresentação."}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {tab === "lab" && (
          <LabControls
            n={node}
            ov={nodeOverrides}
            contentOv={nodeContentOverrides}
            set={(k, v) => onSetOverride(node.id, k, v)}
            setContent={(patch) => onSetContentOverride(node.id, patch)}
            reset={() => onResetOverride(node.id)}
          />
        )}
      </div>
    </aside>
  );
}
