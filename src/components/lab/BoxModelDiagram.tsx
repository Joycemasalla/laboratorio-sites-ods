import type { Style } from "@/lab/model";

interface BoxModelDiagramProps {
  style: Style;
  tag: string;
  cls: string;
}

export function BoxModelDiagram({ style, tag, cls }: BoxModelDiagramProps) {
  const marginVal =
    style["margin"] ??
    (style["margin-top"] || style["margin-bottom"]
      ? `topo: ${style["margin-top"] ?? "0px"} · baixo: ${style["margin-bottom"] ?? "0px"}`
      : "0px");

  const borderVal =
    style["border"] ??
    (style["border-top"]
      ? `topo: ${style["border-top"]}`
      : style["border-left"]
        ? `esquerda: ${style["border-left"]}`
        : style["border-bottom"]
          ? `baixo: ${style["border-bottom"]}`
          : "sem borda");

  const radiusVal = style["border-radius"] ? ` (cantos: ${style["border-radius"]})` : "";

  const paddingVal = style["padding"] ?? "0px";

  const sizeVal =
    style["width"] || style["height"] || style["max-width"]
      ? [
          style["width"] ? `largura: ${style["width"]}` : null,
          style["max-width"] ? `máx: ${style["max-width"]}` : null,
          style["height"] ? `altura: ${style["height"]}` : null,
        ]
          .filter(Boolean)
          .join(" · ")
      : "automático (adapta ao conteúdo)";

  return (
    <div className="rounded-xl border bg-card p-3 text-xs">
      <p className="mb-2 font-semibold text-foreground">
        📦 Modelo de Caixa (Box Model) de <code className="text-primary">.{cls}</code>
      </p>
      <p className="mb-3 text-muted-foreground">
        No CSS, todo elemento é uma caixa com 4 camadas: <b>margin</b> (espaço por fora),{" "}
        <b>border</b> (a borda), <b>padding</b> (espaço por dentro) e o <b>conteúdo</b> no centro.
      </p>

      {/* Camada 1: Margin (Laranja claro) */}
      <div className="rounded-lg border-2 border-dashed border-amber-500/70 bg-amber-500/10 p-2.5 text-center">
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-amber-900 dark:text-amber-300">
          <span>MARGIN (espaço externo)</span>
          <code className="rounded bg-amber-500/20 px-1.5 py-0.5">{marginVal}</code>
        </div>

        {/* Camada 2: Border (Azul/Roxo) */}
        <div className="rounded-md border-2 border-indigo-500/80 bg-indigo-500/10 p-2.5">
          <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-indigo-950 dark:text-indigo-200">
            <span>BORDER (borda{radiusVal})</span>
            <code className="rounded bg-indigo-500/20 px-1.5 py-0.5">{borderVal}</code>
          </div>

          {/* Camada 3: Padding (Verde) */}
          <div className="rounded border-2 border-dashed border-emerald-600/70 bg-emerald-500/15 p-2.5">
            <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-emerald-950 dark:text-emerald-200">
              <span>PADDING (espaço interno)</span>
              <code className="rounded bg-emerald-600/20 px-1.5 py-0.5">{paddingVal}</code>
            </div>

            {/* Camada 4: Conteúdo */}
            <div className="rounded border border-primary/40 bg-background px-2 py-2 text-center font-medium text-foreground">
              <div>
                Conteúdo <code>&lt;{tag === "body" ? "body" : tag}&gt;</code>
              </div>
              <div className="mt-0.5 text-[10px] text-muted-foreground">{sizeVal}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
