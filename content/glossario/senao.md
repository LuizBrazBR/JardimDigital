---
title: Senão (else)
---

> [!abstract] Definição
> **O caminho que uma [[glossario/condicional|condicional]] segue quando a condição dá falso.** Em JavaScript, se escreve `else` ("senão"), logo depois do [[glossario/bloco|bloco]] do `if`.

```js
if (saldo >= preco) {
  console.log("Compra aprovada!");
} else {
  console.log("Saldo insuficiente");
}
```

Com `if` e `else` juntos, roda sempre exatamente um dos dois blocos: o do `if` quando a condição dá `true`, e o do `else` quando dá `false`. O `else` não tem condição própria, porque quer dizer "em qualquer outro caso". E é opcional: sem ele, quando a condição dá `false`, o programa só segue em frente.

Depois do `else`, pode vir outro `if`. É o [[glossario/senao-se|senão se]] (`else if`), que encadeia quantas condições forem necessárias.

Ver a aula [[programacao/logica-de-programacao/modulo-3/02-if-else-o-outro-caminho|if/else: o outro caminho]].

## De onde vêm as palavras

### Senão

*Se* + *não*. O nome em português já explica o que o `else` faz: o bloco que roda **se não** for verdade o que o `if` perguntou.

### else

Do inglês antigo *elles*, e antes do protogermânico *\*aljas*, "de outro, de outra coisa", forma de *\*aljaz*, "outro". Ao pé da letra, o `else` é **o do outro**: o outro caminho.

A raiz indo-europeia é *\*h₂élyos*, "outro", que deu também o latim *alius* e o grego *állos*, os dois com o mesmo sentido.

> [!example] Parentes da palavra
> - Do latim *alius*: **alheio** (de *aliēnus*, "que pertence a outro") e **aliás** (de *aliās*, "em outro momento, de outro modo").
> - Do latim *alter*, "o outro" (de dois), com o mesmo *al-*: **outro** e, pelo latim medieval *alternātīvus*, **alternativa**.
> - Do grego *állos*: **alegoria** (falar de uma coisa querendo dizer outra) e **alergia** (palavra criada em 1906 por Clemens von Pirquet, com *érgon*, "ação": uma reação de outro jeito).

Fontes: Wiktionary: [else](https://en.wiktionary.org/wiki/else), [senão](https://pt.wiktionary.org/wiki/sen%C3%A3o), [alius](https://en.wiktionary.org/wiki/alius), [alheio](https://pt.wiktionary.org/wiki/alheio), [aliás](https://pt.wiktionary.org/wiki/ali%C3%A1s), [alter](https://en.wiktionary.org/wiki/alter), [outro](https://pt.wiktionary.org/wiki/outro), [alternative](https://en.wiktionary.org/wiki/alternative), [allegory](https://en.wiktionary.org/wiki/allegory), [allergy](https://en.wiktionary.org/wiki/allergy) · MDN: [if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
