---
title: Percorrer (iterate)
---

> [!abstract] Definição
> **Passar por todos os elementos de um [[glossario/array|array]], um de cada vez, fazendo alguma coisa com cada um.** Também se diz [[glossario/iteracao|iterar]].

```js
let precos = [10, 25, 8, 40];

let total = 0;
for (let preco of precos) {   // percorre o array: uma volta para cada preço
  total = total + preco;
}
console.log(total); // 83
```

É como o caixa do supermercado, que passa os produtos no leitor um por um, seja o carrinho de 3 ou de 30. Percorrer serve para somar, contar, conferir, mostrar cada elemento de um jeito ou separar alguns num array novo.

O `console.log(precos)` só mostra o array para a pessoa ler, e o programa não consegue usar o que foi mostrado. Já `precos[0] + precos[1] + ...`, escrito à mão, só serve para um tamanho fixo. O [[glossario/laco|laço]] pergunta o tamanho na hora e dá uma volta para cada elemento que existir.

Em JavaScript, há dois jeitos de percorrer: o [[glossario/para|for]] pelo índice, `for (let i = 0; i < precos.length; i++)`, e o [[glossario/para-cada|para cada]], `for (let preco of precos)`.

Ver a aula [[programacao/logica-de-programacao/modulo-6/03-percorrendo-arrays-for-e-for-of|Percorrendo arrays: for e for...of]].

## De onde vem a palavra

Do latim *percurrere*, formado por *per-*, "através, ao longo", e *currere*, "correr". Percorrer é correr de um lado ao outro, passando por tudo o que está no caminho.

Do mesmo *percurrere* vem o francês *parcourir*, "percorrer", e dele o **parkour**, o esporte de atravessar a cidade correndo e saltando os obstáculos. E o latim *currere* é primo distante do inglês *horse*, "cavalo", o bicho que corre.

Fontes: MDN: [Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) · Wiktionary: [percorrer](https://en.wiktionary.org/wiki/percorrer), [percurrō](https://en.wiktionary.org/wiki/percurro), [currō](https://en.wiktionary.org/wiki/curro)
