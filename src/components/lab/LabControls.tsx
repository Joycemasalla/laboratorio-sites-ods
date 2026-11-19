import { toCss, type N, type Style } from "@/lab/model";
import { CodeBox } from "./CodeBox";

const px = (v?: string) => (v ? parseInt(v) || 0 : 0);
const hex = (v?: string) => (v && /^#[0-9a-f]{6}$/i.test(v) ? v : "#ffffff");
const swatches = [
  "#ffffff",
  "#1a1f36",
  "#3f7e44",
  "#1b9bc4",
  "#c5192d",
  "#e08a1e",
  "#ffd36b",
  "#a07a17",
];

interface LabControlsProps {
  n: N;
  ov: Style;
  set: (k: string, v: string) => void;
  reset: () => void;
}

export function LabControls({ n, ov, set, reset }: LabControlsProps) {
  const cur = { ...n.style, ...ov };
  const bg =
    cur["background-color"] ?? (cur["background"]?.startsWith("#") ? cur["background"] : undefined);

  const slider = (label: string, prop: string, max: number, unit = "px", fallback = 0) => (
    <label className="block text-sm">
      <span className="flex justify-between text-foreground">
        <span>
          {label} <code className="text-xs text-muted-foreground">{prop}</code>
        </span>
        <b>{cur[prop] ?? `${fallback}${unit}`}</b>
      </span>
      <input
        type="range"
        min={0}
        max={max}
        value={cur[prop] ? px(cur[prop]) : fallback}
        onChange={(e) => set(prop, e.target.value + unit)}
        className="w-full accent-primary"
      />
    </label>
  );

  const color = (label: string, prop: string, val?: string) => (
    <div className="text-sm">
      <span className="text-foreground">
        {label} <code className="text-xs text-muted-foreground">{prop}</code>
      </span>
      <div className="mt-1 flex flex-wrap items-center gap-1.5">
        <input
          type="color"
          aria-label={`Selecionar ${label.toLowerCase()}`}
          value={hex(val)}
          onChange={(e) => set(prop, e.target.value)}
          className="h-8 w-10 cursor-pointer rounded border"
        />
        {swatches.map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => set(prop, c)}
            aria-label={`Definir ${label.toLowerCase()} como ${c}`}
            className="h-6 w-6 rounded-full border"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Mude os valores e veja o site mudar na hora.</p>
      {color(
        "Cor de fundo",
        n.style["background"] && !n.style["background-color"] ? "background" : "background-color",
        bg,
      )}
      {color("Cor do texto", "color", cur["color"])}
      {slider("Tamanho da fonte", "font-size", 80, "px", 16)}
      {slider("Espaçamento interno", "padding", 120)}
      {slider("Espaçamento externo", "margin", 80)}
      {slider("Arredondamento", "border-radius", 60)}
      {slider("Largura", "width", 100, "%", 100)}
      {Object.keys(ov).length > 0 && <CodeBox code={toCss(n, ov)} lang="css" />}
      <button
        type="button"
        onClick={reset}
        className="w-full rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary"
      >
        Restaurar original
      </button>
    </div>
  );
}
