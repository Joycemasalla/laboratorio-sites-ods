import { toSingleCss, type ContentOverride, type N, type Style } from "@/lab/model";
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

const presetImages = [
  ["/images/ods-2-hero.jpg", "ODS 2 (Horta)"],
  ["/images/ods-4-hero.jpg", "ODS 4 (Sala de aula)"],
  ["/images/ods-6-hero.jpg", "ODS 6 (Água)"],
  ["/images/ods-11-hero.jpg", "ODS 11 (Cidade)"],
  ["/images/ods-12-hero.jpg", "ODS 12 (Reciclagem)"],
  ["/images/ods-13-hero.jpg", "ODS 13 (Floresta)"],
] as const;

interface LabControlsProps {
  n: N;
  ov: Style;
  contentOv: ContentOverride;
  set: (k: string, v: string) => void;
  setContent: (patch: ContentOverride) => void;
  reset: () => void;
}

export function LabControls({ n, ov, contentOv, set, setContent, reset }: LabControlsProps) {
  const cur = { ...n.style, ...ov };
  const bg =
    cur["background-color"] ?? (cur["background"]?.startsWith("#") ? cur["background"] : undefined);

  const hasText = typeof n.text === "string";
  const isImg = n.tag === "img";
  const currentText = contentOv.text ?? n.text ?? "";
  const currentSrc = contentOv.src ?? n.src ?? "";
  const currentAlt = contentOv.alt ?? n.alt ?? "";

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
      <p className="text-sm text-muted-foreground">
        Mude o conteúdo ou os valores de CSS abaixo e veja o site e os códigos mudarem na hora!
      </p>

      {/* Edição de Texto ao vivo */}
      {hasText && (
        <div className="rounded-lg border bg-secondary/40 p-3 space-y-2">
          <label className="block text-sm">
            <span className="font-semibold text-foreground">
              ✏️ Texto do elemento <code className="text-xs text-primary">&lt;{n.tag}&gt;</code>
            </span>
            {n.tag === "p" ? (
              <textarea
                rows={3}
                value={currentText}
                onChange={(e) => setContent({ text: e.target.value })}
                className="mt-1.5 w-full rounded-md border bg-background px-2.5 py-1.5 text-sm text-foreground"
                placeholder="Digite um novo texto..."
              />
            ) : (
              <input
                type="text"
                value={currentText}
                onChange={(e) => setContent({ text: e.target.value })}
                className="mt-1.5 w-full rounded-md border bg-background px-2.5 py-1.5 text-sm text-foreground"
                placeholder="Digite um novo texto..."
              />
            )}
          </label>
        </div>
      )}

      {/* Edição de Imagem ao vivo */}
      {isImg && (
        <div className="rounded-lg border bg-secondary/40 p-3 space-y-3">
          <p className="text-sm font-semibold text-foreground">
            🖼️ Trocar imagem <code className="text-xs text-primary">&lt;img&gt;</code>
          </p>
          <label className="block text-xs">
            <span className="text-muted-foreground">
              Endereço da imagem (atributo <code>src</code>):
            </span>
            <input
              type="text"
              value={currentSrc}
              onChange={(e) => setContent({ src: e.target.value })}
              className="mt-1 w-full rounded-md border bg-background px-2.5 py-1.5 text-xs text-foreground"
              placeholder="/images/ods-12-hero.jpg ou https://..."
            />
          </label>
          <div>
            <span className="block text-xs text-muted-foreground mb-1">
              Ou teste rapidamente outra foto do laboratório:
            </span>
            <div className="flex flex-wrap gap-1">
              {presetImages.map(([url, label]) => (
                <button
                  type="button"
                  key={url}
                  onClick={() => setContent({ src: url })}
                  className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                    currentSrc === url
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-foreground hover:border-primary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <label className="block text-xs">
            <span className="text-muted-foreground">
              Descrição da imagem (atributo <code>alt</code>):
            </span>
            <input
              type="text"
              value={currentAlt}
              onChange={(e) => setContent({ alt: e.target.value })}
              className="mt-1 w-full rounded-md border bg-background px-2.5 py-1.5 text-xs text-foreground"
              placeholder="Descreva a imagem..."
            />
          </label>
        </div>
      )}

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
      {Object.keys(ov).length > 0 && <CodeBox code={toSingleCss(n, cur)} lang="css" />}
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
