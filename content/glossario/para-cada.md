---
title: Para cada (for...of)
---

> [!abstract] Definição
> **Um [[glossario/laco|laço]] que passa por cada elemento de um [[glossario/array|array]] e entrega o valor dele numa variável, a cada volta.** Em JavaScript, se escreve `for (let fruta of frutas) { ... }` e se lê "para cada fruta de frutas".

```js
let frutas = ["maçã", "banana", "uva"];

for (let fruta of frutas) {
  console.log(fruta);
}
// maçã
// banana
// uva
```

Ao contrário do [[glossario/para|for]] pelo índice, ele não tem `i`, nem condição, nem passo. Começa no primeiro elemento, vai até o último e para sozinho. Por isso, não tem como errar o começo ou o fim, como no `<=` que dá uma volta a mais com `undefined`.

O que ele não tem é a posição. Para numerar os elementos, mudar o próprio array ou andar de trás para a frente, o `for` pelo índice continua sendo o caminho. Mudar a variável do laço não muda o array: ela recebe o valor do elemento, mas é uma variável separada.

O `for` é uma [[glossario/palavra-reservada|palavra reservada]], mas o `of` não: ele só tem sentido especial dentro dos parênteses do laço, e fora dali `let of = 5;` funciona. E o `for...of` não serve só para arrays: ele percorre qualquer valor [[glossario/iteravel|iterável]], como um texto, letra por letra. Com um número, dá `TypeError: 123 is not iterable`.

Cuidado com a troca de `of` por `in`. O `for (let fruta in frutas)` não dá erro, mas entrega as posições, `"0"`, `"1"` e `"2"`, e não as frutas. No Python, é o contrário: o laço equivalente se escreve `for fruta in frutas:`.

Ver a aula [[programacao/logica-de-programacao/modulo-6/03-percorrendo-arrays-for-e-for-of|Percorrendo arrays: for e for...of]].

## De onde vem a palavra

*Cada* vem do latim *cata*, "por, para cada", que o latim tomou emprestado do grego *katá*. É uma palavra grega que chegou ao português pelo latim.

O inglês *of*, "de", vem do inglês antigo *of*, "de, para fora de", que era a forma fraca, falada sem força, da palavra *æf*. A forma forte da mesma palavra virou o inglês **off**, "fora, desligado". Então *of* e *off* começaram como uma palavra só.

O *for* é o mesmo do verbete [[glossario/para|para]]. O `for...of` chegou ao JavaScript em 2015, na versão da linguagem chamada ES2015.

Fontes: MDN: [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) · Wiktionary: [cada](https://en.wiktionary.org/wiki/cada), [of](https://en.wiktionary.org/wiki/of)
