---
title: Índice (index)
---

> [!abstract] Definição
> **O número que diz a posição de um elemento num [[glossario/array|array]].** Em JavaScript, como na maior parte das linguagens, ele começa no **0**: o 1º elemento tem índice 0, o 2º tem índice 1.

```js
let frutas = ["maçã", "banana", "uva"];
//              0         1        2

console.log(frutas[1]);                 // banana
console.log(frutas[frutas.length - 1]); // uva, o último
```

O índice diz quantos passos o elemento está depois do começo do array, como o número do andar diz quantos andares se sobe a partir do térreo. Por isso ele é sempre um a menos que a posição falada, e o último índice é o tamanho menos um: `length - 1`. Usar o `length` sem o `- 1` pede uma posição que não existe, e o JavaScript devolve `undefined`.

Entre os colchetes pode ir um número, uma variável ou uma conta: `frutas[i]`, `frutas[i + 1]`. É assim que um [[glossario/laco|laço]] passa pelo array inteiro, trocando o índice a cada volta.

Ver a aula [[programacao/logica-de-programacao/modulo-6/01-arrays-guardando-uma-lista-de-valores|Arrays: guardando uma lista de valores]].

## De onde vem a palavra

Do latim *index*, "o que aponta, indicador", de *in-* + *dīcō*, "dizer, indicar". O *index* era também o **dedo indicador**, o que aponta, e o **delator**, quem aponta o culpado. Já no latim, a palavra servia ainda para a lista de um livro, de onde vem o índice dos livros. Num array, o índice aponta uma posição, como um dedo.

> [!example] Parentes da palavra
> - **Indicar**, **indicador**: do latim *indicāre*, "apontar, mostrar".
> - **Dizer**: do mesmo *dīcō*.
> - **Juiz**: do latim *iūdex*, de *iūs*, "direito", + a raiz de *dīcere*. O juiz é quem diz o direito.

Fontes: MDN: [Indexed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections) · Wiktionary: [index](https://en.wiktionary.org/wiki/index), [índice](https://en.wiktionary.org/wiki/%C3%ADndice), [iūdex](https://en.wiktionary.org/wiki/iudex)
