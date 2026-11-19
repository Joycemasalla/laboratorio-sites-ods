export type Style = Record<string, string>;
export type Kind =
  | "page"
  | "header"
  | "logo"
  | "nav"
  | "link"
  | "section"
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "img"
  | "button"
  | "grid"
  | "card"
  | "column"
  | "stat"
  | "footer";
export type N = {
  id: string;
  kind: Kind;
  tag: string;
  cls: string;
  label: string;
  text?: string;
  src?: string;
  alt?: string;
  href?: string;
  style: Style;
  children?: N[];
};

export const kindInfo: Record<Kind, { nome: string; explica: string }> = {
  page: {
    nome: "Página",
    explica:
      "É o contêiner principal que envolve todo o site. Define a fonte e a cor de fundo gerais.",
  },
  header: {
    nome: "Cabeçalho",
    explica:
      "O <header> é o topo do site. Normalmente traz o logotipo e o menu de navegação, ajudando o visitante a se orientar.",
  },
  logo: {
    nome: "Logotipo",
    explica:
      "Identifica o site. Geralmente é um texto destacado ou uma imagem com o nome do projeto.",
  },
  nav: {
    nome: "Menu de navegação",
    explica:
      "O <nav> agrupa os links principais do site. Usar display: flex coloca os links lado a lado.",
  },
  link: {
    nome: "Link",
    explica:
      "O <a> cria um link. O atributo href diz para onde ele leva — aqui, para uma seção da própria página (âncora com #).",
  },
  section: {
    nome: "Seção",
    explica:
      "A <section> divide a página em blocos temáticos. Cada seção costuma ter um título e um conteúdo relacionado.",
  },
  h1: {
    nome: "Título principal",
    explica:
      "O <h1> é o título mais importante da página. Deve existir apenas um por página, pois ajuda leitores de tela e buscadores a entender o assunto.",
  },
  h2: {
    nome: "Título de seção",
    explica:
      "O <h2> é um subtítulo que nomeia cada seção. Os títulos seguem uma hierarquia: h1 > h2 > h3.",
  },
  h3: {
    nome: "Título de card",
    explica: "O <h3> é um título de terceiro nível, usado dentro de cards ou subseções.",
  },
  p: {
    nome: "Parágrafo",
    explica:
      "O <p> guarda blocos de texto. O CSS controla tamanho, cor e espaçamento entre linhas (line-height) para facilitar a leitura.",
  },
  img: {
    nome: "Imagem",
    explica:
      "O <img> exibe uma imagem. O atributo src indica o arquivo e o alt descreve a imagem para quem não pode vê-la — sempre preencha o alt!",
  },
  button: {
    nome: "Botão",
    explica:
      "Um elemento de chamada para ação. Cores fortes, padding generoso e bordas arredondadas convidam o clique.",
  },
  grid: {
    nome: "Grade / Colunas",
    explica:
      "Um contêiner que organiza itens em colunas usando display: grid. grid-template-columns define quantas colunas existem.",
  },
  card: {
    nome: "Card",
    explica:
      "Um card é uma caixinha que agrupa informação relacionada (título + texto). Fundo, padding e border-radius dão o visual de cartão.",
  },
  column: {
    nome: "Coluna",
    explica:
      "Uma coluna de um layout dividido. Junto com outras colunas, forma um layout lado a lado.",
  },
  stat: {
    nome: "Destaque de dado",
    explica: "Um bloco que destaca um número importante. Fonte grande chama atenção para o dado.",
  },
  footer: {
    nome: "Rodapé",
    explica: "O <footer> fecha a página com créditos, contatos e links secundários.",
  },
};

export const propInfo: Record<string, string> = {
  "background-color": "Cor de fundo do elemento.",
  background: "Fundo do elemento — pode ser cor, gradiente ou imagem.",
  color: "Cor do texto.",
  padding: "Espaçamento interno: distância entre o conteúdo e a borda.",
  margin: "Espaçamento externo: distância entre o elemento e os vizinhos.",
  "margin-top": "Espaço externo acima do elemento.",
  "margin-bottom": "Espaço externo abaixo do elemento.",
  "border-radius": "Arredonda os cantos do elemento.",
  border: "Borda: espessura, estilo e cor.",
  "border-top": "Borda apenas no topo.",
  "border-left": "Borda apenas à esquerda.",
  "font-size": "Tamanho da fonte.",
  "font-weight": "Peso da fonte (400 normal, 700 negrito).",
  "font-family": "Família tipográfica usada no texto.",
  "line-height": "Altura da linha: espaço vertical entre as linhas do texto.",
  "letter-spacing": "Espaço entre as letras.",
  "text-align": "Alinhamento do texto (left, center, right).",
  "text-transform": "Transforma o texto (ex.: uppercase deixa em maiúsculas).",
  "text-decoration": "Decoração do texto, como sublinhado (none remove).",
  width: "Largura do elemento.",
  "max-width": "Largura máxima: o elemento não passa desse tamanho.",
  height: "Altura do elemento.",
  display: "Como o elemento se comporta no layout (block, flex, grid, inline-block).",
  "justify-content": "Distribui os itens no eixo principal do flex (ex.: space-between).",
  "align-items": "Alinha os itens no eixo cruzado do flex/grid (ex.: center).",
  gap: "Espaço entre os itens de um flex ou grid.",
  "grid-template-columns": "Define as colunas do grid. repeat(3, 1fr) = 3 colunas iguais.",
  "object-fit": "Como a imagem se ajusta à caixa (cover preenche cortando as sobras).",
  "box-shadow": "Sombra ao redor do elemento, dando profundidade.",
  "flex-wrap": "Permite que itens do flex quebrem para a linha de baixo.",
  opacity: "Transparência (0 invisível, 1 opaco).",
};

export function toReact(s: Style): React.CSSProperties {
  const o: Record<string, string> = {};
  for (const [k, v] of Object.entries(s)) o[k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = v;
  return o as React.CSSProperties;
}

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function toHtml(n: N, depth = 0): string {
  const pad = "  ".repeat(depth);
  let attrs = ` class="${n.cls}"`;
  if (n.href) attrs += ` href="${n.href}"`;
  if (n.tag === "img") return `${pad}<img${attrs} src="${n.src}" alt="${n.alt ?? ""}">`;
  if (!n.children?.length) return `${pad}<${n.tag}${attrs}>${esc(n.text ?? "")}</${n.tag}>`;
  return `${pad}<${n.tag}${attrs}>\n${n.children.map((c) => toHtml(c, depth + 1)).join("\n")}\n${pad}</${n.tag}>`;
}

export function toCss(n: N, s: Style = n.style): string {
  return `.${n.cls} {\n${Object.entries(s)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n")}\n}`;
}

export function findNode(n: N, id: string): N | undefined {
  if (n.id === id) return n;
  for (const c of n.children ?? []) {
    const f = findNode(c, id);
    if (f) return f;
  }
  return undefined;
}

export function highlight(code: string, lang: "html" | "css"): string {
  const e = esc(code);
  if (lang === "html")
    return e
      .replace(/(&lt;\/?)([a-z0-9]+)/g, '$1<span class="tk-tag">$2</span>')
      .replace(
        /([a-z-]+)=("[^"]*")/g,
        '<span class="tk-attr">$1</span>=<span class="tk-str">$2</span>',
      );
  return e
    .replace(/^(\.[\w-]+)/gm, '<span class="tk-tag">$1</span>')
    .replace(
      /^(\s+)([a-z-]+):(.*);$/gm,
      '$1<span class="tk-attr">$2</span>:<span class="tk-str">$3</span>;',
    );
}
