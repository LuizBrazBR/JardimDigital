---
title: Contador
---

> [!abstract] Definição
> **Uma variável que soma 1 a cada vez que algo acontece dentro de um [[glossario/laco|laço]].** É ela que responde "quantas vezes?".

```js
let quantidadePares = 0;           // antes do laço: nada contado

for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {               // só quando o i é par
    quantidadePares++;             // mais um
  }
}

console.log(quantidadePares);      // depois: 5
```

Quase sempre, o contador fica dentro de um `if`: o laço passa por tudo, mas o contador só anda quando a condição é verdadeira. Sem o `if`, ele conta todas as voltas.

É um [[glossario/acumulador|acumulador]] mais simples: em vez de somar valores diferentes, soma sempre 1. Começa em 0 e é criado **antes** do laço. Junto com um acumulador, serve para calcular a média: a soma dividida pela quantidade.

Ver a aula [[programacao/logica-de-programacao/modulo-4/04-contador-e-acumulador-somando-e-contando|Contador e acumulador: somando e contando]].

## De onde vem a palavra

De *contar* + *-dor*, "quem conta". *Contar* vem do latim *computāre*, "calcular, fazer as contas", e por isso *contador* e **computador** são primos: os dois são "o que faz as contas".

Fontes: Wiktionary: [contador](https://en.wiktionary.org/wiki/contador), [contar](https://en.wiktionary.org/wiki/contar), [computador](https://en.wiktionary.org/wiki/computador)
