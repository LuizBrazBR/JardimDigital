---
title: Continuar (continue)
---

> [!abstract] Definição
> **Um comando que pula o resto da volta atual de um [[glossario/laco|laço]] e vai direto para a próxima.** Em JavaScript, se escreve `continue`. O laço não acaba: só aquela volta é abandonada.

```js
for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0) {
    continue;      // pula o 3, o 6 e o 9
  }
  console.log(i);  // 1, 2, 4, 5, 7, 8 e 10
}
```

No [[glossario/para|for]], depois do `continue`, o [[glossario/incremento|incremento]] ainda roda, porque fica nos parênteses. No [[glossario/enquanto|while]], a mudança da variável fica dentro das chaves, e um `continue` que venha antes dela pula a mudança: o resultado é um [[glossario/laco-infinito|laço infinito]]. Por isso, no `while`, a variável deve mudar antes de qualquer `continue`.

Num [[glossario/laco-aninhado|laço aninhado]], o `continue` só vale para o laço mais de dentro em que está. Para encerrar o laço inteiro, existe o [[glossario/interromper|break]].

Ver a aula [[programacao/logica-de-programacao/modulo-4/05-break-continue-e-lacos-aninhados|break, continue e laços aninhados]].

## De onde vem a palavra

Do latim *continuāre*, "juntar, seguir sem interrupção", de *continuus*, "contínuo". Por trás está *continēre*, "manter junto, conter", de *con-* ("junto") + *tenēre* ("segurar"). O inglês *continue* veio do latim pelo francês antigo *continuer*.

Parece estranho que o comando que **pula** se chame "continue". Mas o nome fala do laço, e não da volta: a volta é abandonada, e o laço **continua**.

Fontes: MDN: [continue](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue) · Wiktionary: [continue](https://en.wiktionary.org/wiki/continue), [continuō](https://en.wiktionary.org/wiki/continuo), [continuus](https://en.wiktionary.org/wiki/continuus), [contineō](https://en.wiktionary.org/wiki/contineo)
