---
title: Erro por um
---

> [!abstract] Definição
> **Errar uma contagem por um, para mais ou para menos: uma volta a mais ou a menos num laço, um índice a mais ou a menos numa lista.** Em inglês, *off-by-one error*. Também se diz *fencepost error*, o "erro da estaca de cerca".

O nome da cerca vem desta conta: uma cerca de 10 metros, com uma estaca a cada metro, tem 11 estacas, e não 10, porque a do metro 0 também conta.

Com arrays, o caso mais comum é o `<=` no lugar do `<`:

```js
const notas = [7, 8, 6];
let soma = 0;

for (let i = 0; i <= notas.length; i++) {
  soma = soma + notas[i];
}

console.log(soma); // NaN
```

Os índices vão de 0 a 2, mas o laço vai até o 3. O `notas[3]` não existe e vale `undefined`, e `21 + undefined` dá `NaN`. Com `i < notas.length`, o laço para no 2, e a soma dá 21.

Também conta como erro por um começar no lugar errado: com `let i = 1`, o laço pula o primeiro elemento, que fica no índice 0.

Ver as aulas [[programacao/logica-de-programacao/modulo-4/03-for-o-laco-contado|4.3 for: o laço contado]] e [[programacao/logica-de-programacao/modulo-7/04-quando-da-errado-depurando-seu-codigo|7.4 Quando dá errado: depurando seu código]].

## De onde vem a palavra

*Erro* vem do latim *error*, ligado ao verbo *errāre*, que queria dizer "vagar, andar sem rumo, perder-se", e também "enganar-se". Errar era, na origem, perder o caminho. O português guarda os dois sentidos: quem erra a conta se engana, e o cavaleiro errante anda pelo mundo sem rumo certo.

Fontes: Wiktionary: [errō](https://en.wiktionary.org/wiki/erro#Latin)
