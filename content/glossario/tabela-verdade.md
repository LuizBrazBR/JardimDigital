---
title: Tabela-verdade
---

> [!abstract] Definição
> **Uma tabela que lista todas as combinações possíveis de verdadeiro e falso e o resultado de cada uma.** Serve para ver de uma vez como funciona um operador lógico, ou para conferir uma regra inteira.

A do `&&` (e) e do `||` (ou), com dois valores:

| A | B | `A && B` | `A \|\| B` |
|---|---|---|---|
| `true` | `true` | `true` | `true` |
| `true` | `false` | `false` | `true` |
| `false` | `true` | `false` | `true` |
| `false` | `false` | `false` | `false` |

Com dois valores, são 4 linhas. Cada valor novo dobra a tabela: com três, são 8 linhas, e com quatro, 16. Em JavaScript, `2 ** n`.

Ver a aula [[programacao/logica-de-programacao/09-operadores-logicos|Operadores lógicos: e, ou, não]].

## De onde vem a ideia

O lógico americano Charles Sanders Peirce desenhou uma tabela assim já em 1883. Mas quem costuma levar o crédito é o filósofo austríaco Ludwig Wittgenstein, que popularizou as tabelas-verdade num livro de 1921, o *Tractatus Logico-Philosophicus*. No mesmo ano, o matemático Emil Post chegou à mesma ideia por conta própria.

## De onde vem a palavra

*Verdade* vem do latim *vēritās*, de *vērus*, "verdadeiro".

> [!example] Parentes da palavra
> - **Verificar**: do latim medieval *vērificāre*, "tornar verdadeiro", de *vērus* + *facere*, "fazer". Verificar é conferir se algo é verdade.
> - **Veredicto**: "dito verdadeiro", a decisão final de um júri.

Fontes: Wikipedia: [Truth table](https://en.wikipedia.org/wiki/Truth_table) · Wiktionary: [verdade](https://pt.wiktionary.org/wiki/verdade), [verify](https://en.wiktionary.org/wiki/verify), [verdict](https://en.wiktionary.org/wiki/verdict)
