---
title: Arrow function
---

> [!abstract] Definição
> **Um jeito curto de escrever uma [[glossario/funcao|função]] em JavaScript, com uma seta, `=>`, entre os parâmetros e o resultado.** Em português, "função de seta". A documentação da MDN em português usa o nome em inglês.

As três chamadas do `sort()` abaixo fazem a mesma coisa:

```js
// 1. função com nome, entregue pelo nome
function compararNumeros(a, b) {
  return a - b;
}
numeros.sort(compararNumeros);

// 2. função sem nome (anônima), escrita dentro da chamada
numeros.sort(function (a, b) {
  return a - b;
});

// 3. a mesma função sem nome, com a seta
numeros.sort((a, b) => a - b);
```

A função da terceira forma é `(a, b) => a - b`.

Lê-se assim: **"recebe `a` e `b`, devolve `a - b`"**. As regras da forma curta:

- A palavra `function` sai, e ficam só os parâmetros, entre parênteses.
- Quando o corpo é uma conta só, as chaves e o `return` também saem, e o resultado é devolvido sozinho.
- Com chaves, o `return` volta a ser obrigatório: `(a, b) => { return a - b; }`. Sem ele, a função devolve `undefined`.
- Com um parâmetro só, os parênteses podem sair: `n => n * 2`.

O uso mais comum é entregar uma função curta a outra, como um [[glossario/callback|callback]]: `numeros.sort((a, b) => a - b)`. Também dá para guardar a função numa constante e dar um nome a ela: `const dobro = n => n * 2;`.

Ver a [[programacao/logica-de-programacao/modulo-7/03-colocando-em-ordem-a-ideia-de-ordenacao|aula 7.3]].

## De onde vem a palavra

| Palavra | Origem |
|---|---|
| *arrow* (inglês) | "flecha", do inglês antigo *earh*, de uma raiz indo-europeia que queria dizer "arco, flecha" |
| *seta* | do latim *sagitta*, "flecha", pelo galego-português *saeta* |
| *anônimo* | do grego *anṓnumos*, "sem nome", de *an-*, "sem", e *ónuma*, "nome", pelo latim tardio *anōnymus* |

A mesma raiz indo-europeia do *arrow* deu o latim *arcus* e o nosso **arco**: a flecha e o arco que a dispara têm o mesmo nome antigo. O `=>` ganhou esse nome porque parece uma seta deitada, apontando do que entra para o que sai.

Fontes: MDN: [Arrow functions](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions) · Wiktionary: [arrow](https://en.wiktionary.org/wiki/arrow), [seta](https://en.wiktionary.org/wiki/seta), [anónimo](https://en.wiktionary.org/wiki/an%C3%B3nimo)
