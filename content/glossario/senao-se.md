---
title: Senão se (else if)
---

> [!abstract] Definição
> **Uma condição a mais, testada só quando as de cima deram falso.** Em JavaScript, se escreve `else if` ("senão, se"), entre o `if` e o `else`. Com vários deles, a [[glossario/condicional|condicional]] ganha quantos caminhos forem necessários.

```js
if (temperatura >= 30) {
  console.log("Calor");
} else if (temperatura >= 20) {
  console.log("Agradável");
} else {
  console.log("Frio");
}
```

O JavaScript testa as condições de cima para baixo e para na primeira que der `true`. As de baixo nem são testadas. Por isso, a ordem muda a resposta: com `>=`, as perguntas vão do valor maior para o menor.

O `else if` não é uma palavra nova. É um `if` **aninhado**, posto dentro de um [[glossario/senao|senão]] (`else`), só que sem as chaves. O JavaScript não obriga as chaves quando há uma instrução só, e o `if` seguinte, com tudo o que vem com ele, é essa instrução. Não existe `elseif`, tudo junto. No Python, a mesma ideia se escreve `elif`.

Ver a aula [[programacao/logica-de-programacao/modulo-3/03-else-if-varias-condicoes-em-cadeia|else if: várias condições em cadeia]].

## De onde vem a palavra

*Encadear* é pôr em **cadeia**, que vem do latim *catēna*, "corrente". As condições do `else if` são elos: cada uma se liga à de antes, e só é testada se a de antes falhou.

> [!example] Parentes da palavra
> - **Concatenar**: do latim *concatēnāre*, *con-* ("com") + *catēnāre* ("acorrentar"). Na programação, é juntar textos. Ver [[glossario/string|string]].
> - **Chain**: "corrente" em inglês, do francês antigo *chaeine*, que vem da mesma *catēna*.

Fontes: MDN: [if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) · Python: [Tutorial, if Statements](https://docs.python.org/3/tutorial/controlflow.html#if-statements) · Wiktionary: [cadeia](https://en.wiktionary.org/wiki/cadeia), [concatenate](https://en.wiktionary.org/wiki/concatenate), [chain](https://en.wiktionary.org/wiki/chain)
