---
title: Ordenação
---

> [!abstract] Definição
> **Mudar os elementos de uma lista de lugar até eles seguirem um critério.** Do menor para o maior é a ordem **crescente**. Do maior para o menor, a ordem **decrescente**. Com textos, a ordem alfabética.

Em JavaScript, o jeito pronto é o método `sort()`. Com números, ele precisa de uma [[glossario/funcao-de-comparacao|função de comparação]], porque, sem ela, compara os itens como texto:

```js
const notas = [10, 7, 4];

console.log(notas.sort());               // [10, 4, 7]: comparou como texto
console.log(notas.sort((a, b) => a - b)); // [4, 7, 10]
```

A **ordenação por seleção** (*selection sort*) é o jeito mais fácil de entender. Ela resolve um lugar de cada vez: acha o menor do trecho que ainda falta arrumar, troca esse menor com o primeiro do trecho, e repete com o resto, até sobrar um item só. É simples, mas faz muitas comparações: são 45 numa lista de 10 itens, e quase meio milhão numa de 1.000. Por isso, no dia a dia, usa-se o `sort()`.

Ver a [[programacao/logica-de-programacao/modulo-7/03-colocando-em-ordem-a-ideia-de-ordenacao|aula 7.3]].

## De onde vem a palavra

| Palavra | Origem |
|---|---|
| *ordenação* | *ordenar* + *-ção* |
| *ordenar* | do latim *ōrdināre*, "pôr em ordem, arrumar" |
| *ōrdō* (latim) | "fileira, linha, série", e também "posto, classe" |
| *seleção* | do latim *sēlēctiō*, "escolha", de *sēligō*, "separar escolhendo" |
| *sēligō* (latim) | *sē-*, "à parte", + *legō*, "juntar, escolher, ler" |
| *crescente* | do latim *crēscentem*, "que cresce", de *crēscō*, "crescer" |

O *ōrdō* latino era uma fileira, inclusive uma fileira de soldados. Ordenar é, na origem, **pôr em fila**. A origem do próprio *ōrdō* é incerta.

Selecionar é **escolher e pôr à parte**, que é o que cada passo da ordenação por seleção faz com o menor. O *legō* está também no nosso **ler**, em **eleger** e em **coleção**. E o *crēscentem* latino deu, no francês, o *croissant*, o pão com forma de lua crescente.

Fontes: MDN: [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) · Wikipedia: [Selection sort](https://en.wikipedia.org/wiki/Selection_sort) · Wiktionary: [ordenar](https://en.wiktionary.org/wiki/ordenar), [ōrdinō](https://en.wiktionary.org/wiki/ordino), [ōrdō](https://en.wiktionary.org/wiki/ordo), [seleção](https://en.wiktionary.org/wiki/sele%C3%A7%C3%A3o), [sēlēctiō](https://en.wiktionary.org/wiki/selectio), [sēligō](https://en.wiktionary.org/wiki/seligo), [crescente](https://en.wiktionary.org/wiki/crescente), [crēscō](https://en.wiktionary.org/wiki/cresco)
