import { kindInfo, propInfo, toCss, toHtml, type N, type Style } from "@/lab/model";
import { CodeBox } from "./CodeBox";
import { LabControls } from "./LabControls";
import type { Overrides } from "./SiteRenderer";

export type LearningTab = "entenda" | "html" | "css" | "lab";

const tabs: readonly [LearningTab, string][] = [
  ["entenda", "Entenda"],
  ["html", "HTML"],
  ["css", "CSS"],
  ["lab", "Experimente"],
] as const;

interface LearningPanelProps {
  node: N;
  tab: LearningTab;
  onTabChange: (tab: LearningTab) => void;
  onClose: () => void;
  overrides: Overrides;
  onSetOverride: (nodeId: string, prop: string, value: string) => void;
  onResetOverride: (nodeId: string) => void;
}

export function LearningPanel({
  node,
  tab,
  onTabChange,
  onClose,
  overrides,
  onSetOverride,
  onResetOverride,
}: LearningPanelProps) {
  const nodeOverrides: Style = overrides[node.id] ?? {};

  return (
    <aside
      aria-label="Painel de aprendizado"
      className="flex max-h-[55vh] w-full flex-col border-t bg-card md:max-h-none md:w-[400px] md:border-l md:border-t-0"
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
            <p className="rounded-lg bg-secondary p-3 text-secondary-foreground">
              Classe CSS usada: <code>.{node.cls}</code>. É por ela que o CSS encontra e estiliza
              este elemento.
            </p>
            {node.children && (
              <p className="text-muted-foreground">
                Este elemento contém {node.children.length} elemento(s) dentro dele — clique neles
                para explorar.
              </p>
            )}
          </div>
        )}
        {tab === "html" && <CodeBox code={toHtml(node)} lang="html" />}
        {tab === "css" && (
          <div className="space-y-4">
            <CodeBox code={toCss(node)} lang="css" />
            <ul className="space-y-2">
              {Object.entries(node.style).map(([k, v]) => (
                <li key={k} className="rounded-lg border p-3 text-sm">
                  <code className="font-semibold text-primary">
                    {k}: {v}
                  </code>
                  <p className="mt-1 text-muted-foreground">
                    {propInfo[k] ?? "Propriedade de estilo do elemento."}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === "lab" && (
          <LabControls
            n={node}
            ov={nodeOverrides}
            set={(k, v) => onSetOverride(node.id, k, v)}
            reset={() => onResetOverride(node.id)}
          />
        )}
      </div>
    </aside>
  );
}
