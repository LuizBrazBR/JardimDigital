---
title: Curto-circuito
---

> [!abstract] Definição
> **Quando o `&&` ou o `||` param no lado esquerdo, porque ele já basta para saber a resposta.** O lado direito nem chega a rodar.

- Em `false && ...`, o resultado vai ser `false` de qualquer jeito.
- Em `true || ...`, o resultado vai ser `true` de qualquer jeito.

```js
false && console.log("oi"); // não mostra nada
true && console.log("oi");  // mostra oi
```

Por isso, `condição && ação()` funciona como um `if` disfarçado. Para agir, porém, o melhor é o `if` mesmo. Ver as aulas [[programacao/logica-de-programacao/09-operadores-logicos|Operadores lógicos]] e [[programacao/logica-de-programacao/10-tomando-decisoes-com-if|Tomando decisões com if]].

## De onde vem a palavra

*Circuito* vem do latim *circuitus*, "volta", de *circuīre*, "andar em volta": *circum* ("em volta") + *īre* ("ir"). Um circuito elétrico é um caminho fechado: a corrente sai da pilha, passa pela lâmpada e volta para a pilha.

No **curto-circuito**, do inglês *short circuit*, a corrente acha um caminho mais **curto**, que pula a lâmpada. O `&&` e o `||` fazem o mesmo: quando o lado esquerdo já decide, eles pegam o atalho e pulam o direito. Em inglês, o verbo *short-circuit* também ganhou o sentido de "encerrar algo antes do fim", e esses operadores passaram a se chamar *short-circuit operators*.

Fontes: Wiktionary: [circuit](https://en.wiktionary.org/wiki/circuit), [short circuit](https://en.wiktionary.org/wiki/short_circuit) · MDN: [Logical AND (&&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)
