---
title: Precedência
---

> [!abstract] Definição
> **A regra que decide quais operações são feitas primeiro quando várias aparecem na mesma conta.** Em JavaScript, a ordem é a da escola: parênteses, depois potência (`**`), depois `*`, `/` e `%`, e por último `+` e `-`. Entre operadores do mesmo grupo, a conta anda da esquerda para a direita.

`2 + 3 * 4` dá `14`, e não `20`, porque a multiplicação tem precedência sobre a soma. Para mudar a ordem, parênteses: `(2 + 3) * 4` dá `20`.

Esquecer a precedência é a origem de um erro clássico, a média sem parênteses: `nota1 + nota2 / 2` divide só a segunda nota. Ver a aula [[programacao/logica-de-programacao/modulo-2/03-operadores-aritmeticos|Operadores aritméticos e o resto com %]].

## De onde vem a palavra

De *preceder*, do latim *praecēdere*:

| Parte | Latim | Sentido |
|---|---|---|
| *pre-* | *prae-* | antes, na frente |
| *-ceder* | *cēdere* | ir, andar |

Ter precedência é **ir na frente**. A multiplicação passa na frente da soma, como numa fila.

> [!example] Parentes da palavra
> O mesmo *cēdere* ("ir") aparece em muitas palavras, cada uma com um prefixo:
> - **[[glossario/processamento|Processo]]**: de *prōcēdere*, "ir para a frente".
> - **Sucesso**: de *succēdere*, "vir logo depois". Daí também *suceder*, "acontecer em seguida".
> - **Acesso**: de *accēdere*, "chegar perto".
> - **Excesso**: de *excēdere*, "ir além, passar do limite".
> - **Ceder**: o próprio *cēdere*, que também queria dizer "sair do caminho, dar a vez".

Fontes: Wiktionary: [praecēdō](https://en.wiktionary.org/wiki/praecedo), [cēdō](https://en.wiktionary.org/wiki/cedo), [success](https://en.wiktionary.org/wiki/success) · MDN: [Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)
