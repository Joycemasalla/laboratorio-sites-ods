import { useState } from "react";
import { highlight } from "@/lab/model";

interface CodeBoxProps {
  code: string;
  lang: "html" | "css";
}

export function CodeBox({ code, lang }: CodeBoxProps) {
  const [ok, setOk] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setOk(true);
          setTimeout(() => setOk(false), 1500);
        }}
        className="absolute right-2 top-2 rounded-md bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground transition hover:opacity-90"
      >
        {ok ? "Copiado!" : "Copiar código"}
      </button>
      <pre className="code-block max-h-80 overflow-auto rounded-lg p-4 pt-10 text-xs leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlight(code, lang) }} />
      </pre>
    </div>
  );
}
