---
title: Hooks (React)
---

Funções especiais que dão acesso a funcionalidades internas do [[glossario/react|React]] (estado, ciclo de vida, contexto) dentro de um componente de função — sem precisar escrever uma classe.

As mais usadas são `useState` (estado local) e `useEffect` (rodar código em resposta a mudanças, como buscar dados ou se inscrever em eventos). Só podem ser chamadas no nível superior de um componente ou de outro hook — nunca dentro de `if`, `for` ou depois de um `return` condicional. Essa é a "regra dos hooks".

Também existem **custom hooks**: funções escritas por quem desenvolve, combinando hooks nativos, seguindo a convenção de nome começando com `use`. Ver [[programacao/custom-hooks|anotação sobre custom hooks]].
