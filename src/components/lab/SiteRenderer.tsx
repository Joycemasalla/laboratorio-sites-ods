import type { ElementType, MouseEvent } from "react";
import { kindInfo, toReact, type ContentOverrides, type N, type Overrides } from "@/lab/model";

interface SiteRendererProps {
  n: N;
  sel: string | undefined;
  ov: Overrides;
  contentOv?: ContentOverrides;
  xray?: boolean;
  onSel: (id: string) => void;
}

export function SiteRenderer({
  n,
  sel,
  ov,
  contentOv = {},
  xray = false,
  onSel,
}: SiteRendererProps) {
  const Tag = (n.tag === "body" ? "div" : n.tag) as ElementType;
  const isSel = sel === n.id;
  const isContainerBox =
    n.tag === "div" ||
    n.tag === "body" ||
    n.tag === "section" ||
    n.tag === "header" ||
    n.tag === "footer";
  const showXray = xray && isContainerBox;

  const co = contentOv[n.id];
  const displayText = co?.text ?? n.text;
  const displaySrc = co?.src ?? n.src;
  const displayAlt = co?.alt ?? n.alt;

  const selectNode = () => {
    onSel(n.id);
  };

  const props = {
    className: `lab-el ${isSel ? "lab-sel" : ""} ${showXray ? "lab-xray" : ""}`.trim(),
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

  const xrayBadge =
    showXray && !isSel ? (
      <span className="lab-xray-badge">{`<${n.tag === "body" ? "body" : n.tag} class="${n.cls}">`}</span>
    ) : null;

  if (n.tag === "img") {
    return (
      <span style={{ position: "relative", display: "block" }}>
        {badge}
        <img {...props} src={displaySrc} alt={displayAlt} />
      </span>
    );
  }

  return (
    <Tag {...props} href={n.href}>
      {badge}
      {xrayBadge}
      {displayText}
      {n.children?.map((c) => (
        <SiteRenderer
          key={c.id}
          n={c}
          sel={sel}
          ov={ov}
          contentOv={contentOv}
          xray={xray}
          onSel={onSel}
        />
      ))}
    </Tag>
  );
}
