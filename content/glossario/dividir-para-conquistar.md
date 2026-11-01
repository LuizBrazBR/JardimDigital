---
title: Dividir para conquistar
---

> [!abstract] Definição
> **Resolver um problema grande quebrando-o em problemas menores, resolvendo cada um e juntando as soluções.** É a [[glossario/decomposicao|decomposição]] aplicada ao código: cada parte vira uma [[glossario/funcao|função]], e uma função pode chamar outra.

```js
function maiorDeDois(a, b) {
  if (a > b) {
    return a;
  }
  return b;
}

function maiorDeTres(a, b, c) {
  return maiorDeDois(maiorDeDois(a, b), c); // o problema de três vira dois problemas de dois
}
```

Muitas vezes, o problema novo vira um problema que já se sabe resolver, usado mais de uma vez. O maior de três é o maior de dois, duas vezes.

Funções pequenas, com um bom nome e uma tarefa só, são mais fáceis de ler, de testar e de reaproveitar. Junto com o [[glossario/dry|DRY]], é uma das razões principais para usar funções.

Ver a aula [[programacao/logica-de-programacao/modulo-5/05-dividir-para-conquistar-funcoes-que-usam-funcoes|Dividir para conquistar: funções que usam funções]].

## De onde vem a expressão

Do latim *dīvide et imperā*, ao pé da letra "divide e governa". Começou como conselho de política e de guerra: separar os inimigos para dominá-los um de cada vez. A tradição atribui a frase a Filipe II da Macedônia, pai de Alexandre, o Grande.

Na computação, virou o nome de um jeito de montar algoritmos. Um dos primeiros feitos para computador, de 1945, é atribuído a John von Neumann: um método de pôr uma lista em ordem dividindo-a em metades, o *merge sort*.

*Dividir* vem do latim *dīvidere*, "separar, repartir", de *dis-* ("em dois") + uma raiz que quer dizer "separar". *Conquistar* vem, possivelmente, de *conquīrere*, "ir em busca, juntar", de *con-* + *quaerere*, "buscar", que deu também o nosso **querer**.

Fontes: Wikipedia: [Divide and conquer](https://en.wikipedia.org/wiki/Divide_and_conquer), [Divide-and-conquer algorithm](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm) · Wiktionary: [divide and conquer](https://en.wiktionary.org/wiki/divide_and_conquer), [dīvide et imperā](https://en.wiktionary.org/wiki/divide_et_impera), [dīvidō](https://en.wiktionary.org/wiki/divido), [conquistar](https://en.wiktionary.org/wiki/conquistar), [conquīrō](https://en.wiktionary.org/wiki/conquiro), [quaerō](https://en.wiktionary.org/wiki/quaero)
