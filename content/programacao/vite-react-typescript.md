---
title: Projeto React + TypeScript com Vite
tags:
  - react
  - typescript
  - vite
---

Passo a passo genérico para começar qualquer projeto front-end com **React + TypeScript**, usando **Vite** como [[glossario/bundler|bundler]]/[[glossario/dev-server|dev server]].

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
├── main.tsx       # ponto de entrada, monta o React na página
├── App.tsx        # componente raiz
└── Style.css      # estilos globais
.eslintrc.cjs      # regras de lint
tsconfig.json      # configuração do compilador TypeScript
```

### `main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- `createRoot` conecta a árvore React ao elemento `#root` do `index.html` (API do React 18+, substitui o antigo `ReactDOM.render`).
- O `!` depois de `getElementById('root')` é uma asserção do TypeScript dizendo "eu garanto que isso não é `null`" — sem ele o compilador reclama porque `getElementById` pode retornar `null`.
- `<React.StrictMode>` não renderiza nada visualmente; ativa verificações extras em desenvolvimento (detecta efeitos colaterais inseguros, APIs depreciadas). Some sozinho no build de produção.

### `App.tsx`

```tsx
import './Style.css';

function App() {
  return <div></div>;
}

export default App;
```

Componente raiz — todo o resto da aplicação nasce a partir daqui. Importar o CSS aqui faz o Vite injetar esse estilo globalmente na página.

## ESLint (`.eslintrc.cjs`)

```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
```

- `root: true` impede o ESLint de subir na árvore de pastas procurando outro config (útil em monorepos).
- `extends` puxa três conjuntos de regras prontos: regras gerais do JS, regras de TypeScript, e regras dos hooks do React (evita erros clássicos como chamar hooks dentro de `if`).
- `plugins: ['react-refresh']` habilita o plugin que avisa quando o Fast Refresh (hot reload) pode quebrar por causa de como um arquivo exporta coisas.
- As duas regras desligadas (`'off'`) são flexibilizações comuns: permitir exportar outras coisas além de componentes no mesmo arquivo, e não travar o lint por variáveis não usadas (útil durante desenvolvimento).

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Pontos que valem entender (não decorar):

- **`target: "ES2020"`** — para qual versão do JavaScript o TS "traduziria" o código. Na prática o Vite/esbuild que faz a [[glossario/transpilacao|transpilação]] real; esse campo aqui serve mais para o *type-checking* entender quais recursos de linguagem são válidos.
- **`moduleResolution: "bundler"`** — modo pensado para quando um bundler (Vite, esbuild, webpack) resolve os imports, não o Node diretamente. Por isso dá pra fazer `allowImportingTsExtensions` (importar `./App.tsx` com extensão) e `resolveJsonModule` (importar `.json` como módulo).
- **`noEmit: true`** — o TypeScript aqui só checa tipos, não gera JS. Quem gera o JS de verdade é o Vite/esbuild. Por isso o `tsconfig.json` "principal" normalmente é separado de um `tsconfig.node.json` (esse `references` no fim) que configura o ambiente Node usado pelo próprio `vite.config.ts`.
- **`isolatedModules: true`** — exige que cada arquivo possa ser transpilado isoladamente, sem depender de análise entre arquivos. É uma restrição que bundlers como esbuild precisam (eles transpilam arquivo por arquivo, em paralelo, sem entender o projeto TS inteiro).
- **`strict: true`** — liga o modo mais rigoroso de checagem de tipos (nulos, `any` implícito, etc). As duas regras `noUnusedLocals`/`noUnusedParameters` como `false` só relaxam o aviso de variáveis não usadas — não afeta a segurança de tipos.

## `.vscode/settings.json` (opcional, gosto pessoal)

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

Isso é só organização visual do editor: esconde arquivos de configuração "de infraestrutura" na árvore do VS Code para sobrar só o que importa no dia a dia (`src/`). `"git.enabled": false` desliga a integração de Git *daquele workspace específico* no VS Code — não afeta o Git de verdade, só a UI. Não é algo que todo projeto precisa; é preferência de quem configurou.
