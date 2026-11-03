---
title: Matriz (matrix)
---

> [!abstract] Definição
> **Um [[glossario/array|array]] em que cada elemento é outro array, formando uma tabela de linhas e colunas.** Também se diz array de duas dimensões, ou bidimensional.

```js
let notas = [
  [7, 8, 6],  // linha 0
  [9, 6, 9],  // linha 1
  [10, 8, 9]  // linha 2
];

console.log(notas[1]);    // [ 9, 6, 9 ]: a linha 1
console.log(notas[1][2]); // 9: linha 1, coluna 2
```

Lê-se com dois pares de colchetes: o primeiro escolhe a linha, que é um array, e o segundo escolhe a posição dentro dela. O `notas.length` dá o número de linhas, e o `notas[0].length` dá o tamanho da linha 0. Para percorrer todos os elementos, usa-se um [[glossario/laco-aninhado|laço aninhado]]: um laço para as linhas e outro, dentro dele, para as colunas.

A matriz serve para grades de valores do mesmo tipo, em que a posição é o que importa, como um tabuleiro ou os assentos de um cinema. Quando cada coluna é uma informação diferente, que merece um nome, o array de [[glossario/objeto|objetos]] costuma ser melhor.

O curso não trata de matrizes. Elas aparecem como extra na aula [[programacao/logica-de-programacao/modulo-6/05-array-de-objetos-uma-lista-de-registros|Array de objetos: uma lista de registros]].

## De onde vem a palavra

Do latim *mātrīx*, "ventre; fonte, origem", formado a partir de *māter*, "mãe". O nome matemático foi dado em 1850 pelo inglês James Joseph Sylvester. Ele via a matriz como a origem de onde nascem vários cálculos, e no ano seguinte escreveu sobre eles saindo "do ventre de uma mãe comum".

O mesmo sentido de origem está na **matriz** de uma empresa, a sede de onde saem as filiais.

Fontes: MDN: [Indexed collections: multi-dimensional arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#multi-dimensional_arrays) · Wikipedia: [Matrix (mathematics)](https://en.wikipedia.org/wiki/Matrix_(mathematics)) · Wiktionary: [matriz](https://en.wiktionary.org/wiki/matriz), [mātrīx](https://en.wiktionary.org/wiki/matrix)
