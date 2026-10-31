---
title: Laço (loop)
---

> [!abstract] Definição
> **Um trecho de código que o computador repete enquanto uma condição for verdadeira.** Em inglês, *loop*. Em JavaScript, os laços se escrevem com `while` ([[glossario/enquanto|enquanto]]) e `for`.

Todo laço tem três peças:

| Peça | No esconde-esconde | No código |
|---|---|---|
| um começo | a contagem começa no 1 | `let i = 1` |
| uma condição | enquanto o número não passar de 10 | `i <= 10` |
| algo que muda a cada volta | vem o próximo número | `i++` |

```js
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
```

O computador pergunta, roda o [[glossario/bloco|bloco]], muda o `i` e volta para perguntar de novo. Quando a resposta é `false`, o laço termina. Cada volta se chama [[glossario/iteracao|iteração]].

Se nada mudar entre uma volta e outra, a condição nunca fica falsa, e o laço não termina: é o [[glossario/laco-infinito|laço infinito]].

Ver as aulas [[programacao/logica-de-programacao/modulo-4/01-por-que-repetir-a-ideia-de-laco|Por que repetir: a ideia de laço]] e [[programacao/logica-de-programacao/modulo-4/02-while-repetindo-enquanto-for-verdade|while: repetindo enquanto for verdade]].

## De onde vem a palavra

*Laço* vem do latim *laqueus*, "laço de corda, armadilha", pelo latim vulgar *laceus*. Da mesma família são o espanhol *lazo*, o inglês *lace* ("cadarço") e o *lasso* do vaqueiro.

O inglês *loop* vem do inglês médio *loupe*, "laço, nó", de origem nórdica: o nórdico antigo *hlaup*, "corrida", usado no sentido de **nó corrediço**, o que corre pela corda e aperta quando se puxa. As duas palavras começaram como nós de corda. No código, o laço é o caminho que faz a curva e volta ao começo, como uma alça.

Em Portugal, também se diz **ciclo**, do grego *kýklos*, "círculo, roda".

Fontes: Wiktionary: [laço](https://en.wiktionary.org/wiki/la%C3%A7o), [laqueus](https://en.wiktionary.org/wiki/laqueus), [lace](https://en.wiktionary.org/wiki/lace), [loop](https://en.wiktionary.org/wiki/loop), [ciclo](https://en.wiktionary.org/wiki/ciclo)
