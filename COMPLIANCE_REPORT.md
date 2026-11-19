# Relatório de conformidade — Laboratório de Sites ODS

Data: 2026-11-19 · Responsável: Auditoria técnica Antigravity · Ambiente: Desenvolvimento / Preparação para produção

> Este relatório é um checklist técnico. Não é parecer jurídico e não certifica conformidade com a LGPD.

## Resumo

- Bloqueia publicação: 2 (caso seja publicado como site comercial de cliente; para uso estritamente didático/escolar, ver detalhes abaixo)
- Corrigir antes de entregar: 0 (todos os itens técnicos de código foram corrigidos)
- Recomendado: 3
- Para o advogado: 2

## Contexto

Tipo de site: Plataforma educativa interativa (vitrine/laboratório sem formulários de cadastro ou venda) · Coleta dados? Não coleta dados pessoais (sem formulários, sem login, sem analytics/pixels) · Terceiros: Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) · Público inclui menores? Sim (estudantes iniciantes de HTML e CSS)

## 1. Bloqueia publicação

| #   | Achado                                                                                                                                                              | Onde (arquivo:linha)       | Ação                                                                                                                                                                                                                                                                                                                | Quem decide                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| 1   | Ausência de dados formais do responsável/instituição no rodapé (Razão Social/Nome, CNPJ/CPF, e-mail de contato)                                                     | `src/routes/index.tsx:101` | Como se trata de um projeto educativo, não inventamos dados. Caso o site seja publicado oficialmente por uma instituição ou cliente, preencher os dados reais do responsável no rodapé.                                                                                                                             | Cliente / Responsável pelo projeto |
| 2   | Fotos de banco de imagem (Unsplash) em `ods-4-problema.jpg` e `ods-4-solucao.jpg` e ícone `favicon.ico` sem confirmação documental de autorização de imagem/autoria | `ASSETS.md`                | Todas as 18 imagens do Unsplash foram baixadas para `public/images/` para evitar quebra de links externos e envio de IP ao CDN do Unsplash, e catalogadas em `ASSETS.md`. Confirmar se as imagens de sala de aula (`ods-4`) possuem pessoas identificáveis ou se deseja mantê-las sob a licença padrão do Unsplash. | Cliente / Responsável pelo projeto |

## 2. Corrigir antes de entregar

| #   | Achado                                                                                                                                                                                | Onde                                                                                                                   | Ação feita                                                                                                                                                                                              | Status    |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 1   | Dependência proprietária `@lovable.dev/vite-tanstack-config`, `.lovable/project.json` e telemetria `lovable-error-reporting.ts`                                                       | `vite.config.ts`, `package.json`, `src/routes/__root.tsx`                                                              | Removidos todos os pacotes, scripts de telemetria, metadados (`author: Lovable`, `@Lovable`) e pastas do Lovable. Configurado `vite.config.ts` com plugins oficiais do TanStack Start, Vite e Nitro.    | Corrigido |
| 2   | Imagens carregadas remotamente via CDN externo (`images.unsplash.com`), gerando risco de links quebrados e envio de IP a terceiros                                                    | `src/lab/sites.ts:15-23`                                                                                               | Todas as 18 imagens foram baixadas localmente para `public/images/ods-*.jpg` e referenciadas localmente (`/images/...`).                                                                                | Corrigido |
| 3   | Ausência de `public/sitemap.xml` estático e `Sitemap:` em `public/robots.txt`                                                                                                         | `public/sitemap.xml`, `public/robots.txt`                                                                              | Criado `public/sitemap.xml` estático com todas as rotas principais (`/`, `/site/ods-2`, `/site/ods-4`, `/site/ods-6`, `/site/ods-11`, `/site/ods-12`, `/site/ods-13`) e atualizado `public/robots.txt`. | Corrigido |
| 4   | Acessibilidade: falta de foco visível padronizado, `prefers-reduced-motion`, `aria-label` nos seletores de cor e `role="tablist"` / `aria-selected` nas abas do painel de aprendizado | `src/styles.css`, `src/components/lab/LearningPanel.tsx`, `src/components/lab/LabControls.tsx`, `src/routes/index.tsx` | Adicionados `:focus-visible`, `@media (prefers-reduced-motion: reduce)`, landmark `<main>` na página inicial, `alt` descritivo nos cards e atributos ARIA nas abas e controles do laboratório.          | Corrigido |
| 5   | Páginas de erro 404 e 500 em inglês (`lang="en"`, "Page not found", "This page didn't load")                                                                                          | `src/routes/__root.tsx`, `src/lib/error-page.ts`                                                                       | Traduzidas integralmente para português do Brasil com `lang="pt-BR"`.                                                                                                                                   | Corrigido |

## 3. Recomendado

- **Hospedar fontes localmente**: Atualmente as fontes `DM Sans`, `Fraunces` e `Space Grotesk` são carregadas do Google Fonts (`src/routes/__root.tsx:96-100`). Para evitar qualquer conexão com servidores do Google no carregamento da página, recomenda-se futuramente baixar os arquivos `.woff2` para `public/fonts/`.
- **Aviso curto de privacidade**: Mesmo sem coletar dados pessoais ou usar cookies de rastreamento, caso o site seja aberto ao público geral, é recomendável incluir uma nota simples informando que a plataforma não coleta dados pessoais nem utiliza cookies de rastreamento.
- **Domínio definitivo no `sitemap.xml` e `robots.txt`**: Após publicar na Vercel e definir a URL final (ex.: `https://laboratorio-sites-ods.vercel.app` ou domínio próprio), atualizar a URL base em `public/sitemap.xml` e `public/robots.txt`.

## 4. Para o advogado

- **Enquadramento do projeto**: Confirmar se a plataforma será publicada como projeto institucional/educacional aberto ou vinculada a uma pessoa jurídica/física, definindo quais dados de identificação devem constar no rodapé.
- **Público estudantil (menores de 18 anos)**: Confirmar que a ausência total de coleta de dados, cadastro e cookies de terceiros atende integralmente às diretrizes de proteção de dados de estudantes (art. 14 da LGPD).

## 5. Terceiros e cookies

| Recurso                               | Tipo              | Carrega antes do consentimento?                                         | Decisão                                                                                                           |
| ------------------------------------- | ----------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Google Fonts (`fonts.googleapis.com`) | Fonte web externa | Sim (não grava cookies, mas requisita CSS/fontes ao servidor do Google) | Mantido para preservar a fidelidade tipográfica dos 6 temas educativos; recomendado hospedar localmente no futuro |
| Analytics / Pixels / Trackers         | Rastreamento      | Não existe nenhum instalado                                             | Nenhum banner de cookies é necessário enquanto o site não tiver cookies/trackers não essenciais                   |

## 6. Dados da empresa

| Campo                      | Valor                               | Status                                 |
| -------------------------- | ----------------------------------- | -------------------------------------- |
| Razão social / Responsável | Não informado (projeto educacional) | Pendente caso publicado comercialmente |
| CNPJ/CPF                   | Não informado                       | Pendente caso publicado comercialmente |
| Endereço/Município         | Não informado                       | Pendente caso publicado comercialmente |
| E-mail                     | Não informado                       | Pendente caso publicado comercialmente |
| Contato de privacidade     | Não informado                       | Pendente caso publicado comercialmente |

## 7. Acessibilidade

| Critério                                                                             | Resultado | Como foi verificado                                                                                                              |
| ------------------------------------------------------------------------------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `alt` em imagens                                                                     | OK        | Todas as imagens da galeria (`src/routes/index.tsx`) e dos 6 sites-modelo (`src/lab/sites.ts`) possuem atributo `alt` preenchido |
| Vídeo: legenda/autoplay                                                              | N/A       | O projeto não utiliza vídeos ou áudios                                                                                           |
| Contraste AA                                                                         | OK        | Paleta principal OKLCH (`src/styles.css`) e temas das 6 ODS verificados com alto contraste entre texto e fundo                   |
| Teclado e foco                                                                       | OK        | `:focus-visible` configurado em `src/styles.css`, botões e abas semânticos com `type="button"`, `role="tab"` e `aria-selected`   |
| `lang`, `h1`, landmarks                                                              | OK        | `<html lang="pt-BR">`, um `<h1>` por página, `<header>`, `<main>`, `<aside>` e `<footer>` presentes                              |
| Zoom 200% / 320 px                                                                   | OK        | Layout responsivo em grid (`auto-fit`, `minmax`) e painel lateral adaptável (`flex-col md:flex-row`)                             |
| Testes manuais pendentes: Teste com leitor de tela (NVDA/VoiceOver) após publicação. |

## 8. Imagens e licenças

Resumo do `ASSETS.md`: 16 OK (Unsplash License, hospedadas localmente em `public/images/`) · 3 sem comprovação formal (`favicon.ico` e verificação de pessoas em `ods-4-problema.jpg` e `ods-4-solucao.jpg`) · 0 a substituir.

## 9. Conteúdo e alegações

| Trecho                                                                                                   | Onde                       | Risco                                                                                                        | Ação                                                                                   | Quem decide            |
| -------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ---------------------- |
| Dados estatísticos educativos sobre as ODS da ONU (ex.: fome, educação, água, cidades, resíduos e clima) | `src/lab/sites.ts:116-166` | Baixo (conteúdo didático sobre metas públicas da ONU, sem alegação comercial, médica ou promessa financeira) | Mantido integralmente conforme exigido nas regras de preservação do conteúdo educativo | Responsável pedagógico |

## 10. Prontidão para o Google (Robôs e Indexação)

| Item                                                      | Status | Detalhes / Arquivo                                                                             |
| --------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| `public/robots.txt` estático                              | OK     | Arquivo físico presente em `public/robots.txt` com `Allow: /` e referência ao sitemap          |
| `public/sitemap.xml` estático                             | OK     | Arquivo físico presente em `public/sitemap.xml` com as 7 rotas públicas da aplicação           |
| Meta tags (`title`, `description`, `lang="pt-BR"`)        | OK     | Configuradas em `src/routes/__root.tsx`, `src/routes/index.tsx` e `src/routes/site.$slug.tsx`  |
| Desvinculação de proxys externos (ex.: Lovable `/__l5e/`) | OK     | Zero referências a `/__l5e/` ou pacotes `@lovable.dev/*`; imagens servidas de `public/images/` |

## 11. O que o cliente precisa fornecer

- Caso deseje exibir identificação institucional no rodapé: Nome/Instituição responsável e e-mail de contato.
- Domínio definitivo após o deploy na Vercel para atualizar a URL base em `public/sitemap.xml` e `public/robots.txt`.
