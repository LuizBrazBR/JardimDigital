---
title: Iterável (iterable)
---

> [!abstract] Definição
> **Um valor feito de elementos em sequência, que dá para [[glossario/percorrer|percorrer]] um por um.** É o que o [[glossario/para-cada|para cada]] (`for...of`) aceita.

```js
for (let c of "123") {   // texto: iterável
  console.log(c);        // 1, 2, 3
}

for (let c of 123) {     // número: não é iterável
  console.log(c);        // TypeError: 123 is not iterable
}
```

Dos tipos vistos até aqui, são iteráveis o [[glossario/array|array]], que entrega cada elemento, e o texto, a [[glossario/string|string]], que entrega cada caractere, inclusive os espaços e as vírgulas. Número, booleano e `undefined` não são. Os objetos, assunto da aula 6.4, também não.

Um número é um valor só: o `123` não é uma lista com o 1, o 2 e o 3. Já o texto `"123"` é uma sequência de três caracteres.

Ser iterável não é o mesmo que ter elementos. O array vazio e o texto vazio são iteráveis: o `for...of` só não dá nenhuma volta. A mensagem "is not iterable" costuma aparecer quando chega ao laço um `undefined` no lugar do array, como quando falta o [[glossario/argumento|argumento]] de uma função.

Por dentro, todo valor iterável traz um método especial que entrega os elementos um por um, e é esse método que o `for...of` usa.

Ver a aula [[programacao/logica-de-programacao/modulo-6/03-percorrendo-arrays-for-e-for-of|Percorrendo arrays: for e for...of]].

## De onde vem a palavra

*Iterar* mais o final *-vel*. *Iterar* vem do latim *iterāre*, "repetir", de *iterum*, "de novo", como no verbete [[glossario/iteracao|iteração]]. O final *-ável* veio do latim *-ābilis*, "que pode ser", e é o mesmo de "lavável" e "cantável". Iterável é o que pode ser iterado.

O inglês *iterable* foi formado do mesmo jeito, com o *-able* que corresponde ao nosso *-ável*.

Fontes: MDN: [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) · Wiktionary: [-ável](https://en.wiktionary.org/wiki/-%C3%A1vel), [iterō](https://en.wiktionary.org/wiki/itero)
