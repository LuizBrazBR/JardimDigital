---
title: Elemento neutro
---

> [!abstract] Definição
> **O valor que, numa operação, não muda o outro valor.** Na soma, é o 0: 7 + 0 dá 7. Na multiplicação, é o 1: 7 × 1 dá 7.

| Operação | Elemento neutro | Exemplo |
|---|---|---|
| somar | `0` | 7 + 0 = 7 |
| multiplicar | `1` | 7 × 1 = 7 |
| juntar texto | `""` | `"abc" + ""` dá `"abc"` |

Na programação, é o valor inicial de um [[glossario/acumulador|acumulador]]: como ele não muda nada, a conta começa sem nada "de fora" dentro dela. Um produto que começa em 0, em vez de 1, termina sempre em 0.

```js
let produto = 1; // o neutro da multiplicação

for (let i = 1; i <= 5; i++) {
  produto = produto * i;
}

console.log(produto); // 120
```

Ver a aula [[programacao/logica-de-programacao/modulo-4/04-contador-e-acumulador-somando-e-contando|Contador e acumulador: somando e contando]].

## De onde vem a palavra

*Neutro* vem do latim *neuter*, de *ne* ("não") + *uter* ("um ou outro"): **nem um, nem outro**. É o que não toma partido, como um país neutro numa guerra. O elemento neutro não puxa a conta para lado nenhum.

Fontes: Wiktionary: [neuter](https://en.wiktionary.org/wiki/neuter)
