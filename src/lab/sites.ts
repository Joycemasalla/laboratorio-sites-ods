import type { N, Style } from "./model";

type Maker = (
  kind: N["kind"],
  tag: string,
  cls: string,
  label: string,
  style: Style,
  extra?: Partial<N>,
) => N;

function createMaker(slug: string): Maker {
  let i = 0;
  return (kind, tag, cls, label, style, extra = {}) => ({
    id: `${slug}-${i++}`,
    kind,
    tag,
    cls,
    label,
    style,
    ...extra,
  });
}

/**
 * 1. ODS 2 — Fome Zero ("Prato Cheio")
 * Estilo & Layout (Inspirado no Exercício "Menu/Catálogo" da Aula 2 + Float 2 Colunas da Aula 4):
 * - Cabeçalho centralizado com logotipo grande e barra de menu abaixo
 * - Banner de topo em 2 colunas usando `float: left` e `width: 48%`
 * - Seção de destaque com lista ordenada `<ol>` e `<li>` ("Como funciona a horta")
 * - Galeria de iniciativas em 2 cartões largos (`width: 46%`, `float: left`, `margin: 2%`) com foto e descrição
 * - Rodapé com `clear: both`
 */
function buildOds2(): N {
  const mk = createMaker("ods-2");
  const fontHeading = "'Fraunces', Georgia, serif";
  const fontBody = "'DM Sans', Arial, sans-serif";

  return mk(
    "page",
    "body",
    "pagina",
    "Página",
    {
      "font-family": fontBody,
      "background-color": "#fffaf0",
      color: "#3b2410",
      margin: "0px",
    },
    {
      children: [
        mk(
          "header",
          "header",
          "cabecalho",
          "Cabeçalho",
          {
            "background-color": "#fbefd8",
            padding: "24px 5%",
            "text-align": "center",
            "border-bottom": "3px solid #c8781a",
          },
          {
            children: [
              mk(
                "logo",
                "h2",
                "logo",
                "Logotipo",
                {
                  "font-family": fontHeading,
                  "font-size": "28px",
                  "font-weight": "bold",
                  color: "#c8781a",
                  "margin-top": "0px",
                  "margin-bottom": "10px",
                },
                { text: "Prato Cheio — ODS 2" },
              ),
              mk(
                "nav",
                "div",
                "menu",
                "Menu",
                {
                  "text-align": "center",
                },
                {
                  children: [
                    ["Início", "#inicio"],
                    ["O Problema", "#problema"],
                    ["Iniciativas", "#iniciativas"],
                    ["Como Ajudar", "#ajudar"],
                  ].map(([txt, href]) =>
                    mk(
                      "link",
                      "a",
                      "menu-link",
                      "Link",
                      {
                        "font-family": fontBody,
                        color: "#3b2410",
                        "text-decoration": "none",
                        "font-weight": "bold",
                        "font-size": "15px",
                        margin: "0px 14px",
                      },
                      { text: txt, href },
                    ),
                  ),
                },
              ),
            ],
          },
        ),

        // Hero com 2 colunas usando float: left (Aula 4)
        mk(
          "section",
          "section",
          "hero",
          "Seção",
          {
            "background-color": "#fffaf0",
            padding: "48px 6%",
          },
          {
            htmlId: "inicio",
            children: [
              mk(
                "column",
                "div",
                "hero-texto",
                "Coluna",
                {
                  float: "left",
                  width: "48%",
                  "margin-right": "4%",
                },
                {
                  children: [
                    mk(
                      "h1",
                      "h1",
                      "titulo-principal",
                      "Título principal",
                      {
                        "font-family": fontHeading,
                        "font-size": "42px",
                        "font-weight": "bold",
                        "line-height": "1.15",
                        color: "#3b2410",
                        "margin-top": "0px",
                        "margin-bottom": "16px",
                      },
                      { text: "Ninguém deveria ir dormir com fome" },
                    ),
                    mk(
                      "p",
                      "p",
                      "subtitulo",
                      "Parágrafo",
                      {
                        "font-family": fontBody,
                        "font-size": "17px",
                        "line-height": "1.6",
                        color: "#3b2410",
                        "margin-top": "0px",
                        "margin-bottom": "20px",
                      },
                      {
                        text: "Conheça como hortas comunitárias, agricultura familiar e o combate ao desperdício podem garantir alimento saudável para todos.",
                      },
                    ),
                    mk(
                      "button",
                      "a",
                      "botao",
                      "Botão",
                      {
                        display: "inline-block",
                        "background-color": "#c8781a",
                        color: "#fffaf0",
                        padding: "12px 24px",
                        border: "2px solid #a35e0f",
                        "font-family": fontBody,
                        "font-size": "16px",
                        "font-weight": "bold",
                        "text-decoration": "none",
                      },
                      { text: "Quero participar", href: "#ajudar" },
                    ),
                  ],
                },
              ),
              mk(
                "img",
                "img",
                "hero-imagem",
                "Imagem",
                {
                  float: "left",
                  width: "48%",
                  height: "300px",
                  "object-fit": "cover",
                  border: "4px solid #c8781a",
                },
                {
                  src: "/images/ods-2-hero.jpg",
                  alt: "Horta comunitária com vegetais frescos",
                },
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        // Faixa de Dados usando clear: both + 3 caixas com float: left e width: 31% (Exercício Aula 4 / Aula 5)
        mk(
          "section",
          "section",
          "faixa-dados",
          "Seção",
          {
            clear: "both",
            "background-color": "#c8781a",
            color: "#fffaf0",
            padding: "40px 6%",
            "text-align": "center",
          },
          {
            htmlId: "problema",
            children: [
              mk(
                "h2",
                "h2",
                "titulo-dados",
                "Título de seção",
                {
                  "font-family": fontHeading,
                  "font-size": "28px",
                  "font-weight": "bold",
                  color: "#fffaf0",
                  "margin-top": "0px",
                  "margin-bottom": "24px",
                },
                { text: "A fome em números" },
              ),
              ...[
                ["735 milhões", "de pessoas passam fome no mundo atualmente"],
                ["1/3 da comida", "produzida no planeta acaba sendo desperdiçada"],
                ["Meta 2030", "erradicar a fome e garantir nutrição para todos"],
              ].map(([num, desc]) =>
                mk(
                  "stat",
                  "div",
                  "caixa-dado",
                  "Destaque de dado",
                  {
                    float: "left",
                    width: "31%",
                    margin: "1%",
                    padding: "18px",
                    "background-color": "#a86110",
                    border: "2px solid #ffd36b",
                    "text-align": "center",
                  },
                  {
                    children: [
                      mk(
                        "h3",
                        "h3",
                        "dado-numero",
                        "Título de item / card",
                        {
                          "font-family": fontHeading,
                          "font-size": "32px",
                          "font-weight": "bold",
                          color: "#ffd36b",
                          "margin-top": "0px",
                          "margin-bottom": "8px",
                        },
                        { text: num },
                      ),
                      mk(
                        "p",
                        "p",
                        "dado-texto",
                        "Parágrafo",
                        {
                          "font-family": fontBody,
                          "font-size": "15px",
                          "line-height": "1.5",
                          color: "#fffaf0",
                          "margin-top": "0px",
                          "margin-bottom": "0px",
                        },
                        { text: desc },
                      ),
                    ],
                  },
                ),
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        // Seção estilo Catálogo/Vitrine (Exercício 2 da Aula 2 - foto + título + descrição)
        mk(
          "section",
          "section",
          "iniciativas",
          "Seção",
          {
            clear: "both",
            "background-color": "#f6e7cc",
            padding: "48px 6%",
          },
          {
            htmlId: "iniciativas",
            children: [
              mk(
                "h2",
                "h2",
                "titulo-secao",
                "Título de seção",
                {
                  "font-family": fontHeading,
                  "font-size": "32px",
                  "font-weight": "bold",
                  color: "#3b2410",
                  "text-align": "center",
                  "margin-top": "0px",
                  "margin-bottom": "28px",
                },
                { text: "Iniciativas que alimentam famílias" },
              ),
              mk(
                "card",
                "div",
                "card-prato",
                "Cartão (Card)",
                {
                  float: "left",
                  width: "46%",
                  margin: "0px 2% 20px 2%",
                  "background-color": "#fffaf0",
                  padding: "20px",
                  border: "2px solid #c8781a",
                },
                {
                  children: [
                    mk(
                      "img",
                      "img",
                      "card-foto",
                      "Imagem",
                      {
                        width: "100%",
                        height: "200px",
                        "object-fit": "cover",
                        "margin-bottom": "14px",
                      },
                      {
                        src: "/images/ods-2-hero.jpg",
                        alt: "Canteiro de horta urbana",
                      },
                    ),
                    mk(
                      "h3",
                      "h3",
                      "card-titulo",
                      "Título de item / card",
                      {
                        "font-family": fontHeading,
                        "font-size": "22px",
                        "font-weight": "bold",
                        color: "#c8781a",
                        "margin-top": "0px",
                        "margin-bottom": "8px",
                      },
                      { text: "1. Hortas Comunitárias Urbanas" },
                    ),
                    mk(
                      "p",
                      "p",
                      "card-texto",
                      "Parágrafo",
                      {
                        "font-family": fontBody,
                        "font-size": "15px",
                        "line-height": "1.6",
                        color: "#3b2410",
                        "margin-top": "0px",
                        "margin-bottom": "0px",
                      },
                      {
                        text: "Terrenos vazios nos bairros são transformados pelos moradores em hortas que produzem verduras e legumes frescos sem agrotóxicos.",
                      },
                    ),
                  ],
                },
              ),
              mk(
                "card",
                "div",
                "card-prato",
                "Cartão (Card)",
                {
                  float: "left",
                  width: "46%",
                  margin: "0px 2% 20px 2%",
                  "background-color": "#fffaf0",
                  padding: "20px",
                  border: "2px solid #c8781a",
                },
                {
                  children: [
                    mk(
                      "img",
                      "img",
                      "card-foto",
                      "Imagem",
                      {
                        width: "100%",
                        height: "200px",
                        "object-fit": "cover",
                        "margin-bottom": "14px",
                      },
                      {
                        src: "/images/ods-2-solucao.jpg",
                        alt: "Feira de pequenos agricultores familiares",
                      },
                    ),
                    mk(
                      "h3",
                      "h3",
                      "card-titulo",
                      "Título de item / card",
                      {
                        "font-family": fontHeading,
                        "font-size": "22px",
                        "font-weight": "bold",
                        color: "#c8781a",
                        "margin-top": "0px",
                        "margin-bottom": "8px",
                      },
                      { text: "2. Bancos de Alimentos e Feiras Locais" },
                    ),
                    mk(
                      "p",
                      "p",
                      "card-texto",
                      "Parágrafo",
                      {
                        "font-family": fontBody,
                        "font-size": "15px",
                        "line-height": "1.6",
                        color: "#3b2410",
                        "margin-top": "0px",
                        "margin-bottom": "0px",
                      },
                      {
                        text: "Alimentos que seriam descartados em feiras e mercados são recolhidos e entregues para cozinhas solidárias e escolas.",
                      },
                    ),
                  ],
                },
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        // Passo a passo com lista ordenada <ol> e <li> (Aula 4 - Slide 129)
        mk(
          "section",
          "section",
          "passo-a-passo",
          "Seção",
          {
            clear: "both",
            "background-color": "#fffaf0",
            padding: "48px 10%",
          },
          {
            htmlId: "ajudar",
            children: [
              mk(
                "h2",
                "h2",
                "titulo-passos",
                "Título de seção",
                {
                  "font-family": fontHeading,
                  "font-size": "30px",
                  "font-weight": "bold",
                  color: "#3b2410",
                  "margin-top": "0px",
                  "margin-bottom": "14px",
                },
                { text: "Como evitar o desperdício na sua casa" },
              ),
              mk(
                "p",
                "p",
                "texto",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "16px",
                  "line-height": "1.6",
                  color: "#3b2410",
                  "margin-top": "0px",
                  "margin-bottom": "16px",
                },
                {
                  text: "Pequenas atitudes diárias ajudam a combater a fome e valorizar o alimento:",
                },
              ),
              mk(
                "list",
                "ol",
                "lista-passos",
                "Lista (<ol>)",
                {
                  "font-family": fontBody,
                  "font-size": "16px",
                  "line-height": "1.8",
                  color: "#3b2410",
                  "background-color": "#fbefd8",
                  padding: "20px 20px 20px 40px",
                  border: "2px solid #c8781a",
                },
                {
                  children: [
                    "Planeje as compras da semana para não deixar frutas e verduras estragarem.",
                    "Aproveite talos, folhas e cascas em sopas, tortas e sucos nutritivos.",
                    "Compre de pequenos produtores e feiras da sua cidade.",
                    "Apoie projetos de doação e bancos de alimentos da sua escola ou bairro.",
                  ].map((item) =>
                    mk(
                      "listitem",
                      "li",
                      "item-passo",
                      "Item da lista (<li>)",
                      {
                        "margin-bottom": "8px",
                      },
                      { text: item },
                    ),
                  ),
                },
              ),
            ],
          },
        ),

        mk(
          "footer",
          "footer",
          "rodape",
          "Rodapé",
          {
            clear: "both",
            "background-color": "#3b2410",
            color: "#fffaf0",
            padding: "28px 6%",
            "text-align": "center",
          },
          {
            children: [
              mk(
                "p",
                "p",
                "rodape-texto",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "14px",
                  color: "#fffaf0",
                  "margin-top": "0px",
                  "margin-bottom": "0px",
                },
                { text: "© 2026 Prato Cheio — Projeto Meu Primeiro Site sobre a ODS 2." },
              ),
            ],
          },
        ),
      ],
    },
  );
}

/**
 * 2. ODS 4 — Educação de Qualidade ("Aprender+")
 * Estilo & Layout (Inspirado no Layout com Barra Lateral `float: left` da Aula 4 - Slide 114/115):
 * - Cabeçalho vermelho com texto branco
 * - Layout clássico de Portal Escolar com Coluna Lateral à esquerda (`width: 30%`, `float: left`)
 *   contendo avisos e lista `<ul>` de metas, e Conteúdo Principal à direita (`width: 66%`, `float: right`)
 *   com imagem, texto explicativo e cartões empilhados com `border-left`
 * - Rodapé com `clear: both`
 */
function buildOds4(): N {
  const mk = createMaker("ods-4");
  const fontHeading = "'Space Grotesk', 'Trebuchet MS', sans-serif";
  const fontBody = "'DM Sans', Arial, sans-serif";

  return mk(
    "page",
    "body",
    "pagina",
    "Página",
    {
      "font-family": fontBody,
      "background-color": "#ffffff",
      color: "#1a1f36",
      margin: "0px",
    },
    {
      children: [
        mk(
          "header",
          "header",
          "cabecalho",
          "Cabeçalho",
          {
            "background-color": "#c5192d",
            color: "#ffffff",
            padding: "20px 6%",
            "border-bottom": "4px solid #ffd166",
          },
          {
            children: [
              mk(
                "logo",
                "h2",
                "logo",
                "Logotipo",
                {
                  "font-family": fontHeading,
                  "font-size": "24px",
                  "font-weight": "bold",
                  color: "#ffffff",
                  display: "inline-block",
                  margin: "0px",
                },
                { text: "Aprender+ | ODS 4" },
              ),
              mk(
                "nav",
                "div",
                "menu",
                "Menu",
                {
                  float: "right",
                  "margin-top": "4px",
                },
                {
                  children: [
                    ["Capa", "#capa"],
                    ["Dados", "#dados"],
                    ["Metas", "#metas"],
                    ["Participe", "#participe"],
                  ].map(([txt, href]) =>
                    mk(
                      "link",
                      "a",
                      "menu-link",
                      "Link",
                      {
                        "font-family": fontBody,
                        color: "#ffffff",
                        "text-decoration": "none",
                        "font-weight": "bold",
                        "font-size": "15px",
                        "margin-left": "18px",
                      },
                      { text: txt, href },
                    ),
                  ),
                },
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        // Banner superior centralizado com borda inferior
        mk(
          "section",
          "section",
          "capa-educacao",
          "Seção",
          {
            clear: "both",
            "background-color": "#fdecee",
            padding: "48px 8%",
            "text-align": "center",
            "border-bottom": "2px solid #f5c2c7",
          },
          {
            htmlId: "capa",
            children: [
              mk(
                "h1",
                "h1",
                "titulo-principal",
                "Título principal",
                {
                  "font-family": fontHeading,
                  "font-size": "44px",
                  "font-weight": "bold",
                  color: "#c5192d",
                  "margin-top": "0px",
                  "margin-bottom": "12px",
                },
                { text: "Educação de qualidade transforma vidas" },
              ),
              mk(
                "p",
                "p",
                "subtitulo",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "18px",
                  "line-height": "1.6",
                  color: "#1a1f36",
                  "margin-top": "0px",
                  "margin-bottom": "20px",
                },
                {
                  text: "Toda criança e jovem tem direito a uma escola acolhedora, com livros, tecnologia e professores valorizados.",
                },
              ),
              mk(
                "button",
                "a",
                "botao",
                "Botão",
                {
                  display: "inline-block",
                  "background-color": "#c5192d",
                  color: "#ffffff",
                  padding: "12px 26px",
                  "font-family": fontBody,
                  "font-size": "15px",
                  "font-weight": "bold",
                  "text-decoration": "none",
                },
                { text: "Conhecer projetos escolares", href: "#metas" },
              ),
            ],
          },
        ),

        // Layout de 2 Colunas: Sidebar à esquerda (width: 32%, float: left) + Conteúdo Principal à direita (width: 64%, float: right) — Slide 114 da Aula 4
        mk(
          "section",
          "section",
          "area-portal",
          "Seção",
          {
            padding: "40px 6%",
            "background-color": "#ffffff",
          },
          {
            children: [
              // Barra lateral (Sidebar)
              mk(
                "column",
                "div",
                "barra-lateral",
                "Coluna",
                {
                  float: "left",
                  width: "32%",
                  "background-color": "#1a1f36",
                  color: "#ffffff",
                  padding: "24px",
                  border: "3px solid #c5192d",
                },
                {
                  htmlId: "dados",
                  children: [
                    mk(
                      "h2",
                      "h2",
                      "titulo-lateral",
                      "Título de seção",
                      {
                        "font-family": fontHeading,
                        "font-size": "22px",
                        "font-weight": "bold",
                        color: "#ffd166",
                        "margin-top": "0px",
                        "margin-bottom": "16px",
                      },
                      { text: "Dados Importantes" },
                    ),
                    ...[
                      ["250 milhões", "de crianças e jovens estão fora da escola no mundo."],
                      ["44 milhões", "de novos professores são necessários até 2030."],
                      ["100%", "das escolas precisam de internet e biblioteca."],
                    ].map(([num, txt]) =>
                      mk(
                        "stat",
                        "div",
                        "bloco-lateral",
                        "Destaque de dado",
                        {
                          "border-bottom": "1px solid #394168",
                          "padding-bottom": "14px",
                          "margin-bottom": "14px",
                        },
                        {
                          children: [
                            mk(
                              "h3",
                              "h3",
                              "numero-lateral",
                              "Título de item / card",
                              {
                                "font-family": fontHeading,
                                "font-size": "28px",
                                "font-weight": "bold",
                                color: "#ffd166",
                                "margin-top": "0px",
                                "margin-bottom": "4px",
                              },
                              { text: num },
                            ),
                            mk(
                              "p",
                              "p",
                              "texto-lateral",
                              "Parágrafo",
                              {
                                "font-family": fontBody,
                                "font-size": "14px",
                                "line-height": "1.5",
                                color: "#ffffff",
                                "margin-top": "0px",
                                "margin-bottom": "0px",
                              },
                              { text: txt },
                            ),
                          ],
                        },
                      ),
                    ),
                    mk(
                      "h3",
                      "h3",
                      "subtitulo-lista",
                      "Título de item / card",
                      {
                        "font-family": fontHeading,
                        "font-size": "18px",
                        "font-weight": "bold",
                        color: "#ffd166",
                        "margin-top": "18px",
                        "margin-bottom": "10px",
                      },
                      { text: "Pilares da ODS 4:" },
                    ),
                    mk(
                      "list",
                      "ul",
                      "lista-pilares",
                      "Lista (<ul>)",
                      {
                        "font-family": fontBody,
                        "font-size": "14px",
                        "line-height": "1.7",
                        color: "#ffffff",
                        "padding-left": "20px",
                        margin: "0px",
                      },
                      {
                        children: [
                          "Ensino gratuito e inclusivo",
                          "Acessibilidade nas escolas",
                          "Laboratórios de informática",
                          "Valorização dos professores",
                        ].map((it) =>
                          mk(
                            "listitem",
                            "li",
                            "item-pilar",
                            "Item da lista (<li>)",
                            { "margin-bottom": "6px" },
                            { text: it },
                          ),
                        ),
                      },
                    ),
                  ],
                },
              ),

              // Conteúdo principal à direita
              mk(
                "column",
                "div",
                "conteudo-principal",
                "Coluna",
                {
                  float: "right",
                  width: "64%",
                },
                {
                  htmlId: "metas",
                  children: [
                    mk(
                      "img",
                      "img",
                      "foto-escola",
                      "Imagem",
                      {
                        width: "100%",
                        height: "250px",
                        "object-fit": "cover",
                        border: "2px solid #c5192d",
                        "margin-bottom": "20px",
                      },
                      {
                        src: "/images/ods-4-problema.jpg",
                        alt: "Estudantes aprendendo em sala de aula",
                      },
                    ),
                    mk(
                      "h2",
                      "h2",
                      "titulo-secao",
                      "Título de seção",
                      {
                        "font-family": fontHeading,
                        "font-size": "28px",
                        "font-weight": "bold",
                        color: "#1a1f36",
                        "margin-top": "0px",
                        "margin-bottom": "12px",
                      },
                      { text: "Por que investir na educação pública e inclusiva?" },
                    ),
                    mk(
                      "p",
                      "p",
                      "texto",
                      "Parágrafo",
                      {
                        "font-family": fontBody,
                        "font-size": "16px",
                        "line-height": "1.7",
                        color: "#1a1f36",
                        "margin-top": "0px",
                        "margin-bottom": "20px",
                      },
                      {
                        text: "Milhões de jovens ainda enfrentam barreiras para concluir os estudos. Garantir salas equipadas, bibliotecas comunitárias e acesso à programação abre portas para o futuro.",
                      },
                    ),
                    ...[
                      [
                        "Bibliotecas Comunitárias",
                        "Espaços abertos no bairro com empréstimo gratuito de livros e rodas de leitura.",
                      ],
                      [
                        "Monitoria entre Alunos",
                        "Grupos de estudo onde alunos ajudam colegas em matemática, leitura e programação.",
                      ],
                      [
                        "Internet e Computadores",
                        "Aulas práticas de tecnologia para incluir todos os estudantes na cultura digital.",
                      ],
                    ].map(([tit, desc]) =>
                      mk(
                        "card",
                        "div",
                        "card-meta",
                        "Cartão (Card)",
                        {
                          "background-color": "#fdecee",
                          "border-left": "6px solid #c5192d",
                          padding: "16px 20px",
                          "margin-bottom": "14px",
                        },
                        {
                          children: [
                            mk(
                              "h3",
                              "h3",
                              "card-titulo",
                              "Título de item / card",
                              {
                                "font-family": fontHeading,
                                "font-size": "19px",
                                "font-weight": "bold",
                                color: "#c5192d",
                                "margin-top": "0px",
                                "margin-bottom": "6px",
                              },
                              { text: tit },
                            ),
                            mk(
                              "p",
                              "p",
                              "card-texto",
                              "Parágrafo",
                              {
                                "font-family": fontBody,
                                "font-size": "15px",
                                "line-height": "1.5",
                                color: "#1a1f36",
                                "margin-top": "0px",
                                "margin-bottom": "0px",
                              },
                              { text: desc },
                            ),
                          ],
                        },
                      ),
                    ),
                  ],
                },
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        mk(
          "footer",
          "footer",
          "rodape",
          "Rodapé",
          {
            clear: "both",
            "background-color": "#1a1f36",
            color: "#ffffff",
            padding: "26px 6%",
            "text-align": "center",
          },
          {
            htmlId: "participe",
            children: [
              mk(
                "p",
                "p",
                "rodape-texto",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "14px",
                  color: "#ffffff",
                  "margin-top": "0px",
                  "margin-bottom": "0px",
                },
                { text: "© 2026 Aprender+ — Projeto Meu Primeiro Site sobre a ODS 4." },
              ),
            ],
          },
        ),
      ],
    },
  );
}

/**
 * 3. ODS 6 — Água Potável e Saneamento ("Gota Viva")
 * Estilo & Layout (Inspirado diretamente no Desafio da Aula 3 "Nossos Mares" - Slides 83, 85, 91 e 105):
 * - Capa grande com imagem de fundo `background: url('/images/ods-6-hero.jpg')`, texto branco centralizado,
 *   `text-shadow`, linha divisória e botão com borda branca transparente
 * - Seção de explicação do problema com imagem flutuando à direita (`float: right`) estilo jornal (Slide 113)
 * - Seção de 4 Metas empilhadas verticalmente (como no Slide 105 "Metas")
 */
function buildOds6(): N {
  const mk = createMaker("ods-6");
  const fontHeading = "'Fraunces', Georgia, serif";
  const fontBody = "'DM Sans', Arial, sans-serif";

  return mk(
    "page",
    "body",
    "pagina",
    "Página",
    {
      "font-family": fontBody,
      "background-color": "#f4fbfd",
      color: "#0b2a3a",
      margin: "0px",
    },
    {
      children: [
        // Capa com background: url() igual ao Desafio "Nossos Mares" (Slide 83 e 91)
        mk(
          "section",
          "section",
          "capa-agua",
          "Seção",
          {
            background: "url('/images/ods-6-hero.jpg')",
            "background-size": "cover",
            "background-position": "center",
            "background-color": "#0b4f6c",
            color: "#ffffff",
            padding: "90px 10%",
            "text-align": "center",
            "border-bottom": "5px solid #1b9bc4",
          },
          {
            children: [
              mk(
                "h1",
                "h1",
                "titulo-capa",
                "Título principal",
                {
                  "font-family": fontHeading,
                  "font-size": "54px",
                  "font-weight": "bold",
                  color: "#ffffff",
                  "text-shadow": "2px 2px 6px #061821",
                  "margin-top": "0px",
                  "margin-bottom": "14px",
                },
                { text: "Gota Viva — Água Limpa" },
              ),
              mk(
                "p",
                "p",
                "subtitulo-capa",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "19px",
                  "line-height": "1.6",
                  color: "#ffffff",
                  "text-shadow": "1px 1px 4px #061821",
                  "border-top": "2px solid #ffffff",
                  "padding-top": "14px",
                  "margin-top": "0px",
                  "margin-bottom": "24px",
                },
                {
                  text: "Saiba como proteger nascentes, economizar água potável e garantir saneamento básico para todos.",
                },
              ),
              mk(
                "button",
                "a",
                "botao-capa",
                "Botão",
                {
                  display: "inline-block",
                  "background-color": "#0b2a3a",
                  color: "#ffffff",
                  padding: "12px 28px",
                  border: "2px solid #ffffff",
                  "font-family": fontBody,
                  "font-size": "16px",
                  "font-weight": "bold",
                  "text-decoration": "none",
                },
                { text: "Conhecer as Metas", href: "#metas" },
              ),
            ],
          },
        ),

        // Seção "O Projeto" com imagem flutuando à direita (Slide 113 - Float Right estilo jornal)
        mk(
          "section",
          "section",
          "secao-projeto",
          "Seção",
          {
            "background-color": "#ffffff",
            padding: "48px 8%",
            "border-bottom": "2px solid #dff2f8",
          },
          {
            children: [
              mk(
                "img",
                "img",
                "imagem-flutuante",
                "Imagem",
                {
                  float: "right",
                  width: "42%",
                  height: "240px",
                  "object-fit": "cover",
                  "margin-left": "24px",
                  "margin-bottom": "16px",
                  border: "4px solid #1b9bc4",
                },
                {
                  src: "/images/ods-6-solucao.jpg",
                  alt: "Rio de águas limpas cercado por vegetação",
                },
              ),
              mk(
                "h2",
                "h2",
                "titulo-secao",
                "Título de seção",
                {
                  "font-family": fontHeading,
                  "font-size": "32px",
                  "font-weight": "bold",
                  color: "#0b2a3a",
                  "margin-top": "0px",
                  "margin-bottom": "16px",
                },
                { text: "ODS #6 Água Potável e Saneamento" },
              ),
              mk(
                "p",
                "p",
                "texto",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "17px",
                  "line-height": "1.7",
                  color: "#0b2a3a",
                  "margin-top": "0px",
                  "margin-bottom": "14px",
                },
                {
                  text: "Mais de 2 bilhões de pessoas no mundo ainda não têm acesso seguro à água limpa em casa. Além disso, 80% do esgoto mundial retorna aos rios sem tratamento adequado.",
                },
              ),
              mk(
                "p",
                "p",
                "texto",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "17px",
                  "line-height": "1.7",
                  color: "#0b2a3a",
                  "margin-top": "0px",
                  "margin-bottom": "14px",
                },
                {
                  text: "Cuidar das bacias hidrográficas, captar água da chuva em cisternas e cobrar tratamento de esgoto são passos essenciais para a saúde de toda a comunidade.",
                },
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        // Seção "Metas" seguindo exatamente o formato do Exemplo Guiado da Aula 3 (Slide 105)
        mk(
          "section",
          "section",
          "secao-metas",
          "Seção",
          {
            clear: "both",
            "background-color": "#dff2f8",
            padding: "48px 8%",
          },
          {
            htmlId: "metas",
            children: [
              mk(
                "h2",
                "h2",
                "titulo-metas",
                "Título de seção",
                {
                  "font-family": fontHeading,
                  "font-size": "32px",
                  "font-weight": "bold",
                  color: "#0b2a3a",
                  "margin-top": "0px",
                  "margin-bottom": "24px",
                },
                { text: "Principais Metas até 2030" },
              ),
              ...[
                [
                  "Meta 6.1 — Água potável para todos",
                  "Alcançar o acesso universal e igualitário à água potável e segura para todas as famílias e escolas.",
                ],
                [
                  "Meta 6.2 — Saneamento e higiene",
                  "Garantir acesso a saneamento básico adequado, acabando com o despejo de esgoto a céu aberto.",
                ],
                [
                  "Meta 6.3 — Qualidade da água nos rios",
                  "Melhorar a qualidade da água reduzindo a poluição por plásticos, produtos químicos e lixo.",
                ],
                [
                  "Meta 6.6 — Proteger nascentes e matas ciliares",
                  "Proteger e restaurar ecossistemas relacionados com a água, como florestas, rios, aquíferos e lagos.",
                ],
              ].map(([t, d]) =>
                mk(
                  "card",
                  "div",
                  "bloco-meta",
                  "Cartão (Card)",
                  {
                    "background-color": "#ffffff",
                    padding: "20px 24px",
                    "margin-bottom": "16px",
                    border: "2px solid #1b9bc4",
                  },
                  {
                    children: [
                      mk(
                        "h3",
                        "h3",
                        "meta-titulo",
                        "Título de item / card",
                        {
                          "font-family": fontHeading,
                          "font-size": "20px",
                          "font-weight": "bold",
                          color: "#1b9bc4",
                          "margin-top": "0px",
                          "margin-bottom": "6px",
                        },
                        { text: t },
                      ),
                      mk(
                        "p",
                        "p",
                        "meta-descricao",
                        "Parágrafo",
                        {
                          "font-family": fontBody,
                          "font-size": "15px",
                          "line-height": "1.6",
                          color: "#0b2a3a",
                          "margin-top": "0px",
                          "margin-bottom": "0px",
                        },
                        { text: d },
                      ),
                    ],
                  },
                ),
              ),
            ],
          },
        ),

        mk(
          "footer",
          "footer",
          "rodape",
          "Rodapé",
          {
            clear: "both",
            "background-color": "#0b2a3a",
            color: "#ffffff",
            padding: "28px 8%",
            "text-align": "center",
          },
          {
            children: [
              mk(
                "p",
                "p",
                "rodape-texto",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "14px",
                  color: "#ffffff",
                  "margin-top": "0px",
                  "margin-bottom": "0px",
                },
                { text: "© 2026 Gota Viva — Projeto Meu Primeiro Site sobre a ODS 6." },
              ),
            ],
          },
        ),
      ],
    },
  );
}

/**
 * 4. ODS 11 — Cidades e Comunidades Sustentáveis ("Cidade Viva")
 * Estilo & Layout (Inspirado no Exercício de 3 Colunas com `float: left` e `width: 31%` das Aulas 4 e 5 - Slides 115 e 144):
 * - Topo escuro com barra de navegação laranja
 * - Três cartões coloridos lado a lado (`width: 31%`, `float: left`, `margin: 1%`) logo na entrada
 * - Seção de reportagem em 2 blocos: foto larga à esquerda (`width: 55%`, `float: left`) e quadro de
 *   soluções do bairro à direita (`width: 41%`, `float: right`)
 * - Faixa final de chamada para ação
 */
function buildOds11(): N {
  const mk = createMaker("ods-11");
  const fontHeading = "'Space Grotesk', 'Trebuchet MS', sans-serif";
  const fontBody = "'DM Sans', Arial, sans-serif";

  return mk(
    "page",
    "body",
    "pagina",
    "Página",
    {
      "font-family": fontBody,
      "background-color": "#fffdf7",
      color: "#2b2118",
      margin: "0px",
    },
    {
      children: [
        mk(
          "header",
          "header",
          "cabecalho",
          "Cabeçalho",
          {
            "background-color": "#2b2118",
            color: "#ffffff",
            padding: "18px 6%",
            "border-bottom": "5px solid #e08a1e",
          },
          {
            children: [
              mk(
                "logo",
                "h2",
                "logo",
                "Logotipo",
                {
                  "font-family": fontHeading,
                  "font-size": "24px",
                  "font-weight": "bold",
                  color: "#e08a1e",
                  display: "inline-block",
                  margin: "0px",
                },
                { text: "CIDADE VIVA — ODS 11" },
              ),
              mk(
                "nav",
                "div",
                "menu",
                "Menu",
                {
                  float: "right",
                  "margin-top": "4px",
                },
                {
                  children: [
                    ["Pilares", "#pilares"],
                    ["Desafios", "#desafios"],
                    ["Soluções", "#solucoes"],
                  ].map(([txt, href]) =>
                    mk(
                      "link",
                      "a",
                      "menu-link",
                      "Link",
                      {
                        "font-family": fontBody,
                        color: "#ffffff",
                        "text-decoration": "none",
                        "font-weight": "bold",
                        "font-size": "15px",
                        "margin-left": "18px",
                      },
                      { text: txt, href },
                    ),
                  ),
                },
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        // Título de abertura alinhado à esquerda com borda lateral
        mk(
          "section",
          "section",
          "abertura-cidade",
          "Seção",
          {
            clear: "both",
            "background-color": "#fbeed6",
            padding: "44px 6%",
          },
          {
            htmlId: "desafios",
            children: [
              mk(
                "column",
                "div",
                "caixa-destaque",
                "Coluna",
                {
                  "border-left": "8px solid #e08a1e",
                  "padding-left": "20px",
                },
                {
                  children: [
                    mk(
                      "h1",
                      "h1",
                      "titulo-principal",
                      "Título principal",
                      {
                        "font-family": fontHeading,
                        "font-size": "44px",
                        "font-weight": "bold",
                        color: "#2b2118",
                        "margin-top": "0px",
                        "margin-bottom": "10px",
                      },
                      { text: "A cidade que queremos construir" },
                    ),
                    mk(
                      "p",
                      "p",
                      "subtitulo",
                      "Parágrafo",
                      {
                        "font-family": fontBody,
                        "font-size": "18px",
                        "line-height": "1.6",
                        color: "#2b2118",
                        "margin-top": "0px",
                        "margin-bottom": "0px",
                      },
                      {
                        text: "Mais áreas verdes, transporte público eficiente, ciclovias seguras e moradia digna em todos os bairros.",
                      },
                    ),
                  ],
                },
              ),
            ],
          },
        ),

        // Exercício clássico das 3 Divs lado a lado com cores diferentes (Slide 115 e Slide 144 do PDF)
        mk(
          "section",
          "section",
          "tres-colunas",
          "Seção",
          {
            "background-color": "#fffdf7",
            padding: "40px 5%",
          },
          {
            htmlId: "pilares",
            children: [
              mk(
                "h2",
                "h2",
                "titulo-secao",
                "Título de seção",
                {
                  "font-family": fontHeading,
                  "font-size": "28px",
                  "font-weight": "bold",
                  color: "#2b2118",
                  "text-align": "center",
                  "margin-top": "0px",
                  "margin-bottom": "24px",
                },
                { text: "Três pilares de uma cidade sustentável" },
              ),
              ...(
                [
                  [
                    "1. Mobilidade Limpa",
                    "Ônibus elétricos, calçadas acessíveis e ciclovias conectando os bairros diminuem o trânsito e a poluição.",
                    "coluna-mobilidade",
                    "#fff4dc",
                    "#e08a1e",
                  ],
                  [
                    "2. Parques e Árvores",
                    "Praças arborizadas refrescam o calor urbano, absorvem a água da chuva e oferecem lazer gratuito.",
                    "coluna-parques",
                    "#e8f5ee",
                    "#2f6f4f",
                  ],
                  [
                    "3. Moradia Digna",
                    "Bairros planejados com iluminação pública, coleta seletiva, saneamento e escolas próximas.",
                    "coluna-moradia",
                    "#fbe4d8",
                    "#b8541a",
                  ],
                ] as const
              ).map(([tit, txt, cardCls, bg, borderCol]) =>
                mk(
                  "card",
                  "div",
                  cardCls,
                  "Cartão (Card)",
                  {
                    float: "left",
                    width: "31%",
                    margin: "1%",
                    padding: "22px",
                    "background-color": bg,
                    border: `3px solid ${borderCol}`,
                  },
                  {
                    children: [
                      mk(
                        "h3",
                        "h3",
                        "card-titulo",
                        "Título de item / card",
                        {
                          "font-family": fontHeading,
                          "font-size": "21px",
                          "font-weight": "bold",
                          color: "#2b2118",
                          "margin-top": "0px",
                          "margin-bottom": "10px",
                        },
                        { text: tit },
                      ),
                      mk(
                        "p",
                        "p",
                        "card-texto",
                        "Parágrafo",
                        {
                          "font-family": fontBody,
                          "font-size": "15px",
                          "line-height": "1.6",
                          color: "#2b2118",
                          "margin-top": "0px",
                          "margin-bottom": "0px",
                        },
                        { text: txt },
                      ),
                    ],
                  },
                ),
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        // Seção dividida: Foto grande à esquerda (54%) + Quadro de dados e ações à direita (42%)
        mk(
          "section",
          "section",
          "painel-urbano",
          "Seção",
          {
            clear: "both",
            "background-color": "#fbeed6",
            padding: "44px 6%",
          },
          {
            htmlId: "solucoes",
            children: [
              mk(
                "img",
                "img",
                "foto-cidade",
                "Imagem",
                {
                  float: "left",
                  width: "54%",
                  height: "310px",
                  "object-fit": "cover",
                  border: "4px solid #2b2118",
                },
                {
                  src: "/images/ods-11-hero.jpg",
                  alt: "Parque urbano arborizado no centro da cidade",
                },
              ),
              mk(
                "column",
                "div",
                "quadro-bairro",
                "Coluna",
                {
                  float: "right",
                  width: "42%",
                  "background-color": "#2f6f4f",
                  color: "#ffffff",
                  padding: "24px",
                  border: "3px solid #1d4933",
                },
                {
                  children: [
                    mk(
                      "h2",
                      "h2",
                      "quadro-titulo",
                      "Título de seção",
                      {
                        "font-family": fontHeading,
                        "font-size": "24px",
                        "font-weight": "bold",
                        color: "#ffd166",
                        "margin-top": "0px",
                        "margin-bottom": "12px",
                      },
                      { text: "Por que agir agora?" },
                    ),
                    mk(
                      "p",
                      "p",
                      "quadro-texto",
                      "Parágrafo",
                      {
                        "font-family": fontBody,
                        "font-size": "15px",
                        "line-height": "1.6",
                        color: "#ffffff",
                        "margin-top": "0px",
                        "margin-bottom": "14px",
                      },
                      {
                        text: "Hoje 56% da população mundial vive em áreas urbanas e as cidades respondem por 70% das emissões de CO₂.",
                      },
                    ),
                    mk(
                      "button",
                      "a",
                      "botao",
                      "Botão",
                      {
                        display: "inline-block",
                        "background-color": "#e08a1e",
                        color: "#ffffff",
                        padding: "12px 22px",
                        "font-family": fontBody,
                        "font-size": "15px",
                        "font-weight": "bold",
                        "text-decoration": "none",
                      },
                      { text: "Propor melhoria no bairro", href: "#pilares" },
                    ),
                  ],
                },
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        mk(
          "footer",
          "footer",
          "rodape",
          "Rodapé",
          {
            clear: "both",
            "background-color": "#2b2118",
            color: "#fffdf7",
            padding: "26px 6%",
            "text-align": "center",
          },
          {
            children: [
              mk(
                "p",
                "p",
                "rodape-texto",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "14px",
                  color: "#fffdf7",
                  "margin-top": "0px",
                  "margin-bottom": "0px",
                },
                { text: "© 2026 Cidade Viva — Projeto Meu Primeiro Site sobre a ODS 11." },
              ),
            ],
          },
        ),
      ],
    },
  );
}

/**
 * 5. ODS 12 — Consumo e Produção Responsáveis ("Menos é Mais")
 * Estilo & Layout (Editorial Centralizado com Imagem Circular + Guia dos 5 Rs em Lista e Cartões Lado a Lado):
 * - Cabeçalho minimalista claro
 * - Hero centralizado com imagem redonda (`border-radius: 200px`), título serifado grande e botão em formato pílula
 * - Seção "Os 5 Rs do Consumo Consciente" com lista não ordenada `<ul>` e `<li>` destacada em uma caixa central (`width: 80%`, `margin: 0 auto`)
 * - Seção de Dicas Práticas com 3 caixas (`float: left`, `width: 31%`)
 */
function buildOds12(): N {
  const mk = createMaker("ods-12");
  const fontHeading = "'Fraunces', Georgia, serif";
  const fontBody = "'DM Sans', Arial, sans-serif";

  return mk(
    "page",
    "body",
    "pagina",
    "Página",
    {
      "font-family": fontBody,
      "background-color": "#fbf8ef",
      color: "#2a2410",
      margin: "0px",
    },
    {
      children: [
        mk(
          "header",
          "header",
          "cabecalho",
          "Cabeçalho",
          {
            "background-color": "#fbf8ef",
            padding: "20px 8%",
            "border-bottom": "2px solid #efe7cf",
          },
          {
            children: [
              mk(
                "logo",
                "h2",
                "logo",
                "Logotipo",
                {
                  "font-family": fontHeading,
                  "font-size": "24px",
                  "font-weight": "bold",
                  color: "#a07a17",
                  display: "inline-block",
                  margin: "0px",
                },
                { text: "Menos é Mais" },
              ),
              mk(
                "nav",
                "div",
                "menu",
                "Menu",
                {
                  float: "right",
                  "margin-top": "4px",
                },
                {
                  children: [
                    ["Início", "#inicio"],
                    ["Os 5 Rs", "#cinco-rs"],
                    ["Práticas", "#praticas"],
                    ["Desafio", "#desafio"],
                  ].map(([txt, href]) =>
                    mk(
                      "link",
                      "a",
                      "menu-link",
                      "Link",
                      {
                        "font-family": fontBody,
                        color: "#2a2410",
                        "text-decoration": "none",
                        "font-weight": "bold",
                        "font-size": "15px",
                        "margin-left": "20px",
                      },
                      { text: txt, href },
                    ),
                  ),
                },
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        // Hero Editorial Centralizado com foto circular
        mk(
          "section",
          "section",
          "hero",
          "Seção",
          {
            clear: "both",
            "background-color": "#efe7cf",
            padding: "56px 8%",
            "text-align": "center",
          },
          {
            htmlId: "inicio",
            children: [
              mk(
                "img",
                "img",
                "hero-imagem",
                "Imagem",
                {
                  width: "240px",
                  height: "240px",
                  "object-fit": "cover",
                  "border-radius": "120px",
                  border: "5px solid #a07a17",
                  "margin-bottom": "20px",
                },
                {
                  src: "/images/ods-12-hero.jpg",
                  alt: "Coletores coloridos de reciclagem seletiva",
                },
              ),
              mk(
                "h1",
                "h1",
                "titulo-principal",
                "Título principal",
                {
                  "font-family": fontHeading,
                  "font-size": "48px",
                  "font-weight": "bold",
                  color: "#2a2410",
                  "margin-top": "0px",
                  "margin-bottom": "14px",
                },
                { text: "Consumir com consciência" },
              ),
              mk(
                "p",
                "p",
                "subtitulo",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "18px",
                  "line-height": "1.6",
                  color: "#2a2410",
                  width: "75%",
                  margin: "0px auto 24px auto",
                },
                {
                  text: "Geramos mais de 2 bilhões de toneladas de resíduos por ano e apenas 9% do plástico foi reciclado. Repensar escolhas muda o futuro do planeta.",
                },
              ),
              mk(
                "button",
                "a",
                "botao",
                "Botão",
                {
                  display: "inline-block",
                  "background-color": "#a07a17",
                  color: "#ffffff",
                  padding: "14px 30px",
                  "border-radius": "30px",
                  "font-family": fontBody,
                  "font-size": "16px",
                  "font-weight": "bold",
                  "text-decoration": "none",
                },
                { text: "Aceitar o Desafio 30 Dias", href: "#praticas" },
              ),
            ],
          },
        ),

        // Caixa centralizada (width: 80%, margin: 0 auto) com os 5 Rs em lista <ul>
        mk(
          "section",
          "section",
          "secao-cinco-rs",
          "Seção",
          {
            "background-color": "#fbf8ef",
            padding: "48px 8%",
          },
          {
            htmlId: "cinco-rs",
            children: [
              mk(
                "column",
                "div",
                "caixa-central",
                "Coluna",
                {
                  width: "85%",
                  margin: "0px auto",
                  "background-color": "#ffffff",
                  padding: "32px",
                  border: "3px solid #a07a17",
                },
                {
                  children: [
                    mk(
                      "h2",
                      "h2",
                      "titulo-secao",
                      "Título de seção",
                      {
                        "font-family": fontHeading,
                        "font-size": "32px",
                        "font-weight": "bold",
                        color: "#a07a17",
                        "margin-top": "0px",
                        "margin-bottom": "12px",
                      },
                      { text: "Guia Prático: Os 5 Rs no dia a dia" },
                    ),
                    mk(
                      "p",
                      "p",
                      "texto",
                      "Parágrafo",
                      {
                        "font-family": fontBody,
                        "font-size": "16px",
                        "line-height": "1.6",
                        color: "#2a2410",
                        "margin-top": "0px",
                        "margin-bottom": "16px",
                      },
                      {
                        text: "Antes de comprar ou jogar algo no lixo, pratique estas cinco perguntas:",
                      },
                    ),
                    mk(
                      "list",
                      "ul",
                      "lista-rs",
                      "Lista (<ul>)",
                      {
                        "font-family": fontBody,
                        "font-size": "16px",
                        "line-height": "1.8",
                        color: "#2a2410",
                        "padding-left": "24px",
                        margin: "0px",
                      },
                      {
                        children: [
                          "Repensar: Eu realmente preciso comprar este produto agora?",
                          "Recusar: Evite sacolas plásticas, canudos e embalagens descartáveis.",
                          "Reduzir: Prefira produtos duráveis e de qualidade em vez de descartáveis.",
                          "Reutilizar: Conserte objetos, customize roupas e use garrafa retornável.",
                          "Reciclar: Separe papel, vidro, metal e plástico seco para a coleta seletiva.",
                        ].map((item) =>
                          mk(
                            "listitem",
                            "li",
                            "item-r",
                            "Item da lista (<li>)",
                            { "margin-bottom": "8px" },
                            { text: item },
                          ),
                        ),
                      },
                    ),
                  ],
                },
              ),
            ],
          },
        ),

        // Seção de Boas Práticas com 3 cards (float: left, width: 31%)
        mk(
          "section",
          "section",
          "praticas",
          "Seção",
          {
            "background-color": "#efe7cf",
            padding: "44px 6%",
          },
          {
            htmlId: "praticas",
            children: [
              mk(
                "h2",
                "h2",
                "titulo-praticas",
                "Título de seção",
                {
                  "font-family": fontHeading,
                  "font-size": "30px",
                  "font-weight": "bold",
                  color: "#2a2410",
                  "text-align": "center",
                  "margin-top": "0px",
                  "margin-bottom": "24px",
                },
                { text: "Ideias para fazer na escola" },
              ),
              ...[
                [
                  "Feira de Trocas",
                  "Organize um dia para trocar livros, brinquedos e roupas em bom estado entre as turmas.",
                ],
                [
                  "Compostagem Escolar",
                  "Transforme cascas de frutas da merenda em adubo rico para os jardins e hortas.",
                ],
                [
                  "Coleta de Eletrônicos",
                  "Crie um ponto de recolhimento de pilhas, baterias e celulares antigos para descarte correto.",
                ],
              ].map(([t, d]) =>
                mk(
                  "card",
                  "div",
                  "card",
                  "Cartão (Card)",
                  {
                    float: "left",
                    width: "31%",
                    margin: "1%",
                    "background-color": "#fbf8ef",
                    padding: "22px",
                    "border-top": "5px solid #a07a17",
                  },
                  {
                    children: [
                      mk(
                        "h3",
                        "h3",
                        "card-titulo",
                        "Título de item / card",
                        {
                          "font-family": fontHeading,
                          "font-size": "21px",
                          "font-weight": "bold",
                          color: "#a07a17",
                          "margin-top": "0px",
                          "margin-bottom": "8px",
                        },
                        { text: t },
                      ),
                      mk(
                        "p",
                        "p",
                        "card-texto",
                        "Parágrafo",
                        {
                          "font-family": fontBody,
                          "font-size": "15px",
                          "line-height": "1.6",
                          color: "#2a2410",
                          "margin-top": "0px",
                          "margin-bottom": "0px",
                        },
                        { text: d },
                      ),
                    ],
                  },
                ),
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        mk(
          "footer",
          "footer",
          "rodape",
          "Rodapé",
          {
            clear: "both",
            "background-color": "#2a2410",
            color: "#fbf8ef",
            padding: "26px 8%",
            "text-align": "center",
          },
          {
            htmlId: "desafio",
            children: [
              mk(
                "p",
                "p",
                "rodape-texto",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "14px",
                  color: "#fbf8ef",
                  "margin-top": "0px",
                  "margin-bottom": "0px",
                },
                { text: "© 2026 Menos é Mais — Projeto Meu Primeiro Site sobre a ODS 12." },
              ),
            ],
          },
        ),
      ],
    },
  );
}

/**
 * 6. ODS 13 — Ação Climática ("Clima Agora")
 * Estilo & Layout (Painel de Alto Contraste Escuro + Linhas Alternadas Imagem/Texto com `float: left` e `float: right` - Slide 113):
 * - Cabeçalho e Hero em verde-floresta escuro (`#13261a`) com texto claro e destaque verde-limão (`#b9e769`)
 * - 3 Indicadores do Clima em caixas escuras com borda verde-limão
 * - Seção estilo Jornal/Revista com linhas alternadas:
 *   - Bloco 1: Imagem flutuando à esquerda (`float: left`, `width: 44%`) e texto à direita
 *   - Bloco 2: Imagem flutuando à direita (`float: right`, `width: 44%`) e texto à esquerda
 */
function buildOds13(): N {
  const mk = createMaker("ods-13");
  const fontHeading = "'Space Grotesk', 'Trebuchet MS', sans-serif";
  const fontBody = "'DM Sans', Arial, sans-serif";

  return mk(
    "page",
    "body",
    "pagina",
    "Página",
    {
      "font-family": fontBody,
      "background-color": "#f3f7f1",
      color: "#13261a",
      margin: "0px",
    },
    {
      children: [
        mk(
          "header",
          "header",
          "cabecalho",
          "Cabeçalho",
          {
            "background-color": "#13261a",
            color: "#ffffff",
            padding: "20px 6%",
            "border-bottom": "3px solid #3f7e44",
          },
          {
            children: [
              mk(
                "logo",
                "h2",
                "logo",
                "Logotipo",
                {
                  "font-family": fontHeading,
                  "font-size": "24px",
                  "font-weight": "bold",
                  color: "#b9e769",
                  display: "inline-block",
                  margin: "0px",
                },
                { text: "CLIMA AGORA // ODS 13" },
              ),
              mk(
                "nav",
                "div",
                "menu",
                "Menu",
                {
                  float: "right",
                  "margin-top": "4px",
                },
                {
                  children: [
                    ["Alerta", "#alerta"],
                    ["Causas", "#causas"],
                    ["Soluções", "#solucoes"],
                  ].map(([txt, href]) =>
                    mk(
                      "link",
                      "a",
                      "menu-link",
                      "Link",
                      {
                        "font-family": fontBody,
                        color: "#ffffff",
                        "text-decoration": "none",
                        "font-weight": "bold",
                        "font-size": "15px",
                        "margin-left": "18px",
                      },
                      { text: txt, href },
                    ),
                  ),
                },
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        // Hero escuro de alto contraste com 3 caixas de dados dentro
        mk(
          "section",
          "section",
          "painel-clima",
          "Seção",
          {
            clear: "both",
            "background-color": "#1c3826",
            color: "#ffffff",
            padding: "52px 6%",
            "text-align": "center",
          },
          {
            htmlId: "alerta",
            children: [
              mk(
                "h1",
                "h1",
                "titulo-principal",
                "Título principal",
                {
                  "font-family": fontHeading,
                  "font-size": "46px",
                  "font-weight": "bold",
                  color: "#b9e769",
                  "margin-top": "0px",
                  "margin-bottom": "12px",
                },
                { text: "O clima da Terra não pode esperar" },
              ),
              mk(
                "p",
                "p",
                "subtitulo",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "18px",
                  "line-height": "1.6",
                  color: "#ffffff",
                  width: "80%",
                  margin: "0px auto 28px auto",
                },
                {
                  text: "A queima de combustíveis fósseis e o desmatamento aumentam a temperatura global, provocando secas e enchentes extremas.",
                },
              ),
              ...[
                ["+1,2 °C", "de aquecimento médio desde a era industrial"],
                ["1,5 °C", "limite máximo definido pelo Acordo de Paris"],
                ["Meta 2050", "zerar as emissões líquidas de carbono no mundo"],
              ].map(([num, desc]) =>
                mk(
                  "stat",
                  "div",
                  "dado-clima",
                  "Destaque de dado",
                  {
                    float: "left",
                    width: "31%",
                    margin: "1%",
                    padding: "20px",
                    "background-color": "#13261a",
                    border: "2px solid #b9e769",
                  },
                  {
                    children: [
                      mk(
                        "h3",
                        "h3",
                        "dado-numero",
                        "Título de item / card",
                        {
                          "font-family": fontHeading,
                          "font-size": "34px",
                          "font-weight": "bold",
                          color: "#b9e769",
                          "margin-top": "0px",
                          "margin-bottom": "6px",
                        },
                        { text: num },
                      ),
                      mk(
                        "p",
                        "p",
                        "dado-texto",
                        "Parágrafo",
                        {
                          "font-family": fontBody,
                          "font-size": "14px",
                          "line-height": "1.5",
                          color: "#ffffff",
                          "margin-top": "0px",
                          "margin-bottom": "0px",
                        },
                        { text: desc },
                      ),
                    ],
                  },
                ),
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        // Bloco 1 estilo Jornal: Foto à Esquerda (float: left) e Texto à Direita (Slide 113)
        mk(
          "section",
          "section",
          "artigo-floresta",
          "Seção",
          {
            clear: "both",
            "background-color": "#ffffff",
            padding: "44px 6%",
            "border-bottom": "2px solid #dfeadb",
          },
          {
            htmlId: "causas",
            children: [
              mk(
                "img",
                "img",
                "foto-esquerda",
                "Imagem",
                {
                  float: "left",
                  width: "44%",
                  height: "240px",
                  "object-fit": "cover",
                  "margin-right": "4%",
                  border: "4px solid #3f7e44",
                },
                {
                  src: "/images/ods-13-problema.jpg",
                  alt: "Floresta preservada com árvores altas",
                },
              ),
              mk(
                "column",
                "div",
                "texto-direita",
                "Coluna",
                {
                  float: "left",
                  width: "52%",
                },
                {
                  children: [
                    mk(
                      "h2",
                      "h2",
                      "titulo-secao",
                      "Título de seção",
                      {
                        "font-family": fontHeading,
                        "font-size": "28px",
                        "font-weight": "bold",
                        color: "#3f7e44",
                        "margin-top": "0px",
                        "margin-bottom": "12px",
                      },
                      { text: "1. Proteger e reflorestar nossas matas" },
                    ),
                    mk(
                      "p",
                      "p",
                      "texto",
                      "Parágrafo",
                      {
                        "font-family": fontBody,
                        "font-size": "16px",
                        "line-height": "1.7",
                        color: "#13261a",
                        "margin-top": "0px",
                        "margin-bottom": "12px",
                      },
                      {
                        text: "As florestas funcionam como grandes guardiãs do clima: elas absorvem gás carbônico (CO₂), protegem o solo e mantêm o regime de chuvas.",
                      },
                    ),
                    mk(
                      "p",
                      "p",
                      "texto",
                      "Parágrafo",
                      {
                        "font-family": fontBody,
                        "font-size": "16px",
                        "line-height": "1.7",
                        color: "#13261a",
                        "margin-top": "0px",
                        "margin-bottom": "12px",
                      },
                      {
                        text: "Combater queimadas e plantar árvores nativas nas cidades e no campo é uma das formas mais eficientes de frear o aquecimento.",
                      },
                    ),
                  ],
                },
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        // Bloco 2 estilo Jornal invertido: Foto à Direita (float: right) e Texto à Esquerda (Slide 113)
        mk(
          "section",
          "section",
          "artigo-energia",
          "Seção",
          {
            clear: "both",
            "background-color": "#dfeadb",
            padding: "44px 6%",
          },
          {
            htmlId: "solucoes",
            children: [
              mk(
                "img",
                "img",
                "foto-direita",
                "Imagem",
                {
                  float: "right",
                  width: "44%",
                  height: "240px",
                  "object-fit": "cover",
                  "margin-left": "4%",
                  border: "4px solid #3f7e44",
                },
                {
                  src: "/images/ods-13-solucao.jpg",
                  alt: "Paisagem natural sob luz solar",
                },
              ),
              mk(
                "column",
                "div",
                "texto-esquerda",
                "Coluna",
                {
                  float: "left",
                  width: "52%",
                },
                {
                  children: [
                    mk(
                      "h2",
                      "h2",
                      "titulo-secao-claro",
                      "Título de seção",
                      {
                        "font-family": fontHeading,
                        "font-size": "28px",
                        "font-weight": "bold",
                        color: "#13261a",
                        "margin-top": "0px",
                        "margin-bottom": "12px",
                      },
                      { text: "2. Energia limpa e transporte sustentável" },
                    ),
                    mk(
                      "p",
                      "p",
                      "texto-destaque",
                      "Parágrafo",
                      {
                        "font-family": fontBody,
                        "font-size": "16px",
                        "line-height": "1.7",
                        color: "#13261a",
                        "margin-top": "0px",
                        "margin-bottom": "16px",
                      },
                      {
                        text: "Substituir carvão, petróleo e gás por energia solar e eólica reduz drasticamente a poluição do ar. Na rotina, caminhar, pedalar e economizar energia elétrica fazem toda a diferença.",
                      },
                    ),
                    mk(
                      "button",
                      "a",
                      "botao",
                      "Botão",
                      {
                        display: "inline-block",
                        "background-color": "#3f7e44",
                        color: "#ffffff",
                        padding: "12px 24px",
                        "font-family": fontBody,
                        "font-size": "15px",
                        "font-weight": "bold",
                        "text-decoration": "none",
                      },
                      { text: "Começar ação na minha escola", href: "#alerta" },
                    ),
                  ],
                },
              ),
              mk("clearfix", "div", "limpar-flutuacao", "Limpar flutuação", { clear: "both" }),
            ],
          },
        ),

        mk(
          "footer",
          "footer",
          "rodape",
          "Rodapé",
          {
            clear: "both",
            "background-color": "#13261a",
            color: "#ffffff",
            padding: "26px 6%",
            "text-align": "center",
          },
          {
            children: [
              mk(
                "p",
                "p",
                "rodape-texto",
                "Parágrafo",
                {
                  "font-family": fontBody,
                  "font-size": "14px",
                  color: "#ffffff",
                  "margin-top": "0px",
                  "margin-bottom": "0px",
                },
                { text: "© 2026 Clima Agora — Projeto Meu Primeiro Site sobre a ODS 13." },
              ),
            ],
          },
        ),
      ],
    },
  );
}

export const sites = [
  {
    slug: "ods-2",
    num: 2,
    nome: "Fome Zero",
    resumo:
      "Layout em 2 colunas com float, vitrine de iniciativas com fotos e passo a passo em lista numerada (<ol>).",
    cor: "#c8781a",
    thumb: "/images/ods-2-hero.jpg",
    root: buildOds2(),
  },
  {
    slug: "ods-4",
    num: 4,
    nome: "Educação de Qualidade",
    resumo:
      "Layout de portal escolar com barra lateral à esquerda (float: left), lista (<ul>) e cartões de metas.",
    cor: "#c5192d",
    thumb: "/images/ods-4-hero.jpg",
    root: buildOds4(),
  },
  {
    slug: "ods-6",
    num: 6,
    nome: "Água Potável e Saneamento",
    resumo:
      "Capa com imagem de fundo (background: url), texto com sombra (text-shadow) e 4 metas empilhadas.",
    cor: "#1b9bc4",
    thumb: "/images/ods-6-hero.jpg",
    root: buildOds6(),
  },
  {
    slug: "ods-11",
    num: 11,
    nome: "Cidades e Comunidades Sustentáveis",
    resumo:
      "Layout com 3 caixas coloridas lado a lado (width: 31% e float: left) e painel urbano dividido.",
    cor: "#e08a1e",
    thumb: "/images/ods-11-hero.jpg",
    root: buildOds11(),
  },
  {
    slug: "ods-12",
    num: 12,
    nome: "Consumo e Produção Responsáveis",
    resumo:
      "Layout centralizado com imagem redonda, guia dos 5 Rs em lista (<ul>) e 3 cartões de dicas.",
    cor: "#a07a17",
    thumb: "/images/ods-12-hero.jpg",
    root: buildOds12(),
  },
  {
    slug: "ods-13",
    num: 13,
    nome: "Ação Climática",
    resumo:
      "Painel escuro de alto contraste e reportagem em zigue-zague (float: left e float: right).",
    cor: "#3f7e44",
    thumb: "/images/ods-13-hero.jpg",
    root: buildOds13(),
  },
];

export type Site = (typeof sites)[number];
