---
title: Interromper (break)
---

> [!abstract] Definição
> **Um comando que encerra um [[glossario/laco|laço]] na hora, mesmo que a condição ainda dê `true`.** Em JavaScript, se escreve `break`. O programa segue na primeira linha depois do `}` do laço.

```js
for (let i = 1; i <= 20; i++) {
  if (i % 7 === 0) {
    console.log("Achei:", i); // Achei: 7
    break;                    // não testa o 8, o 9...
  }
}
```

Serve quando só o **primeiro** resultado interessa: achou, para de procurar. É também a saída de um `while (true)`, um laço cuja condição nunca dá `false`: sem um `break` lá dentro, ele seria um [[glossario/laco-infinito|laço infinito]].

Num [[glossario/laco-aninhado|laço aninhado]], o `break` só encerra o laço mais de dentro em que está. O de fora continua.

É a mesma palavra do `switch` (a [[glossario/escolha|escolha]]): lá, o `break` sai do bloco do `switch`. Para pular só uma volta, sem encerrar o laço, existe o [[glossario/continuar|continue]].

Ver a aula [[programacao/logica-de-programacao/modulo-4/05-break-continue-e-lacos-aninhados|break, continue e laços aninhados]].

## De onde vem a palavra

*Interromper* vem do latim *interrumpere*, de *inter-* ("entre, no meio") + *rumpere* ("quebrar, romper"). Interromper é **quebrar no meio**. O *rumpere* deu também o nosso **romper**.

O inglês *break* quer dizer justamente "quebrar". Vem do inglês antigo *brecan*, da raiz indo-europeia *\*bʰreg-*, "quebrar", e é primo do latim *frangō*, de onde vêm **fragmento**, **frágil** e **fração**.

Fontes: MDN: [break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break) · Wiktionary: [interromper](https://en.wiktionary.org/wiki/interromper), [interrumpō](https://en.wiktionary.org/wiki/interrumpo), [break](https://en.wiktionary.org/wiki/break), [frangō](https://en.wiktionary.org/wiki/frango)
