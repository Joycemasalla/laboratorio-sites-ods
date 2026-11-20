# Laboratório de Sites ODS — Aprenda Explorando!

Plataforma educativa e interativa voltada para estudantes iniciantes de **HTML5** e **CSS3**. O objetivo é permitir que os alunos explorem seis sites-modelo sobre os **Objetivos de Desenvolvimento Sustentável (ODS)** da ONU, cliquem em qualquer elemento da página para inspecionar sua função semântica, visualizem e copiem os códigos HTML e CSS correspondentes e experimentem alterações de estilo em tempo real no **Modo Laboratório**.

---

## Sumário

1. [Funcionalidades Principais](#1-funcionalidades-principais)
2. [Sites-Modelo das ODS](#2-sites-modelo-das-ods)
3. [Tecnologias Utilizadas](#3-tecnologias-utilizadas)
4. [Organização das Pastas](#4-organização-das-pastas)
5. [Como Instalar e Executar Localmente](#5-como-instalar-e-executar-localmente)
6. [Como Gerar a Versão de Produção](#6-como-gerar-a-versão-de-produção)
7. [Como Publicar a Aplicação (Vercel / GitHub)](#7-como-publicar-a-aplicação-vercel--github)
8. [Desenvolvimento Contínuo pelo Antigravity](#8-desenvolvimento-contínuo-pelo-antigravity)

---

## 1. Funcionalidades Principais

- **Página Inicial Didática**: Explica em 3 passos como utilizar o laboratório e apresenta a galeria com os 6 sites-modelo das ODS.
- **Modo de Exploração Interativo**: Ao clicar em qualquer elemento de um site-modelo (`<header>`, `<nav>`, `<h1>`, `<h2>`, `<h3>`, `<p>`, `<img>`, `<section>`, `<article>`, `<footer>`, botões, colunas e destaques estatísticos), o elemento recebe destaque visual imediato com um badge indicando sua tag HTML e sua função.
- **Painel de Aprendizado Lateral**:
  - **Aba "Entenda"**: Explicação clara e acessível sobre o papel daquele elemento na estrutura da página e qual classe CSS o estiliza.
  - **Aba "HTML"**: Código HTML5 semântico gerado diretamente da estrutura do elemento, com realce de sintaxe e botão **"Copiar código"**.
  - **Aba "CSS"**: Regras CSS aplicadas ao elemento com botão **"Copiar código"** e glossário em português explicando cada propriedade utilizada (`background-color`, `padding`, `margin`, `border-radius`, `font-size`, `display`, `grid-template-columns`, etc.).
  - **Aba "Experimente" (Modo Laboratório)**: Controles interativos (color pickers, paletas de cores e sliders) para alterar em tempo real cor de fundo, cor do texto, tamanho da fonte, espaçamento interno (`padding`), espaçamento externo (`margin`), arredondamento de bordas (`border-radius`) e largura (`width`), além do botão **"Restaurar original"**.

---

## 2. Sites-Modelo das ODS

Cada site-modelo possui identidade visual, paleta de cores, tipografia e layout próprios:

1. **ODS 2 — Fome Zero** (_Prato Cheio_): Agricultura sustentável e combate à fome com hortas comunitárias.
2. **ODS 4 — Educação de Qualidade** (_Aprender+_): Acesso à educação inclusiva e de qualidade para todas as pessoas.
3. **ODS 6 — Água Potável e Saneamento** (_Gota Viva_): Água limpa e saneamento básico como direitos de todos.
4. **ODS 11 — Cidades e Comunidades Sustentáveis** (_Cidade Viva_): Cidades inclusivas, seguras, verdes e com bom transporte.
5. **ODS 12 — Consumo e Produção Responsáveis** (_Menos é Mais_): Consumir melhor, reduzir lixo e valorizar a economia circular.
6. **ODS 13 — Ação Climática** (_Clima Agora_): Medidas urgentes contra a mudança do clima e seus impactos.

---

## 3. Tecnologias Utilizadas

- **React 19** + **TypeScript 5**
- **TanStack Start** & **TanStack Router** (roteamento file-based com SSR e tipagem segura)
- **Vite 8** + **Nitro** (bundler moderno e servidor universal para deploy serverless/edge)
- **Tailwind CSS v4** (estilização da interface da plataforma com tokens OKLCH)
- **Vitest** + **Testing Library** (testes automatizados de rotas e geração dos modelos)
- **ESLint** + **Prettier** (padronização e qualidade de código)

---

## 4. Organização das Pastas

```text
laboratorio-sites-ods/
├── public/
│   ├── favicon.ico                  # Ícone da aplicação
│   ├── robots.txt                   # Instruções para motores de busca
│   ├── sitemap.xml                  # Mapa de URLs públicas do projeto
│   └── images/                      # Imagens locais dos 6 sites-modelo das ODS
├── src/
│   ├── components/
│   │   └── lab/
│   │       ├── CodeBox.tsx          # Exibição de código HTML/CSS com syntax highlight e cópia
│   │       ├── LabControls.tsx      # Controles interativos do Modo Laboratório (sliders e cores)
│   │       ├── LearningPanel.tsx    # Painel lateral com as 4 abas educativas
│   │       └── SiteRenderer.tsx     # Renderizador recursivo da árvore de elementos dos sites-modelo
│   ├── lab/
│   │   ├── model.ts                 # Tipos da árvore (N, Kind, Style), dicionários didáticos e geradores HTML/CSS
│   │   └── sites.ts                 # Dados completos, temas e conteúdos dos 6 sites-modelo das ODS
│   ├── routes/
│   │   ├── __root.tsx               # Layout raiz da aplicação (HTML pt-BR, fontes, 404 e ErrorBoundary)
│   │   ├── index.tsx                # Página inicial com instruções e galeria dos 6 sites-modelo
│   │   └── site.$slug.tsx           # Rota dinâmica (/site/:slug) do explorador e laboratório interativo
│   ├── test/
│   │   ├── app-routing.test.tsx     # Testes automatizados de rotas e modelos ODS
│   │   └── setup.ts                 # Configuração de ambiente JSDOM para o Vitest
│   ├── router.tsx                   # Instanciação do TanStack Router e QueryClient
│   ├── routeTree.gen.ts             # Árvore de rotas gerada automaticamente pelo TanStack Router
│   └── styles.css                   # Estilos globais, variáveis de tema Tailwind v4 e classes do laboratório
├── ASSETS.md                        # Inventário de imagens, fontes e licenças
├── COMPLIANCE_REPORT.md             # Relatório técnico de conformidade, acessibilidade e privacidade
├── eslint.config.js                 # Configuração do ESLint
├── package.json                     # Scripts e dependências enxutas do projeto
├── tsconfig.json                    # Configuração do TypeScript
├── vite.config.ts                   # Configuração padrão do Vite + TanStack Start + Nitro
└── vitest.config.ts                 # Configuração de testes
```

---

## 5. Como Instalar e Executar Localmente

### Pré-requisitos

- **Node.js** (versão 20 ou superior recomendada)
- **npm** (incluído com o Node.js)

### Passo a passo

1. Clone o repositório (caso ainda não esteja na máquina):

   ```bash
   git clone https://github.com/Joycemasalla/laboratorio-sites-ods.git
   cd laboratorio-sites-ods
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra o navegador no endereço exibido no terminal (geralmente `http://localhost:3000` ou `http://localhost:5173`).

### Comandos de verificação e qualidade

- Executar testes automatizados:
  ```bash
  npm test
  ```
- Verificar tipagem TypeScript:
  ```bash
  npm run typecheck
  ```
- Verificar padronização de código (ESLint):
  ```bash
  npm run lint
  ```

---

## 6. Como Gerar a Versão de Produção

Para compilar o cliente e o servidor SSR para produção:

```bash
npm run build
```

Para testar localmente a versão compilada:

```bash
npm run preview
```

---

## 7. Como Publicar a Aplicação (Vercel / GitHub)

O projeto utiliza **TanStack Start com Nitro**, que detecta automaticamente o ambiente da **Vercel** durante o build (`npm run build`), sem exigir configurações proprietárias externas.

### Publicando na Vercel (Recomendado)

1. Suba o código atualizado para o seu repositório no **GitHub** (`https://github.com/Joycemasalla/laboratorio-sites-ods`).
2. Acesse a [Vercel](https://vercel.com/) e clique em **Add New... → Project**.
3. Importe o repositório `laboratorio-sites-ods` do GitHub.
4. Mantenha as configurações padrão detectadas:
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
5. Clique em **Deploy**. O Nitro gerará automaticamente o bundle compatível com a Vercel, mantendo todas as rotas (`/`, `/site/ods-2`, `/site/ods-4`, `/site/ods-6`, `/site/ods-11`, `/site/ods-12`, `/site/ods-13`) funcionando perfeitamente tanto na navegação interna quanto no acesso direto via URL.

_(Nota: O projeto não requer variáveis de ambiente ou banco de dados para funcionar)._

---

## 8. Desenvolvimento Contínuo pelo Antigravity

O projeto é 100% independente de plataformas fechadas e pode ser mantido diretamente pelo **Antigravity**:

- **Adicionar ou editar conteúdos dos sites-modelo**: Edite a lista `contents` em `src/lab/sites.ts`. A árvore de elementos HTML/CSS e a prévia visual são geradas automaticamente a partir desses dados.
- **Adicionar novas explicações de tags ou propriedades CSS**: Edite os dicionários `kindInfo` e `propInfo` em `src/lab/model.ts`.
- **Evoluir o painel lateral ou os controles do laboratório**: Edite os componentes modulares em `src/components/lab/`.
- **Imagens dos sites-modelo**: Adicione arquivos em `public/images/` e referencie-os com caminhos locais (`/images/nome-do-arquivo.jpg`) em `src/lab/sites.ts`, registrando a origem em `ASSETS.md`.
