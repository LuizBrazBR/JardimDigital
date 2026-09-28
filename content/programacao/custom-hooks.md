---
title: Custom Hooks em React
tags:
  - react
  - typescript
  - hooks
verificado: 2026-09-28
---

Diferença entre **[[glossario/hooks|hooks]] nativos** do [[glossario/react|React]] e **custom hooks**, usando como exemplo um `useFetch` genérico escrito durante estudo.

## Hooks nativos vs custom hooks

- **Hook nativo**: função que o próprio React expõe — `useState`, `useEffect`, `useContext`, `useRef`, etc. Dá acesso a funcionalidades internas do React (estado, ciclo de vida, contexto) dentro de um componente de função.
- **Custom hook**: função escrita por quem desenvolve, que usa um ou mais hooks nativos por dentro pra encapsular uma lógica reutilizável. Não é uma API nova do React — é uma função JavaScript comum que segue duas regras:
  1. O nome começa com `use` (`useFetch`, `useDebounce`, ...). É assim que o React — e o linter — reconhece que aquela função deve obedecer às regras dos hooks.
  2. Só chama outros hooks no nível superior da própria função, nunca dentro de condicionais ou loops.

## Exemplo: `useFetch`

```tsx
const useFetch = <T,>(URL: string, OPTIONS?: options) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const request = new Request(URL, { signal: controller.signal, ...OPTIONS });

    async function invocarFetch() {
      try {
        const data = await fetch(request);
        setData(await data.json());
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        setError(error instanceof Error ? error.message : null);
      } finally {
        setLoading(false);
      }
    }
    invocarFetch();

    return () => controller.abort();
  }, [URL, OPTIONS]);

  return { data, loading, error };
};
```

Pontos que valem anotar sobre esse hook específico:

- **`<T,>`** — a vírgula depois do `T` não é erro de digitação. Em um arquivo `.tsx`, `<T>` sozinho seria interpretado como abertura de uma tag JSX; a vírgula extra desambigua pro compilador que aquilo é um generic, não JSX. Só é necessária nesse formato de arrow function — em `function useFetch<T>(...)` não precisaria.
- **Cleanup do `useEffect` com `AbortController`** — a função de efeito pode devolver uma função de "limpeza", chamada quando o componente desmonta ou as dependências mudam antes do efeito rodar de novo. Aqui ela cancela o fetch em andamento, evitando dar `setState` numa requisição que já não interessa mais (componente desmontado, ou uma nova chamada substituiu a anterior).
- **Tratar `AbortError` separado** — cancelar o fetch faz ele lançar um erro cujo `name` é `"AbortError"`. Isso é esperado (o próprio hook pediu o cancelamento), então é ignorado em vez de virar `error` state.
- **Retornar um objeto (`{ data, loading, error }`)** em vez de um array permite quem consome o hook escolher os campos por nome, em vez de depender de ordem — trade-off oposto ao que o próprio `useState` faz ao retornar um array.

## Por que não é "só uma função helper"

Uma função helper comum não pode chamar `useState`/`useEffect` — essas APIs só funcionam dentro do ciclo de vida de um componente React. Um custom hook resolve isso "emprestando" esse ciclo de vida: quando um componente chama `useFetch(...)`, os hooks nativos de dentro dele ficam associados a esse componente, como se tivessem sido chamados diretamente nele.
