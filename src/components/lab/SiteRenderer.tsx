import type { ElementType, MouseEvent } from "react";
import { kindInfo, toReact, type N, type Style } from "@/lab/model";

export type Overrides = Record<string, Style>;

interface SiteRendererProps {
  n: N;
  sel: string | undefined;
  ov: Overrides;
  onSel: (id: string) => void;
}

export function SiteRenderer({ n, sel, ov, onSel }: SiteRendererProps) {
  const Tag = (n.tag === "body" ? "div" : n.tag) as ElementType;
  const isSel = sel === n.id;

  const selectNode = () => {
    onSel(n.id);
  };

  const props = {
    className: `lab-el ${isSel ? "lab-sel" : ""}`,
    style: toReact({ ...n.style, ...ov[n.id] }),
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      selectNode();
    },
  };

  const badge = isSel ? (
    <span className="lab-badge">{`<${n.tag === "body" ? "body" : n.tag}> ${kindInfo[n.kind].nome}`}</span>
  ) : null;

  if (n.tag === "img") {
    return (
      <span style={{ position: "relative", display: "block" }}>
        {badge}
        <img {...props} src={n.src} alt={n.alt} />
      </span>
    );
  }

  return (
    <Tag {...props} href={n.href}>
      {badge}
      {n.text}
      {n.children?.map((c) => (
        <SiteRenderer key={c.id} n={c} sel={sel} ov={ov} onSel={onSel} />
      ))}
    </Tag>
  );
}
