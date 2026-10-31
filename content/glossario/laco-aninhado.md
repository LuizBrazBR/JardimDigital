---
title: Laço aninhado
---

> [!abstract] Definição
> **Um [[glossario/laco|laço]] dentro do bloco de outro laço.** Para cada volta do laço de fora, o de dentro roda inteiro, do começo ao fim. Em inglês, *nested loop*.

```js
for (let tabuada = 1; tabuada <= 3; tabuada++) {
  for (let vez = 1; vez <= 3; vez++) {
    console.log(tabuada, "x", vez, "=", tabuada * vez);
  }
}
// 9 linhas: 1 x 1 até 3 x 3
```

É como um relógio: para cada hora, os minutos passam por todos os valores, de 00 a 59, e só então a hora avança.

Se o laço de fora dá `n` voltas e o de dentro dá `m`, o bloco de dentro roda `n × m` vezes. O custo **multiplica**: dois laços de 100 voltas, um dentro do outro, dão 10.000 voltas, e não 200.

Cada laço precisa da sua própria variável de controle, como `i` e `j`, ou `linha` e `coluna`. O [[glossario/interromper|break]] e o [[glossario/continuar|continue]] só valem para o laço mais de dentro em que estão.

Ver a aula [[programacao/logica-de-programacao/modulo-4/05-break-continue-e-lacos-aninhados|break, continue e laços aninhados]].

## De onde vem a palavra

*Aninhado* vem de *aninhar*, *a-* + *ninho* + *-ar*: pôr no ninho. *Ninho* vem do latim *nīdus*, da raiz indo-europeia *\*nisdós*, formada por *\*ni* ("embaixo") + *\*sed-* ("sentar"). O ninho é **onde o pássaro se senta**.

O inglês *nest* vem da mesma raiz, e *nested* é "aninhado". Um laço aninhado fica acomodado dentro do outro, como no ninho.

Fontes: Wiktionary: [aninhar](https://en.wiktionary.org/wiki/aninhar), [ninho](https://en.wiktionary.org/wiki/ninho), [nīdus](https://en.wiktionary.org/wiki/nidus), [nest](https://en.wiktionary.org/wiki/nest)
