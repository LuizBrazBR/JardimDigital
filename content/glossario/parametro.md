---
title: Parâmetro (parameter)
---

> [!abstract] Definição
> **O nome de uma entrada da [[glossario/funcao|função]], escrito entre os parênteses da definição.** Dentro do corpo, funciona como uma variável, e o valor dela chega a cada [[glossario/chamada|chamada]], no [[glossario/argumento|argumento]].

```js
function saudar(nome) {        // nome é o parâmetro
  console.log("Bom dia, " + nome + "!");
}

saudar("Ana");    // Bom dia, Ana!
saudar("Carlos"); // Bom dia, Carlos!
```

Quando a função é escrita, ainda não se sabe quanto o parâmetro vale. Na chamada `saudar("Ana")`, é como se o corpo começasse com `let nome = "Ana";`. Cada chamada começa do zero, com o seu próprio valor.

Uma função pode ter vários parâmetros, separados por vírgula: `function somar(a, b)`. Os argumentos entram pela ordem, o primeiro no primeiro parâmetro, o segundo no segundo. Se faltar argumento, o parâmetro vale `undefined`. Com um `=` na definição, dá para escolher um valor padrão para esse caso: `function saudar(nome = "visitante")`.

O parâmetro só existe dentro da função. Fora dela, o nome não significa nada.

No dia a dia, muita gente diz "passar um parâmetro" querendo dizer argumento. O termo exato é: o parâmetro fica na definição, e o argumento vem na chamada.

Ver a aula [[programacao/logica-de-programacao/modulo-5/02-parametros-e-argumentos-entradas-da-funcao|Parâmetros e argumentos: entradas da função]].

## De onde vem a palavra

Pelo francês *paramètre*, do latim moderno *parametrum*, formado com o grego *para-*, "ao lado", e *métron*, "medida". Uma **medida ao lado**.

Na matemática, o parâmetro é um valor que fica fixo durante uma conta, mas pode ser trocado de uma conta para outra. Na função, é igual: durante uma chamada, o `nome` vale `"Ana"`; na próxima, pode valer outra coisa.

O *métron* está também em **metro**, **métrica**, **geometria** e **termômetro**.

Fontes: MDN: [Parameter](https://developer.mozilla.org/en-US/docs/Glossary/Parameter) · Wiktionary: [parameter](https://en.wiktionary.org/wiki/parameter), [μέτρον](https://en.wiktionary.org/wiki/%CE%BC%CE%AD%CF%84%CF%81%CE%BF%CE%BD), [παρά](https://en.wiktionary.org/wiki/%CF%80%CE%B1%CF%81%CE%AC)
