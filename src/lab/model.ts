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
  | "list"
  | "listitem"
  | "footer";

export type N = {
  id: string;
  kind: Kind;
  tag: string;
  cls: string;
  label: string;
  text?: string | undefined;
  src?: string | undefined;
  alt?: string | undefined;
  href?: string | undefined;
  style: Style;
  children?: N[] | undefined;
};

export type Overrides = Record<string, Style>;

export type ContentOverride = {
  text?: string;
  src?: string;
  alt?: string;
};

export type ContentOverrides = Record<string, ContentOverride>;

export const kindInfo: Record<Kind, { nome: string; explica: string }> = {
  page: {
    nome: "Página",
    explica:
      "O <body> é o corpo principal que envolve todo o conteúdo visível do site. No CSS, a classe .pagina define a fonte padrão, a cor de fundo, a cor do texto e remove as margens padrão do navegador (margin: 0px).",
  },
  header: {
    nome: "Cabeçalho",
    explica:
      'O <header> (ou <div class="cabecalho">) fica no topo do site e apresenta o título/logotipo e os links de navegação para as seções da página.',
  },
  logo: {
    nome: "Logotipo / Título do topo",
    explica:
      "O título (<h2>) que identifica o nome do site no cabeçalho. Usa font-size maior, font-weight: bold e color de destaque.",
  },
  nav: {
    nome: "Menu de navegação",
    explica:
      'Uma <div> que agrupa os links (<a>) do menu. Cada link usa href="#nome-da-secao" para rolar até a seção escolhida.',
  },
  link: {
    nome: "Link do menu",
    explica:
      "A tag <a> cria um link clicável. O atributo href indica o destino (por exemplo, #problema leva até a seção correspondente), e text-decoration: none remove o sublinhado padrão.",
  },
  section: {
    nome: "Seção",
    explica:
      "Uma <div> que divide a página em blocos temáticos (como Apresentação/Hero, Problema, Dados, Cards, Soluções e Chamada para Ação). O padding cria o espaço interno para o conteúdo não encostar nas bordas.",
  },
  h1: {
    nome: "Título principal",
    explica:
      "O <h1> é o título mais importante da página. Deve existir apenas um <h1> por página para destacar o tema principal.",
  },
  h2: {
    nome: "Título de seção",
    explica:
      "O <h2> identifica o título de cada seção da página, mantendo a hierarquia de títulos (h1 → h2 → h3).",
  },
  h3: {
    nome: "Título de item / card",
    explica:
      "O <h3> introduz o título de um card, item de solução ou número em destaque dentro de uma seção.",
  },
  p: {
    nome: "Parágrafo",
    explica:
      "A tag <p> organiza blocos de texto. Propriedades como font-size (tamanho da letra), line-height (altura da linha) e color (cor) garantem uma leitura confortável.",
  },
  img: {
    nome: "Imagem",
    explica:
      "A tag <img> exibe uma fotografia ou ilustração. O atributo src aponta para o arquivo da imagem, o alt descreve a imagem, e object-fit: cover ajusta a foto sem distorcer a proporção.",
  },
  button: {
    nome: "Botão de ação",
    explica:
      "Um link (<a>) estilizado como botão de chamada para ação. A combinação de background-color, color contrastante, padding interno e border-radius cria a aparência de botão clicável.",
  },
  grid: {
    nome: "Bloco de colunas",
    explica:
      "Uma <div> que agrupa colunas ou caixas lado a lado (usando float: left com width em porcentagem, como ensinado na Aula 4).",
  },
  card: {
    nome: "Cartão (Card)",
    explica:
      "Uma <div> que agrupa um título (<h3>) e um parágrafo (<p>). Usa cor de fundo, padding interno, bordas arredondadas ou borda colorida e sombra (box-shadow) para se destacar.",
  },
  column: {
    nome: "Coluna de conteúdo",
    explica:
      "Uma <div> que agrupa textos, títulos e botões dentro de uma seção, controlando a largura máxima (max-width) para manter as linhas confortáveis de ler.",
  },
  stat: {
    nome: "Destaque de dado",
    explica:
      "Uma <div> que coloca em evidência um número ou dado importante sobre a ODS, usando largura (width), alinhamento (text-align) e cores de destaque.",
  },
  list: {
    nome: "Lista (<ul> / <ol>)",
    explica:
      "A tag <ul> cria uma lista com marcadores (bolinhas) e a tag <ol> cria uma lista numerada (1, 2, 3...). Dentro dela colocamos os itens usando a tag <li>.",
  },
  listitem: {
    nome: "Item da lista (<li>)",
    explica:
      "A tag <li> define cada tópico dentro de uma lista <ul> ou <ol>. Usamos margin-bottom ou line-height no CSS para dar espaço entre um tópico e outro.",
  },
  footer: {
    nome: "Rodapé",
    explica:
      'O <footer> (ou <div class="rodape">) fecha a página na parte inferior com informações de autoria e créditos. Quando usamos float nas seções anteriores, aplicamos clear: both para o rodapé ficar sempre embaixo de tudo.',
  },
};

export const propInfo: Record<string, string> = {
  "background-color": "Define a cor sólida de fundo do elemento.",
  background: "Define o fundo do elemento (pode ser uma cor sólida, um gradiente ou imagem).",
  color: "Define a cor do texto do elemento.",
  padding: "Espaçamento interno: cria espaço entre o conteúdo (texto/filhos) e a borda da caixa.",
  margin:
    "Espaçamento externo: controla a distância por fora da caixa (0 auto centraliza o bloco horizontalmente).",
  "margin-top": "Espaçamento externo apenas na parte superior do elemento.",
  "margin-bottom": "Espaçamento externo apenas na parte inferior do elemento.",
  "border-radius":
    "Arredonda os cantos da caixa (valores altos como 999px criam formato de pílula ou círculo).",
  border: "Define a espessura, o estilo e a cor da borda ao redor do elemento.",
  "border-top":
    "Cria uma borda de destaque apenas na parte superior do elemento (muito comum em cards).",
  "border-left": "Cria uma barra vertical colorida na lateral esquerda do elemento.",
  "border-bottom": "Cria uma linha divisória na parte inferior do elemento.",
  "font-size": "Controla o tamanho das letras (em pixels, rem, etc.).",
  "font-weight": "Controla a espessura da letra (400 é normal, 600 é seminegrito, 700 é negrito).",
  "font-family":
    "Define a fonte tipográfica utilizada no texto e uma fonte reserva (como sans-serif ou serif).",
  "line-height":
    "Controla a distância vertical entre as linhas de um texto para melhorar a legibilidade.",
  "letter-spacing": "Ajusta o espaçamento horizontal entre as letras.",
  "text-align": "Alinha o texto horizontalmente (left = esquerda, center = centralizado).",
  "text-transform": "Transforma as letras do texto (uppercase deixa tudo em maiúsculas).",
  "text-decoration": "Controla sublinhados no texto (none remove o sublinhado padrão dos links).",
  width: "Define a largura do elemento (100% faz ocupar toda a largura disponível na coluna).",
  "max-width":
    "Limita a largura máxima do bloco para que textos não fiquem compridos demais em telas grandes.",
  height: "Define a altura fixa do elemento.",
  display:
    "Define o modo de layout da caixa: block (bloco), inline-block (bloco em linha), flex (linha flexível) ou grid (grade de colunas).",
  "justify-content":
    "No Flexbox, distribui os itens no eixo principal (space-between separa os itens nas extremidades).",
  "align-items": "No Flexbox ou Grid, alinha os itens verticalmente (center centraliza na altura).",
  gap: "Define o espaço livre entre as colunas ou itens de um contêiner Flex ou Grid.",
  "grid-template-columns":
    "Define a quantidade e a largura das colunas no CSS Grid. Com repeat(auto-fit, minmax(240px, 1fr)), as colunas se adaptam automaticamente ao tamanho da tela.",
  "object-fit":
    "Controla como uma imagem se encaixa na sua largura e altura definidas (cover preenche o espaço sem achatar a foto).",
  "box-shadow": "Adiciona uma sombra suave atrás do elemento, criando sensação de profundidade.",
  "flex-wrap":
    "Com o valor wrap, permite que os itens do Flexbox quebrem para a linha de baixo em telas menores.",
  "box-sizing":
    "Com border-box, faz com que padding e bordas sejam incluídos dentro da largura total (width) do elemento.",
  float:
    "Faz o elemento flutuar para a esquerda (left) ou direita (right), permitindo colocar caixas ou imagens lado a lado (Aula 4).",
  clear:
    "Proíbe que outros elementos flutuem ao lado deste bloco. O valor both faz o bloco descer para depois das colunas com float (Aula 4).",
  position:
    "Define o tipo de posicionamento do elemento: static (normal), relative (relativo à posição inicial), absolute ou fixed (Aula 4).",
  top: "Define a distância do topo em elementos posicionados com position.",
  bottom: "Define a distância da base em elementos posicionados com position.",
  left: "Define a distância da esquerda em elementos posicionados com position.",
  right: "Define a distância da direita em elementos posicionados com position.",
  "z-index": "Define a ordem de empilhamento (qual caixa fica na frente quando duas se sobrepõem).",
  "text-shadow":
    "Adiciona uma sombra atrás das letras do texto (ex.: 2px 2px 4px #000000), destacando o título sobre imagens de fundo (Aula 3).",
  "background-size":
    "Controla o tamanho da imagem de fundo (cover faz a foto cobrir toda a área da div).",
  "background-position":
    "Controla o alinhamento da imagem de fundo (center centraliza a foto na div).",
  "margin-left": "Espaçamento externo apenas na lateral esquerda do elemento.",
  "margin-right": "Espaçamento externo apenas na lateral direita do elemento.",
  "padding-left": "Espaçamento interno apenas na lateral esquerda do elemento.",
  "padding-right": "Espaçamento interno apenas na lateral direita do elemento.",
  "padding-top": "Espaçamento interno apenas no topo do elemento.",
  "padding-bottom": "Espaçamento interno apenas na base do elemento.",
  opacity: "Controla a transparência do elemento (de 0 invisível até 1 totalmente visível).",
};

export function toReact(s: Style): React.CSSProperties {
  const o: Record<string, string> = {};
  for (const [k, v] of Object.entries(s)) {
    o[k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = v;
  }
  return o as React.CSSProperties;
}

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Gera o código HTML limpo e indentado para um elemento (e seus filhos),
 * aplicando eventuais alterações de texto ou imagem feitas na aba Experimente.
 */
export function toHtml(n: N, depth = 0, contentOverrides: ContentOverrides = {}): string {
  const pad = "  ".repeat(depth);
  const co = contentOverrides[n.id];
  const text = co?.text ?? n.text ?? "";
  const src = co?.src ?? n.src;
  const alt = co?.alt ?? n.alt ?? "";

  let attrs = ` class="${n.cls}"`;
  if (n.href) attrs += ` href="${n.href}"`;
  if (n.tag === "img") return `${pad}<img${attrs} src="${src}" alt="${esc(alt)}">`;
  if (!n.children?.length) return `${pad}<${n.tag}${attrs}>${esc(text)}</${n.tag}>`;
  return `${pad}<${n.tag}${attrs}>\n${n.children
    .map((c) => toHtml(c, depth + 1, contentOverrides))
    .join("\n")}\n${pad}</${n.tag}>`;
}

/**
 * Gera a regra CSS de um único nó.
 */
export function toSingleCss(n: N, s: Style = n.style): string {
  return `.${n.cls} {\n${Object.entries(s)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n")}\n}`;
}

/**
 * Coleta os nós únicos (por classe CSS) de uma subárvore na ordem em que aparecem,
 * garantindo que quando o aluno seleciona um contêiner (ex: <section class="hero">),
 * o CSS exibido inclua tanto a regra do contêiner quanto as regras de todos os elementos
 * internos presentes no HTML daquele trecho.
 */
export function collectSubtreeRuleEntries(
  rootNode: N,
  overrides: Overrides = {},
): Array<{ cls: string; label: string; tag: string; style: Style; isTarget: boolean }> {
  const seen = new Set<string>();
  const entries: Array<{
    cls: string;
    label: string;
    tag: string;
    style: Style;
    isTarget: boolean;
  }> = [];

  function walk(curr: N, isRoot: boolean) {
    const mergedStyle: Style = { ...curr.style, ...(overrides[curr.id] ?? {}) };
    // Se for o próprio elemento clicado ou uma classe ainda não listada
    const key = isRoot ? `__root__:${curr.cls}` : curr.cls;
    if (!seen.has(key) && (!seen.has(curr.cls) || isRoot)) {
      seen.add(key);
      seen.add(curr.cls);
      entries.push({
        cls: curr.cls,
        label: kindInfo[curr.kind].nome,
        tag: curr.tag,
        style: mergedStyle,
        isTarget: isRoot,
      });
    }
    for (const child of curr.children ?? []) {
      walk(child, false);
    }
  }

  walk(rootNode, true);
  return entries;
}

/**
 * Gera o CSS completo correspondente ao trecho HTML do elemento selecionado:
 * - Se for um elemento simples (ex: <h1>, <img>, <a>), gera a regra CSS dele.
 * - Se for um elemento com filhos (ex: <section class="hero">, <header>, <div class="card">),
 *   gera a regra do elemento selecionado e também as regras das classes filhas que aparecem
 *   no HTML exibido, para que ao copiar HTML + CSS o resultado visual seja 100% fiel.
 */
export function toCss(n: N, overridesOrStyle?: Overrides | Style): string {
  // Compatibilidade: se passaram um Style simples para o próprio nó (sem sub-chaves de ID)
  let overrides: Overrides = {};
  if (overridesOrStyle) {
    const firstVal = Object.values(overridesOrStyle)[0];
    if (typeof firstVal === "string") {
      overrides = { [n.id]: overridesOrStyle as Style };
    } else {
      overrides = overridesOrStyle as Overrides;
    }
  }

  const entries = collectSubtreeRuleEntries(n, overrides);
  return entries
    .map(
      (entry) =>
        `.${entry.cls} {\n${Object.entries(entry.style)
          .map(([k, v]) => `  ${k}: ${v};`)
          .join("\n")}\n}`,
    )
    .join("\n\n");
}

/**
 * Gera a folha de estilos completa (`style.css`) de um site-modelo inteiro,
 * incluindo o reset básico (`box-sizing: border-box` e margens de títulos/parágrafos),
 * todas as classes CSS que constroem a página e a `@media screen and (max-width: 800px)`
 * de responsividade ensinada na Aula 5.
 */
export function toFullSiteCss(rootNode: N, overrides: Overrides = {}): string {
  const reset = `/* Regras gerais da página */\n* {\n  box-sizing: border-box;\n}\n\nh1, h2, h3, p {\n  margin-top: 0;\n}`;
  const mediaQuery = `/* Responsividade para celulares e telas até 800px (Aula 5) */\n@media screen and (max-width: 800px) {\n  div, img {\n    float: none;\n    width: 100%;\n    margin-left: 0px;\n    margin-right: 0px;\n  }\n}`;
  return `${reset}\n\n${toCss(rootNode, overrides)}\n\n${mediaQuery}`;
}

/**
 * Gera um documento HTML5 completo e autossuficiente (com Google Fonts e CSS)
 * para um elemento/seção ou para o site inteiro, pronto para o aluno salvar como
 * `index.html` e abrir no navegador com visual 100% idêntico à prévia.
 */
export function toStandaloneHtmlDocument(
  n: N,
  siteTitle: string,
  pageStyle: Style,
  overrides: Overrides = {},
  contentOverrides: ContentOverrides = {},
): string {
  const isFullPage = n.tag === "body";
  const cssCode = isFullPage
    ? toFullSiteCss(n, overrides)
    : `/* Reset básico e fonte/fundo herdados da página */\n* {\n  box-sizing: border-box;\n}\n\nbody {\n${Object.entries(
        pageStyle,
      )
        .map(([k, v]) => `  ${k}: ${v};`)
        .join("\n")}\n}\n\nh1, h2, h3, p {\n  margin-top: 0;\n}\n\n${toCss(n, overrides)}`;

  const bodyHtml = isFullPage
    ? (n.children ?? []).map((c) => toHtml(c, 2, contentOverrides)).join("\n")
    : toHtml(n, 2, contentOverrides);

  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteTitle}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Fraunces:wght@600;700&family=Space+Grotesk:wght@500;700&display=swap">
    <style>
${cssCode
  .split("\n")
  .map((line) => (line ? `      ${line}` : ""))
  .join("\n")}
    </style>
  </head>
  <body class="pagina">
${bodyHtml}
  </body>
</html>`;
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
      .replace(
        /([a-z-]+)=("[^"]*")/gi,
        '<span class="tk-attr">$1</span>=<span class="tk-str">$2</span>',
      )
      .replace(/(&lt;\/?)([a-z0-9!]+)/gi, '$1<span class="tk-tag">$2</span>');
  return e
    .replace(/^(\/\*.*\*\/)$/gm, '<span class="tk-str">$1</span>')
    .replace(/^(\.[\w-]+|body|\*|h1, h2, h3, p)/gm, '<span class="tk-tag">$1</span>')
    .replace(
      /^(\s+)([a-z-]+):(.*);$/gm,
      '$1<span class="tk-attr">$2</span>:<span class="tk-str">$3</span>;',
    );
}
