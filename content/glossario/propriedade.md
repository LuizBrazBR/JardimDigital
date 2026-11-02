---
title: Propriedade (property)
---

> [!abstract] Definição
> **Uma informação guardada dentro de um valor, que se lê com um ponto e sem parênteses.** O `length` de um array é uma propriedade: `compras.length` vale o número de elementos.

```js
let compras = ["arroz", "feijão"];

console.log(compras.length);   // propriedade: é só ler. Mostra 2
compras.push("café");          // método: uma ação, vai com parênteses
console.log(compras.length);   // 3
```

O ponto quer dizer "de dentro de", como no [[glossario/metodo|método]]. A diferença está no que vem depois dele. A propriedade é uma informação que o valor já carrega, e basta lê-la. O método é uma ação, uma [[glossario/funcao|função]] que só trabalha quando é chamada com os parênteses.

Com parênteses numa propriedade, o JavaScript tenta chamá-la como se fosse uma função, e dá erro: `compras.length()` dá `TypeError: compras.length is not a function`.

> [!info]- Um detalhe técnico (clique para abrir)
> A rigor, o JavaScript chama de propriedade tudo o que vem depois do ponto, e um método é uma propriedade que guarda uma função. No dia a dia, porém, "propriedade" costuma querer dizer a informação, como o `length`, e "método", a ação, como o `push`.

Ver as aulas [[programacao/logica-de-programacao/modulo-6/01-arrays-guardando-uma-lista-de-valores|Arrays: guardando uma lista de valores]] e [[programacao/logica-de-programacao/modulo-6/02-mexendo-no-array-adicionar-remover-e-o-tamanho|Mexendo no array: adicionar, remover e o tamanho]].

## De onde vem a palavra

Do latim *proprietās*, formado por *proprius*, "próprio, de si mesmo", e o final *-tās*, que faz de um adjetivo um substantivo e que no português virou "-dade". *Proprietās* queria dizer tanto "qualidade, característica, jeito próprio" quanto "o que pertence a alguém".

O português guardou os dois sentidos. Uma fazenda é a propriedade de alguém, e ser transparente é uma propriedade do vidro. Na programação, vale o segundo: o `length` é uma característica própria de cada array. O inglês *property* veio do mesmo *proprietās*, pelo francês antigo, e também tem os dois sentidos.

Do mesmo *proprius* vem o nosso **próprio**.

Fontes: MDN: [Property (JavaScript)](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript), [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) · Wiktionary: [propriedade](https://en.wiktionary.org/wiki/propriedade), [proprietas](https://en.wiktionary.org/wiki/proprietas), [proprius](https://en.wiktionary.org/wiki/proprius), [property](https://en.wiktionary.org/wiki/property)
