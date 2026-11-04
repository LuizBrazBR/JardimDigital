---
title: Espalhamento (spread)
---

> [!abstract] Definição
> **Três pontos, `...`, escritos antes de um array numa chamada de função. Eles tiram os elementos de dentro do array e entregam cada um como um argumento separado.** O nome oficial, em inglês, é *spread syntax*, "sintaxe de espalhamento".

```js
const notas = [7, 3, 9];

console.log(Math.max(notas));    // NaN: um argumento só, a lista inteira
console.log(Math.max(...notas)); // 9, o mesmo que Math.max(7, 3, 9)
```

Serve para funções que esperam os valores **soltos**, um por argumento, como o `Math.max`. Uma função que espera a **lista inteira** num parâmetro só, como uma `contem(lista, procurado)`, recebe o array direto, sem pontos. A pergunta é sempre: o que a função espera?

Na chamada, o espalhamento só funciona com [[glossario/iteravel|iteráveis]], o que dá para percorrer com o `for...of`, como os arrays. Com um objeto, `Math.max(...{ a: 1 })` dá `TypeError`.

No dia a dia, muita gente diz "operador spread", ou só "spread". E os mesmos três pontos têm um uso parecido na aparência e contrário no efeito: nos **parâmetros** de uma função, como em `function somarTodos(...numeros)`, eles juntam os valores soltos numa lista. Esse é o *rest*, "o resto".

Ver a [[programacao/logica-de-programacao/modulo-7/02-algoritmos-em-arrays-buscar-contar-e-achar-o-maior|aula 7.2]].

## De onde vem a palavra

| Palavra | Origem |
|---|---|
| *espalhamento* | *espalhar* + *-mento* |
| *espalhar* | *es-* + *palha* + *-ar* |
| *palha* | do latim *palea*, "palha" |
| *spread* (inglês) | do inglês antigo *sprǣdan*, "espalhar, expandir" |

O *espalhar* português foi feito a partir da **palha**. O *spread* inglês vem de uma raiz indo-europeia que queria dizer "espalhar, semear, salpicar". No código, o que se espalha são os elementos do array, que saem da lista e se distribuem pela chamada, um em cada argumento.

Fontes: MDN: [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), [Sintaxe de Espalhamento](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_syntax), [Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) · Wiktionary: [spread](https://en.wiktionary.org/wiki/spread), [espalhar](https://en.wiktionary.org/wiki/espalhar), [palha](https://en.wiktionary.org/wiki/palha)
