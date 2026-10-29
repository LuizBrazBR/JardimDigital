---
title: Declaração
---

> [!abstract] Definição
> **A instrução que cria uma variável.** Em JavaScript, começa com `let` ou `const`.

Declarar e [[glossario/atribuicao|atribuir]] são coisas diferentes, que muitas vezes acontecem na mesma linha:

```js
let idade;      // declaração: o nome passa a existir, vazio (undefined)
idade = 20;     // atribuição: o nome recebe um valor
let peso = 70;  // as duas juntas
```

Usar um nome que nunca foi declarado dá `ReferenceError: ... is not defined`. Declarar o mesmo nome duas vezes, com `let` ou `const`, dá `SyntaxError: Identifier '...' has already been declared`.

## De onde vem a palavra

Do latim *dēclārāre*: *dē-* + *clārāre*, "tornar claro", de *clārus*, "claro, brilhante". Declarar é **deixar claro**, anunciar. Declarar uma variável é anunciar ao JavaScript: "este nome existe".

Da mesma família: **claro**, **clarear**, **esclarecer**.

Fontes: Wiktionary: [dēclārō](https://en.wiktionary.org/wiki/declaro)
