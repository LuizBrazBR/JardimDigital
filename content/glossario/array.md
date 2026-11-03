---
title: Array (lista, vetor)
---

> [!abstract] Definição
> **Um valor só que guarda vários outros, um depois do outro, numa ordem.** Por ser um valor só, cabe numa variável só. Cada valor é um **elemento**, e cada elemento tem um [[glossario/indice|índice]], o número da sua posição, que começa no 0.

```js
let frutas = ["maçã", "banana", "uva"];

console.log(frutas[0]);     // maçã: o 1º elemento tem índice 0
console.log(frutas.length); // 3: quantos elementos o array tem
frutas[1] = "pera";         // troca o elemento de índice 1
console.log(frutas[10]);    // undefined: esse índice não existe
```

Um array se cria com colchetes e vírgulas. Os mesmos colchetes, colados no nome, pegam um elemento: `frutas[1]`. O `length`, sem parênteses, diz quantos elementos o array tem, e por isso o último índice é sempre `length - 1`. Pedir um índice que não existe não dá erro em JavaScript: devolve `undefined`.

O tamanho não é fixo: com o programa rodando, o array ganha e perde elementos pelos seus [[glossario/metodo|métodos]]. O `push` põe no fim, o `pop` tira do fim, o `unshift` põe no começo e o `shift` tira do começo.

Em português, também se diz **lista** ou **vetor**. No Python, o nome é *list*, e o tamanho se pede com `len(frutas)`.

Ver as aulas [[programacao/logica-de-programacao/modulo-6/01-arrays-guardando-uma-lista-de-valores|Arrays: guardando uma lista de valores]] e [[programacao/logica-de-programacao/modulo-6/02-mexendo-no-array-adicionar-remover-e-o-tamanho|Mexendo no array: adicionar, remover e o tamanho]].

## De onde vem a palavra

Do inglês médio *arrayen*, "pôr em ordem", que veio do anglo-normando *arraier* e, antes, do latim vulgar *arrēdō*, "arrumar, pôr em ordem". A raiz mais funda é germânica e queria dizer "pronto, preparado". Por isso, *array* e o inglês *ready*, "pronto", vêm da mesma palavra, que chegou ao inglês por dois caminhos.

Em inglês, *array* também é a tropa em formação: *battle array* é a "ordem de batalha", os soldados alinhados em fileiras. Um array é uma fila de valores, cada um no seu lugar.

> [!example] Os outros nomes
> - **Vetor**: do latim *vector*, "o que carrega, transportador", de *vehō*, "carregar, transportar", o mesmo de *vehiculum*, o **veículo**. Na matemática, um vetor pode ser escrito como uma lista de números em ordem, e o nome chegou daí à programação.
> - **Lista**: do italiano *lista*, de uma palavra germânica que queria dizer "faixa, tira, borda". No francês antigo, *liste* era a borda, a tira de papel e também a lista escrita nela. A **listra** é uma variante da mesma palavra.

Fontes: MDN: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) · Wiktionary: [array](https://en.wiktionary.org/wiki/array), [vector](https://en.wiktionary.org/wiki/vector), [vehō](https://en.wiktionary.org/wiki/veho), [lista](https://en.wiktionary.org/wiki/lista), [list](https://en.wiktionary.org/wiki/list), [listra](https://en.wiktionary.org/wiki/listra)
