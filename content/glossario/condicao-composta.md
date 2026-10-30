---
title: Condição composta
---

> [!abstract] Definição
> **Uma condição feita de várias perguntas, juntadas com `&&` (e) e `||` (ou), ou invertidas com `!` (não).** Vai nos parênteses de um `if` como qualquer outra [[glossario/condicional|condição]], porque o resultado também é `true` ou `false`.

```js
if (altura >= 140 && idade >= 10) {
  console.log("Pode ir na montanha-russa");
}
```

Com `&&`, o bloco só roda se todas as perguntas derem `true`. Com `||`, basta uma. Os operadores são os da [[glossario/tabela-verdade|tabela-verdade]].

Cuidados:

- Cada lado do `&&` e do `||` precisa ser uma pergunta completa. `idade >= 18 && <= 60` dá erro. `18 <= idade <= 60` não dá erro, mas está sempre certo, para qualquer idade. O certo é `idade >= 18 && idade <= 60`.
- O `&&` é resolvido antes do `||`. Misturando os dois, use parênteses: `(ehEstudante || ehIdoso) && temDocumento`.
- O `else` de um `if` com `&&` recebe quem falhou em pelo menos uma pergunta: o contrário de um "e" é um "ou".

Ver a aula [[programacao/logica-de-programacao/modulo-3/04-condicoes-compostas-e-ou-nao|Condições compostas com e, ou, não]].

## De onde vem a palavra

*Composto* vem do latim *compostus*, forma encurtada de *compositus*, o particípio de *compōnere*:

| Parte | Latim | Sentido |
|---|---|---|
| *com-* | *con-* | junto |
| *-posto* | *pōnere* | pôr |

*Compōnere* queria dizer arrumar, montar, compor. Uma condição composta é uma condição **posta junto**, montada com várias perguntas. Em português, *composto* é o particípio de **compor**.

Fontes: Wiktionary: [composto](https://en.wiktionary.org/wiki/composto), [compono](https://en.wiktionary.org/wiki/compono) · MDN: [Logical AND (&&)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND), [Logical OR (\|\|)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR)
