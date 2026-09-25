---
title: Projeto React + TypeScript com Vite
tags:
  - react
  - typescript
  - vite
verificado: 2026-09-25
---

Passo a passo genérico para começar qualquer projeto front-end com **[[glossario/react|React]] + [[glossario/typescript|TypeScript]]**, usando **[[glossario/vite|Vite]]** como [[glossario/bundler|bundler]]/[[glossario/dev-server|dev server]].

> Ferramentas de front-end mudam rápido. O conteúdo abaixo foi conferido rodando `npm create vite@latest` de verdade em 2026-09-25 — se você ler isso daqui a um ano, vale rodar de novo e comparar.

## Criando o projeto

1. Abrir a pasta no VS Code
2. `npm create vite@latest .` (o `.` cria dentro da pasta atual, sem criar uma subpasta nova)
3. Escolher o framework `React` e a variante `TypeScript`
4. `npm install`
5. `npm run dev`

O Vite serve o projeto com [[glossario/hot-reload|hot reload]] e não empacota nada em produção até rodar `npm run build`.

## Estrutura de arquivos gerada

```
src/
├── main.tsx           # ponto de entrada, monta o React na página
├── App.tsx             # componente raiz
├── App.css
└── assets/
tsconfig.json           # raiz: só aponta pros outros dois
tsconfig.app.json       # configuração do código em src/
tsconfig.node.json      # configuração do vite.config.ts
.oxlintrc.json          # regras de lint (Oxlint)
vite.config.ts
```

### `main.tsx`

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- `createRoot` conecta a árvore React ao elemento `#root` do `index.html` (API do React 18+, substitui o antigo `ReactDOM.render`).
- O `!` depois de `getElementById('root')` é uma asserção do TypeScript dizendo "eu garanto que isso não é `null`" — sem ele o compilador reclama porque `getElementById` pode retornar `null`.
- `<StrictMode>` não renderiza nada visualmente; ativa verificações extras em desenvolvimento (detecta efeitos colaterais inseguros, APIs depreciadas). Some sozinho no build de produção.
- Repare que hoje se importa `{ StrictMode }` e `{ createRoot }` **pelo nome**, em vez de `import React from 'react'` + `React.StrictMode`. Isso só é possível porque `jsx: "react-jsx"` (ver tsconfig abaixo) já cuida de converter `<div />` em chamadas de função sem precisar do objeto `React` inteiro importado — então não faz mais sentido importar o pacote todo só pra usar `StrictMode`.

### `App.tsx`

```tsx
import './App.css'

function App() {
  return <div></div>
}

export default App
```

Componente raiz — todo o resto da aplicação nasce a partir daqui. Importar o CSS aqui faz o Vite injetar esse estilo globalmente na página.

O Vite hoje gera um `App.tsx` de demonstração bem mais elaborado (logo, contador, links de documentação). Esvaziar tudo isso pra um `<div></div>` limpo e começar do zero continua sendo prática normal — nada de errado nisso, é só o ponto de partida real de qualquer projeto.

## Lint: Oxlint (substituiu o ESLint)

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

O template padrão do Vite trocou o [[glossario/linter|linter]] de ESLint para **[[glossario/oxlint|Oxlint]]** — escrito em Rust, roda ordens de magnitude mais rápido, e vem sem precisar instalar `@typescript-eslint`, parser separado, etc. O script `npm run lint` agora só chama `oxlint`.

Cursos e tutoriais mais antigos (como o que você está seguindo) ainda mostram `.eslintrc.cjs` com `eslint:recommended` + `@typescript-eslint` + `react-hooks`/`react-refresh` como plugins. Isso **ainda funciona** — ESLint não foi descontinuado, e projetos existentes continuam usando — só deixou de ser o que o `npm create vite@latest` gera por padrão.

## tsconfig — agora dividido em 3 arquivos

```json
// tsconfig.json (raiz)
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

```json
// tsconfig.app.json (código do navegador, em src/)
{
  "compilerOptions": {
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

```json
// tsconfig.node.json (o próprio vite.config.ts, que roda em Node)
{
  "compilerOptions": {
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "module": "nodenext",
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}
```

Pontos que valem entender:

- **Por que 3 arquivos?** `vite.config.ts` roda em **Node** (sem DOM, com acesso a filesystem), enquanto o código em `src/` roda no **navegador** (com DOM, sem Node). São dois ambientes diferentes, então cada um ganhou seu próprio arquivo de configuração; o `tsconfig.json` da raiz só existe pra amarrar os dois via `references`.
- **`moduleResolution: "bundler"`** — modo pensado para quando um [[glossario/bundler|bundler]] resolve os imports, não o Node diretamente. Por isso dá pra fazer `allowImportingTsExtensions` (importar `./App.tsx` com extensão).
- **`noEmit: true`** — o TypeScript aqui só checa tipos, não gera JS. Quem gera o JS de verdade é o Vite/esbuild, fazendo a [[glossario/transpilacao|transpilação]].
- **`verbatimModuleSyntax: true`** — substitui o antigo `isolatedModules`. Obriga marcar explicitamente imports que servem só pra tipos (`import type { Props } from './x'`), pra deixar claro pro bundler o que pode remover sem rodar nenhuma análise mais profunda do projeto.
- **`erasableSyntaxOnly: true`** — flag nova: bloqueia recursos do TypeScript que exigiriam gerar código real (como `enum`). Garante que todo o TS do projeto pode ser "apagado" (só remover tipos) sem precisar de um compilador de verdade — é exatamente o que bundlers como esbuild fazem.
- **`noUnusedLocals`/`noUnusedParameters: true`** — hoje já vêm ligados por padrão. Antes ficavam `false` no tsconfig e essa checagem era papel do ESLint; com o Oxlint mais leve, o próprio TypeScript passou a cobrir isso.

## `.vscode/settings.json` (opcional, gosto pessoal — não é padrão do Vite)

```json
{
  "git.enabled": false,
  "files.exclude": {
    "node_modules": true,
    ".vscode": true,
    "package.json": true,
    "...": true
  }
}
```

Isso é só organização visual do editor: esconde arquivos de configuração "de infraestrutura" na árvore do VS Code para sobrar só o que importa no dia a dia (`src/`). `"git.enabled": false` desliga a integração de Git *daquele workspace específico* no VS Code — não afeta o Git de verdade, só a UI. Isso nunca veio do Vite — é preferência de quem gravou o curso.
