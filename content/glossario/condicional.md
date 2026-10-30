---
title: Condicional (if)
---

> [!abstract] Definição
> **Um trecho de código que só roda se uma condição for verdadeira.** Em JavaScript, se escreve com `if` ("se"): `if (condição) { ... }`.

A condição é uma pergunta que dá `true` ou `false`, como uma [[glossario/comparacao|comparação]]. As ações ficam num [[glossario/bloco|bloco]], entre chaves:

```js
if (saldo >= preco) {
  console.log("Compra aprovada!");
}
```

Quando a condição dá falso, o bloco é pulado. Para fazer outra coisa nesse caso, a condicional ganha um segundo caminho, o [[glossario/senao|senão]] (`else`).

É com as condicionais que um programa deixa de andar em linha reta e passa a tomar decisões. Ver as aulas [[programacao/logica-de-programacao/modulo-3/01-tomando-decisoes-com-if|Tomando decisões com if]] e [[programacao/logica-de-programacao/modulo-3/02-if-else-o-outro-caminho|if/else: o outro caminho]].

## De onde vem a palavra

*Condição* vem do latim *condiciō*, de *condīcere*, "combinar, acertar":

| Parte | Latim | Sentido |
|---|---|---|
| *con-* | *con-* | junto |
| *-dição* | *dīcere* | dizer |

A condição era um **acordo falado**: os termos que duas partes combinaram. Em latim, *condiciō* queria dizer acordo, contrato, pacto, e daí as exigências de um trato. O sentido continua vivo em "aceito, com a condição de que...".

Na Idade Média, quando o *-ci-* e o *-ti-* do latim passaram a ter o mesmo som, muita gente escrevia *conditio*, com *t*.

## De onde vem o *if*

Do inglês antigo *ġif*, que soava mais ou menos como "yif", e antes do protogermânico *\*jabai*, "quando, se". O *g* do começo se perdeu pelo caminho.

Primos: o alemão *ob* ("se", como em "não sei se..."), o holandês *of* ("ou", "se") e o islandês *ef* ("se").

Fontes: Wiktionary: [condiciō](https://en.wiktionary.org/wiki/condicio), [condīcō](https://en.wiktionary.org/wiki/condico), [if](https://en.wiktionary.org/wiki/if)
