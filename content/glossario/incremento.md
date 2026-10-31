---
title: Incremento
---

> [!abstract] Definição
> **A mudança que faz a variável de controle de um [[glossario/laco|laço]] andar a cada volta.** No [[glossario/para|for]], é a terceira parte dos parênteses: em `for (let i = 1; i <= 5; i++)`, o incremento é `i++`.

| Escrita | O mesmo que | O que faz |
|---|---|---|
| `i++` | `i = i + 1` | soma 1 |
| `i--` | `i = i - 1` | tira 1 |
| `i += 2` | `i = i + 2` | soma 2 |

Quando a variável diminui, como com `i--`, também se fala em **decremento**.

O incremento precisa andar **na direção** que leva a condição a dar `false`. Com `i--` num laço com `i <= 5`, o `i` se afasta do fim em vez de chegar perto, e o resultado é um [[glossario/laco-infinito|laço infinito]].

Ver as aulas [[programacao/logica-de-programacao/modulo-4/01-por-que-repetir-a-ideia-de-laco|Por que repetir: a ideia de laço]] e [[programacao/logica-de-programacao/modulo-4/03-for-o-laco-contado|for: o laço contado]].

## De onde vem a palavra

Do latim *incrēmentum*, "crescimento, aumento", de *incrēscō*, "crescer, aumentar", formado por *in-* + *crēscō*, "crescer". Incrementar é **fazer crescer**.

*Decremento* é o contrário: vem do latim *dēcrēmentum*, "diminuição", de *dēcrēscō*, "decrescer".

*Crēscō* deu o nosso **crescer** e, pelo particípio *crēscēns*, **crescente**. A raiz indo-europeia, *\*ḱer-*, "crescer", está também no latim *creō*, de onde vem **criar**.

Fontes: Wiktionary: [incrēmentum](https://en.wiktionary.org/wiki/incrementum), [incrēscō](https://en.wiktionary.org/wiki/incresco), [crēscō](https://en.wiktionary.org/wiki/cresco), [dēcrēmentum](https://en.wiktionary.org/wiki/decrementum)
