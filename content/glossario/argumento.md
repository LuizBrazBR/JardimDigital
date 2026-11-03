---
title: Argumento (argument)
---

> [!abstract] Definição
> **O valor que se entrega a uma [[glossario/funcao|função]] na hora da [[glossario/chamada|chamada]], entre os parênteses.** É a [[glossario/entrada|entrada]] da função. O argumento vai para o [[glossario/parametro|parâmetro]], o nome que espera por ele na definição.

```js
function saudar(nome) {
  console.log("Bom dia, " + nome + "!");
}

saudar("Ana");     // "Ana" é o argumento: Bom dia, Ana!
saudar("Mariana"); // outro argumento: Bom dia, Mariana!
```

O argumento pode ser um valor escrito ali mesmo, uma variável ou uma conta. Em todos os casos, o que entra na função é o **valor**: em `saudar(cliente)`, entra o que está guardado no `cliente`, e o nome da variável fica de fora.

Com vários argumentos, eles vão separados por vírgula e entram **pela ordem**: o primeiro no primeiro parâmetro, o segundo no segundo. O JavaScript não confere se a ordem faz sentido. Em `apresentar(30, "Ana")`, o `30` vai para o `nome`.

Se faltar argumento, o parâmetro vale `undefined`. Se sobrar, o que sobra é ignorado. Nenhum dos dois dá erro em JavaScript. No Python, os dois dão `TypeError`.

O `"oi"` de `console.log("oi")` também é um argumento.

Um [[glossario/array|array]] também pode ser argumento, e aí há um cuidado. Com um número, a função recebe só o valor, e mudar o parâmetro não mexe na variável de fora. Com um array, a função recebe **o mesmo array**, e não uma cópia: um `push` ou um `pop` lá dentro muda o array de quem chamou.

```js
function adicionarCafe(lista) {
  lista.push("café");
}

let compras = ["arroz"];
adicionarCafe(compras);
console.log(compras); // [ 'arroz', 'café' ]
```

Ver as aulas [[programacao/logica-de-programacao/modulo-1/05-seu-primeiro-codigo-console-log|Seu primeiro código: console.log]] e [[programacao/logica-de-programacao/modulo-5/02-parametros-e-argumentos-entradas-da-funcao|Parâmetros e argumentos: entradas da função]] e [[programacao/logica-de-programacao/modulo-6/03-percorrendo-arrays-for-e-for-of|Percorrendo arrays: for e for...of]].

## De onde vem a palavra

Do latim *argūmentum*, "prova, evidência", de *arguō*, "tornar claro, provar, mostrar", + *-mentum*. No português de todo dia, argumento é a razão que se dá para convencer alguém, e também o enredo de um filme.

Muitos estudiosos ligam o *arguō* à raiz indo-europeia *\*h₂erǵ-*, "branco, brilhante". Da mesma raiz vem *argentum*, "prata", que deu o nome da **Argentina**, a terra do Rio da Prata. Argumentar seria **fazer brilhar**, deixar claro. Outros estudiosos discordam e procuram a origem em outro lugar.

Na matemática e na astronomia, argumento é a quantidade da qual depende o cálculo de outra: o valor de onde a função parte. Daí o sentido na programação, o valor entregue à função.

Fontes: MDN: [Argument](https://developer.mozilla.org/en-US/docs/Glossary/Argument) · Wiktionary: [argumento](https://en.wiktionary.org/wiki/argumento), [argūmentum](https://en.wiktionary.org/wiki/argumentum), [arguō](https://en.wiktionary.org/wiki/arguo), [argentum](https://en.wiktionary.org/wiki/argentum), [Argentina](https://en.wiktionary.org/wiki/Argentina), [argument](https://en.wiktionary.org/wiki/argument)
