import type { N, Style } from "./model";

type Theme = {
  bg: string; text: string; primary: string; onPrimary: string; soft: string; accent: string;
  heading: string; body: string; radius: string; hero: "split" | "center"; heroBg: string;
};
type Content = {
  slug: string; num: number; nome: string; marca: string; resumo: string; img: string; theme: Theme;
  nav: string[]; heroTitle: string; heroText: string; heroBtn: string;
  probTitle: string; probText: string[];
  stats: [string, string][]; cardsTitle: string; cards: [string, string][];
  solTitle: string; sols: [string, string][]; ctaTitle: string; ctaText: string; ctaBtn: string; footer: string;
};

const photos: Record<string, string[]> = {
  "farm,vegetables": ["1500382017468-9049fed747ef", "1464226184884-fa280b87c399", "1488459716781-31db52582fe9"],
  "classroom,students": ["1503676260728-1c00da094a0b", "1509062522246-3755977927d7", "1427504494785-3a9ca7044f45"],
  "water,river": ["1548839140-29a749e1cf4d", "1500375592092-40eb2168fd21", "1437482078695-73f5ca6c96e2"],
  "city,park": ["1449824913935-59a10b8d2000", "1480714378408-67cf0d13bc1b", "1477959858617-67f85cf4f1df"],
  recycling: ["1532996122724-e3c354a0b15b", "1611284446314-60a58ac0deb9", "1604187351574-c75ca79f5807"],
  "forest,climate": ["1470071459604-3b5ec3a7fe05", "1441974231531-c6227db76b6e", "1473773508845-188df298d2d1"],
};
const img = (k: string, l: number) => `https://images.unsplash.com/photo-${photos[k][l - 1]}?w=900&q=70&auto=format&fit=crop`;

function build(c: Content): N {
  const t = c.theme;
  let i = 0;
  const mk = (kind: N["kind"], tag: string, cls: string, label: string, style: Style, extra: Partial<N> = {}): N =>
    ({ id: `${c.slug}-${i++}`, kind, tag, cls, label, style, ...extra });
  const h2 = (txt: string, color = t.text) => mk("h2", "h2", "titulo-secao", "Título de seção",
    { "font-family": t.heading, "font-size": "34px", color, "margin-bottom": "16px" }, { text: txt });
  const p = (txt: string, color = t.text, cls = "texto") => mk("p", "p", cls, "Parágrafo",
    { "font-size": "17px", "line-height": "1.7", color, "margin-bottom": "12px" }, { text: txt });
  const btn = (txt: string, bg = t.primary, fg = t.onPrimary) => mk("button", "a", "botao", "Botão",
    { display: "inline-block", "background-color": bg, color: fg, padding: "14px 28px", "border-radius": t.radius, "font-weight": "700", "text-decoration": "none" },
    { text: txt, href: "#acao" });
  const section = (cls: string, style: Style, children: N[]) =>
    mk("section", "section", cls, "Seção", { padding: "72px 8%", ...style }, { children });

  const heroText = [
    mk("h1", "h1", "titulo-principal", "Título principal", { "font-family": t.heading, "font-size": "52px", "line-height": "1.1", color: t.text, "margin-bottom": "20px" }, { text: c.heroTitle }),
    p(c.heroText, t.text, "subtitulo"),
    btn(c.heroBtn),
  ];
  const hero = t.hero === "split"
    ? section("hero", { background: t.heroBg, display: "grid", "grid-template-columns": "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px", "align-items": "center" }, [
        mk("column", "div", "hero-texto", "Coluna", { "max-width": "560px" }, { children: heroText }),
        mk("img", "img", "hero-imagem", "Imagem", { width: "100%", height: "380px", "object-fit": "cover", "border-radius": t.radius }, { src: img(c.img, 1), alt: c.heroTitle }),
      ])
    : section("hero", { background: t.heroBg, "text-align": "center", padding: "110px 8%" }, [
        mk("column", "div", "hero-conteudo", "Coluna", { "max-width": "760px", margin: "0 auto" }, { children: heroText }),
      ]);

  return mk("page", "body", "pagina", "Página", { "font-family": t.body, "background-color": t.bg, color: t.text }, {
    children: [
      mk("header", "header", "cabecalho", "Cabeçalho", { display: "flex", "justify-content": "space-between", "align-items": "center", "flex-wrap": "wrap", gap: "16px", padding: "20px 8%", "background-color": t.bg, "border-bottom": `1px solid ${t.soft}` }, {
        children: [
          mk("logo", "strong", "logo", "Logotipo", { "font-family": t.heading, "font-size": "22px", color: t.primary }, { text: c.marca }),
          mk("nav", "nav", "menu", "Menu", { display: "flex", gap: "24px", "flex-wrap": "wrap" }, {
            children: c.nav.map((n) => mk("link", "a", "menu-link", "Link", { color: t.text, "text-decoration": "none", "font-weight": "600", "font-size": "15px" }, { text: n, href: "#" + n.toLowerCase() })),
          }),
        ],
      }),
      hero,
      section("problema", { "background-color": t.bg }, [
        mk("column", "div", "problema-texto", "Coluna", { "max-width": "760px" }, { children: [h2(c.probTitle), ...c.probText.map((x) => p(x))] }),
        ...(t.hero === "center" ? [mk("img", "img", "problema-imagem", "Imagem", { width: "100%", height: "320px", "object-fit": "cover", "border-radius": t.radius, "margin-top": "24px" }, { src: img(c.img, 2), alt: c.probTitle })] : []),
      ]),
      section("dados", { "background-color": t.primary, color: t.onPrimary }, [
        mk("grid", "div", "grade-dados", "Grade", { display: "grid", "grid-template-columns": "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }, {
          children: c.stats.map(([n, d]) => mk("stat", "div", "dado", "Destaque de dado", { "text-align": "center", padding: "16px" }, {
            children: [
              mk("h3", "strong", "dado-numero", "Número", { display: "block", "font-family": t.heading, "font-size": "48px", color: t.accent }, { text: n }),
              p(d, t.onPrimary, "dado-texto"),
            ],
          })),
        }),
      ]),
      section("cards", { "background-color": t.soft }, [
        h2(c.cardsTitle),
        mk("grid", "div", "grade-cards", "Grade", { display: "grid", "grid-template-columns": "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", "margin-top": "24px" }, {
          children: c.cards.map(([h, d]) => mk("card", "article", "card", "Card", { "background-color": t.bg, padding: "28px", "border-radius": t.radius, "border-top": `4px solid ${t.primary}`, "box-shadow": "0 6px 20px rgba(0,0,0,0.06)" }, {
            children: [mk("h3", "h3", "card-titulo", "Título de card", { "font-family": t.heading, "font-size": "21px", color: t.primary, "margin-bottom": "8px" }, { text: h }), p(d, t.text, "card-texto")],
          })),
        }),
      ]),
      section("solucoes", { "background-color": t.bg }, [
        h2(c.solTitle),
        mk("grid", "div", "colunas", "Grade", { display: "grid", "grid-template-columns": "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", "align-items": "center" }, {
          children: [
            mk("img", "img", "solucao-imagem", "Imagem", { width: "100%", height: "300px", "object-fit": "cover", "border-radius": t.radius }, { src: img(c.img, 3), alt: c.solTitle }),
            mk("column", "div", "lista-solucoes", "Coluna", {}, {
              children: c.sols.map(([h, d]) => mk("card", "div", "solucao", "Card", { "border-left": `4px solid ${t.accent}`, padding: "8px 0 8px 20px", "margin-bottom": "20px" }, {
                children: [mk("h3", "h3", "solucao-titulo", "Título", { "font-size": "19px", color: t.text, "margin-bottom": "4px" }, { text: h }), p(d, t.text, "solucao-texto")],
              })),
            }),
          ],
        }),
      ]),
      section("acao", { background: t.heroBg, "text-align": "center" }, [
        h2(c.ctaTitle), p(c.ctaText), btn(c.ctaBtn),
      ]),
      mk("footer", "footer", "rodape", "Rodapé", { "background-color": t.text, color: t.bg, padding: "32px 8%", "text-align": "center", "font-size": "14px" }, {
        children: [p(c.footer, t.bg, "rodape-texto")],
      }),
    ],
  });
}

const contents: Content[] = [
  {
    slug: "ods-2", num: 2, nome: "Fome Zero", marca: "Prato Cheio", img: "farm,vegetables", resumo: "Agricultura sustentável e o combate à fome com hortas comunitárias.",
    theme: { bg: "#fffaf0", text: "#3b2410", primary: "#c8781a", onPrimary: "#fffaf0", soft: "#f6e7cc", accent: "#ffd36b", heading: "'Fraunces', serif", body: "'DM Sans', sans-serif", radius: "16px", hero: "split", heroBg: "#fbefd8" },
    nav: ["Problema", "Dados", "Soluções", "Ação"], heroTitle: "Ninguém deveria ir dormir com fome", heroText: "Conheça como hortas comunitárias e a redução do desperdício podem alimentar milhões de pessoas.", heroBtn: "Quero ajudar",
    probTitle: "O problema", probText: ["Mesmo produzindo comida suficiente para todos, milhões de pessoas ainda passam fome no mundo.", "A desigualdade, o desperdício e as mudanças climáticas tornam o acesso a alimentos difícil para muitas famílias."],
    stats: [["735 mi", "pessoas passam fome no mundo"], ["1/3", "dos alimentos produzidos é desperdiçado"], ["2030", "meta da ONU para erradicar a fome"]],
    cardsTitle: "Por que isso importa", cards: [["Saúde", "Alimentação adequada é base para crescer e aprender."], ["Agricultura familiar", "Pequenos produtores geram grande parte da comida que comemos."], ["Desperdício", "Aproveitar melhor os alimentos reduz custos e a fome."]],
    solTitle: "Iniciativas que funcionam", sols: [["Hortas comunitárias", "Espaços urbanos viram fontes de alimento fresco."], ["Bancos de alimentos", "Doações chegam a quem mais precisa."], ["Merenda escolar", "Refeições nutritivas garantem saúde e frequência escolar."]],
    ctaTitle: "Faça parte da mudança", ctaText: "Doe alimentos, apoie produtores locais e evite desperdícios em casa.", ctaBtn: "Encontrar um banco de alimentos", footer: "© 2026 Prato Cheio — Projeto escolar sobre a ODS 2.",
  },
  {
    slug: "ods-4", num: 4, nome: "Educação de Qualidade", marca: "Aprender+", img: "classroom,students", resumo: "Acesso à educação inclusiva e de qualidade para todas as pessoas.",
    theme: { bg: "#ffffff", text: "#1a1f36", primary: "#c5192d", onPrimary: "#ffffff", soft: "#fdecee", accent: "#ffd166", heading: "'Space Grotesk', sans-serif", body: "'DM Sans', sans-serif", radius: "8px", hero: "center", heroBg: "#fdecee" },
    nav: ["Problema", "Dados", "Soluções", "Ação"], heroTitle: "Educação transforma vidas", heroText: "Toda criança tem direito a uma escola que ensine, acolha e inspire.", heroBtn: "Saiba como apoiar",
    probTitle: "Ainda há muito a fazer", probText: ["Milhões de crianças estão fora da escola, e muitas que estudam não aprendem o básico de leitura e matemática.", "Falta de estrutura, de professores e de acesso à internet aumenta a desigualdade."],
    stats: [["250 mi", "crianças fora da escola"], ["70%", "das crianças de 10 anos em países pobres não leem um texto simples"], ["44 mi", "professores a mais são necessários até 2030"]],
    cardsTitle: "Pilares de uma boa educação", cards: [["Inclusão", "Escola para todos, com acessibilidade."], ["Professores valorizados", "Formação e boas condições de trabalho."], ["Tecnologia", "Acesso digital para aprender além da sala."]],
    solTitle: "Caminhos possíveis", sols: [["Bibliotecas comunitárias", "Livros acessíveis para toda a comunidade."], ["Monitoria entre alunos", "Quem sabe ensina, quem aprende cresce."], ["Internet nas escolas", "Conectar escolas abre novas portas."]],
    ctaTitle: "Compartilhe conhecimento", ctaText: "Seja voluntário, doe livros ou ajude um colega nos estudos.", ctaBtn: "Quero ser voluntário", footer: "© 2026 Aprender+ — Projeto escolar sobre a ODS 4.",
  },
  {
    slug: "ods-6", num: 6, nome: "Água Potável e Saneamento", marca: "Gota Viva", img: "water,river", resumo: "Água limpa e saneamento básico como direitos de todos.",
    theme: { bg: "#f4fbfd", text: "#0b2a3a", primary: "#1b9bc4", onPrimary: "#ffffff", soft: "#dff2f8", accent: "#a6ecff", heading: "'Fraunces', serif", body: "'DM Sans', sans-serif", radius: "28px", hero: "split", heroBg: "#dff2f8" },
    nav: ["Problema", "Dados", "Soluções", "Ação"], heroTitle: "Cada gota conta", heroText: "Água limpa é vida. Descubra como cuidar desse recurso e levar saneamento a todos.", heroBtn: "Economizar água",
    probTitle: "Um recurso ameaçado", probText: ["Bilhões de pessoas não têm acesso seguro à água potável ou a banheiros adequados.", "Sem saneamento, doenças se espalham e rios ficam poluídos."],
    stats: [["2,2 bi", "pessoas sem água potável segura"], ["3,5 bi", "sem saneamento seguro"], ["80%", "do esgoto volta à natureza sem tratamento"]],
    cardsTitle: "Entenda o ciclo", cards: [["Captação", "A água é retirada de rios e reservatórios."], ["Tratamento", "Ela é filtrada e limpa para consumo."], ["Esgoto tratado", "Devolver a água limpa protege a natureza."]],
    solTitle: "Soluções em ação", sols: [["Cisternas", "Captação de chuva no semiárido."], ["Reúso de água", "Água da máquina pode lavar o quintal."], ["Proteção de nascentes", "Reflorestar margens mantém os rios vivos."]],
    ctaTitle: "Proteja a água", ctaText: "Feche a torneira, conserte vazamentos e cobre saneamento na sua cidade.", ctaBtn: "Ver dicas", footer: "© 2026 Gota Viva — Projeto escolar sobre a ODS 6.",
  },
  {
    slug: "ods-11", num: 11, nome: "Cidades e Comunidades Sustentáveis", marca: "Cidade Viva", img: "city,park", resumo: "Cidades inclusivas, seguras, verdes e com bom transporte.",
    theme: { bg: "#fffdf7", text: "#2b2118", primary: "#e08a1e", onPrimary: "#ffffff", soft: "#fbeed6", accent: "#2f6f4f", heading: "'Space Grotesk', sans-serif", body: "'DM Sans', sans-serif", radius: "4px", hero: "center", heroBg: "#fbeed6" },
    nav: ["Problema", "Dados", "Soluções", "Ação"], heroTitle: "A cidade que queremos", heroText: "Mais parques, transporte de qualidade e moradia digna para todos.", heroBtn: "Participar",
    probTitle: "Cidades em transformação", probText: ["Mais da metade da população mundial vive em cidades — e esse número só cresce.", "Trânsito, poluição e falta de moradia afetam a qualidade de vida."],
    stats: [["56%", "da população mundial vive em cidades"], ["1 bi", "pessoas vivem em moradias precárias"], ["70%", "das emissões de CO₂ vêm das cidades"]],
    cardsTitle: "O que faz uma cidade sustentável", cards: [["Mobilidade", "Ciclovias e transporte público eficiente."], ["Áreas verdes", "Parques melhoram o ar e a saúde."], ["Moradia", "Casas seguras e acessíveis."]],
    solTitle: "Ideias que mudam bairros", sols: [["Ruas para pessoas", "Calçadas largas e trânsito calmo."], ["Hortas urbanas", "Lotes vazios viram espaços verdes."], ["Orçamento participativo", "Moradores decidem onde investir."]],
    ctaTitle: "Sua cidade, sua voz", ctaText: "Participe das decisões do seu bairro e cuide dos espaços públicos.", ctaBtn: "Conhecer projetos", footer: "© 2026 Cidade Viva — Projeto escolar sobre a ODS 11.",
  },
  {
    slug: "ods-12", num: 12, nome: "Consumo e Produção Responsáveis", marca: "Menos é Mais", img: "recycling", resumo: "Consumir melhor, reduzir lixo e valorizar a economia circular.",
    theme: { bg: "#fbf8ef", text: "#2a2410", primary: "#a07a17", onPrimary: "#ffffff", soft: "#efe7cf", accent: "#f3d27a", heading: "'Fraunces', serif", body: "'DM Sans', sans-serif", radius: "999px", hero: "split", heroBg: "#efe7cf" },
    nav: ["Problema", "Dados", "Soluções", "Ação"], heroTitle: "Consumir com consciência", heroText: "Repensar, reduzir, reutilizar e reciclar: pequenas escolhas, grande impacto.", heroBtn: "Começar agora",
    probTitle: "O custo do descartável", probText: ["Produzimos e jogamos fora mais do que o planeta consegue repor.", "Roupas, eletrônicos e plásticos viram montanhas de lixo em pouco tempo."],
    stats: [["2 bi t", "de lixo gerados por ano"], ["9%", "do plástico já produzido foi reciclado"], ["3", "planetas seriam necessários no ritmo atual"]],
    cardsTitle: "Os 5 Rs", cards: [["Repensar", "Eu preciso mesmo disso?"], ["Reduzir", "Comprar menos e melhor."], ["Reutilizar", "Dar nova vida aos objetos."]],
    solTitle: "Boas práticas", sols: [["Feiras de troca", "Troque roupas e livros em vez de comprar."], ["Compostagem", "Restos de comida viram adubo."], ["Conserto", "Consertar é mais barato que trocar."]],
    ctaTitle: "Desafio 30 dias", ctaText: "Aceite o desafio de reduzir o lixo da sua casa por um mês.", ctaBtn: "Aceitar desafio", footer: "© 2026 Menos é Mais — Projeto escolar sobre a ODS 12.",
  },
  {
    slug: "ods-13", num: 13, nome: "Ação Climática", marca: "Clima Agora", img: "forest,climate", resumo: "Medidas urgentes contra a mudança do clima e seus impactos.",
    theme: { bg: "#f3f7f1", text: "#13261a", primary: "#3f7e44", onPrimary: "#ffffff", soft: "#dfeadb", accent: "#b9e769", heading: "'Space Grotesk', sans-serif", body: "'DM Sans', sans-serif", radius: "12px", hero: "center", heroBg: "#dfeadb" },
    nav: ["Problema", "Dados", "Soluções", "Ação"], heroTitle: "O clima não pode esperar", heroText: "Entenda o aquecimento global e o que cada um pode fazer para frear a crise climática.", heroBtn: "Agir agora",
    probTitle: "Um planeta mais quente", probText: ["A queima de combustíveis fósseis e o desmatamento aumentam a temperatura da Terra.", "Secas, enchentes e ondas de calor estão mais frequentes e intensas."],
    stats: [["+1,2 °C", "de aquecimento desde a era industrial"], ["1,5 °C", "limite do Acordo de Paris"], ["2050", "meta de emissões líquidas zero"]],
    cardsTitle: "Causas principais", cards: [["Energia fóssil", "Carvão, petróleo e gás emitem CO₂."], ["Desmatamento", "Florestas derrubadas deixam de guardar carbono."], ["Transporte", "Carros e aviões queimam combustíveis."]],
    solTitle: "O que podemos fazer", sols: [["Energia limpa", "Solar e eólica substituem combustíveis fósseis."], ["Reflorestamento", "Plantar árvores captura carbono."], ["Mobilidade ativa", "Caminhar, pedalar e usar ônibus."]],
    ctaTitle: "Junte-se ao movimento", ctaText: "Calcule sua pegada de carbono e inspire sua escola a agir.", ctaBtn: "Calcular pegada", footer: "© 2026 Clima Agora — Projeto escolar sobre a ODS 13.",
  },
];

export const sites = contents.map((c) => ({ slug: c.slug, num: c.num, nome: c.nome, resumo: c.resumo, cor: c.theme.primary, thumb: img(c.img, 1), root: build(c) }));
export type Site = (typeof sites)[number];
