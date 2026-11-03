---
title: Máximo e mínimo
---

> [!abstract] Definição
> **O máximo é o maior valor de uma lista, e o mínimo é o menor.** Para achá-los, percorre-se a lista guardando o maior (ou o menor) até agora.

A receita: o primeiro elemento começa como campeão, e cada elemento que for maior toma o lugar dele. Para o mínimo, o sinal vira `<`.

```js
let maior = lista[0];          // o primeiro começa como campeão

for (const valor of lista) {
  if (valor > maior) {         // para o mínimo: valor < menor
    maior = valor;
  }
}
```

Comece com `lista[0]`, e não com `0`. Com `0`, uma lista só de negativos, como `[-5, -2, -8]`, dá 0 como máximo, um valor que nem está na lista, e sem aviso de erro. No mínimo é pior: com `0`, até `[7, 3, 9]` dá 0. Outro começo seguro é `-Infinity` para o máximo e `Infinity` para o mínimo.

No JavaScript, há o `Math.max(...lista)` e o `Math.min(...lista)`. No Python, `max(lista)` e `min(lista)`. Ver a [[programacao/logica-de-programacao/modulo-7/02-algoritmos-em-arrays-buscar-contar-e-achar-o-maior|aula 7.2]].

## De onde vêm as palavras

As duas são superlativos latinos, a forma de "o mais... de todos":

| | Normal | Comparativo | Superlativo |
|---|---|---|---|
| grande | *magnus* | *maior* | *maximus* |
| pequeno | *parvus* | *minor* | *minimus* |

- **Máximo**: de *maximus*, "o maior de todos". O comparativo *maior* tem a mesma forma do nosso **maior**.
- **Mínimo**: de *minimus*, "o menor de todos". O *parvus* vem de outra raiz, e por isso não se parece com *minor* e *minimus*. O português tem um caso parecido: **bom**, **melhor**, **ótimo**.

Fontes: Wiktionary: [máximo](https://en.wiktionary.org/wiki/m%C3%A1ximo), [maximus](https://en.wiktionary.org/wiki/maximus), [magnus](https://en.wiktionary.org/wiki/magnus), [mínimo](https://en.wiktionary.org/wiki/m%C3%ADnimo), [minimus](https://en.wiktionary.org/wiki/minimus)
