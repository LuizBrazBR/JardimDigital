---
title: Busca linear
---

> [!abstract] Definição
> **Procurar um valor numa lista olhando os elementos um por um, do primeiro ao último.** Também se chama busca sequencial.

Se achar, a busca pode parar na hora. Se chegar ao fim sem achar, a resposta é que o valor não está na lista. Dentro de uma [[glossario/funcao|função]], isso fica com um `return true` dentro do laço e um `return false` depois dele:

```js
function contem(lista, procurado) {
  for (const item of lista) {
    if (item === procurado) {
      return true;   // achou: para tudo
    }
  }
  return false;      // olhou todos e não achou
}
```

É a busca mais simples e funciona com qualquer lista, em ordem ou não. O preço é o trabalho: no pior caso, quando o valor é o último ou não está lá, ela compara com **todos** os elementos. Uma lista duas vezes maior pode pedir o dobro de comparações.

No JavaScript, o `includes` e o `indexOf` fazem uma busca linear pronta. Ver a [[programacao/logica-de-programacao/modulo-7/02-algoritmos-em-arrays-buscar-contar-e-achar-o-maior|aula 7.2]].

## De onde vem a palavra

| Palavra | Origem | Sentido |
|---|---|---|
| *busca* | de *buscar*, do galego-português antigo, de origem incerta | procurar |
| *linear* | do latim *līneāris*, de *līnea*, "linha", + *-āris* | com forma de linha |

A busca linear anda **em linha**: um elemento depois do outro, sem pular nenhum. A *līnea* latina era, antes de ser um traço, um fio de linho, como contou a [[programacao/logica-de-programacao/modulo-6/05-array-de-objetos-uma-lista-de-registros|aula 6.5]].

A origem de *buscar* é discutida. Uma hipótese liga a palavra a *bosque*. Outra, a uma raiz celta ligada a "ganho" e "vitória".

Fontes: Wikipedia: [Linear search](https://en.wikipedia.org/wiki/Linear_search) · Wiktionary: [buscar](https://en.wiktionary.org/wiki/buscar), [linear](https://en.wiktionary.org/wiki/linear), [līneāris](https://en.wiktionary.org/wiki/linearis)
