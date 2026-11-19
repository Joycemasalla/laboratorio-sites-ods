# Pixel Pathways For Good

Crie a plataforma educativa e interativa 'Laboratório de Sites ODS — Aprenda Explorando' para alunos iniciantes de HTML e CSS, implementando tudo que está especificado no documento anexado:

1. Página Inicial:
- Título: "Laboratório de Sites ODS"
- Subtítulo: "Explore exemplos, descubra como foram construídos e aprenda criando."
- Breve explicação de como navegar e utilizar a plataforma.
- Galeria com 6 sites-modelo:
  1. ODS 2 — Fome Zero
  2. ODS 4 — Educação de Qualidade
  3. ODS 6 — Água Potável e Saneamento
  4. ODS 11 — Cidades e Comunidades Sustentáveis
  5. ODS 12 — Consumo e Produção Responsáveis
  6. ODS 13 — Ação Climática
- Cada card com thumbnail/imagem de apresentação, nome da ODS, descrição e botão "Explorar site".

2. Sites-Modelo das ODS:
- 6 sites completos, bonitos, com identidades visuais distintas e adequadas a cada ODS.
- Cada um com seções realistas e variadas (Header com navegação, Hero, Apresentação do problema, Dados/Estatísticas em destaque, Cards explicativos, Soluções/Iniciativas, Chamada para Ação / CTA, Rodapé).
- Código demonstrativo limpo, semântico e compreensível para iniciantes (HTML5 e CSS básico).

3. Modo de Exploração Interativo:
- Ao abrir qualquer site-modelo, o usuário pode clicar diretamente em qualquer elemento da página (cabeçalho, título principal, parágrafos, imagens, botões, cards, colunas, rodapé).
- O elemento selecionado recebe destaque visual imediato (contorno/borda de foco com badge identificador).
- Um painel lateral de aprendizado se abre automaticamente.

4. Painel de Aprendizado:
- Aba 1 ("Entenda"): Explicação simples e direta sobre a função e o papel daquele elemento na página.
- Aba 2 ("HTML"): Trecho de código HTML responsável pela estrutura do elemento selecionado, com realce de sintaxe e botão "Copiar código".
- Aba 3 ("CSS"): CSS aplicado àquele elemento, com botão "Copiar código" e lista explicativa em português para cada propriedade utilizada (ex: background-color, padding, margin, border-radius, font-size, width, display).

5. Modo Laboratório — Experimente:
- Seção no painel para o aluno experimentar alterar pequenas propriedades CSS em tempo real no elemento selecionado:
  - Cor de fundo (color picker ou opções de cores pré-definidas e livres)
  - Cor do texto
  - Tamanho da fonte (slider/controles simples)
  - Espaçamento interno (padding)
  - Espaçamento externo (margin)
  - Arredondamento de bordas (border-radius)
  - Largura (width)
- A prévia visual do site atualiza instantaneamente ao alterar os valores.
- Botão "Restaurar original" para redefinir o elemento para o estilo inicial do modelo.

6. Design e Experiência:
- Visual moderno, claro, leve e educativo (sem infantilização).
- Cores conectadas à sustentabilidade, tipografia limpa, responsivo para desktop e celular.
- Navegação fluida entre a galeria inicial e os sites-modelo, com barra de topo permitindo voltar para a home ou alternar de ODS facilmente.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/38e028ef-849b-46c5-af7a-a359a3eaeaf5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
